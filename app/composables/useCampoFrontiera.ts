import { computed, onMounted, ref } from 'vue';

export interface CampoNpcCandidate {
  id: string;
  name: string;
  species: string;
  image?: string;
  qualities: string;
  flaws: string;
  background: string;
  personality: string;
  income: number;
  visitors: number;
  growth: number;
}

export interface CampoConstruction {
  id: string;
  name: string;
  category: string;
  description: string;
  requires: string[];
  level: number;
  cost: number;
  baseIncome: number;
  baseVisitors: number;
  benefit: string;
  access?: string[];
  constructionDiscount?: number;
  candidates: CampoNpcCandidate[];
}

const tavernCandidates: CampoNpcCandidate[] = [
  { id: 'tavern-elisabetta', name: 'Elisabetta Tasso', species: 'Mustacea — tasso', qualities: 'Cuisine et boissons remarquables, recettes familiales', flaws: 'Très mauvaise en relations sociales, paraît froide et maladroite', background: 'Sa famille tenait l’auberge della Luna Bassa sur la route de Vallombra. Après un incendie qui a détruit la salle et emporté les économies familiales, Elisabetta a travaillé dans plusieurs cuisines de fortune. Elle a reconstitué le livre de recettes de sa mère de mémoire et voit la taverne du camp comme une chance de reconstruire sans dépendre d’un patron.', personality: 'Silencieuse et concentrée, Elisabetta exprime son affection en servant une portion supplémentaire ou en réparant une chaise. Elle déteste les compliments vagues, mais respecte immédiatement les personnes qui travaillent proprement et tiennent parole.', income: 18, visitors: 2, growth: 0 },
  { id: 'tavern-ruggero', name: 'Ruggero Volpe', species: 'Licae — volpe rossa', qualities: 'Excellent vendeur, attire immédiatement une clientèle', flaws: 'Sa clientèle est turbulente ; il cherchera à garder les bénéfices pour lui', background: 'Ruggero a tenu des relais entre Vallombra, Gratigna et les pistes de la Riarsa. Il sait quels convois arrivent avant les autres, quelles tables séparer et quels voyageurs paient pour une information. Il propose ses services au camp parce qu’il y voit le prochain carrefour commercial, mais il négocie déjà sa part sur chaque tonneau et chaque chambre.', personality: 'Charmeur, expansif et toujours en mouvement, Ruggero transforme chaque conversation en occasion commerciale. Il aime les gens qu’il peut impressionner et devient méfiant dès qu’une autorité lui demande des comptes précis.', income: 42, visitors: 7, growth: -1 },
  { id: 'tavern-niccolo', name: 'Niccolò Souris', species: 'Rodentia — topo', qualities: 'Apprend très vite, sait écouter et progresser', flaws: 'Aucune compétence au départ, résultats faibles les premiers jours', background: 'Niccolò a grandi dans l’arrière-salle d’un débit de boisson où il faisait les courses, comptait les bouteilles et observait les clients. Il n’a jamais dirigé une salle, mais il tient un carnet rempli de plans, de prix et de phrases entendues. Le camp est son premier poste où personne ne le connaît encore comme un simple aide.', personality: 'Timide au premier abord, Niccolò devient volubile dès qu’on lui pose une question précise. Il prend les critiques au sérieux, parfois trop, et cherche souvent l’approbation des personnes qu’il admire.', income: 6, visitors: 1, growth: 5 },
];

