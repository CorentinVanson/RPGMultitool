import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import matter from 'gray-matter';

const root = join(process.cwd(), 'src', 'content');
const output = join(process.cwd(), 'server', 'generated', 'content.ts');

function normalizeText(value) {
  if (typeof value !== 'string') return value;

  const decoded = value
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/\\u00e(?=[a-z])/gi, 'e')
    .replace(/\\u00f(?=[a-z])/gi, 'u')
    .replace(/\\u[0-9a-fA-F]{2,3}/g, '')
    .replace(/�/g, '');
  if (!/[ÃÂâ]/.test(decoded)) return decoded;

  return Buffer.from(decoded, 'latin1').toString('utf8').replace(/�/g, '');
}

function normalize(value) {
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalize(item)]));
  }
  return normalizeText(value);
}

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

const files = await markdownFiles(root);
const content = {};

for (const file of files) {
  const source = await readFile(file, 'utf8');
  const parsed = matter(source);
  const key = `/src/content/${relative(root, file).replaceAll('\\', '/')}`;
  content[key] = { data: normalize(parsed.data), body: normalizeText(parsed.content) };
}

await mkdir(join(process.cwd(), 'server', 'generated'), { recursive: true });
await writeFile(output, `export const contentFiles = ${JSON.stringify(content)} as const;\n`);