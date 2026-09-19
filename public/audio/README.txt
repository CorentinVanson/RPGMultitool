Organisez vos musiques par thème dans des sous-dossiers, ex. :
  public/audio/Combat/poursuite.mp3
  public/audio/Exploration/foret.mp3
  public/audio/Tension/attente.mp3

Chaque sous-dossier devient une catégorie (« situation ») dans le panneau « Musique d'ambiance ».
Les fichiers placés directement dans public/audio/ apparaissent dans la catégorie « Divers ».
Le manifeste (manifest.json) est régénéré automatiquement à chaque `pnpm dev` / `pnpm build` par scripts/generate-music-manifest.mjs.
