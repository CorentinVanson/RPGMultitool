import { createError, defineEventHandler, getRouterParam } from 'h3';
import { deleteDocument } from '../../../utils/database';

// Outil de debug : supprime un document par sa clé.
export default defineEventHandler(async (event) => {
  const key = getRouterParam(event, 'key');
  if (!key) {
    throw createError({ statusCode: 400, statusMessage: 'Clé manquante' });
  }

  await deleteDocument(key);
  return { key, deleted: true };
});
