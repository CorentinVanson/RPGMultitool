<script setup lang="ts">
import { createError } from 'h3';
import { useRoute } from '#imports';
import { characterEntries, CHARACTER_TAGS, sectionCollections, useContentCollection } from '../../composables/useContent';
import type { ContentDetail } from '../../types/content';

const route = useRoute();
const section = route.params.section as string;
const headings: Record<string, string> = { campagne: 'La campagne : Les Marches de Gratigna', lieux: 'Lieux importants', personnages: 'Personnages non-joueurs', ennemis: 'Bestiaire', quetes: 'Quêtes secondaires' };
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
    <p v-if="section === 'campagne'"><NuxtLink to="/quetes">Voir les quêtes secondaires</NuxtLink></p>
    <div v-if="section === 'personnages'" :class="$style.filters" aria-label="Filtrer les personnages">
      <span :class="$style.filterLabel">Afficher</span>
      <button type="button" :class="[$style.filter, activeTag === 'Tous' && $style.active]" @click="activeTag = 'Tous'">Tous <small>{{ characterList.length }}</small></button>
      <button v-for="tag in CHARACTER_TAGS" :key="tag" type="button" :class="[$style.filter, activeTag === tag && $style.active]" @click="activeTag = tag">{{ tag }} <small>{{ characterList.filter((entry) => entry.data.tags?.includes(tag)).length }}</small></button>
    </div>
    <p v-if="section === 'personnages'" :class="$style.result">{{ filteredEntries.length }} personnage{{ filteredEntries.length > 1 ? 's' : '' }}</p>
    <ol v-if="section === 'quetes'" :class="$style.questList">
      <li v-for="entry in filteredEntries" :key="entry.id">
        <NuxtLink :to="`/${section}/${entry.id}`">{{ entry.data.title ?? entry.id }}</NuxtLink>
        <p v-if="entry.data.summary" :class="$style.questSummary">{{ entry.data.summary }}</p>
        <small v-if="entry.data.timing" :class="$style.questTiming">Moment conseillé : {{ entry.data.timing }}</small>
      </li>
    </ol>
    <ContentGrid v-else :entries="filteredEntries" :section="section" />
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
.questList { max-width: 42rem; margin: 1.5rem 0; padding: 0; list-style: none; counter-reset: quests; }
.questList li { counter-increment: quests; border-bottom: 1px solid #4a3a28; }
.questList li::before { display: inline-block; width: 2.5rem; color: var(--muted); content: counter(quests, decimal-leading-zero); }
.questList a { display: inline-block; padding: .8rem 0; font-size: 1.05rem; }
.questSummary { margin: -.45rem 0 .25rem 2.5rem; color: var(--muted); font-size: .9rem; line-height: 1.4; }
.questTiming { display: block; margin: 0 0 .8rem 2.5rem; color: var(--accent); font-size: .8rem; }
</style>