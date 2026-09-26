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

## Système de dés du projet
Le système de résolution utilise un **reverse pool dice** : plus le dé est grand, plus l'action est difficile. Une action très facile utilise un D4 ; une action impossible peut utiliser un D100.
- Les compétences des personnages et des ennemis doivent généralement rester entre 1 et 6 environ.
- Une première maîtrise permet d'utiliser le dé du palier immédiatement plus facile (par exemple D6 au lieu de D8).
- Une deuxième maîtrise permet de lancer deux dés, selon la règle d'avantage du système.
- Toute nouvelle mécanique, page ou fiche doit respecter cette échelle et ne doit pas réintroduire une résolution classique basée sur un seul D20.
- Les anciennes CD/DD d'Historia ne s'appliquent plus aux jets d'action. Toute ancienne difficulté doit être convertie en palier de dé avant d'être affichée ; ne jamais afficher une résolution active du type « CD 12 ».

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

## Fidélité au canon Historia (vérifier avant d'écrire)
Ne jamais inventer d'élément canonique. Avant de créer ou modifier un personnage, un lieu ou une faction, **vérifier dans `books/Historia-Manuale-Base-5e-2021-ITA.txt`** (grep) et n'utiliser que ce qui y figure.

- **Pas d'humains.** Vesteria est peuplée d'animaux anthropomorphes. Tout personnage appartient à un **Ordre** (theri = mammifères, aviani = oiseaux ; lissami et sauri sont exotiques et rares), à une **Familia** et à une **Specie** (chapitre III « Familiae e Specie »).
- **Familiae officielles** — theri : Canida, Edenta, Eulipa, Felide, Licae, Mustacea, Rodentia, Ruminsa, Sauta, Urcida, Vespertile. Aviani : Ansera, Corbea, Grarcona, Picia, Rapax, Ruspea, Striga. **Aucune autre.**
- **Espèces** : uniquement celles listées dans la familia concernée (ex. Felide = gatti, linci, puma ; Licae = coyote, lupi, volpi rosse ; Striga = allocchi, barbagianni, civette, gufi). Vérifier la ligne « Specie. In Vesteria sono diffuse… » de la familia.
- Les descriptions physiques doivent être animales (pelage/plumage, museau/bec, oreilles, queue, griffes/serres, défenses, membranes), jamais « cheveux », « peau », « barbe », « homme », « femme ».
- Les traits mécaniques (vitesse, taille, avantages, compétences accordées) doivent correspondre à ceux de l'espèce dans le manuel.
- **Diversité des espèces des PNJ** : avant de créer un PNJ, parcourir les personnages déjà présents dans `src/content/npcs/` et privilégier une espèce (et, si possible, une familia) peu représentée dans la distribution actuelle. Éviter de reprendre systématiquement les espèces déjà fréquentes, surtout parmi les personnages d'un même lieu, groupe ou métier ; ne répéter une espèce que si le contexte le justifie. La diversité reste un objectif, pas un quota : elle ne doit jamais conduire à inventer une espèce, à contredire le canon, ni à choisir une espèce inadaptée à l'anatomie ou au rôle du personnage.
- **Factions officielles** (chapitre VI) : Circolo dei Sussurri, Compagnia del Compasso, Confraternita dei Mortificati, Chiesa delle Ossa, Emissari del Khan, Eresia del Carlino, Esercito del Popolo, Fratellanza dei Vermi, Ordo Artis Occulta. Le manuel autorise la création de factions de campagne, mais toute organisation inventée doit être **rattachée explicitement** à l'une de ces factions (filiale, détachement, schisme) ou clairement présentée comme une institution locale (casata nobiliaire, conseil de cité, communauté villageoise).
- Géographie et religions (Sacro Regno, Confederazione, Fossa Verde, Dottrina Classica, Ordine degli Indicanti…) : reprendre les noms du manuel, ne pas en forger de nouveaux.
- En cas d'information introuvable dans `books/`, le signaler explicitement au lieu de combler par une invention.

## Règles de comportement
- Ne jamais citer de larges passages protégés par le droit d'auteur ; résumer ou paraphraser les règles.
- Les fichiers du dossier `books/` sont volontairement exclus du dépôt Git (voir `.gitignore`) car ce sont des documents sous droit d'auteur ; ne pas les committer ni les republier.