const forgeCandidates: CampoNpcCandidate[] = [
  { id: 'forge-ambra', name: 'Ambra Blaireau', species: 'Mustacea — tasso', qualities: 'Solide, précise, excellente en réparation', flaws: 'Lente et exigeante avec les apprentis', background: 'Ambra a réparé les outils des vignerons de Vallombra pendant vingt ans, en remplaçant rarement une pièce qu’elle pouvait sauver. Elle a quitté son ancien atelier après un conflit avec un marchand qui falsifiait la qualité du métal. Elle accepte la forge du camp si les matériaux sont honnêtes et si les réparations urgentes ne deviennent pas un prétexte pour bâcler son travail.', personality: 'Patiente avec les objets, beaucoup moins avec les excuses. Ambra parle peu, observe les gestes et corrige sans humilier, mais son silence devient glacial quand quelqu’un gaspille une ressource ou cache une erreur.', income: 8, visitors: 0, growth: 1 },
  { id: 'forge-dario', name: 'Dario Corbeau', species: 'Corbea — corvo', qualities: 'Inventif, trouve des matériaux et des solutions', flaws: 'Se déconcentre dès qu’une idée plus brillante arrive', background: 'Dario a appris la mécanique dans les réserves d’un ancien atelier militaire, où il démontait les mécanismes condamnés pour comprendre leur logique. Il collectionne ressorts, charnières et fragments de serrures, convaincu qu’une pièce abandonnée finira toujours par servir. Il rejoint le camp pour avoir accès à un stock régulier et à des problèmes assez complexes pour nourrir son inventivité.', personality: 'Curieux, enthousiaste et incapable de laisser une question technique en suspens, Dario griffonne des schémas partout. Il adore les discussions avec les personnes qui construisent, mais oublie facilement une tâche banale dès qu’une nouvelle idée lui traverse l’esprit.', income: 12, visitors: 0, growth: 0 },
  { id: 'forge-lucia', name: 'Lucia Lapine', species: 'Rodentia — lepre', qualities: 'Travaille vite et apprend auprès de chacun', flaws: 'Manque encore de force et d’assurance', background: 'Lucia réparait les outils de sa communauté avec des manches récupérés et des pierres de fortune comme enclume. Elle a appris en regardant les artisans, puis en recommençant seule jusqu’à obtenir un résultat fiable. Elle cherche au camp un maître qui lui laissera le temps de devenir forgeronne sans lui confier immédiatement les travaux les plus dangereux.', personality: 'Vive, attentive et très volontaire, Lucia pose beaucoup de questions avant de toucher à un outil. Elle doute de ses propres décisions sous pression, mais retrouve toute son énergie dès qu’une personne lui montre clairement ce qu’elle peut améliorer.', income: 4, visitors: 0, growth: 4 },
];

const watchCandidates: CampoNpcCandidate[] = [
  { id: 'watch-cesare', name: 'Cesare Corbeau', species: 'Corbea — corvo', qualities: 'Vue perçante, mémoire des routes et des visages', flaws: 'Soupçonne tout le monde et partage peu ses informations', background: 'Cesare a passé des années à mémoriser les convois, les bornes et les silhouettes de la frontière. Après avoir signalé plusieurs mouvements suspects ignorés par une garde trop sûre d’elle, il a commencé à consigner chaque observation dans des carnets codés. Il veut une tour où ses rapports seront lus plutôt que rangés dans un tiroir.', personality: 'Méthodique, réservé et difficile à surprendre, Cesare écoute plus qu’il ne parle. Il teste les nouveaux venus avec de petites questions et ne donne sa confiance qu’aux personnes capables de distinguer un fait, une hypothèse et une rumeur.', income: 5, visitors: 1, growth: 0 },
  { id: 'watch-mara', name: 'Mara Rossa', species: 'Licae — volpe rossa', qualities: 'Rapide, sociable, excellente messagère', flaws: 'Prend des risques inutiles pour aller plus vite', background: 'Mara connaît les sentiers qui relient Vallombra aux terres sèches, y compris les passages que les cartes officielles évitent. Elle a longtemps livré des messages pour des commerçants qui payaient bien mais ne défendaient jamais leurs coursiers. Le camp l’attire parce qu’elle pourrait enfin mettre sa vitesse au service d’une communauté qui dépend réellement de ses trajets.', personality: 'Sociable, moqueuse et pleine de ressources, Mara se fait des contacts partout où elle s’arrête. Elle supporte mal l’attente et confond parfois courage avec précipitation, mais elle revient toujours chercher les personnes qu’elle a engagées dans une mission.', income: 8, visitors: 2, growth: 1 },
  { id: 'watch-orazio', name: 'Orazio Brun', species: 'Urcida — orso bruno', qualities: 'Endurant, fiable et protecteur', flaws: 'Lent à changer de méthode', background: 'Orazio a gardé des réserves militaires avant de quitter le service, après avoir refusé de falsifier un registre de vivres. Il connaît les routines de garde, les erreurs d’aménagement qui coûtent des vies et la valeur d’une clé remise à la bonne personne. Il propose de sécuriser le camp à condition que les ordres soient clairs et que la discipline ne serve pas à maltraiter les habitants.', personality: 'Calme, protecteur et presque cérémonieux dans ses habitudes, Orazio préfère prévenir une crise plutôt que recevoir des félicitations après l’avoir arrêtée. Il peut sembler inflexible, mais se montre remarquablement patient avec les personnes qui apprennent honnêtement.', income: 4, visitors: 0, growth: 3 },
];

