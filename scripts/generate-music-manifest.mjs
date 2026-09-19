import { readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = join(process.cwd(), 'public', 'audio');
const output = join(root, 'manifest.json');
const AUDIO_EXTENSIONS = new Set(['.mp3', '.ogg', '.wav', '.m4a', '.flac']);
const DEFAULT_SITUATION = 'Divers';

function prettify(value) {
  return value
    .replaceAll(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function isAudioFile(name) {
  const dot = name.lastIndexOf('.');
  return dot !== -1 && AUDIO_EXTENSIONS.has(name.slice(dot).toLowerCase());
}

async function listFolder(directory) {
  try {
    return await readdir(directory, { withFileTypes: true });
  } catch {
    return [];
  }
}

const tracks = [];
const topLevel = await listFolder(root);

// Les pistes à la racine de public/audio/ vont dans une catégorie « Divers ».
for (const entry of topLevel.filter((item) => item.isFile() && isAudioFile(item.name))) {
  tracks.push({
    id: `divers/${entry.name}`,
    name: prettify(entry.name.slice(0, entry.name.lastIndexOf('.'))),
    situation: DEFAULT_SITUATION,
    source: `/audio/${encodeURIComponent(entry.name)}`,
  });
}

// Chaque sous-dossier de public/audio/ représente une situation (thème).
for (const folder of topLevel.filter((item) => item.isDirectory())) {
  const situation = prettify(folder.name);
  const files = await listFolder(join(root, folder.name));
  for (const entry of files.filter((item) => item.isFile() && isAudioFile(item.name))) {
    tracks.push({
      id: `${folder.name}/${entry.name}`,
      name: prettify(entry.name.slice(0, entry.name.lastIndexOf('.'))),
      situation,
      source: `/audio/${encodeURIComponent(folder.name)}/${encodeURIComponent(entry.name)}`,
    });
  }
}

tracks.sort((left, right) => left.situation.localeCompare(right.situation) || left.name.localeCompare(right.name));

await writeFile(output, `${JSON.stringify(tracks, null, 2)}\n`);
