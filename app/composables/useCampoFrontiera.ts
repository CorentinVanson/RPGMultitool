import { computed, onMounted, ref } from 'vue';

export interface CampoNpcCandidate {
  id: string;
  name: string;
  species: string;
  qualities: string;
  flaws: string;
  background: string;
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
  candidates: CampoNpcCandidate[];
}

const tavernCandidates: CampoNpcCandidate[] = [
  { id: 'tavern-elisabetta', name: 'Elisabetta Tasso', species: 'Mustacea — tasso', qualities: 'Cuisine et boissons remarquables, recettes familiales', flaws: 'Très mauvaise en relations sociales, paraît froide et maladroite', background: 'Sa famille tenait une auberge de route avant un incendie. Elisabetta a appris chaque recette par cœur, mais n’a jamais appris à accueillir les clients.', income: 18, visitors: 2, growth: 0 },
  { id: 'tavern-ruggero', name: 'Ruggero Volpe', species: 'Licae — volpe rossa', qualities: 'Excellent vendeur, attire immédiatement une clientèle', flaws: 'Sa clientèle est turbulente ; il cherchera à garder les bénéfices pour lui', background: 'Ruggero a travaillé dans les relais les plus fréquentés de la frontière. Il connaît tous les bons contacts, y compris ceux que le camp préférerait éviter.', income: 42, visitors: 7, growth: -1 },
  { id: 'tavern-niccolo', name: 'Niccolò Souris', species: 'Rodentia — topo', qualities: 'Apprend très vite, sait écouter et progresser', flaws: 'Aucune compétence au départ, résultats faibles les premiers jours', background: 'Niccolò n’a jamais dirigé une salle, mais il a passé sa vie à observer les commerçants. Il note chaque erreur et transforme chaque remarque en leçon.', income: 6, visitors: 1, growth: 5 },
];

const forgeCandidates: CampoNpcCandidate[] = [
  { id: 'forge-ambra', name: 'Ambra Blaireau', species: 'Mustacea — tasso', qualities: 'Solide, précise, excellente en réparation', flaws: 'Lente et exigeante avec les apprentis', background: 'Ambra a réparé les outils des vignerons de Vallombra pendant vingt ans. Elle accepte la forge si son travail est fait avec des matériaux honnêtes.', income: 8, visitors: 0, growth: 1 },
  { id: 'forge-dario', name: 'Dario Corbeau', species: 'Corbea — corvo', qualities: 'Inventif, trouve des matériaux et des solutions', flaws: 'Se déconcentre dès qu’une idée plus brillante arrive', background: 'Dario collectionne les mécanismes abandonnés et voit une solution dans chaque pièce détachée. Son établi est brillant, son organisation beaucoup moins.', income: 12, visitors: 0, growth: 0 },
  { id: 'forge-lucia', name: 'Lucia Lapine', species: 'Rodentia — lepre', qualities: 'Travaille vite et apprend auprès de chacun', flaws: 'Manque encore de force et d’assurance', background: 'Lucia réparait les outils de sa communauté avec des moyens dérisoires. Elle cherche un maître qui acceptera de lui laisser le temps de devenir forgeronne.', income: 4, visitors: 0, growth: 4 },
];

const watchCandidates: CampoNpcCandidate[] = [
  { id: 'watch-cesare', name: 'Cesare Corbeau', species: 'Corbea — corvo', qualities: 'Vue perçante, mémoire des routes et des visages', flaws: 'Soupçonne tout le monde et partage peu ses informations', background: 'Cesare a passé des années à mémoriser les convois et les silhouettes de la frontière. Il n’accorde sa confiance qu’aux faits consignés dans ses carnets.', income: 5, visitors: 1, growth: 0 },
  { id: 'watch-mara', name: 'Mara Rossa', species: 'Licae — volpe rossa', qualities: 'Rapide, sociable, excellente messagère', flaws: 'Prend des risques inutiles pour aller plus vite', background: 'Mara connaît les sentiers qui relient Vallombra aux terres sèches. Elle rêve d’un poste où son talent de messagère servirait enfin une cause qu’elle a choisie.', income: 8, visitors: 2, growth: 1 },
  { id: 'watch-orazio', name: 'Orazio Brun', species: 'Urcida — orso bruno', qualities: 'Endurant, fiable et protecteur', flaws: 'Lent à changer de méthode', background: 'Orazio a gardé des réserves militaires avant de quitter le service. Il ne promet jamais plus qu’il ne peut tenir et dort toujours près des clés.', income: 4, visitors: 0, growth: 3 },
];

