# RPGMultitool

Application SSR basée sur Nitro pour aider à maîtriser la campagne Historia.

## Développement

```bash
pnpm install
pnpm dev
```

Le serveur de développement est disponible sur `http://localhost:3000`.

## Production

```bash
pnpm build
pnpm start
```

## Persistance locale et Vercel

Les données de contenu et d'état sont stockées dans une base SQLite/libSQL. En local, la base par défaut est `data/rpgmultitool.db`. Sur Vercel, configurez `TURSO_DATABASE_URL` et `TURSO_AUTH_TOKEN` avec une base Turso/libSQL persistante.

Initialiser ou mettre à jour le contenu de la base Turso :

```bash
pnpm db:seed
```

Le script affiche explicitement la base ciblée et refuse de choisir SQLite local par défaut. Pour remplir volontairement la base locale : `pnpm db:seed:local`.

Le navigateur conserve également un miroir IndexedDB et synchronise les changements quand le réseau revient. Les notes, scènes, équipes, projection, état du Campo et statuts morts/disparus restent donc utilisables hors ligne. Les fichiers Markdown restent la source de secours versionnée si la base n'est pas encore initialisée.

Les contenus Markdown de `src/content/` sont chargés et rendus côté serveur par Nitro.
