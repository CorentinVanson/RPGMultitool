---
name: historia-campaign-lore
description: Consulte les livres de règles du JDR Historia (dérivé de D&D 5e) présents dans le dossier books/ pour répondre aux questions sur les règles du jeu, le lore, les personnages, la création de contenu de campagne, etc. Use when: the user asks about game rules, lore, characters, campaign content for the "Historia" RPG system, mentions books/, or asks to master/prepare a JDR session.
license: MIT
metadata:
  authors: "RPGMultitool"
  version: "0.0.1"
---

# Référence de campagne — Historia

## Contexte
RPGMultitool aide à maîtriser (Maître du Jeu) une campagne de JDR sur table basée sur **Historia** (dérivé de D&D 5e, manuel en italien).

## Sources de référence obligatoires
Pour toute question liée à la campagne (règles du jeu, lore, personnages, création de contenu de campagne, etc.), **toujours se référer en priorité aux livres présents dans le dossier `books/`** avant de répondre à partir de connaissances générales.

- `books/Historia-Manuale-Base-5e-2021-ITA.pdf` : manuel de base du système Historia (règles, création de personnage, combat, magie, etc.), en italien.
- `books/Historia-Manuale-Base-5e-2021-ITA.txt` : version texte extraite du PDF ci-dessus (via `pdftotext -layout`), à privilégier pour la recherche/lecture car plus facile à parcourir que le PDF.

Si un nouveau livre PDF est ajouté dans `books/` et ne peut pas être lu directement, proposer d'en extraire le texte (`pdftotext -layout <fichier>.pdf <fichier>.txt`) vers un fichier texte compagnon dans `books/` pour faciliter les recherches futures.

## Règles de comportement
- **Ne jamais inventer de familia, d'espèce ou de faction.** Vérifier systématiquement dans le fichier texte avant d'écrire :
  - Familiae theri : Canida, Edenta, Eulipa, Felide, Licae, Mustacea, Rodentia, Ruminsa, Sauta, Urcida, Vespertile.
  - Familiae aviani : Ansera, Corbea, Grarcona, Picia, Rapax, Ruspea, Striga.
  - Espèces : seulement celles listées par la familia (`grep -A3 "Specie. In Vesteria sono diffuse"`).
  - Factions : Circolo dei Sussurri, Compagnia del Compasso, Confraternita dei Mortificati, Chiesa delle Ossa, Emissari del Khan, Eresia del Carlino, Esercito del Popolo, Fratellanza dei Vermi, Ordo Artis Occulta. Toute faction de campagne doit être rattachée à l'une d'elles ou présentée comme institution locale.
- **Aucun humain dans Vesteria** : tous les personnages sont des animaux anthropomorphes (theri ou aviani). Décrire pelage/plumage, museau/bec, oreilles, queue, griffes/serres — jamais cheveux, peau, barbe.
- Toujours citer/mentionner de quelle section du livre provient une règle quand c'est pertinent.
- Si une information n'est pas trouvée dans les livres du dossier `books/`, le signaler explicitement avant de proposer une réponse basée sur des connaissances générales de JDR (D&D 5e ou autres).
- Ne jamais citer de larges passages protégés par le droit d'auteur ; résumer ou paraphraser les règles.
- Les fichiers du dossier `books/` sont volontairement exclus du dépôt Git (voir `.gitignore`) car ce sont des documents sous droit d'auteur ; ne pas les committer ni les republier.
