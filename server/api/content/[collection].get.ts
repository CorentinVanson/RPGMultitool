import { getRouterParam, createError, defineEventHandler } from 'h3';
import { marked } from 'marked';
import { getCollection, sortByOrder } from '../../utils/content';

const collections = ['arcs', 'locations', 'npcs', 'enemies', 'quests'] as const;

// Une seule URL par collection, corps HTML inclus : le service worker conserve chaque collection pour le mode hors ligne.
export default defineEventHandler(async (event) => {
  const collection = getRouterParam(event, 'collection');
  if (!collection || !collections.includes(collection as typeof collections[number])) {
    throw createError({ statusCode: 404, statusMessage: 'Collection introuvable' });
  }

  const entries = sortByOrder(await getCollection(collection));

  return Promise.all(entries.map(async (entry) => ({ ...entry, bodyHtml: await marked.parse(entry.body) })));
});