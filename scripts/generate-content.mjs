import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import matter from 'gray-matter';

const root = join(process.cwd(), 'src', 'content');
const output = join(process.cwd(), 'server', 'generated', 'content.ts');

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
  content[key] = { data: parsed.data, body: parsed.content };
}

await mkdir(join(process.cwd(), 'server', 'generated'), { recursive: true });
await writeFile(output, `export const contentFiles = ${JSON.stringify(content)} as const;\n`);