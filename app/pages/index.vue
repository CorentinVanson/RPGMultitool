<script setup lang="ts">
import { useContentCollection } from '../composables/useContent';

const { data: entries } = await useContentCollection('arcs');
</script>

<template>
  <section>
    <video
      class="intro-video"
      src="/video/trailer.mp4"
      autoplay
      muted
      playsinline
      preload="metadata"
      aria-label="Bande-annonce de la campagne Les Marches de Gratigna"
    ></video>
    <h1>Les Marches de Gratigna</h1>
    <p>Une campagne <strong>Historia</strong> d'environ 20 sessions, entre combat, enquête, énigmes, politique et gestion de quartier.</p>
    <h2>Arcs de la campagne</h2>
    <ContentGrid :entries="entries ?? []" section="campagne" />
    <h2>Raccourcis</h2>
    <ul><li><NuxtLink to="/monde">La carte et le contexte du monde</NuxtLink></li><li><NuxtLink to="/lieux">Les lieux importants</NuxtLink></li><li><NuxtLink to="/personnages">Les personnages non-joueurs</NuxtLink></li><li><NuxtLink to="/ennemis">Le bestiaire</NuxtLink></li></ul>
  </section>
</template>

<style scoped>
.intro-video {
  display: block;
  width: 100%;
  max-height: 32rem;
  margin-bottom: 2rem;
  background: #000;
  object-fit: contain;
}
</style>