import { createError, defineEventHandler, readBody } from 'h3';
import { writeDocument } from '../utils/database';

interface SyncDocument {
  key: string;
  payload: string;
  baseVersion?: number;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<SyncDocument>(event);
  if (!body?.key || body.key.length > 200 || typeof body.payload !== 'string' || body.payload.length > 5_000_000) {
    throw createError({ statusCode: 400, statusMessage: 'Document de synchronisation invalide' });
  }

  return writeDocument(body.key, body.payload);
});

