<script setup lang="ts">
import { computed } from 'vue';
import type { ContentEntry } from '../types/content';

const props = defineProps<{ entry: ContentEntry; section: string }>();
const name = computed(() => props.entry.data.title ?? props.entry.data.name);
const meta = computed(() => props.entry.data.region
  ? `${props.entry.data.type} — ${props.entry.data.region}`
  : props.entry.data.type ?? props.entry.data.role ?? props.entry.data.sessions);
</script>

<template>
  <article :class="$style.card">
    <img v-if="entry.data.image" :src="entry.data.image" :alt="name" :class="$style.image">
    <h3><NuxtLink :to="`/${section}/${entry.id}`">{{ name }}</NuxtLink></h3>
    <p><em>{{ meta }}</em></p>
    <p v-if="entry.data.cr">DD (CR) {{ entry.data.cr }} — CA {{ entry.data.ac }} — PV {{ entry.data.hp }}</p>
    <p>{{ entry.data.summary }}</p>
    <div v-if="entry.data.tags?.length || entry.data.faction">
      <span v-for="tag in (entry.data.tags ?? [entry.data.faction])" :key="tag" :class="$style.tag">{{ tag }}</span>
    </div>
  </article>
</template>

<style module>
.card { background: var(--panel); border: 1px solid #4a3a28; border-radius: 6px; padding: 1rem 1.25rem; margin-bottom: 1rem; }
.image { width: 100%; border-radius: 4px; display: block; margin-bottom: .75rem; }
.tag { display: inline-block; background: #3a2c1d; color: var(--muted); border-radius: 3px; padding: .1rem .5rem; font-size: .75rem; margin-right: .3rem; }
</style>