const genericCandidateDetails: Record<string, { backgrounds: [string, string, string]; personalities: [string, string, string] }> = {
  cistern: {
    backgrounds: ['Orazio a réparé les citernes des garnisons de Vallombra et sait repérer une fissure derrière une couche de sable. Il accepte de reprendre celle du camp si l’eau reste une priorité avant les projets plus visibles.', 'Marta a grandi près des canaux et a appris à reconnaître une eau malade à son odeur. Elle veut transformer la citerne en réserve fiable, avec des registres simples que tout le monde pourra contrôler.', 'Piero a surtout entretenu les puits de sa communauté. Il connaît les gestes essentiels, mais voit ce chantier comme sa première occasion de prouver qu’un petit artisan peut sauver une installation entière.'],
    personalities: ['Prudent et protecteur, Orazio préfère une réserve modeste mais sûre à une promesse ambitieuse. Il supporte mal les décisions prises sans inspection.', 'Calme et attentive, Marta pose des questions très concrètes et se souvient de chaque personne qui a aidé le chantier.', 'Enthousiaste et un peu nerveux, Piero parle trop quand il doute, puis travaille avec une application remarquable dès qu’on lui confie une tâche précise.'],
  },
  workshop: {
    backgrounds: ['Nardo a passé sa vie à réparer digues, passerelles et charrettes pour le Conseil de Vallombra. Il sait organiser un chantier avec peu de bras et veut donner au camp une routine qui évite les accidents.', 'Ada a appris à entretenir les lavoirs, les séchoirs et les mécanismes simples du Guscio. Elle ne se considère pas comme une ingénieure, mais personne ne remarque les petites défaillances avant elle.', 'Lello a travaillé comme aide sur des chantiers de rivière et rêve de construire quelque chose qui restera après son passage. Le camp lui offrirait ses premiers outils à lui.'],
    personalities: ['Pragmatique et direct, Nardo répartit le travail sans favoritisme et devient sec quand quelqu’un ignore une règle de sécurité.', 'Observatrice et mordante, Ada préfère réparer en silence plutôt que recevoir des compliments. Elle connaît pourtant très bien les habitudes de tout un atelier.', 'Optimiste et malléable, Lello apprend vite auprès des plus expérimentés, mais cherche encore à savoir quelle place il veut prendre dans un groupe.'],
  },
  tannery: {
    backgrounds: ['Bice a travaillé pour des tanneurs de Vallombra et connaît les peaux adaptées aux courroies, aux gants et aux protections souples. Elle veut un atelier où la production ne dépendra pas d’un marchand pressé.', 'Sisto a récupéré des techniques de tannage auprès de plusieurs familles de marchands. Il arrive avec de bonnes idées pour économiser l’eau, mais aucune patience pour les méthodes qu’il juge dépassées.', 'Mina a surtout réparé des sacs et des harnais pour les petits convois. Elle demande une chance d’apprendre le traitement complet des peaux et de gagner un métier durable au camp.'],
    personalities: ['Patiente et exigeante, Bice traite chaque peau comme une matière différente et explique volontiers son savoir à ceux qui respectent le temps du travail.', 'Vif et contestataire, Sisto adore débattre autour d’une cuve et prend les objections comme une invitation à démontrer son idée.', 'Discrète et appliquée, Mina observe longtemps avant de parler. Elle prend les erreurs à cœur, mais progresse vite dès qu’elle reçoit un retour précis.'],
  },
  'map-room': {
    backgrounds: ['Cassio relève depuis des années les pistes autour de Vallombra et connaît les anciennes routes de service. Il veut centraliser les cartes du camp pour que les décisions reposent enfin sur des informations comparables.', 'Renzo a appris à lire une carte en suivant les passeurs et les livreurs de la frontière. Il sait quelles informations les habitants taisent et lesquelles ils exagèrent, ce qui peut rendre ses rapports précieux mais difficiles à vérifier.', 'Mara connaît les chemins praticables à pied, à cheval ou avec une charge légère. La salle des cartes lui permettrait de transformer son expérience des trajets en itinéraires utiles à toute la base.'],
    personalities: ['Concentré et peu démonstratif, Cassio corrige une carte avec la même patience qu’un témoignage imprécis. Il respecte les personnes qui admettent ne pas savoir.', 'Malin et sociable, Renzo plaisante pour détourner les questions qui le gênent. Il reste cependant très sérieux lorsqu’une information peut mettre quelqu’un en danger.', 'Impatiente et imaginative, Mara pense en raccourcis et en solutions rapides. Elle doit apprendre à laisser une trace lisible de ce qu’elle sait déjà par instinct.'],
  },
  church: {
    backgrounds: ['Sœur Alba a accompagné des familles déplacées et animé de petits rites de consolation après des accidents de route. Elle propose une chapelle sobre, ouverte aux habitants sans devenir un lieu de pression.', 'Frère Neri a copié des textes et entretenu plusieurs lieux de recueillement isolés. Il sait écouter les conflits avant qu’ils ne deviennent publics et espère trouver au camp une communauté à protéger.', 'Pia a appris les prières auprès des anciens de son quartier et prend très au sérieux les petits gestes de solidarité. Elle ne possède pas d’autorité officielle, mais connaît les besoins concrets des habitants.'],
    personalities: ['Douce mais ferme, Alba refuse qu’une croyance serve à humilier ou exclure. Elle parle peu de ses propres pertes et se montre très présente pour celles des autres.', 'Réfléchi et précis, Neri préfère une question honnête à une réponse toute faite. Sa patience peut toutefois ressembler à de la distance.', 'Chaleureuse et volontaire, Pia accueille tout le monde avec la même énergie. Elle peut se laisser emporter par son enthousiasme lorsqu’un désaccord demande davantage de mesure.'],
  },
  infirmary: {
    backgrounds: ['Ilaria a soigné les blessures courantes dans des maisons de quartier et connaît les remèdes simples qui évitent qu’un incident de chantier ne s’aggrave. Elle veut une infirmerie où les réserves sont comptées et renouvelées.', 'Marta a appris les gestes de soin auprès de travailleuses itinérantes. Elle n’a pas encore dirigé une salle, mais sait rassurer un patient et repérer quand il faut demander de l’aide.', 'Tullio récolte des plantes autour de Vallombra et tient un carnet de préparations éprouvées. Il cherche un lieu stable pour transmettre son savoir plutôt que vendre ses mélanges au hasard des marchés.'],
    personalities: ['Décidée et rassurante, Ilaria prend rapidement la direction d’une urgence. Elle doit veiller à ne pas transformer chaque désaccord médical en épreuve d’autorité.', 'Empathique et attentive, Marta se souvient des douleurs que les autres minimisent. Elle doute parfois de son diagnostic même lorsque son instinct est juste.', 'Curieux et méticuleux, Tullio veut tout documenter. Il devient distrait lorsqu’une plante rare ou une nouvelle méthode attire son attention.'],
  },
  'stone-wall': {
    backgrounds: ['Livia dirige depuis des années des chantiers de pierre et de bois pour les villages de la frontière. Elle a accepté de venir au camp parce qu’une muraille bien pensée peut protéger des familles, pas seulement impressionner des soldats.', 'Orazio connaît les fortifications militaires et les réserves nécessaires à un siège. Il veut corriger les erreurs de l’ancien camp sans reproduire la brutalité des garnisons qu’il a quittées.', 'Cesare a appris la maçonnerie sur des ouvrages défensifs et sait reconnaître une pierre mal posée au son qu’elle rend. Il cherche un chantier assez important pour devenir enfin responsable de ses propres décisions.'],
    personalities: ['Autoritaire sans être injuste, Livia protège ses ouvriers avec une fermeté qui ne laisse aucune place au mépris. Elle écoute les objections si elles s’appuient sur des faits.', 'Loyal et prudent, Orazio préfère une défense simple, entretenue et comprise de tous. Il accepte difficilement de changer un plan déjà éprouvé.', 'Silencieux et observateur, Cesare remarque les détails que les chefs de chantier oublient. Il peut paraître froid lorsqu’il attend simplement d’être certain avant de parler.'],
  },
  artificer: {
    backgrounds: ['Dottor Vero a étudié les mécanismes de poudre et les dispositifs de siège dans plusieurs ateliers. Il cherche un laboratoire où ses travaux seront surveillés avec sérieux et non vendus au premier commanditaire.', 'Milo a récupéré des pièces d’horlogerie, de serrure et d’armes pour fabriquer des prototypes étonnamment fonctionnels. Le camp lui offrirait enfin un lieu où laisser ses expériences dépasser le stade du bricolage.', 'Nerina observe depuis longtemps les artificiers sans avoir accès à leurs ateliers. Elle comprend vite les principes, tient des notes impeccables et veut prouver qu’une apprentie peut contribuer sans prendre de risques inconsidérés.'],
    personalities: ['Brillant et prudent, Vero déteste l’improvisation lorsqu’elle implique de la poudre. Il peut sembler froid, mais sa rigueur vient d’une peur très concrète des accidents.', 'Exubérant et impatient, Milo s’enthousiasme pour chaque mécanisme. Il faut parfois lui rappeler qu’un prototype amusant n’est pas encore un outil fiable.', 'Curieuse et disciplinée, Nerina demande toujours pourquoi une consigne existe avant de l’appliquer. Elle manque d’assurance en public, mais ses notes révèlent une pensée très structurée.'],
  },
};

