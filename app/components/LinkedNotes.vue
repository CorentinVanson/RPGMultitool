<script setup lang="ts">
import { computed, nextTick, onMounted, onUpdated, ref, watch } from 'vue';
import { useRoute } from '#imports';
import { usePlayerTeams } from '../composables/usePlayerTeams';
import { useSessionNotes } from '../composables/useSessionNotes';

const route = useRoute();
const { activeTeamId } = usePlayerTeams();
const { linkedHistory, saveLinkedNote, deleteNote } = useSessionNotes();
const content = ref<HTMLElement | null>(null);
const activeTarget = ref<string | null>(null);
const activeNoteId = ref<string | null>(null);
const draft = ref('');
const storedNotes = ref<Record<string, string>>({});
const targetLabels = ref<Record<string, string>>({});
const anchorNotes = computed(() => linkedHistory.value.filter((note) => note.anchorId === activeTarget.value || (!note.anchorId && note.id === activeTarget.value)));
const noteCount = computed(() => linkedHistory.value.filter((note) => note.pagePath === route.path).length + Object.keys(storedNotes.value).filter((key) => key.startsWith(`${route.path}:`)).length);

function storageKey() {
  return `rpg-linked-notes:${activeTeamId.value ?? 'general'}`;
}

function hashText(value: string): string {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) hash = ((hash << 5) - hash) + value.charCodeAt(index) | 0;
  return Math.abs(hash).toString(36);
}

function loadNotes() {
  try {
    const saved = localStorage.getItem(storageKey());
    storedNotes.value = saved ? JSON.parse(saved) as Record<string, string> : {};
  } catch {
    storedNotes.value = {};
  }
}

function persistNotes() {
  try {
    localStorage.setItem(storageKey(), JSON.stringify(storedNotes.value));
  } catch {
    // La note reste visible pendant la session si le stockage est indisponible.
  }
}

function targetKey(element: HTMLElement, index: number): string {
  return `${route.path}:${index}:${hashText(element.textContent?.trim() ?? '')}`;
}

function pageTitle(): string {
  return content.value?.querySelector('h1')?.textContent?.replace(/[＋🔖]/g, '').trim() || document.title;
}

function openNote(key: string) {
  activeTarget.value = key;
  activeNoteId.value = null;
  draft.value = '';
}

function editNote(id: string, text: string) {
  activeNoteId.value = id;
  draft.value = text;
}

function saveNote() {
  if (!activeTarget.value) return;
  const key = activeTarget.value;
  const text = draft.value.trim();
  const id = activeNoteId.value ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  saveLinkedNote(id, key, text, route.path, pageTitle(), targetLabels.value[key] ?? 'Texte lié');
  activeTarget.value = null;
  activeNoteId.value = null;
}

function closeNote() {
  activeTarget.value = null;
  activeNoteId.value = null;
}

function removeNote(id: string) {
  deleteNote(id);
  if (activeNoteId.value === id) {
    activeNoteId.value = null;
    draft.value = '';
  }
}

function hasNoteForTarget(key: string): boolean {
  return linkedHistory.value.some((note) => note.anchorId === key || (!note.anchorId && note.id === key)) || Boolean(storedNotes.value[key]);
}

function addActions() {
  if (!content.value) return;
  const targets = [...content.value.querySelectorAll<HTMLElement>('h1, h2, h3, h4, p, li, td, th')]
    .filter((element) => !element.closest('[data-linked-note-action]') && !element.closest('button, input, textarea, select, nav'));

  targets.forEach((element, index) => {
    const key = element.dataset.linkedNoteKey ?? targetKey(element, index);
    const existingAction = element.querySelector<HTMLButtonElement>(':scope > [data-linked-note-action]');
    if (existingAction) {
      const hasNote = hasNoteForTarget(key);
      existingAction.classList.toggle('has-linked-note', hasNote);
      existingAction.textContent = hasNote ? '🔖' : '＋';
      existingAction.title = hasNote ? 'Afficher les notes liées' : 'Ajouter une note liée';
      return;
    }
    targetLabels.value[key] = element.textContent?.trim() ?? 'Texte lié';
    element.dataset.linkedNoteKey = key;
    element.id = element.id || `linked-${hashText(key)}`;
    const action = document.createElement('button');
    action.type = 'button';
    action.dataset.linkedNoteAction = 'true';
    action.className = 'linked-note-action';
    const hasNote = hasNoteForTarget(key);
    action.classList.toggle('has-linked-note', hasNote);
    action.title = hasNote ? 'Afficher les notes liées' : 'Ajouter une note liée';
    action.textContent = hasNote ? '🔖' : '＋';
    action.addEventListener('click', () => openNote(key));
    element.append(action);
  });
}

async function refreshActions(scrollToAnchor = false) {
  await nextTick();
  addActions();
  if (scrollToAnchor && route.hash) {
    document.getElementById(decodeURIComponent(route.hash.slice(1)))?.scrollIntoView({ block: 'center' });
  }
}

