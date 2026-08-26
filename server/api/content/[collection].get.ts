import { getQuery, getRouterParam, createError, defineEventHandler } from 'h3';
import { marked } from 'marked';
import { getCollection, getEntry, sortByOrder } from '../../utils/content';

const collections = ['arcs', 'locations', 'npcs', 'enemies'] as const;

export default defineEventHandler(async (event) => {
  const collection = getRouterParam(event, 'collection');
  if (!collection || !collections.includes(collection as typeof collections[number])) {
    throw createError({ statusCode: 404, statusMessage: 'Collection introuvable' });
  }

  const query = getQuery(event);
  const id = typeof query.id === 'string' ? query.id : undefined;
  const entry = id ? await getEntry(collection, id) : null;

  if (id) {
    if (!entry) throw createError({ statusCode: 404, statusMessage: 'Entrée introuvable' });
    return { ...entry, bodyHtml: await marked.parse(entry.body) };
  }

  return sortByOrder(await getCollection(collection));
});