const genericCandidates = (prefix: string, names: [string, string, string], species: [string, string, string]): CampoNpcCandidate[] => names.map((name, index) => ({
  id: `${prefix}-${index + 1}`,
  name,
  species: species[index]!,
  qualities: ['Très fiable et expérimenté', 'Ingénieux et adaptable', 'Débute mais progresse rapidement'][index]!,
  flaws: ['Refuse les compromis', 'Travaille de façon imprévisible', 'A besoin d’encadrement'][index]!,
  background: `${name} a grandi au contact des chantiers et des routes de Vallombra. ${index === 2 ? 'Cette première responsabilité est une chance de faire ses preuves.' : 'Son expérience est réelle, mais sa manière de travailler devra s’accorder avec celle du camp.'}`,
  income: [8, 12, 4][index]!,
  visitors: [0, 1, 0][index]!,
  growth: [1, 0, 4][index]!,
}));

const constructions: CampoConstruction[] = [
  { id: 'tents', name: 'Tentes', category: 'Base', description: 'Abri provisoire des PJ et des premiers arrivants.', requires: [], level: 0, cost: 0, baseIncome: 0, baseVisitors: 0, benefit: 'État initial du camp.', candidates: [] },
  { id: 'palisade', name: 'Palissade', category: 'Défense', description: 'Barrière de bois qui délimite le camp.', requires: [], level: 0, cost: 0, baseIncome: 0, baseVisitors: 0, benefit: 'État initial du camp.', candidates: [] },
  { id: 'cabins', name: 'Cabanes', category: 'Vie du camp', description: 'Améliore les tentes en logements plus solides.', requires: ['tents'], level: 1, cost: 90, baseIncome: 0, baseVisitors: 2, benefit: 'La population maximale et le confort augmentent.', candidates: [] },
  { id: 'tavern', name: 'Taverne', category: 'Commerce', description: 'Un lieu de repas, de repos et de rencontres.', requires: ['palisade'], level: 1, cost: 120, baseIncome: 8, baseVisitors: 2, benefit: 'Génère argent et visiteurs selon son tavernier.', candidates: tavernCandidates },
  { id: 'cistern', name: 'Citerne remise en eau', category: 'Logistique', description: 'Dégage et étanchéifie la citerne ensablée.', requires: ['palisade'], level: 1, cost: 70, baseIncome: 0, baseVisitors: 0, benefit: 'Le camp possède une réserve d’eau.', candidates: genericCandidates('cistern', ['Orazio Brun', 'Marta Castor', 'Piero Campagnol'], ['Urcida — orso bruno', 'Mustacea — lontra', 'Rodentia — topo']) },
  { id: 'forge', name: 'Forge', category: 'Artisanat', description: 'Répare armes, outils et ferrures de la base.', requires: ['cistern'], level: 2, cost: 150, baseIncome: 10, baseVisitors: 0, benefit: 'Réduit les coûts narratifs des réparations.', candidates: forgeCandidates },
  { id: 'workshop', name: 'Atelier', category: 'Artisanat', description: 'Fabrique les pièces de bois et améliore les chantiers.', requires: ['forge'], level: 3, cost: 180, baseIncome: 12, baseVisitors: 1, benefit: 'Débloque les améliorations avancées.', candidates: genericCandidates('workshop', ['Nardo Digue', 'Ada Lavandaia', 'Lello Castor'], ['Mustacea — tasso', 'Mustacea — tasso', 'Mustacea — lontra']) },
  { id: 'watchtower', name: 'Tour de guet', category: 'Renseignement', description: 'Surveille la route et les terres sèches.', requires: ['palisade'], level: 1, cost: 180, baseIncome: 5, baseVisitors: 1, benefit: 'Les menaces sont repérées plus tôt.', candidates: watchCandidates },
  { id: 'tannery', name: 'Tannerie', category: 'Artisanat', description: 'Transforme les peaux et fournit cuir, courroies et protections.', requires: ['workshop'], level: 4, cost: 210, baseIncome: 24, baseVisitors: 1, benefit: 'Le camp développe une production marchande.', candidates: genericCandidates('tannery', ['Bice Renarde', 'Sisto Corbeau', 'Mina Fouine'], ['Licae — volpe rossa', 'Corbea — corvo', 'Mustacea — faina']) },
  { id: 'map-room', name: 'Salle des cartes', category: 'Commandement', description: 'Centralise cartes, rapports et décisions.', requires: ['watchtower'], level: 2, cost: 240, baseIncome: 10, baseVisitors: 2, benefit: 'Les visiteurs et les missions sont mieux orientés.', candidates: genericCandidates('map-room', ['Cassio Corbe', 'Renzo Taupe', 'Mara Rossa'], ['Corbea — corvo', 'Rodentia — topo', 'Licae — volpe rossa']) },
  { id: 'church', name: 'Chapelle', category: 'Communauté', description: 'Un lieu de recueillement pour les habitants et voyageurs.', requires: ['cabins'], level: 2, cost: 220, baseIncome: 4, baseVisitors: 5, benefit: 'Attire habitants et pèlerins, mais demande une présence constante.', candidates: genericCandidates('church', ['Sœur Alba', 'Frère Neri', 'Pia Croyante'], ['Striga — gufo', 'Corbea — corvo', 'Felide — gatto']) },
  { id: 'infirmary', name: 'Infirmerie', category: 'Communauté', description: 'Soigne les blessés et les ouvriers.', requires: ['cabins', 'forge'], level: 3, cost: 260, baseIncome: 0, baseVisitors: 2, benefit: 'Les habitants récupèrent plus sûrement après un incident.', candidates: genericCandidates('infirmary', ['Dottoressa Ilaria', 'Marta Soigneuse', 'Tullio Herboriste'], ['Felide — gatto', 'Mustacea — tasso', 'Rodentia — topo']) },
  { id: 'stone-wall', name: 'Muraille de pierre', category: 'Défense', description: 'Remplace la palissade par une enceinte capable de tenir un siège.', requires: ['workshop', 'watchtower'], level: 4, cost: 600, baseIncome: 0, baseVisitors: 0, benefit: 'Défense de fin de campagne.', candidates: genericCandidates('stone-wall', ['Livia Pierreferme', 'Orazio Brun', 'Cesare Maçon'], ['Mustacea — tasso', 'Urcida — orso bruno', 'Urcida — orso bruno']) },
  { id: 'artificer', name: 'Laboratoire d’artificier', category: 'End game', description: 'Un atelier rare pour expérimenter poudres, mécanismes et défenses.', requires: ['forge', 'map-room'], level: 4, cost: 520, baseIncome: 38, baseVisitors: 1, benefit: 'Débloque des solutions exceptionnelles pour le final.', candidates: genericCandidates('artificer', ['Dottor Vero', 'Milo Inventeur', 'Nerina Curieuse'], ['Corbea — corvo', 'Rodentia — topo', 'Felide — gatto']) },
];

export const CAMPO_CONSTRUCTIONS = constructions;
export const CAMPO_STARTING_IDS = ['tents', 'palisade'];

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
  const availableConstructions = computed(() => constructions.filter((construction) => !builtIds.value.includes(construction.id) && construction.requires.every((id) => builtIds.value.includes(id)) && gold.value >= construction.cost));
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
    if (!construction || isBuilt(id) || gold.value < construction.cost || !construction.requires.every(isBuilt)) return false;
    gold.value -= construction.cost;
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

  return { builtIds, assignments, day, gold, population, builtConstructions, availableConstructions, dailyIncome, dailyVisitors, populationGrowth, isBuilt, build, demolish, assignNpc, advanceDay, addGold, addPopulation };
}