onMounted(() => {
  loadNotes();
  refreshActions(true);
});
onUpdated(refreshActions);
watch([() => route.path, activeTeamId], () => {
  loadNotes();
  activeTarget.value = null;
  activeNoteId.value = null;
  refreshActions(true);
});
</script>

<template>
  <div :class="$style.root">
    <div ref="content"><slot /></div>
    <aside v-if="activeTarget" :class="$style.editor" aria-label="Note liée">
      <header :class="$style.editorHeader">
        <strong>{{ activeNoteId ? 'Modifier la note liée' : 'Notes liées à ce texte' }}</strong>
        <button type="button" :class="$style.close" title="Fermer" @click="closeNote">✕</button>
      </header>
      <div v-if="anchorNotes.length" :class="$style.noteList">
        <article v-for="note in anchorNotes" :key="note.id" :class="$style.linkedNote">
          <p>{{ note.text }}</p>
          <div :class="$style.noteActions">
            <button type="button" :class="$style.edit" @click="editNote(note.id, note.text)">Modifier</button>
            <button type="button" :class="$style.delete" @click="removeNote(note.id)">Supprimer</button>
          </div>
        </article>
      </div>
      <p v-if="!activeNoteId" :class="$style.newLabel">Ajouter une note</p>
      <textarea v-model="draft" rows="5" placeholder="Ajouter un rappel pour ce texte..."></textarea>
      <div :class="$style.actions">
        <span :class="$style.scope">{{ activeTeamId ? 'Note de l’équipe active' : 'Note générale' }}</span>
        <button type="button" :class="$style.save" @click="saveNote">{{ activeNoteId ? 'Enregistrer' : 'Ajouter' }}</button>
      </div>
    </aside>
    <span v-if="noteCount" :class="$style.count" aria-live="polite">{{ noteCount }} note{{ noteCount > 1 ? 's' : '' }} liée{{ noteCount > 1 ? 's' : '' }}</span>
  </div>
</template>

<style>
.linked-note-action { display: inline-flex; align-items: center; justify-content: center; width: 1.45rem; height: 1.45rem; margin-left: .45rem; padding: 0; background: transparent; color: var(--accent); border: 1px solid transparent; border-radius: 3px; font: inherit; line-height: 1; cursor: pointer; opacity: 0; vertical-align: middle; }
.linked-note-action:hover, :hover > .linked-note-action, :focus-within > .linked-note-action { opacity: .7; }
.linked-note-action.has-linked-note { opacity: .85; }
.linked-note-action.has-linked-note { font-size: .72em; }
.linked-note-action:hover, .linked-note-action:focus { border-color: var(--accent); opacity: 1; outline: none; }
</style>

<style module>
.root { position: relative; }
.editor { position: fixed; right: 1.25rem; bottom: 1.25rem; z-index: 45; width: min(25rem, calc(100vw - 2.5rem)); background: var(--panel); border: 2px solid var(--accent); border-radius: 6px; padding: 1rem; box-shadow: 0 5px 20px rgba(0, 0, 0, .5); }
.editorHeader, .actions { display: flex; align-items: center; justify-content: space-between; gap: .75rem; }
.noteList { display: flex; flex-direction: column; gap: .5rem; margin-top: .75rem; max-height: 12rem; overflow-y: auto; }
.linkedNote { border: 1px solid #4a3a28; border-radius: 4px; padding: .5rem .6rem; }
.linkedNote p { margin: 0 0 .35rem; white-space: pre-wrap; overflow-wrap: anywhere; }
.edit { background: transparent; color: var(--muted); border: 1px solid #4a3a28; border-radius: 3px; padding: .15rem .4rem; cursor: pointer; }
.noteActions { display: flex; gap: .4rem; }
.delete { background: transparent; color: #e3a39a; border: 1px solid #7e4a42; border-radius: 3px; padding: .15rem .4rem; cursor: pointer; }
.newLabel { margin: .75rem 0 0; color: var(--accent); font-size: .85rem; }
.editor textarea { width: 100%; margin: .75rem 0; resize: vertical; background: var(--bg); color: var(--text); border: 1px solid #4a3a28; border-radius: 4px; padding: .6rem; font: inherit; line-height: 1.45; }
.editor textarea:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
.close { background: transparent; color: var(--muted); border: 1px solid #4a3a28; border-radius: 3px; padding: .15rem .4rem; cursor: pointer; }
.save { background: var(--accent); color: #1c150f; border: 1px solid var(--accent); border-radius: 4px; padding: .4rem .7rem; font: inherit; font-weight: bold; cursor: pointer; }
.scope, .count { color: var(--muted); font-size: .8rem; }
.count { position: fixed; right: 1.25rem; bottom: .7rem; z-index: 44; pointer-events: none; }
@media (max-width: 52rem) { .editor { right: 1rem; bottom: 4.5rem; } .count { right: 1rem; bottom: 3.7rem; } }
</style>
