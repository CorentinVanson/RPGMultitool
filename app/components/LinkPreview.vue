<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { entryName, sectionCollections, useContentCollection } from '../composables/useContent';
import { DEFAULT_ACTOR_IMAGE, useProjectionController, type ProjectionActor } from '../composables/useProjection';
import type { ContentEntry } from '../types/content';

const { data: locations } = useContentCollection('locations');
const { data: npcs } = useContentCollection('npcs');
const { data: enemies } = useContentCollection('enemies');
const { state, start } = useProjectionController();

onMounted(start);

const LINK_PATTERN = /^\/(personnages|ennemis|lieux)\/([^/?#]+)\/?$/;

const target = ref<{ section: string; slug: string } | null>(null);
const position = reactive({ top: 0, left: 0 });
let hideTimer: ReturnType<typeof setTimeout> | null = null;
const cardElement = ref<HTMLElement | null>(null);

function clearHideTimer() {
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
}

function scheduleHide() {
  clearHideTimer();
  hideTimer = setTimeout(() => { target.value = null; }, 200);
}

function findLink(node: EventTarget | null): HTMLAnchorElement | null {
  if (!(node instanceof Element)) return null;
  return node.closest('a[href]');
}

function handlePointerOver(event: PointerEvent) {
  const link = findLink(event.target);
  if (!link) return;
  if (cardElement.value?.contains(link)) return;
  const match = link.getAttribute('href')?.match(LINK_PATTERN);
  if (!match) {
    target.value = null;
    return;
  }
  clearHideTimer();
  const rect = link.getBoundingClientRect();
  const cardWidth = 260;
  position.left = Math.min(rect.left, window.innerWidth - cardWidth - 12);
  position.top = rect.bottom + 8;
  target.value = { section: match[1], slug: match[2] };
}

function handlePointerOut(event: PointerEvent) {
  const link = findLink(event.target);
  if (!link) return;
  const related = event.relatedTarget;
  if (cardElement.value?.contains(related as Node)) return;
  scheduleHide();
}

function handleCardEnter() {
  clearHideTimer();
}

function handleCardLeave() {
  scheduleHide();
}

onMounted(() => {
  document.addEventListener('pointerover', handlePointerOver);
  document.addEventListener('pointerout', handlePointerOut);
});
onBeforeUnmount(() => {
  document.removeEventListener('pointerover', handlePointerOver);
  document.removeEventListener('pointerout', handlePointerOut);
  clearHideTimer();
});

const collection = computed(() => (target.value ? sectionCollections[target.value.section] : null));
const entry = computed<ContentEntry | null>(() => {
  if (!target.value || !collection.value) return null;
  const source = collection.value === 'locations' ? locations.value : collection.value === 'npcs' ? npcs.value : enemies.value;
  return (source ?? []).find((item) => item.id === target.value?.slug) ?? null;
});

const isLocation = computed(() => collection.value === 'locations');
const previewImage = computed(() => {
  if (!entry.value) return null;
  return entry.value.data.image || (isLocation.value ? null : DEFAULT_ACTOR_IMAGE);
});
const previewMeta = computed(() => {
  if (!entry.value) return '';
  return [entry.value.data.type ?? entry.value.data.role, entry.value.data.region].filter(Boolean).join(' — ');
});

const actor = computed<ProjectionActor | null>(() => {
  if (!entry.value || isLocation.value || collection.value === 'quests' || collection.value === 'arcs') return null;
  return {
    id: `${collection.value}:${entry.value.id}`,
    name: entryName(entry.value),
    image: previewImage.value ?? DEFAULT_ACTOR_IMAGE,
    collection: collection.value as 'npcs' | 'enemies',
  };
});

const isProjected = computed(() => {
  if (isLocation.value) return Boolean(entry.value && state.value.background?.id === entry.value.id);
  return Boolean(actor.value && state.value.actors.some((item) => item.id === actor.value?.id));
});

const canProject = computed(() => Boolean(entry.value?.data.image));

const actionLabel = computed(() => {
  if (isLocation.value) return isProjected.value ? 'Arrêter de partager le décor' : 'Projeter ce décor';
  return isProjected.value ? 'Arrêter de partager' : 'Projeter';
});

function toggleProjection() {
  if (!entry.value) return;
  if (isLocation.value) {
    state.value.background = isProjected.value ? null : { id: entry.value.id, name: entryName(entry.value), image: String(entry.value.data.image) };
    return;
  }
  if (!actor.value) return;
  if (isProjected.value) {
    state.value.actors = state.value.actors.filter((item) => item.id !== actor.value?.id);
    if (state.value.speakerActorId === actor.value.id) state.value.speakerActorId = null;
  } else {
    state.value.actors = [...state.value.actors, actor.value];
  }
  state.value.speakerActorId = state.value.actors.length === 1 ? state.value.actors[0]?.id ?? null : null;
}
</script>

<template>
  <aside
    v-if="entry"
    ref="cardElement"
    :class="$style.card"
    :style="{ top: `${position.top}px`, left: `${position.left}px` }"
    @mouseenter="handleCardEnter"
    @mouseleave="handleCardLeave"
  >
    <img v-if="previewImage" :src="previewImage" :alt="entryName(entry)" :class="$style.image">
    <div :class="$style.body">
      <strong>{{ entryName(entry) }}</strong>
      <small v-if="previewMeta">{{ previewMeta }}</small>
      <p v-if="entry.data.summary" :class="$style.summary">{{ entry.data.summary }}</p>
      <button v-if="canProject" type="button" :class="[$style.action, isProjected && $style.active]" @click="toggleProjection">{{ actionLabel }}</button>
    </div>
  </aside>
</template>

<style module>
.card { position: fixed; z-index: 60; width: 16.25rem; display: flex; gap: .6rem; background: var(--panel); border: 2px solid var(--accent); border-radius: 6px; padding: .65rem; box-shadow: 0 6px 18px rgba(0, 0, 0, .5); pointer-events: auto; }
.image { width: 3.75rem; height: 3.75rem; object-fit: cover; border-radius: 4px; flex-shrink: 0; }
.body { display: flex; flex-direction: column; gap: .2rem; min-width: 0; }
.body strong { color: var(--accent); }
.body small { color: var(--muted); }
.summary { margin: .2rem 0; font-size: .82rem; color: var(--text); overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; }
.action { margin-top: .3rem; align-self: flex-start; background: transparent; color: var(--accent); border: 1px solid var(--accent); border-radius: 4px; padding: .25rem .55rem; font: inherit; font-size: .78rem; cursor: pointer; }
.action:hover { background: var(--accent); color: #1c150f; }
.action.active { background: var(--accent); color: #1c150f; }
</style>
