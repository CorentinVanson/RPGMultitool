<script setup lang="ts">
import { createError } from 'h3';
import { useFetch, useRoute } from '#imports';
import type { ContentEntry } from '../../types/content';

const route = useRoute();
const section = route.params.section as string;
const collectionMap: Record<string, string> = { campagne: 'arcs', lieux: 'locations', personnages: 'npcs', ennemis: 'enemies' };
const headings: Record<string, string> = { campagne: 'La campagne : Les Marches de Gratigna', lieux: 'Lieux importants', personnages: 'Personnages non-joueurs', ennemis: 'Bestiaire' };
const { data: entries } = await useFetch<ContentEntry[]>(`/api/content/${collectionMap[section]}`);
if (!collectionMap[section]) throw createError({ statusCode: 404, statusMessage: 'Page introuvable' });
</script>

<template>
  <section>
    <h1>{{ headings[section] }}</h1>
    <ContentGrid :entries="entries ?? []" :section="section" />
  </section>
</template>