import { getRouterParam, createError, defineEventHandler } from 'h3';
import { marked } from 'marked';
import { getCollection, sortByOrder } from '../../utils/content';
import { readDocument } from '../../utils/database';

const collections = ['arcs', 'locations', 'npcs', 'enemies', 'quests'] as const;

// Une seule URL par collection, corps HTML inclus : le service worker conserve chaque collection pour le mode hors ligne.
export default defineEventHandler(async (event) => {
  const collection = getRouterParam(event, 'collection');
  if (!collection || !collections.includes(collection as typeof collections[number])) {
    throw createError({ statusCode: 404, statusMessage: 'Collection introuvable' });
  }

  const localEntries = await getCollection(collection);
  const stored = process.env.NODE_ENV === 'production' ? await readDocument(`content:${collection}`) : null;
  const entries = sortByOrder(stored ? JSON.parse(stored.payload) : localEntries);

  return Promise.all(entries.map(async (entry) => ({ ...entry, bodyHtml: await marked.parse(entry.body) })));
});