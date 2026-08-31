<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from '#imports';

const route = useRoute();
// La fenêtre de projection s'affiche plein écran, sans en-tête ni navigation.
const bare = computed(() => route.path === '/projection');
</script>

<template>
  <NuxtPage v-if="bare" />
  <AppShell v-else>
    <NuxtPage />
  </AppShell>
</template>

<style>
:root {
  --bg: #1c150f;
  --panel: #2b2018;
  --accent: #b3813a;
  --text: #f1e6d3;
  --muted: #c9b899;
}

* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--text); font-family: Georgia, "Times New Roman", serif; line-height: 1.6; }
a { color: #d9b46a; }
h1, h2, h3 { color: var(--accent); }
</style>