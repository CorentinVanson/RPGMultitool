import { computed, type Ref } from 'vue';
import { useFetch, useNuxtApp } from '#imports';
import type { ContentDetail } from '../types/content';
import { campoCandidateToContentEntry, CAMPO_NPC_CANDIDATES } from './useCampoFrontiera';

export type ContentCollection = 'arcs' | 'locations' | 'npcs' | 'enemies';

/** Sections d'URL vers les collections de contenu. */
export const sectionCollections: Record<string, ContentCollection> = {
  campagne: 'arcs',
  lieux: 'locations',
  personnages: 'npcs',
  ennemis: 'enemies',
};

export const contentCollections: ContentCollection[] = ['arcs', 'locations', 'npcs', 'enemies'];

export const CHARACTER_TAGS = ['Personnage principal', 'Employé du camp', 'Personnage secondaire'] as const;
const mainCharacterIds = new Set(['serafina-dal-moro', 'renzo', 'ilaria-conti', 'aldo-vestraro', 'baldassare', 'iolanda', 'orsina-vetraia', 'matteo-riva', 'anziano-pietro']);
const campCharacterIds = new Set(['ada-lavandaia', 'cassio-corbe', 'livia-pierreferme', 'mara-rossa', 'nardo-digue', 'orazio-brun']);

export function characterTag(id: string, tags?: unknown): typeof CHARACTER_TAGS[number] {
  if (Array.isArray(tags) && tags.some((tag) => CHARACTER_TAGS.includes(tag as typeof CHARACTER_TAGS[number]))) {
    return tags.find((tag) => CHARACTER_TAGS.includes(tag as typeof CHARACTER_TAGS[number])) as typeof CHARACTER_TAGS[number];
  }
  if (id.startsWith('campo-') || campCharacterIds.has(id)) return 'Employé du camp';
  if (mainCharacterIds.has(id)) return 'Personnage principal';
  return 'Personnage secondaire';
}

export function characterEntries(entries: ContentDetail[]): ContentDetail[] {
  const classified = entries.map((entry) => ({ ...entry, data: { ...entry.data, tags: [characterTag(entry.id, entry.data.tags)] } }));
  return [...classified, ...CAMPO_NPC_CANDIDATES.map(campoCandidateToContentEntry)];
}

/**
 * Charge une collection complète (corps HTML inclus) et réutilise le cache Nuxt :
 * une collection déjà chargée n'est jamais redemandée, donc la navigation reste possible hors ligne.
 */
export function useContentCollection(name: ContentCollection) {
  return useFetch<ContentDetail[]>(`/api/content/${name}`, {
    key: `content-${name}`,
    getCachedData: (key) => {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] ?? nuxtApp.static.data[key];
    },
  });
}

export function useContentEntry(name: ContentCollection, id: Ref<string> | string) {
  const { data } = useContentCollection(name);
  const slug = computed(() => (typeof id === 'string' ? id : id.value));

  return computed(() => (data.value ?? []).find((entry) => entry.id === slug.value) ?? null);
}

export function entryName(entry: { id: string; data: Record<string, any> }): string {
  return String(entry.data.name ?? entry.data.title ?? entry.id);
}
