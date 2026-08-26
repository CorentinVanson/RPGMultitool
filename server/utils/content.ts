import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';

export type ContentEntry = {
  id: string;
  data: Record<string, any>;
  body: string;
};

const contentRoot = join(process.cwd(), 'src', 'content');

export async function getCollection(name: string): Promise<ContentEntry[]> {
  const directory = join(contentRoot, name);
  const files = (await readdir(directory)).filter((file) => file.endsWith('.md'));

  return Promise.all(files.map(async (file) => {
    const source = await readFile(join(directory, file), 'utf8');
    const parsed = matter(source);

    return {
      id: file.replace(/\.md$/, ''),
      data: parsed.data,
      body: parsed.content,
    };
  }));
}

export async function getEntry(name: string, id: string): Promise<ContentEntry | null> {
  const entries = await getCollection(name);
  return entries.find((entry) => entry.id === id) ?? null;
}

export function sortByOrder(entries: ContentEntry[]): ContentEntry[] {
  return entries.sort((a, b) => Number(a.data.order ?? 0) - Number(b.data.order ?? 0));
}