const genericCandidates = (prefix: string, names: [string, string, string], species: [string, string, string]): CampoNpcCandidate[] => names.map((name, index) => ({
  id: `${prefix}-${index + 1}`,
  name,
  species: species[index]!,
  qualities: ['Très fiable et expérimenté', 'Ingénieux et adaptable', 'Débute mais progresse rapidement'][index]!,
  flaws: ['Refuse les compromis', 'Travaille de façon imprévisible', 'A besoin d’encadrement'][index]!,
  background: genericCandidateDetails[prefix]?.backgrounds[index] ?? `${name} a travaillé sur les routes et les chantiers de Vallombra avant de proposer ses services au camp. Cette nouvelle responsabilité lui permettrait de stabiliser sa vie et de mettre son expérience au service d’un projet durable.`,
  personality: genericCandidateDetails[prefix]?.personalities[index] ?? `${name} est sérieux, attentif et encore en train de trouver sa place. Les premiers jours au camp révéleront si sa prudence devient une force ou un frein.`,
  income: [8, 12, 4][index]!,
  visitors: [0, 1, 0][index]!,
  growth: [1, 0, 4][index]!,
}));

const constructions: CampoConstruction[] = [
  { id: 'tents', name: 'Tentes', category: 'Base', description: 'Abri provisoire des PJ et des premiers arrivants.', requires: [], level: 0, cost: 0, baseIncome: 0, baseVisitors: 0, benefit: 'État initial du camp.', candidates: [] },
  { id: 'palisade', name: 'Palissade', category: 'Défense', description: 'Barrière de bois qui délimite le camp.', requires: [], level: 0, cost: 0, baseIncome: 0, baseVisitors: 0, benefit: 'État initial du camp.', candidates: [] },
  { id: 'cabins', name: 'Cabanes', category: 'Vie du camp', description: 'Améliore les tentes en logements plus solides.', requires: ['tents'], level: 1, cost: 90, baseIncome: 0, baseVisitors: 2, benefit: 'La population maximale et le confort augmentent.', candidates: [] },
  { id: 'tavern', name: 'Taverne', category: 'Commerce', description: 'Un lieu de repas, de repos et de rencontres.', requires: ['palisade'], level: 1, cost: 120, baseIncome: 8, baseVisitors: 2, benefit: 'Génère argent et visiteurs selon son tavernier.', candidates: tavernCandidates },
  { id: 'tavern-plus-1', name: 'Taverne +1', category: 'Commerce', description: 'Ouvre une salle commune chauffée et des tables pour les voyageurs.', requires: ['tavern', 'cabins'], level: 2, cost: 190, baseIncome: 16, baseVisitors: 4, benefit: 'Le relais devient une étape régulière sur la route.', candidates: [] },
  { id: 'tavern-plus-2', name: 'Taverne +2', category: 'Commerce', description: 'Aménage des chambres, une cuisine complète et une réserve de vin.', requires: ['tavern-plus-1', 'cistern'], level: 3, cost: 360, baseIncome: 28, baseVisitors: 7, benefit: 'Le camp attire marchands, messagers et petites caravanes.', candidates: [] },
  { id: 'cistern', name: 'Citerne remise en eau', category: 'Logistique', description: 'Dégage et étanchéifie la citerne ensablée.', requires: ['palisade'], level: 1, cost: 70, baseIncome: 0, baseVisitors: 0, benefit: 'Le camp possède une réserve d’eau.', candidates: genericCandidates('cistern', ['Orazio Brun', 'Marta Castor', 'Piero Campagnol'], ['Urcida — orso bruno', 'Mustacea — lontra', 'Rodentia — topo']) },
  { id: 'forge', name: 'Forge', category: 'Artisanat', description: 'Répare armes, outils et ferrures de la base.', requires: ['cistern'], level: 2, cost: 150, baseIncome: 10, baseVisitors: 0, benefit: 'Réduit les coûts narratifs des réparations.', access: ['Outils de forgeron et d’artisan', 'Armes de mêlée et à distance simples'], candidates: forgeCandidates },
  { id: 'forge-plus-1', name: 'Forge +1', category: 'Artisanat', description: 'Ajoute un établi de précision, des moules et une réserve de métal.', requires: ['forge'], level: 3, cost: 280, baseIncome: 12, baseVisitors: 0, benefit: 'Permet l’entretien et la commande d’équipement militaire.', access: ['Armes de guerre de mêlée et à distance', 'Boucliers : brocchier, scudo, tavolaccio et palvese'], candidates: [] },
  { id: 'forge-plus-2', name: 'Forge +2', category: 'Artisanat', description: 'Installe un foyer renforcé et un atelier de mécanique fine.', requires: ['forge-plus-1', 'workshop'], level: 4, cost: 520, baseIncome: 18, baseVisitors: 0, benefit: 'Le camp peut entretenir un arsenal spécialisé.', access: ['Entretien des armes à feu et fabrication de munitions', 'Armes avianes de guerre sur commande', 'Armes et armures de facture rodelienne, avec un contact et la réputation nécessaires'], candidates: [] },
  { id: 'workshop', name: 'Atelier', category: 'Artisanat', description: 'Fabrique les pièces de bois et améliore les chantiers.', requires: ['forge'], level: 3, cost: 180, baseIncome: 12, baseVisitors: 1, benefit: 'Les gabarits et outils communs réduisent les coûts de construction.', constructionDiscount: .1, candidates: genericCandidates('workshop', ['Nardo Digue', 'Ada Lavandaia', 'Lello Castor'], ['Mustacea — tasso', 'Mustacea — tasso', 'Mustacea — lontra']) },
  { id: 'workshop-plus-1', name: 'Atelier +1', category: 'Artisanat', description: 'Ajoute un banc de sciage et un stock de pièces standardisées.', requires: ['workshop', 'tavern'], level: 4, cost: 300, baseIncome: 16, baseVisitors: 1, benefit: 'Les chantiers sont organisés en série et coûtent moins cher.', constructionDiscount: .1, candidates: [] },
  { id: 'workshop-plus-2', name: 'Atelier +2', category: 'Artisanat', description: 'Équipe l’atelier d’un treuil et d’outils de charpente lourde.', requires: ['workshop-plus-1', 'stone-wall'], level: 5, cost: 480, baseIncome: 20, baseVisitors: 1, benefit: 'Le camp peut produire et réparer ses grands ouvrages sur place.', constructionDiscount: .1, candidates: [] },
  { id: 'watchtower', name: 'Tour de guet', category: 'Renseignement', description: 'Surveille la route et les terres sèches.', requires: ['palisade'], level: 1, cost: 180, baseIncome: 5, baseVisitors: 1, benefit: 'Les menaces sont repérées plus tôt.', candidates: watchCandidates },
  { id: 'tannery', name: 'Tannerie', category: 'Artisanat', description: 'Transforme les peaux et fournit cuir, courroies et protections.', requires: ['workshop'], level: 4, cost: 210, baseIncome: 24, baseVisitors: 1, benefit: 'Le camp développe une production marchande.', access: ['Gambeson et tabarda imbottita', 'Courroies, étuis et entretien des protections'], candidates: genericCandidates('tannery', ['Bice Renarde', 'Sisto Corbeau', 'Mina Fouine'], ['Licae — volpe rossa', 'Corbea — corvo', 'Mustacea — faina']) },
  { id: 'tannery-plus-1', name: 'Tannerie +1', category: 'Artisanat', description: 'Installe des cuves couvertes et un espace de coupe sur mesure.', requires: ['tannery', 'forge-plus-1'], level: 5, cost: 390, baseIncome: 34, baseVisitors: 2, benefit: 'Les protections sont ajustées et l’armurerie du camp peut tenir du stock.', access: ['Brigantina, giaco di maglia et maglia di ferro', 'Armatures avianes adaptées, à commander depuis Nidialti ou Rodelia'], candidates: [] },
  { id: 'map-room', name: 'Salle des cartes', category: 'Commandement', description: 'Centralise cartes, rapports et décisions.', requires: ['watchtower'], level: 2, cost: 240, baseIncome: 10, baseVisitors: 2, benefit: 'Les visiteurs et les missions sont mieux orientés.', candidates: genericCandidates('map-room', ['Cassio Corbe', 'Renzo Taupe', 'Mara Rossa'], ['Corbea — corvo', 'Rodentia — topo', 'Licae — volpe rossa']) },
  { id: 'church', name: 'Chapelle', category: 'Communauté', description: 'Un lieu de recueillement pour les habitants et voyageurs.', requires: ['cabins'], level: 2, cost: 220, baseIncome: 4, baseVisitors: 5, benefit: 'Attire habitants et pèlerins, mais demande une présence constante.', candidates: genericCandidates('church', ['Sœur Alba', 'Frère Neri', 'Pia Croyante'], ['Striga — gufo', 'Corbea — corvo', 'Felide — gatto']) },
  { id: 'infirmary', name: 'Infirmerie', category: 'Communauté', description: 'Soigne les blessés et les ouvriers.', requires: ['cabins', 'forge'], level: 3, cost: 260, baseIncome: 0, baseVisitors: 2, benefit: 'Les habitants récupèrent plus sûrement après un incident.', candidates: genericCandidates('infirmary', ['Dottoressa Ilaria', 'Marta Soigneuse', 'Tullio Herboriste'], ['Felide — gatto', 'Mustacea — tasso', 'Rodentia — topo']) },
  { id: 'stone-wall', name: 'Muraille de pierre', category: 'Défense', description: 'Remplace la palissade par une enceinte capable de tenir un siège.', requires: ['workshop', 'watchtower'], level: 4, cost: 600, baseIncome: 0, baseVisitors: 0, benefit: 'Défense de fin de campagne.', candidates: genericCandidates('stone-wall', ['Livia Pierreferme', 'Orazio Brun', 'Cesare Maçon'], ['Mustacea — tasso', 'Urcida — orso bruno', 'Urcida — orso bruno']) },
  { id: 'artificer', name: 'Laboratoire d’artificier', category: 'End game', description: 'Un atelier rare pour expérimenter poudres, mécanismes et défenses.', requires: ['forge-plus-1', 'map-room'], level: 4, cost: 520, baseIncome: 38, baseVisitors: 1, benefit: 'Débloque des solutions exceptionnelles pour le final.', access: ['Entretien de pistolets et mousquets', 'Poudre noire et munitions, sous la responsabilité d’un geniere'], candidates: genericCandidates('artificer', ['Dottor Vero', 'Milo Inventeur', 'Nerina Curieuse'], ['Corbea — corvo', 'Rodentia — topo', 'Felide — gatto']) },
  { id: 'artificer-plus-1', name: 'Laboratoire +1', category: 'End game', description: 'Ajoute un tour de mécanique fine et une chambre de poudre sécurisée.', requires: ['artificer', 'forge-plus-2'], level: 5, cost: 740, baseIncome: 48, baseVisitors: 1, benefit: 'Les mécanismes complexes deviennent réparables au Campo.', access: ['Arquebuses et colubrines', 'Pièces de rechange et maintenance avancée des armes à feu'], candidates: [] },
  { id: 'artificer-plus-2', name: 'Laboratoire +2', category: 'End game', description: 'Aménage une fosse d’essai et une remise d’artillerie hors de l’enceinte.', requires: ['artificer-plus-1', 'stone-wall'], level: 6, cost: 1100, baseIncome: 62, baseVisitors: 2, benefit: 'Le Campo possède une capacité de défense lourde, à employer avec prudence.', access: ['Bombardes et falconetti', 'Entretien des pièces d’artillerie et de leurs munitions'], candidates: [] },
];

