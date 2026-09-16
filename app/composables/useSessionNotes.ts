import { onMounted, ref, watch } from 'vue';
import { usePlayerTeams } from './usePlayerTeams';
import { hydrateLocalStorageKey, mirrorLocalStorageKey } from './useSyncedDocument';

export interface SessionNote {
  id: string;
  text: string;
  createdAt: string;
  kind?: 'session' | 'linked';
  pagePath?: string;
  pageTitle?: string;
  anchorId?: string;
  anchorText?: string;
}

const notes = ref('');
const history = ref<SessionNote[]>([]);
const linkedHistory = ref<SessionNote[]>([]);
let initialized = false;

function storageKey(prefix: string, teamId: string | null) {
  return `${prefix}:${teamId ?? 'general'}`;
}

export function useSessionNotes() {
  const { activeTeamId, activeTeam } = usePlayerTeams();

  function loadNotes() {
    const notesKey = storageKey('rpg-session-notes', activeTeamId.value);
    const historyKey = storageKey('rpg-session-notes-history', activeTeamId.value);
    const linkedHistoryKey = storageKey('rpg-linked-notes-history', activeTeamId.value);
    try {
      const storedNotes = localStorage.getItem(notesKey) ?? (activeTeamId.value ? '' : localStorage.getItem('rpg-session-notes') ?? '');
      const storedHistory = localStorage.getItem(historyKey) ?? (activeTeamId.value ? null : localStorage.getItem('rpg-session-notes-history'));
      const storedLinkedHistory = localStorage.getItem(linkedHistoryKey);
      notes.value = storedNotes;
      history.value = storedHistory ? (JSON.parse(storedHistory) as SessionNote[]).map((note) => ({ ...note, kind: note.kind ?? 'session' })) : [];
      linkedHistory.value = storedLinkedHistory ? JSON.parse(storedLinkedHistory) as SessionNote[] : [];
      if (!activeTeamId.value && !localStorage.getItem(notesKey) && storedNotes) localStorage.setItem(notesKey, storedNotes);
      if (!activeTeamId.value && !localStorage.getItem(historyKey) && storedHistory) localStorage.setItem(historyKey, storedHistory);
    } catch {
      notes.value = '';
      history.value = [];
    }
  }

  onMounted(async () => {
    if (initialized) return;
    initialized = true;
    const keys = [storageKey('rpg-session-notes', activeTeamId.value), storageKey('rpg-session-notes-history', activeTeamId.value), storageKey('rpg-linked-notes-history', activeTeamId.value)];
    const remote = await Promise.all(keys.map((key) => hydrateLocalStorageKey(key)));
    remote.forEach((value, index) => { if (value != null) localStorage.setItem(keys[index]!, value); });
    loadNotes();
  });

  watch(activeTeamId, () => {
    if (initialized) loadNotes();
  });

  watch(notes, (value) => {
    if (!initialized) return;
    try {
      const key = storageKey('rpg-session-notes', activeTeamId.value);
      if (value.trim()) localStorage.setItem(key, value);
      else localStorage.removeItem(key);
      void mirrorLocalStorageKey(key, value);
    } catch {
      // La saisie reste utilisable si le stockage local est indisponible.
    }
  });

  function persistHistory() {
    try {
      localStorage.setItem(storageKey('rpg-session-notes-history', activeTeamId.value), JSON.stringify(history.value));
      void mirrorLocalStorageKey(storageKey('rpg-session-notes-history', activeTeamId.value), JSON.stringify(history.value));
    } catch {
      // L'historique reste disponible tant que la page est ouverte.
    }
  }

  function persistLinkedHistory() {
    try {
      localStorage.setItem(storageKey('rpg-linked-notes-history', activeTeamId.value), JSON.stringify(linkedHistory.value));
      void mirrorLocalStorageKey(storageKey('rpg-linked-notes-history', activeTeamId.value), JSON.stringify(linkedHistory.value));
    } catch {
      // L'historique reste disponible tant que la page est ouverte.
    }
  }

  function saveNote() {
    const text = notes.value.trim();
    if (!text) return;
    history.value = [{ id: `${Date.now()}`, text, kind: 'session', createdAt: new Date().toISOString() }, ...history.value];
    notes.value = '';
    persistHistory();
  }

  function deleteNote(id: string) {
    history.value = history.value.filter((note) => note.id !== id);
    linkedHistory.value = linkedHistory.value.filter((note) => note.id !== id);
    persistHistory();
    persistLinkedHistory();
  }

  function updateNote(id: string, text: string) {
    const cleanText = text.trim();
    if (!cleanText) {
      deleteNote(id);
      return;
    }
    history.value = history.value.map((note) => (note.id === id ? { ...note, text: cleanText } : note));
    linkedHistory.value = linkedHistory.value.map((note) => (note.id === id ? { ...note, text: cleanText } : note));
    persistHistory();
    persistLinkedHistory();
  }

  function saveLinkedNote(id: string, anchorId: string, text: string, pagePath: string, pageTitle: string, anchorText: string) {
    const cleanText = text.trim();
    linkedHistory.value = linkedHistory.value.filter((note) => note.id !== id);
    if (cleanText) linkedHistory.value = [...linkedHistory.value, { id, text: cleanText, createdAt: new Date().toISOString(), kind: 'linked', pagePath, pageTitle, anchorId, anchorText }];
    persistLinkedHistory();
  }

  function clearNotes() {
    notes.value = '';
  }

  function clearHistory() {
    history.value = [];
    linkedHistory.value = [];
    persistHistory();
    persistLinkedHistory();
  }

  return { notes, history, linkedHistory, activeTeam, saveNote, saveLinkedNote, updateNote, deleteNote, clearNotes, clearHistory };
}
