<script setup lang="ts">
import type { ContentEntry } from '../types/content';

defineProps<{ entries: ContentEntry[]; section: string }>();
</script>

<template>
  <div :class="$style.grid">
    <ContentCard v-for="entry in entries" :key="entry.id" :entry="entry" :section="section" />
  </div>
</template>

<style module>
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
</style>