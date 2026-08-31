import { computed, type Ref } from 'vue';
import { useFetch, useNuxtApp } from '#imports';
import type { ContentDetail } from '../types/content';

export type ContentCollection = 'arcs' | 'locations' | 'npcs' | 'enemies';

/** Sections d'URL vers les collections de contenu. */
export const sectionCollections: Record<string, ContentCollection> = {
  campagne: 'arcs',
  lieux: 'locations',
  personnages: 'npcs',
  ennemis: 'enemies',
};

export const contentCollections: ContentCollection[] = ['arcs', 'locations', 'npcs', 'enemies'];

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
