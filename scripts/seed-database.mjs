import { createClient } from '@libsql/client';
import matter from 'gray-matter';
import { mkdir, readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = join(process.cwd(), 'src', 'content');
const localMode = process.argv.includes('--local');
const databaseUrl = process.env.TURSO_DATABASE_URL || (localMode ? 'file:./data/rpgmultitool.db' : '');
if (!databaseUrl) {
  throw new Error('TURSO_DATABASE_URL est absent. Configurez TURSO_DATABASE_URL et TURSO_AUTH_TOKEN pour Turso, ou utilisez pnpm db:seed -- --local.');
}
if (databaseUrl.startsWith('file:')) await mkdir(join(process.cwd(), 'data'), { recursive: true });
console.log(`Seeding ${databaseUrl.startsWith('file:') ? 'local SQLite' : 'Turso/libSQL'} database: ${databaseUrl}`);
const database = createClient({ url: databaseUrl, authToken: process.env.TURSO_AUTH_TOKEN });
await database.execute(`CREATE TABLE IF NOT EXISTS documents (key TEXT PRIMARY KEY NOT NULL, version INTEGER NOT NULL DEFAULT 1, payload TEXT NOT NULL, updated_at TEXT NOT NULL)`);

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(path));
    else if (entry.name.endsWith('.md')) files.push(path);
  }
  return files;
}

const collections = {};
for (const file of await markdownFiles(root)) {
  const relativePath = relative(root, file).replaceAll('\\', '/');
  const [collection] = relativePath.split('/');
  const source = await readFile(file, 'utf8');
  const parsed = matter(source);
  const id = relativePath.split('/').pop().replace(/\.md$/, '');
  collections[collection] ??= [];
  collections[collection].push({ id, data: parsed.data, body: parsed.content });
}

for (const [collection, entries] of Object.entries(collections)) {
  const key = `content:${collection}`;
  const payload = JSON.stringify(entries);
  await database.execute({
    sql: `INSERT INTO documents (key, version, payload, updated_at) VALUES (?, 1, ?, ?)
      ON CONFLICT(key) DO UPDATE SET version = documents.version + 1, payload = excluded.payload, updated_at = excluded.updated_at`,
    args: [key, payload, new Date().toISOString()],
  });
  console.log(`Seeded ${key} (${entries.length} entries)`);
}
