import { createError, defineEventHandler, getQuery } from 'h3';
import { ensureDatabase, getDatabase } from '../../utils/database';

export default defineEventHandler(async (event) => {
  await ensureDatabase();
  const query = getQuery(event);
  const keys = String(query.keys ?? '')
    .split(',')
    .map((key) => key.trim())
    .filter(Boolean);
  if (!keys.length || keys.length > 100) {
    throw createError({ statusCode: 400, statusMessage: 'keys doit contenir entre 1 et 100 clés' });
  }

  const result = await getDatabase().execute({
    sql: `SELECT key, version, payload, updated_at FROM documents WHERE key IN (${keys.map(() => '?').join(',')})`,
    args: keys,
  });

  return result.rows.map((row) => ({
    key: String(row.key),
    version: Number(row.version),
    payload: String(row.payload),
    updatedAt: String(row.updated_at),
  }));
});
