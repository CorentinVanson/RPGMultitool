<script setup lang="ts">
import { computed } from 'vue';
import { useContentCollection } from '../composables/useContent';
import { characterStatusId, useCharacterStatus } from '../composables/useCharacterStatus';
import { PROJECTION_MAPS, useProjectionController } from '../composables/useProjection';
import type { ContentEntry } from '../types/content';
import type { ContentDetail as ContentDetailEntry } from '../types/content';

const statKeys = ['for', 'dex', 'con', 'int', 'sag', 'cha'];
const props = defineProps<{ entry: ContentDetailEntry; section: string }>();
const { data: quests } = useContentCollection('quests');
const { data: npcs } = useContentCollection('npcs');
const { data: enemies } = useContentCollection('enemies');
const { isMarked, toggleMarked } = useCharacterStatus();
const { state: projectionState } = useProjectionController();
const isCharacter = computed(() => props.section === 'personnages' || props.section === 'ennemis');
const statusId = computed(() => characterStatusId(props.section === 'ennemis' ? 'enemies' : 'npcs', props.entry.id));
const isMarkedCharacter = computed(() => isCharacter.value && isMarked(statusId.value));
const relatedQuests = computed(() => props.section === 'personnages'
  ? (quests.value ?? []).filter((quest) => quest.data.characters?.includes(props.entry.id))
  : []);
const hasVallombraPlan = computed(() => props.section === 'lieux' && props.entry.id === 'vallombra');