export const CAMPO_CONSTRUCTIONS = constructions;
export const CAMPO_STARTING_IDS = ['tents', 'palisade'];
export const CAMPO_NPC_CANDIDATES = constructions.flatMap((construction) => construction.candidates.map((candidate) => ({ candidate, construction: construction.name })));
const candidateSlugs: Record<string, string> = {
  'tavern-elisabetta': 'elisabetta-tasso', 'tavern-ruggero': 'ruggero-volpe', 'tavern-niccolo': 'niccolo-souris',
  'forge-ambra': 'ambra-blaireau', 'forge-dario': 'dario-corbeau', 'forge-lucia': 'lucia-lapine',
  'watch-cesare': 'cesare-corbeau',
  'cistern-1': 'orazio-brun', 'watch-orazio': 'orazio-brun', 'stone-wall-2': 'orazio-brun',
  'cistern-2': 'marta-castor', 'cistern-3': 'piero-campagnol',
  'workshop-1': 'nardo-digue', 'workshop-2': 'ada-lavandaia', 'workshop-3': 'lello-castor',
  'tannery-1': 'bice-renarde', 'tannery-2': 'sisto-corbeau', 'tannery-3': 'mina-fouine',
  'map-room-1': 'cassio-corbe', 'map-room-2': 'renzo', 'map-room-3': 'mara-rossa', 'watch-mara': 'mara-rossa',
  'church-1': 'soeur-alba', 'church-2': 'frere-neri', 'church-3': 'pia-croyante',
  'infirmary-1': 'dottoressa-ilaria', 'infirmary-2': 'marta-soigneuse', 'infirmary-3': 'tullio-herboriste',
  'stone-wall-1': 'livia-pierreferme', 'stone-wall-3': 'cesare-macon',
  'artificer-1': 'dottor-vero', 'artificer-2': 'milo-inventeur', 'artificer-3': 'nerina-curieuse',
};

