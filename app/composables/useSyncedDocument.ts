import { onMounted, ref, type Ref } from 'vue';

interface SyncedDocument<T> {
  key: string;
  version: number;
  payload: T;
  updatedAt: string;
}

const DB_NAME = 'rpgmultitool';
const STORE_NAME = 'documents';
const queuedKeys = new Set<string>();
const PENDING_KEY = 'rpg-sync-pending-keys';
let syncListenerStarted = false;

function readPendingKeys(): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(PENDING_KEY) ?? '[]');
    return Array.isArray(value) ? value.filter((key): key is string => typeof key === 'string') : [];
  } catch {
    return [];
  }
}

function writePendingKeys(keys: string[]) {
  try { localStorage.setItem(PENDING_KEY, JSON.stringify([...new Set(keys)])); } catch { /* IndexedDB reste disponible */ }
}

function queueKey(key: string) {
  writePendingKeys([...readPendingKeys(), key]);
}

function dequeueKey(key: string) {
  writePendingKeys(readPendingKeys().filter((pendingKey) => pendingKey !== key));
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME, { keyPath: 'key' });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function readLocal<T>(key: string): Promise<SyncedDocument<T> | null> {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = database.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get(key);
    request.onsuccess = () => resolve((request.result as SyncedDocument<T> | undefined) ?? null);
    request.onerror = () => reject(request.error);
  });
}

async function writeLocal<T>(document: SyncedDocument<T>) {
  const database = await openDatabase();
  return new Promise<void>((resolve, reject) => {
    const request = database.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).put(document);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function pull<T>(key: string): Promise<SyncedDocument<T> | null> {
  const response = await fetch(`/api/sync?keys=${encodeURIComponent(key)}`);
  if (!response.ok) throw new Error(`Synchronisation impossible (${response.status})`);
  const documents = await response.json() as Array<{ key: string; version: number; payload: string; updatedAt: string }>;
  const document = documents[0];
  return document ? { key: document.key, version: document.version, payload: JSON.parse(document.payload) as T, updatedAt: document.updatedAt } : null;
}

async function push<T>(document: SyncedDocument<T>) {
  const response = await fetch('/api/sync', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ key: document.key, payload: JSON.stringify(document.payload), baseVersion: document.version }) });
  if (!response.ok) throw new Error(`Synchronisation impossible (${response.status})`);
  const remote = await response.json() as { key: string; version: number; payload: string; updatedAt: string };
  return { key: remote.key, version: remote.version, payload: JSON.parse(remote.payload) as T, updatedAt: remote.updatedAt };
}

async function syncKey<T>(key: string) {
  if (queuedKeys.has(key)) return;
  queuedKeys.add(key);
  try {
    const local = await readLocal<T>(key);
    const remote = await pull<T>(key);
    if (remote && (!local || remote.version > local.version)) {
      await writeLocal(remote);
      dequeueKey(key);
    } else if (local) {
      await writeLocal(await push(local));
      dequeueKey(key);
    } else {
      dequeueKey(key);
    }
  } catch {
    // Le cache IndexedDB reste la source disponible hors ligne.
  } finally {
    queuedKeys.delete(key);
  }
}

function startNetworkSync() {
  if (syncListenerStarted || typeof window === 'undefined') return;
  syncListenerStarted = true;
  window.addEventListener('online', () => { for (const key of readPendingKeys()) void syncKey(key); });
}

export function useSyncedDocument<T>(key: string, initialValue: T) {
  const value = ref(initialValue) as Ref<T>;
  const ready = ref(false);

  onMounted(async () => {
    startNetworkSync();
    const local = await readLocal<T>(key).catch(() => null);
    if (local) value.value = local.payload;
    if (navigator.onLine) {
      const remote = await pull<T>(key).catch(() => null);
      if (remote && (!local || remote.version > local.version)) {
        value.value = remote.payload;
        await writeLocal(remote).catch(() => undefined);
      }
    }
    ready.value = true;
  });

  async function save(nextValue: T) {
    value.value = nextValue;
    const current = await readLocal<T>(key).catch(() => null);
    const document: SyncedDocument<T> = { key, version: current?.version ?? 0, payload: nextValue, updatedAt: new Date().toISOString() };
    await writeLocal(document).catch(() => undefined);
    queueKey(key);
    if (navigator.onLine) await syncKey<T>(key);
  }

  return { value, ready, save, sync: () => syncKey<T>(key) };
}

/** Bridges the existing localStorage-backed stores into the offline-first database. */
export async function mirrorLocalStorageKey(key: string, payload: string) {
  if (typeof window === 'undefined') return;
  const current = await readLocal<string>(key).catch(() => null);
  const document: SyncedDocument<string> = { key, version: current?.version ?? 0, payload, updatedAt: new Date().toISOString() };
  await writeLocal(document).catch(() => undefined);
  queueKey(key);
  if (navigator.onLine) await syncKey<string>(key);
}

/** Gets the newest database copy while preserving localStorage as a compatibility fallback. */
export async function hydrateLocalStorageKey(key: string): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  const local = await readLocal<string>(key).catch(() => null);
  if (!navigator.onLine) return local?.payload ?? null;
  const remote = await pull<string>(key).catch(() => null);
  if (remote && (!local || remote.version > local.version)) {
    await writeLocal(remote).catch(() => undefined);
    return remote.payload;
  }
  if (local) {
    queueKey(key);
    const synced = await push(local).catch(() => null);
    if (synced) {
      await writeLocal(synced).catch(() => undefined);
      dequeueKey(key);
    }
    return local.payload;
  }
  const legacyPayload = localStorage.getItem(key);
  if (legacyPayload != null) {
    const migrated: SyncedDocument<string> = { key, version: 0, payload: legacyPayload, updatedAt: new Date().toISOString() };
    await writeLocal(migrated).catch(() => undefined);
    queueKey(key);
    const synced = await push(migrated).catch(() => null);
    if (synced) {
      await writeLocal(synced).catch(() => undefined);
      dequeueKey(key);
    }
    return legacyPayload;
  }
  return null;
}
