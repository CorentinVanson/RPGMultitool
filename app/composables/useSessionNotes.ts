import { onMounted, ref, watch } from 'vue';
import { usePlayerTeams } from './usePlayerTeams';

export interface SessionNote {
  id: string;
  text: string;
  createdAt: string;
}

const notes = ref('');
const history = ref<SessionNote[]>([]);
let initialized = false;

function storageKey(prefix: string, teamId: string | null) {
  return `${prefix}:${teamId ?? 'general'}`;
}

export function useSessionNotes() {
  const { activeTeamId, activeTeam } = usePlayerTeams();

  function loadNotes() {
    const notesKey = storageKey('rpg-session-notes', activeTeamId.value);
    const historyKey = storageKey('rpg-session-notes-history', activeTeamId.value);
    try {
      const storedNotes = localStorage.getItem(notesKey) ?? (activeTeamId.value ? '' : localStorage.getItem('rpg-session-notes') ?? '');
      const storedHistory = localStorage.getItem(historyKey) ?? (activeTeamId.value ? null : localStorage.getItem('rpg-session-notes-history'));
      notes.value = storedNotes;
      history.value = storedHistory ? JSON.parse(storedHistory) as SessionNote[] : [];
      if (!activeTeamId.value && !localStorage.getItem(notesKey) && storedNotes) localStorage.setItem(notesKey, storedNotes);
      if (!activeTeamId.value && !localStorage.getItem(historyKey) && storedHistory) localStorage.setItem(historyKey, storedHistory);
    } catch {
      notes.value = '';
      history.value = [];
    }
  }

  onMounted(() => {
    if (initialized) return;
    initialized = true;
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
    } catch {
      // La saisie reste utilisable si le stockage local est indisponible.
    }
  });

  function persistHistory() {
    try {
      localStorage.setItem(storageKey('rpg-session-notes-history', activeTeamId.value), JSON.stringify(history.value));
    } catch {
      // L'historique reste disponible tant que la page est ouverte.
    }
  }

  function saveNote() {
    const text = notes.value.trim();
    if (!text) return;
    history.value = [{ id: `${Date.now()}`, text, createdAt: new Date().toISOString() }, ...history.value];
    notes.value = '';
    persistHistory();
  }

  function deleteNote(id: string) {
    history.value = history.value.filter((note) => note.id !== id);
    persistHistory();
  }

  function updateNote(id: string, text: string) {
    const cleanText = text.trim();
    if (!cleanText) {
      deleteNote(id);
      return;
    }
    history.value = history.value.map((note) => (note.id === id ? { ...note, text: cleanText } : note));
    persistHistory();
  }

  function clearNotes() {
    notes.value = '';
  }

  function clearHistory() {
    history.value = [];
    persistHistory();
  }

  return { notes, history, activeTeam, saveNote, updateNote, deleteNote, clearNotes, clearHistory };
}
