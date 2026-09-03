import { onMounted, ref, watch } from 'vue';

export interface SessionNote {
  id: string;
  text: string;
  createdAt: string;
}

const NOTES_KEY = 'rpg-session-notes';
const HISTORY_KEY = 'rpg-session-notes-history';
const notes = ref('');
const history = ref<SessionNote[]>([]);
let initialized = false;

export function useSessionNotes() {
  onMounted(() => {
    if (initialized) return;
    initialized = true;
    try {
      notes.value = localStorage.getItem(NOTES_KEY) ?? '';
      const storedHistory = localStorage.getItem(HISTORY_KEY);
      history.value = storedHistory ? JSON.parse(storedHistory) as SessionNote[] : [];
    } catch {
      notes.value = '';
      history.value = [];
    }
  });

  watch(notes, (value) => {
    if (!initialized) return;
    try {
      if (value.trim()) localStorage.setItem(NOTES_KEY, value);
      else localStorage.removeItem(NOTES_KEY);
    } catch {
      // La saisie reste utilisable si le stockage local est indisponible.
    }
  });

  function persistHistory() {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history.value));
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

  return { notes, history, saveNote, updateNote, deleteNote, clearNotes, clearHistory };
}
