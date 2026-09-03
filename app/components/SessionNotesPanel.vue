<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useSessionNotes } from '../composables/useSessionNotes';

const { notes, history, saveNote, updateNote, deleteNote, clearHistory } = useSessionNotes();
const open = ref(false);
const historyElement = ref<HTMLElement | null>(null);
const editingId = ref<string | null>(null);
const editingText = ref('');
const hasNotes = computed(() => Boolean(notes.value.trim() || history.value.length));
const orderedHistory = computed(() => [...history.value].sort((left, right) => left.createdAt.localeCompare(right.createdAt)));

function scrollHistoryToBottom() {
  nextTick(() => {
    if (open.value && historyElement.value) historyElement.value.scrollTop = historyElement.value.scrollHeight;
  });
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
}

function editNote(id: string, text: string) {
  editingId.value = id;
  editingText.value = text;
}

function saveEditedNote() {
  if (!editingId.value) return;
  updateNote(editingId.value, editingText.value);
  editingId.value = null;
  editingText.value = '';
}

function cancelEdit() {
  editingId.value = null;
  editingText.value = '';
}

watch([open, history], scrollHistoryToBottom, { deep: true });
</script>

<template>
  <div :class="[$style.wrapper, open && $style.open]">
    <button type="button" :class="$style.fab" :aria-expanded="open" @click="open = !open">
      📝 Notes<span v-if="hasNotes" :class="$style.badge">{{ history.length }}</span>
    </button>

    <aside v-show="open" :class="$style.panel" aria-label="Notes de séance">
      <header :class="$style.head">
        <strong>Notes de séance</strong>
        <button type="button" :class="$style.mini" title="Fermer" @click="open = false">✕</button>
      </header>

      <section ref="historyElement" :class="$style.history">
        <div :class="$style.sectionHead">
          <h2 :class="$style.title">Historique</h2>
          <button v-if="history.length" type="button" :class="$style.mini" @click="clearHistory">Tout effacer</button>
        </div>
        <p v-if="!history.length" :class="$style.empty">Aucune note enregistrée pour cette partie.</p>
        <article v-for="note in orderedHistory" :key="note.id" :class="$style.note">
          <div :class="$style.noteHead">
            <time :datetime="note.createdAt">{{ formatDate(note.createdAt) }}</time>
            <div :class="$style.noteActions">
              <button type="button" :class="$style.mini" title="Modifier cette note" @click="editNote(note.id, note.text)">Modifier</button>
              <button type="button" :class="$style.mini" title="Supprimer cette note" @click="deleteNote(note.id)">✕</button>
            </div>
          </div>
          <textarea v-if="editingId === note.id" v-model="editingText" :class="$style.editInput" rows="4" />
          <p v-else>{{ note.text }}</p>
          <div v-if="editingId === note.id" :class="$style.noteActions">
            <button type="button" :class="$style.primary" :disabled="!editingText.trim()" @click="saveEditedNote">Enregistrer</button>
            <button type="button" :class="$style.mini" @click="cancelEdit">Annuler</button>
          </div>
        </article>
      </section>

      <section :class="$style.editor">
        <h2 :class="$style.title">Nouvelle note</h2>
        <textarea v-model="notes" :class="$style.input" rows="7" placeholder="Événements, décisions, indices..."></textarea>
        <div :class="$style.actions">
          <button type="button" :class="$style.primary" :disabled="!notes.trim()" @click="saveNote">Ajouter à l’historique</button>
          <span :class="$style.hint">Brouillon sauvegardé automatiquement</span>
        </div>
      </section>
    </aside>
  </div>
</template>

<style module>
.wrapper { position: fixed; left: 1.25rem; bottom: 1.25rem; z-index: 40; }
.fab { display: flex; align-items: center; gap: .5rem; background: var(--accent); color: #1c150f; border: none; border-radius: 999px; padding: .7rem 1.1rem; font-family: inherit; font-weight: bold; cursor: pointer; box-shadow: 0 4px 14px rgba(0, 0, 0, .5); }
.badge { background: #1c150f; color: var(--accent); border-radius: 999px; padding: 0 .5rem; font-size: .8rem; }
.panel { position: fixed; top: 0; left: 0; width: min(24rem, 100vw); bottom: 0; overflow-y: auto; background: var(--panel); border-right: 2px solid var(--accent); padding: 1rem 1.1rem 5rem; display: flex; flex-direction: column; gap: 1rem; box-shadow: 4px 0 14px rgba(0, 0, 0, .35); scrollbar-width: thin; scrollbar-color: var(--accent) #1c150f; }
.head, .sectionHead, .noteHead { display: flex; align-items: center; justify-content: space-between; }
.editor, .history { display: flex; flex-direction: column; gap: .6rem; }
.history { flex: 1; min-height: 0; overflow-y: auto; scrollbar-width: thin; scrollbar-color: var(--accent) #1c150f; }
.input { width: 100%; min-height: 9rem; resize: vertical; background: #1c150f; color: var(--text); border: 1px solid #4a3a28; border-radius: 4px; padding: .65rem .7rem; font: inherit; line-height: 1.45; }
.input:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
.actions { display: flex; flex-direction: column; gap: .4rem; }
.primary { align-self: flex-start; background: var(--accent); color: #1c150f; border: 1px solid var(--accent); border-radius: 4px; padding: .45rem .8rem; font-family: inherit; font-weight: bold; cursor: pointer; }
.primary:disabled { opacity: .45; cursor: default; }
.title { margin: 0; font-size: .95rem; color: var(--accent); }
.hint, .empty { margin: 0; color: var(--muted); font-size: .8rem; }
.note { border: 1px solid #4a3a28; border-radius: 4px; padding: .6rem .7rem; background: #1c150f; }
.note time { color: var(--muted); font-size: .75rem; }
.note p { margin: .45rem 0 0; white-space: pre-wrap; overflow-wrap: anywhere; }
.noteActions { display: flex; align-items: center; gap: .35rem; }
.editInput { width: 100%; margin-top: .45rem; resize: vertical; background: #2b2018; color: var(--text); border: 1px solid #4a3a28; border-radius: 4px; padding: .5rem .6rem; font: inherit; line-height: 1.45; }
.mini { background: transparent; color: var(--muted); border: 1px solid #4a3a28; border-radius: 3px; cursor: pointer; padding: .15rem .4rem; font-family: inherit; }
.mini:hover { border-color: var(--accent); color: var(--accent); }
.panel::-webkit-scrollbar, .history::-webkit-scrollbar, .input::-webkit-scrollbar, .editInput::-webkit-scrollbar { width: .45rem; }
.panel::-webkit-scrollbar-track, .history::-webkit-scrollbar-track, .input::-webkit-scrollbar-track, .editInput::-webkit-scrollbar-track { background: #1c150f; }
.panel::-webkit-scrollbar-thumb, .history::-webkit-scrollbar-thumb, .input::-webkit-scrollbar-thumb, .editInput::-webkit-scrollbar-thumb { background: var(--accent); border: 2px solid #1c150f; border-radius: 999px; }
.panel::-webkit-scrollbar-thumb:hover, .history::-webkit-scrollbar-thumb:hover, .input::-webkit-scrollbar-thumb:hover, .editInput::-webkit-scrollbar-thumb:hover { background: #d9b46a; }
@media (max-width: 52rem) {
  .wrapper { left: 1rem; bottom: 1rem; }
  .panel { width: min(24rem, 100vw); }
}
</style>
