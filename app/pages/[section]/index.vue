<script setup lang="ts">
import { createError } from 'h3';
import { useRoute } from '#imports';
import { sectionCollections, useContentCollection } from '../../composables/useContent';

const route = useRoute();
const section = route.params.section as string;
const headings: Record<string, string> = { campagne: 'La campagne : Les Marches de Gratigna', lieux: 'Lieux importants', personnages: 'Personnages non-joueurs', ennemis: 'Bestiaire' };
const collection = sectionCollections[section];
if (!collection) throw createError({ statusCode: 404, statusMessage: 'Page introuvable' });
const { data: entries } = await useContentCollection(collection);
</script>

<template>
  <section>
    <h1>{{ headings[section] }}</h1>
    <ContentGrid :entries="entries ?? []" :section="section" />
  </section>
</template>