<script setup lang="ts">
import type { ContentDetail as ContentDetailEntry } from '../types/content';

const statKeys = ['for', 'dex', 'con', 'int', 'sag', 'cha'];
defineProps<{ entry: ContentDetailEntry; section: string }>();
</script>

<template>
  <article>
    <p><NuxtLink :to="`/${section}`">&larr; Retour</NuxtLink></p>
    <img v-if="entry.data.image" :src="entry.data.image" :alt="entry.data.title ?? entry.data.name" :class="$style.image">
    <h1>{{ entry.data.title ?? entry.data.name }}</h1>
    <p><em>{{ entry.data.type ?? entry.data.role ?? entry.data.sessions }}</em></p>
    <table v-if="entry.data.cr">
      <tbody><tr><td><strong>Danger (CR)</strong></td><td>{{ entry.data.cr }}</td></tr><tr><td><strong>CA</strong></td><td>{{ entry.data.ac }}</td></tr><tr><td><strong>PV</strong></td><td>{{ entry.data.hp }}</td></tr><tr><td><strong>Vitesse</strong></td><td>{{ entry.data.speed }}</td></tr></tbody>
    </table>
    <table v-if="entry.data.stats">
      <thead><tr><th v-for="key in statKeys" :key="key">{{ key.toUpperCase() }}</th></tr></thead>
      <tbody><tr><td v-for="key in statKeys" :key="key">{{ entry.data.stats[key] }}</td></tr></tbody>
    </table>
    <div :class="$style.markdown" v-html="entry.bodyHtml" />
  </article>
</template>

<style module>
.image { width: 200px; border-radius: 6px; }
.markdown :global(p:first-child) { margin-top: 0; }
table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
td, th { border: 1px solid #4a3a28; padding: .4rem .6rem; text-align: left; }
</style>