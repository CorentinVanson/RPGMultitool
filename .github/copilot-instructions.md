# Instructions pour Copilot — RPGMultitool

## Contexte du projet
RPGMultitool est un site destiné à aider à maîtriser (Maître du Jeu) une campagne de JDR (jeu de rôle sur table). Le système utilisé est basé sur **Historia** (dérivé de D&D 5e, manuel en italien).

## Stack technique
- Framework : **Astro** (mode `server`, adapter `@astrojs/vercel`) pour le back (pages, API routes dans `src/pages/api/`).
- Front : composants **React** (`.tsx`) hydratés via les directives `client:*` d'Astro (voir `src/components/`).
- TypeScript strict, `pnpm` comme gestionnaire de paquets.
- `pnpm dev` pour lancer le serveur de développement, `pnpm build` pour builder.
- Déploiement : **Vercel** (adapter `@astrojs/vercel`).

## Sources de référence obligatoires
Pour toute question liée à la campagne (règles du jeu, lore, personnages, création de contenu de campagne, etc.), utiliser le skill `historia-campaign-lore` qui référence les livres du dossier `books/`.

## Règles de comportement
- Ne jamais citer de larges passages protégés par le droit d'auteur ; résumer ou paraphraser les règles.
- Les fichiers du dossier `books/` sont volontairement exclus du dépôt Git (voir `.gitignore`) car ce sont des documents sous droit d'auteur ; ne pas les committer ni les republier.