export function campoCandidateSlug(candidateId: string): string {
  return candidateSlugs[candidateId] ?? candidateId;
}

const STORAGE_KEY = 'rpg-campo-frontiera';
const builtIds = ref<string[]>([...CAMPO_STARTING_IDS]);
const assignments = ref<Record<string, string>>({});
const day = ref(1);
const gold = ref(200);
const population = ref(0);
let initialized = false;

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ builtIds: builtIds.value, assignments: assignments.value, day: day.value, gold: gold.value, population: population.value }));
  } catch {
    // L’état reste disponible tant que la page est ouverte.
  }
}

function initialize() {
  if (initialized) return;
  initialized = true;
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Partial<{ builtIds: string[]; assignments: Record<string, string>; day: number; gold: number; population: number }>;
    builtIds.value = [...new Set([...CAMPO_STARTING_IDS, ...(stored.builtIds ?? [])])].filter((id) => constructions.some((item) => item.id === id));
    assignments.value = stored.assignments ?? {};
    day.value = stored.day ?? 1;
    gold.value = stored.gold ?? 200;
    population.value = stored.population ?? 0;
  } catch {
    builtIds.value = [...CAMPO_STARTING_IDS];
    assignments.value = {};
    day.value = 1;
    gold.value = 200;
    population.value = 0;
  }
}

