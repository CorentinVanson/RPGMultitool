import { createError, defineEventHandler, readBody } from 'h3';
import { ensureDatabase, getDatabase } from '../utils/database';

interface SyncDocument {
  key: string;
  payload: string;
  baseVersion?: number;
}

export default defineEventHandler(async (event) => {
  await ensureDatabase();
  const body = await readBody<SyncDocument>(event);
  if (!body?.key || body.key.length > 200 || typeof body.payload !== 'string' || body.payload.length > 5_000_000) {
    throw createError({ statusCode: 400, statusMessage: 'Document de synchronisation invalide' });
  }

  const database = getDatabase();
  const existing = await database.execute({ sql: 'SELECT version FROM documents WHERE key = ?', args: [body.key] });
  const currentVersion = existing.rows[0] ? Number(existing.rows[0].version) : 0;
  const nextVersion = currentVersion + 1;
  const updatedAt = new Date().toISOString();

  await database.execute({
    sql: `INSERT INTO documents (key, version, payload, updated_at) VALUES (?, ?, ?, ?)
      ON CONFLICT(key) DO UPDATE SET version = excluded.version, payload = excluded.payload, updated_at = excluded.updated_at`,
    args: [body.key, nextVersion, body.payload, updatedAt],
  });

  return { key: body.key, version: nextVersion, payload: body.payload, updatedAt };
});
