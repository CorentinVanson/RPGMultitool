import { createClient, type Client } from '@libsql/client';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

let client: Client | null = null;
let initialized = false;

function databaseUrl() {
  return process.env.TURSO_DATABASE_URL || 'file:./data/rpgmultitool.db';
}

export function getDatabase(): Client {
  if (!client) {
    if (!process.env.TURSO_DATABASE_URL || process.env.TURSO_DATABASE_URL.startsWith('file:')) {
      mkdirSync(join(process.cwd(), 'data'), { recursive: true });
    }
    client = createClient({
      url: databaseUrl(),
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return client;
}

export async function ensureDatabase() {
  if (initialized) return;
  await getDatabase().execute(`
    CREATE TABLE IF NOT EXISTS documents (
      key TEXT PRIMARY KEY NOT NULL,
      version INTEGER NOT NULL DEFAULT 1,
      payload TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);
  initialized = true;
}

export async function readDocument(key: string) {
  await ensureDatabase();
  const result = await getDatabase().execute({ sql: 'SELECT version, payload, updated_at FROM documents WHERE key = ?', args: [key] });
  const row = result.rows[0];
  return row ? { version: Number(row.version), payload: String(row.payload), updatedAt: String(row.updated_at) } : null;
}
