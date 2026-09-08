<script setup lang="ts">
import { createError } from 'h3';
import { useRoute } from '#imports';
import { characterEntries, CHARACTER_TAGS, sectionCollections, useContentCollection } from '../../composables/useContent';
import type { ContentDetail } from '../../types/content';

const route = useRoute();
const section = route.params.section as string;
const headings: Record<string, string> = { campagne: 'La campagne : Les Marches de Gratigna', lieux: 'Lieux importants', personnages: 'Personnages non-joueurs', ennemis: 'Bestiaire' };
const collection = sectionCollections[section];
if (!collection) throw createError({ statusCode: 404, statusMessage: 'Page introuvable' });
const { data: entries } = await useContentCollection(collection);
const activeTag = ref('Tous');
const characterList = computed<ContentDetail[]>(() => section === 'personnages' ? characterEntries(entries.value ?? []) : entries.value ?? []);
const filteredEntries = computed(() => activeTag.value === 'Tous' ? characterList.value : characterList.value.filter((entry) => entry.data.tags?.includes(activeTag.value)));
</script>

<template>
  <section>
    <h1>{{ headings[section] }}</h1>
    <div v-if="section === 'personnages'" :class="$style.filters" aria-label="Filtrer les personnages">
      <span :class="$style.filterLabel">Afficher</span>
      <button type="button" :class="[$style.filter, activeTag === 'Tous' && $style.active]" @click="activeTag = 'Tous'">Tous <small>{{ characterList.length }}</small></button>
      <button v-for="tag in CHARACTER_TAGS" :key="tag" type="button" :class="[$style.filter, activeTag === tag && $style.active]" @click="activeTag = tag">{{ tag }} <small>{{ characterList.filter((entry) => entry.data.tags?.includes(tag)).length }}</small></button>
    </div>
    <p v-if="section === 'personnages'" :class="$style.result">{{ filteredEntries.length }} personnage{{ filteredEntries.length > 1 ? 's' : '' }}</p>
    <ContentGrid :entries="filteredEntries" :section="section" />
  </section>
</template>

<style module>
.filters { display: flex; flex-wrap: wrap; align-items: center; gap: .5rem; margin: 1.25rem 0 .5rem; }
.filterLabel, .result { color: var(--muted); }
.filterLabel { margin-right: .25rem; font-size: .85rem; }
.filter { background: var(--panel); color: var(--muted); border: 1px solid #4a3a28; border-radius: 999px; padding: .4rem .65rem; font: inherit; cursor: pointer; }
.filter small { color: var(--accent); }
.filter.active { color: #1c150f; background: var(--accent); border-color: var(--accent); }
.filter.active small { color: #1c150f; }
.result { margin: .5rem 0 1rem; font-size: .85rem; }
</style>