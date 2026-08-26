<script setup lang="ts">
import { createError } from 'h3';
import { useFetch, useRoute } from '#imports';
import type { ContentDetail } from '../../types/content';

const route = useRoute();
const section = route.params.section as string;
const collectionMap: Record<string, string> = { campagne: 'arcs', lieux: 'locations', personnages: 'npcs', ennemis: 'enemies' };
const { data: entry } = await useFetch<ContentDetail>(`/api/content/${collectionMap[section]}`, { query: { id: route.params.slug } });
if (!collectionMap[section] || !entry.value) throw createError({ statusCode: 404, statusMessage: 'Page introuvable' });
</script>

<template>
  <ContentDetail v-if="entry" :entry="entry" :section="section" />
</template>