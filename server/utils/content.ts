import { contentFiles } from '../generated/content';

export type ContentEntry = {
  id: string;
  data: Record<string, any>;
  body: string;
};

export async function getCollection(name: string): Promise<ContentEntry[]> {
  const collectionPath = `/src/content/${name}/`;

  return Object.entries(contentFiles)
    .filter(([filePath]) => filePath.replaceAll('\\', '/').includes(collectionPath))
    .map(([filePath, entry]) => {
      const fileName = filePath.replaceAll('\\', '/').split('/').pop() ?? '';

      return {
        id: fileName.replace(/\.md$/, ''),
        data: entry.data,
        body: entry.body,
      };
    });
}

export async function getEntry(name: string, id: string): Promise<ContentEntry | null> {
  const entries = await getCollection(name);
  return entries.find((entry) => entry.id === id) ?? null;
}

export function sortByOrder(entries: ContentEntry[]): ContentEntry[] {
  return entries.sort((a, b) => Number(a.data.order ?? 0) - Number(b.data.order ?? 0));
}