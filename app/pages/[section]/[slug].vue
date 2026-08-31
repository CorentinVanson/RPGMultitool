<script setup lang="ts">
import { computed } from 'vue';
import { createError } from 'h3';
import { useRoute } from '#imports';
import { sectionCollections, useContentCollection } from '../../composables/useContent';

const route = useRoute();
const section = route.params.section as string;
const collection = sectionCollections[section];
if (!collection) throw createError({ statusCode: 404, statusMessage: 'Page introuvable' });
const { data: entries } = await useContentCollection(collection);
const entry = computed(() => (entries.value ?? []).find((item) => item.id === route.params.slug) ?? null);
if (!entry.value) throw createError({ statusCode: 404, statusMessage: 'Page introuvable' });
</script>

<template>
  <ContentDetail v-if="entry" :entry="entry" :section="section" />
</template>