export function useCampoFrontiera() {
  onMounted(initialize);

  const builtConstructions = computed(() => constructions.filter((construction) => builtIds.value.includes(construction.id)));
  const constructionDiscount = computed(() => builtConstructions.value.reduce((total, construction) => total + (construction.constructionDiscount ?? 0), 0));
  function constructionCost(construction: CampoConstruction) { return Math.ceil(construction.cost * (1 - constructionDiscount.value)); }
  const availableConstructions = computed(() => constructions.filter((construction) => !builtIds.value.includes(construction.id) && construction.requires.every((id) => builtIds.value.includes(id)) && gold.value >= constructionCost(construction)));
  const dailyIncome = computed(() => builtConstructions.value.reduce((total, construction) => {
    const candidate = construction.candidates.find((item) => item.id === assignments.value[construction.id]);
    return total + construction.baseIncome + (candidate?.income ?? 0);
  }, 0));
  const dailyVisitors = computed(() => builtConstructions.value.reduce((total, construction) => {
    const candidate = construction.candidates.find((item) => item.id === assignments.value[construction.id]);
    return total + construction.baseVisitors + (candidate?.visitors ?? 0);
  }, 0));
  const populationGrowth = computed(() => Math.max(0, dailyVisitors.value + builtConstructions.value.reduce((total, construction) => total + (construction.candidates.find((item) => item.id === assignments.value[construction.id])?.growth ?? 0), 0)));

  function isBuilt(id: string) { return builtIds.value.includes(id); }

  function build(id: string) {
    const construction = constructions.find((item) => item.id === id);
    if (!construction || isBuilt(id) || gold.value < constructionCost(construction) || !construction.requires.every(isBuilt)) return false;
    gold.value -= constructionCost(construction);
    builtIds.value = [...builtIds.value, id];
    persist();
    return true;
  }

  function demolish(id: string) {
    if (CAMPO_STARTING_IDS.includes(id)) return false;
    const dependents = constructions.some((construction) => construction.requires.includes(id) && isBuilt(construction.id));
    if (dependents) return false;
    builtIds.value = builtIds.value.filter((item) => item !== id);
    delete assignments.value[id];
    persist();
    return true;
  }

  function assignNpc(constructionId: string, npcId: string) {
    const construction = constructions.find((item) => item.id === constructionId);
    if (!construction || !isBuilt(constructionId) || !construction.candidates.some((candidate) => candidate.id === npcId)) return;
    assignments.value = { ...assignments.value, [constructionId]: npcId };
    persist();
  }

  function advanceDay() {
    day.value += 1;
    gold.value += dailyIncome.value;
    population.value += populationGrowth.value;
    persist();
  }

  function addGold(amount: number) {
    if (!Number.isFinite(amount) || amount <= 0) return false;
    gold.value += Math.floor(amount);
    persist();
    return true;
  }

  function addPopulation(amount: number) {
    if (!Number.isFinite(amount) || amount <= 0) return false;
    population.value += Math.floor(amount);
    persist();
    return true;
  }

  return { builtIds, assignments, day, gold, population, builtConstructions, availableConstructions, dailyIncome, dailyVisitors, populationGrowth, constructionDiscount, constructionCost, isBuilt, build, demolish, assignNpc, advanceDay, addGold, addPopulation };
}