function projectVallombraPlan() {
  projectionState.value.background = { ...PROJECTION_MAPS.vallombra };
}
type CharacterLink = { name: string; slug: string; path: string; statusId: string };

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function characterLinks(entries: ContentEntry[] | null | undefined, collection: 'npcs' | 'enemies'): CharacterLink[] {
  return (entries ?? []).flatMap((entry) => {
    const name = String(entry.data.name ?? '').trim();
    if (!name) return [];
    const firstName = name.split(/\s+/)[0]?.replace(/["«]/g, '') ?? '';
    const names = Array.from(new Set([name, firstName])).filter((item) => item.length >= 3);
    return names.map((item) => ({
      name: item,
      slug: entry.id,
      path: collection === 'enemies' ? '/ennemis/' : '/personnages/',
      statusId: characterStatusId(collection, entry.id),
    }));
  });
}

const allCharacterLinks = computed(() => characterLinks(npcs.value, 'npcs').concat(characterLinks(enemies.value, 'enemies'))
  .sort((a, b) => b.name.length - a.name.length));

function linkCharacterText(text: string): string {
  return allCharacterLinks.value.reduce((result, character) => {
    const linkClass = isMarked(character.statusId) ? ' class="character-marked"' : '';
    const link = `<a href="${character.path}${character.slug}"${linkClass}>${character.name}</a>`;
    return result.replace(new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(character.name)}(?![\\p{L}\\p{N}])`, 'gu'), link);
  }, text);
}

const renderedBody = computed(() => {
  const linkedBody = props.entry.bodyHtml.replace(
    /<a\s+href="\/(personnages|ennemis)\/([^"/]+)"([^>]*)>/g,
    (_match, section: string, id: string, attributes: string) => {
      const statusId = characterStatusId(section === 'ennemis' ? 'enemies' : 'npcs', id);
      const markedClass = isMarked(statusId) ? ' character-marked' : '';
      const existingClass = attributes.match(/\sclass="([^"]*)"/i)?.[1] ?? '';
      const cleanedAttributes = attributes.replace(/\sclass="[^"]*"/i, '');
      const classAttribute = existingClass || markedClass ? ` class="${existingClass}${markedClass}"` : '';
      return `<a href="/${section}/${id}"${classAttribute}${cleanedAttributes}>`;
    },
  );
  let insideLink = false;
  return linkedBody.split(/(<[^>]+>)/g).map((part) => {
    if (part.startsWith('<')) {
      if (/^<a\b/i.test(part)) insideLink = true;
      if (/^<\/a>/i.test(part)) insideLink = false;
      return part;
    }
    return insideLink ? part : linkCharacterText(part);
  }).join('');
});
</script>

<template>
  <article>
    <p><NuxtLink :to="`/${section}`">&larr; Retour</NuxtLink></p>
    <img v-if="entry.data.image" :src="entry.data.image" :alt="entry.data.title ?? entry.data.name" :class="$style.image">
    <h1 :class="isMarkedCharacter && $style.marked">{{ entry.data.title ?? entry.data.name }}</h1>
    <label v-if="isCharacter" :class="$style.statusToggle">
      <input type="checkbox" :checked="isMarkedCharacter" @change="toggleMarked(statusId)">
      <span>Mort / disparu</span>
    </label>
    <p><em>{{ entry.data.type ?? entry.data.role ?? entry.data.sessions }}</em></p>
    <div v-if="entry.data.tags?.length" :class="$style.tags"><span v-for="tag in entry.data.tags" :key="tag" :class="$style.tag">{{ tag }}</span></div>
    <aside v-if="relatedQuests.length" :class="$style.related">
      <strong>Quêtes liées</strong>
      <ul>
        <li v-for="quest in relatedQuests" :key="quest.id"><NuxtLink :to="`/quetes/${quest.id}`">{{ quest.data.title }}</NuxtLink></li>
      </ul>
    </aside>
    <p v-if="entry.data.familia"><strong>Familia</strong> : {{ entry.data.familia }}</p>
    <table v-if="entry.data.cr">
      <tbody><tr><td><strong>Danger (CR)</strong></td><td>{{ entry.data.cr }}</td></tr><tr><td><strong>CA</strong></td><td>{{ entry.data.ac }}</td></tr><tr><td><strong>PV</strong></td><td>{{ entry.data.hp }}</td></tr><tr><td><strong>Vitesse</strong></td><td>{{ entry.data.speed }}</td></tr></tbody>
    </table>
    <table v-if="entry.data.stats">
      <thead><tr><th v-for="key in statKeys" :key="key">{{ key.toUpperCase() }}</th></tr></thead>
      <tbody><tr><td v-for="key in statKeys" :key="key">{{ entry.data.stats[key] }}</td></tr></tbody>
    </table>
    <div v-if="hasVallombraPlan" :class="$style.mapProjection">
      <strong>Plan de Vallombra</strong>
      <button type="button" @click="projectVallombraPlan">Projeter ce plan</button>
    </div>
    <div :class="$style.markdown" v-html="renderedBody" />
  </article>
</template>

<style module>
.image { display: block; width: min(100%, 640px); height: auto; border-radius: 6px; }
.tags { display: flex; flex-wrap: wrap; gap: .35rem; margin: .75rem 0; } .tag { background: #3a2c1d; color: var(--accent); border-radius: 3px; padding: .15rem .5rem; font-size: .78rem; }
.markdown :global(p:first-child) { margin-top: 0; }
.markdown :global(img) { display: block; width: 100%; height: auto; margin: 1.25rem 0; border-radius: 6px; }
table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
td, th { border: 1px solid #4a3a28; padding: .4rem .6rem; text-align: left; }
.related { margin: 1rem 0; padding: .75rem 1rem; border-left: 3px solid var(--accent); background: var(--panel); }
.related ul { margin: .4rem 0 0; padding-left: 1.25rem; }
.marked { text-decoration: line-through; text-decoration-thickness: .12em; opacity: .72; }
.statusToggle { display: inline-flex; align-items: center; gap: .45rem; margin: .25rem 0 1rem; color: var(--muted); cursor: pointer; }
.statusToggle input { accent-color: var(--accent); }
.mapProjection { display: flex; align-items: center; justify-content: space-between; gap: .75rem; margin: 1rem 0; padding: .75rem 1rem; border: 1px solid #4a3a28; border-left: 3px solid var(--accent); border-radius: 4px; background: var(--panel); }
.mapProjection button { background: var(--accent); color: #1c150f; border: 1px solid var(--accent); border-radius: 4px; padding: .45rem .7rem; font: inherit; font-size: .85rem; font-weight: bold; cursor: pointer; }
.markdown :global(.character-marked) { text-decoration: line-through; text-decoration-thickness: .1em; opacity: .72; }
</style>