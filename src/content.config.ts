import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const locations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/locations' }),
  schema: z.object({
    name: z.string(),
    type: z.string(),
    region: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
  }),
});

const npcs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/npcs' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    location: z.string().optional(),
    faction: z.string().optional(),
    image: z.string().optional(),
    alignment: z.string().optional(),
    summary: z.string(),
  }),
});

const enemies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/enemies' }),
  schema: z.object({
    name: z.string(),
    type: z.string(),
    cr: z.string(),
    image: z.string().optional(),
    ac: z.number(),
    hp: z.string(),
    speed: z.string(),
    stats: z.object({
      for: z.number(),
      dex: z.number(),
      con: z.number(),
      int: z.number(),
      sag: z.number(),
      cha: z.number(),
    }),
    summary: z.string(),
  }),
});

const arcs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/arcs' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    sessions: z.string(),
    summary: z.string(),
  }),
});

export const collections = { locations, npcs, enemies, arcs };
