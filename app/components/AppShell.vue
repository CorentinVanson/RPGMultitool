<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from '#imports';
import { characterEntries, entryName, useContentCollection } from '../composables/useContent';
import { characterStatusId, useCharacterStatus } from '../composables/useCharacterStatus';

const route = useRoute();
const searchQuery = ref('');
const { data: locations } = useContentCollection('locations');
const { data: npcs } = useContentCollection('npcs');
const { isMarked } = useCharacterStatus();

function searchable(value: unknown): string {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function matchesSearch(values: unknown[], query: string): boolean {
  const needle = searchable(query).trim();
  if (!needle) return false;
  return values.some((value) => searchable(value).includes(needle));
}

const searchResults = computed(() => {
  const query = searchQuery.value;
  const characterResults = characterEntries(npcs.value ?? [])
    .filter((entry) => matchesSearch([entryName(entry), entry.data.role, entry.data.location, entry.data.summary], query))
    .map((entry) => ({
      id: `personnages:${entry.id}`,
      characterId: entry.id,
      label: entryName(entry),
      meta: entry.data.role ?? 'Personnage',
      image: entry.data.image,
      to: `/personnages/${entry.id}`,
      kind: 'Personnage',
    }));

  const locationResults = (locations.value ?? [])
    .filter((entry) => matchesSearch([entryName(entry), entry.data.type, entry.data.region, entry.data.summary], query))
    .map((entry) => ({
      id: `lieux:${entry.id}`,
      characterId: '',
      label: entryName(entry),
      meta: [entry.data.type, entry.data.region].filter(Boolean).join(' — ') || 'Décor',
      image: entry.data.image,
      to: `/lieux/${entry.id}`,
      kind: 'Décor',
    }));

  return [...characterResults, ...locationResults].slice(0, 8);
});

watch(() => route.fullPath, () => { searchQuery.value = ''; });
</script>

<template>
  <header :class="$style.header">
    <h1 :class="$style.brand">🗺️ RPGMultitool</h1>
    <nav :class="$style.nav" aria-label="Navigation principale">
      <NuxtLink to="/">Accueil</NuxtLink>
      <NuxtLink to="/monde">Le Monde</NuxtLink>
      <NuxtLink to="/lieux">Lieux</NuxtLink>
      <NuxtLink to="/personnages">Personnages</NuxtLink>
      <NuxtLink to="/ennemis">Ennemis</NuxtLink>
      <NuxtLink to="/campagne">Campagne</NuxtLink>
      <NuxtLink to="/campo-della-frontiera">Campo</NuxtLink>
      <NuxtLink to="/scene">Scène</NuxtLink>
      <NuxtLink to="/creation-personnage">Personnage</NuxtLink>
    </nav>
    <form :class="$style.search" role="search" @submit.prevent>
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Rechercher personnage ou décor"
        aria-label="Rechercher un personnage ou un décor"
        autocomplete="off"
        :class="$style.searchInput"
        @keydown.esc="searchQuery = ''"
      >
      <div v-if="searchQuery" :class="$style.searchResults" role="listbox">
        <NuxtLink
          v-for="result in searchResults"
          :key="result.id"
          :to="result.to"
          :class="$style.searchResult"
          role="option"
          @click="searchQuery = ''"
        >
          <img v-if="result.image" :src="result.image" :alt="result.label" :class="$style.searchThumb">
          <span :class="$style.searchCopy">
            <strong :class="result.kind === 'Personnage' && isMarked(characterStatusId('npcs', result.characterId)) && $style.marked">{{ result.label }}</strong>
            <small>{{ result.kind }}<template v-if="result.meta"> — {{ result.meta }}</template></small>
          </span>
        </NuxtLink>
        <p v-if="!searchResults.length" :class="$style.emptyResult">Aucun personnage ou décor trouvé.</p>
      </div>
    </form>
    <TeamSelector />
  </header>
  <main :class="$style.main"><LinkedNotes><slot /></LinkedNotes></main>
  <SessionNotesPanel />
  <ProjectionDock />
  <footer :class="$style.footer">Outil de maîtrise pour la campagne Historia — usage personnel, non affilié à l’éditeur.</footer>
</template>

<style module>
.header { background: var(--panel); border-bottom: 2px solid var(--accent); padding: 1rem 2rem; display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center; }
.brand { margin: 0; font-size: 1.4rem; }
.nav { display: flex; gap: 1rem; flex-wrap: wrap; }
.nav a { color: var(--muted); text-decoration: none; font-size: .95rem; }
.nav a:hover, .nav a.router-link-active { color: var(--accent); }
.search { position: relative; flex: 1 1 18rem; max-width: 26rem; margin-left: auto; }
.searchInput { width: 100%; background: #1c150f; color: var(--text); border: 1px solid #4a3a28; border-radius: 999px; padding: .55rem .9rem; font: inherit; font-size: .9rem; }
.searchInput:focus { outline: 2px solid var(--accent); outline-offset: 2px; }
.searchResults { position: absolute; left: 0; right: 0; top: calc(100% + .35rem); z-index: 60; display: flex; flex-direction: column; gap: .25rem; background: var(--panel); border: 1px solid #4a3a28; border-radius: 6px; padding: .35rem; box-shadow: 0 10px 24px rgba(0, 0, 0, .45); }
.searchResult { display: flex; align-items: center; gap: .55rem; color: var(--text); text-decoration: none; border-radius: 4px; padding: .35rem; }
.searchResult:hover { background: #1c150f; color: var(--accent); }
.searchThumb { width: 2rem; height: 2rem; object-fit: cover; border-radius: 3px; flex: 0 0 auto; }
.searchCopy { min-width: 0; display: flex; flex-direction: column; gap: .1rem; }
.searchCopy strong, .searchCopy small { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.searchCopy small, .emptyResult { color: var(--muted); font-size: .78rem; }
.emptyResult { margin: .35rem .45rem; }
.marked { text-decoration: line-through; text-decoration-thickness: .1em; opacity: .72; }
.main { max-width: 960px; margin: 0 auto; padding: 2rem; }
.footer { text-align: center; padding: 2rem; color: var(--muted); font-size: .85rem; }

@media (max-width: 48rem) {
  .search { order: 3; flex-basis: 100%; max-width: none; margin-left: 0; }
}
</style>