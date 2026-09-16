import { onBeforeUnmount, onMounted, ref } from 'vue';
import { hydrateLocalStorageKey, mirrorLocalStorageKey } from './useSyncedDocument';

const STORAGE_KEY = 'rpg-character-status';
const CHANNEL_NAME = 'rpg-character-status';

type CharacterStatuses = Record<string, boolean>;

const statuses = ref<CharacterStatuses>({});
let initialized = false;
let channel: BroadcastChannel | null = null;

function readStored(): CharacterStatuses {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    return stored && typeof stored === 'object' ? stored as CharacterStatuses : {};
  } catch {
    return {};
  }
}

function publish() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses.value));
  } catch {
    // La synchronisation de la fenêtre reste disponible si le stockage est indisponible.
  }
  channel?.postMessage({ type: 'statuses', statuses: statuses.value });
  void mirrorLocalStorageKey(STORAGE_KEY, JSON.stringify(statuses.value));
}

function initialize() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  statuses.value = readStored();
  if ('BroadcastChannel' in window) {
    channel = new BroadcastChannel(CHANNEL_NAME);
    channel.onmessage = (event) => {
      if (event.data?.type === 'statuses' && event.data.statuses && typeof event.data.statuses === 'object') {
        statuses.value = event.data.statuses as CharacterStatuses;
      }
    };
  }
}

export function characterStatusId(collection: 'npcs' | 'enemies', id: string): string {
  return `${collection}:${id}`;
}

export function useCharacterStatus() {
  onMounted(async () => {
    const remote = await hydrateLocalStorageKey(STORAGE_KEY);
    if (remote) {
      try { statuses.value = JSON.parse(remote) as CharacterStatuses; } catch { /* cache locale conservé */ }
    }
    initialize();
  });
  onBeforeUnmount(() => {
    // Le canal reste ouvert pendant la session pour servir les composants montés ensuite.
  });

  function isMarked(id: string) {
    return Boolean(statuses.value[id]);
  }

  function setMarked(id: string, marked: boolean) {
    statuses.value = { ...statuses.value, [id]: marked };
    if (!marked) {
      const next = { ...statuses.value };
      delete next[id];
      statuses.value = next;
    }
    publish();
  }

  function toggleMarked(id: string) {
    setMarked(id, !isMarked(id));
  }

  return { statuses, isMarked, setMarked, toggleMarked };
}
