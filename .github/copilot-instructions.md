# Instructions pour Copilot — RPGMultitool

## Contexte du projet
RPGMultitool est un site destiné à aider à maîtriser (Maître du Jeu) une campagne de JDR (jeu de rôle sur table). Le système utilisé est basé sur **Historia** (dérivé de D&D 5e, manuel en italien).

## Stack technique
- Framework : **Nuxt 4** (SSR + prérendu de toutes les pages), API dans `server/api/`.
- Front : composants **Vue 3** `<script setup lang="ts">` dans `app/components/`, pages dans `app/pages/`, composables dans `app/composables/`.
- Contenu : Markdown dans `src/content/`, transformé au build par `scripts/generate-content.mjs` vers `server/generated/content.ts`.
- TypeScript strict, `pnpm` comme gestionnaire de paquets.
- `pnpm dev` pour lancer le serveur de développement, `pnpm build` pour builder.
- Déploiement : **Vercel**.

## Contrainte majeure : fonctionnement hors ligne
Le site est utilisé en table de jeu, parfois sans réseau. **Toute fonctionnalité doit continuer à marcher hors ligne une fois le site chargé une première fois.**
- PWA via `@vite-pwa/nuxt` : les pages prérendues, les payloads Nuxt, le JS/CSS et les images de `public/` sont précachés ; `/api/content/*` est en `StaleWhileRevalidate` et les images en `CacheFirst` (voir `nuxt.config.ts`).
- Toute nouvelle page doit être atteignable par un lien pour être prérendue (`nitro.prerender.crawlLinks`), ou ajoutée explicitement à `nitro.prerender.routes`.
- Côté données : passer par `useContentCollection()` (`app/composables/useContent.ts`), qui charge une collection entière sur une URL stable et réutilise le cache Nuxt. **Ne pas créer d'URL d'API paramétrée par entrée** (`?id=...`) ni multiplier les endpoints : chaque URL supplémentaire est un point de rupture hors ligne.
- Pas de dépendance à un service externe au runtime (CDN, polices distantes, API tierce) : tout doit être servi depuis le site.
- L'état de la régie de projection est persisté en `localStorage` et synchronisé entre fenêtres via `BroadcastChannel`, donc sans réseau.
- Après toute évolution, vérifier avec `pnpm build` que les nouvelles routes et ressources apparaissent bien dans le précache de `.output/public/sw.js`.

## Sources de référence obligatoires
Pour toute question liée à la campagne (règles du jeu, lore, personnages, création de contenu de campagne, etc.), utiliser le skill `historia-campaign-lore` qui référence les livres du dossier `books/`.

## Règles de comportement
- Ne jamais citer de larges passages protégés par le droit d'auteur ; résumer ou paraphraser les règles.
- Les fichiers du dossier `books/` sont volontairement exclus du dépôt Git (voir `.gitignore`) car ce sont des documents sous droit d'auteur ; ne pas les committer ni les republier.
