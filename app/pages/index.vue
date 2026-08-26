<script setup lang="ts">
import { useFetch } from '#imports';
import type { ContentEntry } from '../types/content';

const { data: entries } = await useFetch<ContentEntry[]>('/api/content/arcs');
</script>

<template>
  <section>
    <h1>Les Marches de Gratigna</h1>
    <p>Une campagne <strong>Historia</strong> d'environ 20 sessions, entre combat, enquête, énigmes, politique et gestion de quartier.</p>
    <h2>Arcs de la campagne</h2>
    <ContentGrid :entries="entries ?? []" section="campagne" />
    <h2>Raccourcis</h2>
    <ul><li><NuxtLink to="/monde">La carte et le contexte du monde</NuxtLink></li><li><NuxtLink to="/lieux">Les lieux importants</NuxtLink></li><li><NuxtLink to="/personnages">Les personnages non-joueurs</NuxtLink></li><li><NuxtLink to="/ennemis">Le bestiaire</NuxtLink></li></ul>
  </section>
</template>