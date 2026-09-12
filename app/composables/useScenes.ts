import { onMounted, ref } from 'vue';

export type SceneType = 'libre' | 'narration' | 'conflit';
export type SceneStatus = 'active' | 'reussie' | 'echouee';

export interface DifficultyTier {
  id: string;
  label: string;
  die: string;
  costPv: number;
  avversite: number;
}

export interface GeneratedEnemy {
  id: string;
  name: string;
  profile: 'Assaillant' | 'Gardien' | 'Lanceur de sorts' | 'Spécialiste';
  difficulty: string;
  grade: number;
  stats: {
    for: number;
    dex: number;
    con: number;
    int: number;
    sag: number;
    cha: number;
    pv: number;
    pvMax: number;
    defenseDie: string;
  };
  mainWeapon: string;
  weaponDamage: string;
  weaponEffect: string;
  armor: string;
  armorValue: string;
  armorEffect: string;
  equipment: string;
  skills: string;
  spells: string;
  secret: string;
  knownSpells: string;
  spellEffect: string;
  spellDamage: string;
  spellUses: string;
  injuries: [boolean, boolean, boolean];
  exhaustion: [boolean, boolean, boolean];
}

export const ARMOR_OPTIONS = [
  { name: 'Gambesone', ca: 12, properties: 'Légère' },
  { name: 'Tabarda Imbottita', ca: 11, properties: 'Légère, spéciale' },
  { name: 'Brigantina', ca: 12, properties: 'Légère, occultable' },
  { name: 'Giaco di Maglia', ca: 12, properties: 'Moyenne, occultable' },
  { name: 'Maglia di Ferro', ca: 13, properties: 'Impaccio, moyenne' },
  { name: 'Cuirass', ca: 14, properties: 'Impaccio, moyenne' },
  { name: 'Armatura Lamellare', ca: 14, properties: 'Aristocratique, moyenne' },
  { name: 'Corazzina', ca: 15, properties: 'Aristocratique, impaccio, moyenne' },
  { name: "Cotta d'Arme", ca: 14, properties: 'Impaccio, lourde' },
  { name: 'Usbergo Rinforzato', ca: 16, properties: 'Impaccio, lourde' },
  { name: 'Armatura a Piastre', ca: 18, properties: 'Aristocratique, impaccio, lourde' },
  { name: 'Brocchiero', ca: 1, properties: 'Bouclier, poing renforcé' },
  { name: 'Scudo', ca: 2, properties: 'Bouclier, abri' },
  { name: 'Tavolaccio', ca: 3, properties: 'Bouclier, encombrant, abri' },
  { name: 'Palvese', ca: 5, properties: 'Bouclier, encombrant, spéciale' },
];

export const WEAPON_OPTIONS = [
  { name: 'Accetta', damage: '1d6 tranchants', properties: 'Lancer (moyenne), polyvalente (1d8)' },
  { name: 'Bastone', damage: '1d6 contondants', properties: 'Polyvalente (1d8)' },
  { name: 'Giavellotto', damage: '1d6 perforants', properties: 'Lancer (moyenne), polyvalente (1d8)' },
  { name: 'Lancia', damage: '1d6 perforants', properties: 'Polyvalente (1d8)' },
  { name: 'Martello', damage: '1d4 contondants', properties: 'Lancer (courte), légère' },
  { name: 'Pugnale o Stiletto', damage: '1d4 perforants', properties: 'Légère, occultable, spéciale' },
  { name: 'Randello', damage: '1d6 contondants', properties: 'Aucune' },
  { name: 'Spadino', damage: '1d4 perforants', properties: 'Aristocratique, légère, occultable' },
  { name: 'Mazza', damage: '1d8 contondants', properties: 'Aucune' },
  { name: 'Arco', damage: '1d6 perforants', properties: 'Munitions (longue)' },
  { name: 'Balestra Leggera', damage: '1d8 perforants', properties: 'Munitions (longue), recharge' },
  { name: 'Cerbottana', damage: '1 perforant', properties: 'Munitions (courte)' },
  { name: 'Frombola', damage: '1d4 contondants', properties: 'Munitions (moyenne)' },
  { name: 'Ascia da Battaglia', damage: '1d8 tranchants', properties: 'Polyvalente (1d10)' },
  { name: 'Martello d’Armi', damage: '1d8 contondants', properties: 'Polyvalente (1d10)' },
  { name: 'Spada da Lato', damage: '1d8 tranchants', properties: 'Précise' },
  { name: 'Spadone', damage: '2d6 tranchants', properties: 'À deux mains, lourde' },
  { name: 'Scure da Guerra', damage: '1d12 tranchants', properties: 'À deux mains, lourde' },
  { name: 'Azza', damage: '1d10 tranchants', properties: 'Asta, à deux mains, lourde, portée' },
  { name: 'Brandistocco', damage: '1d10 perforants', properties: 'Asta, à deux mains, lourde, portée' },
  { name: 'Cinquedea', damage: '1d6 perforants', properties: 'Précise, aristocratique, légère, occultable' },
  { name: 'Falcione', damage: '1d10 tranchants', properties: 'Aristocratique, asta, à deux mains, lourde, portée' },
  { name: 'Manosinistra', damage: '1d4 perforants', properties: 'Précise, paire' },
  { name: 'Mazzafrusto', damage: '1d8 contondants', properties: 'Aucune' },
  { name: 'Mazzapicco', damage: '1d10 perforants', properties: 'Asta, à deux mains, lourde, portée' },
  { name: 'Picco d’Armi', damage: '1d8 perforants', properties: 'Polyvalente (1d10)' },
  { name: 'Sciabola', damage: '1d6 tranchants', properties: 'Précise, légère' },
  { name: 'Spada', damage: '1d6 tranchants', properties: 'Légère' },
  { name: 'Spada Bastarda', damage: '1d8 tranchants', properties: 'Polyvalente (1d10)' },
  { name: 'Spezzalama', damage: '1d4 tranchants', properties: 'Précise, paire, occultable, spéciale' },
  { name: 'Stella del Mattino', damage: '1d8 perforants', properties: 'Aucune' },
  { name: 'Striscia', damage: '1d8 perforants', properties: 'Précise' },
  { name: 'Trilama', damage: '1d4 perforants', properties: 'Précise, paire, spéciale' },
  { name: 'Voulge', damage: '1d10 tranchants', properties: 'Asta, à deux mains, lourde, portée' },
  { name: 'Zweihänder', damage: '1d12 tranchants', properties: 'Aristocratique, à deux mains, lourde, portée, spéciale' },
  { name: 'Arco Ricurvo', damage: '1d8 perforants', properties: 'Munitions (longue)' },
  { name: 'Balestra a Mano', damage: '1d6 perforants', properties: 'Légère, munitions (courte), recharge' },
  { name: 'Balestra Pesante', damage: '1d10 perforants', properties: 'Munitions (longue), recharge' },
];

const MAGIC_SECRETS = [
  {
    name: 'Secret du Corps',
    spells: ['Sauver les mourants', 'Poigne électrique', 'Héroïsme', 'Fausse vie', 'Altérer soi-même', 'Agrandir/Rétrécir', 'Lenteur', 'Rapidité', 'Aura de vie', 'Interdiction à la mort', 'Animer les objets', 'Contagion'],
    effect: 'Renforcement, affaiblissement et soin du corps.',
    damage: 'Foudre ou effets physiques ; les sorts de soin ne causent pas de dégâts.',
  },
  {
    name: 'Secret de l’Esprit',
    spells: ['Amitié', 'Moquerie cruelle', 'Charme-personne', 'Injonction', 'Apaiser les émotions', 'Détection des pensées', 'Clairvoyance', 'Envoi', 'Confusion', 'Œil arcanique', 'Dominer une personne', 'Scrutation'],
    effect: 'Télépathie, influence mentale, confusion et contrôle.',
    damage: 'Dégâts psychiques ponctuels ; la majorité des sorts agit sur l’esprit sans dégâts directs.',
  },
  {
    name: 'Secret du Feu',
    spells: ['Trait de feu', 'Produire une flamme', 'Imposer la peur', 'Mains brûlantes', 'Rayon ardent', 'Chauffer le métal', 'Boule de feu', 'Protection contre l’énergie', 'Mur de feu', 'Bouclier de feu', 'Frappe enflammée', 'Invoquer un élémentaire de feu'],
    effect: 'Flammes destructrices, purificatrices ou réconfortantes.',
    damage: 'Dégâts de feu ; les sorts défensifs peuvent accorder une protection contre l’énergie.',
  },
  {
    name: 'Secret de l’Eau',
    spells: ['Rayon de givre', 'Contact glacial', 'Créer ou détruire l’eau', 'Nuage de brume', 'Image miroir', 'Restauration mineure', 'Marcher sur l’eau', 'Respirer sous l’eau', 'Contrôler l’eau', 'Dessiccation', 'Invoquer un élémentaire d’eau', 'Restauration supérieure'],
    effect: 'Protection, guérison, brume, glace et maîtrise de l’eau.',
    damage: 'Dégâts de froid ; la dessiccation peut infliger des dégâts nécrotiques.',
  },
  {
    name: 'Secret de l’Air',
    spells: ['Guidance', 'Interdiction aux lames', 'Chute amortie', 'Pas rapide', 'Rafale de vent', 'Lévitation', 'Forme gazeuse', 'Tempête de grêle', 'Liberté de mouvement', 'Tempête de glace', 'Cône de froid', 'Mur de force'],
    effect: 'Mobilité, esquive, vent, froid et contrôle de l’espace.',
    damage: 'Dégâts de froid ou de force selon le sort.',
  },
  {
    name: 'Secret de la Terre',
    spells: ['Gourdin enchanté', 'Résistance', 'Enchevêtrement', 'Onde tonnante', 'Fracassement', 'Peau d’écorce', 'Se fondre dans la pierre', 'Glyphe de protection', 'Peau de pierre', 'Façonner la pierre', 'Mur de pierre', 'Onde destructrice'],
    effect: 'Résistance, entrave, pierre et protection solide.',
    damage: 'Dégâts contondants ou de tonnerre ; certains sorts renforcent la défense.',
  },
  {
    name: 'Secret de la Lumière',
    spells: ['Illusion mineure', 'Lumière', 'Projectile magique', 'Image silencieuse', 'Arme spirituelle', 'Rayon lunaire', 'Lumière du jour', 'Trame hypnotique', 'Localiser une créature', 'Terrain illusoire', 'Immobiliser un monstre', 'Semblant'],
    effect: 'Révélation, lumière, illusion et aveuglement.',
    damage: 'Dégâts de force ou radiants selon le sort.',
  },
  {
    name: 'Secret de l’Ombre',
    spells: ['Frappe précise', 'Déflagration occulte', 'Se déguiser', 'Serviteur invisible', 'Invisibilité', 'Ténèbres', 'Peur', 'Protection contre l’énergie', 'Exil', 'Invisibilité supérieure', 'Passe-muraille', 'Rêve'],
    effect: 'Dissimulation, peur, ténèbres, déplacement et tromperie.',
    damage: 'Dégâts occultes ou du type choisi par la protection contre l’énergie.',
  },
];

const NAME_FIRST_PARTS = ['Aldo', 'Bianca', 'Cassio', 'Dario', 'Ilaria', 'Livia', 'Marta', 'Nerio', 'Pietro', 'Rina'];
const NAME_SECOND_PARTS = ['la Cendre', 'Griffe-Sèche', 'du Vieux Pont', 'Œil-de-Suie', 'le Silencieux', 'des Salines', 'Cœur-Froid', 'la Brèche'];

function protectionDie(armorClass: number): string {
  if (armorClass <= 11) return 'D6';
  if (armorClass <= 12) return 'D8';
  if (armorClass <= 14) return 'D10';
  if (armorClass <= 16) return 'D12';
  if (armorClass <= 18) return 'D20';
  return 'D100';
}

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)] ?? items[0]!;
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomEnemyName() {
  return `${randomItem(NAME_FIRST_PARTS)} ${randomItem(NAME_SECOND_PARTS)}`;
}

function configureSpellcaster(enemy: GeneratedEnemy) {
  const secret = randomItem(MAGIC_SECRETS);
  const knownSpells = [...secret.spells].sort(() => Math.random() - 0.5).slice(0, 3);
  enemy.secret = secret.name;
  enemy.knownSpells = knownSpells.join(' ; ');
  enemy.spellEffect = secret.effect;
  enemy.spellDamage = secret.damage;
  enemy.spellUses = '3 utilisations de sorts avant un repos.';
  enemy.spells = enemy.knownSpells;
}

function randomizeEnemyEquipment(enemy: GeneratedEnemy) {
  const weapon = randomItem(WEAPON_OPTIONS);
  const maximumArmorClass = Math.min(18, 12 + (enemy.grade * 2));
  const availableArmor = ARMOR_OPTIONS.filter((candidate) => candidate.ca <= maximumArmorClass);
  const armor = randomItem(availableArmor);
  const rankBonus = Math.max(0, enemy.grade - 1);
  enemy.mainWeapon = weapon.name;
  enemy.weaponDamage = `${weapon.damage}${rankBonus ? `, +${rankBonus} dé${rankBonus > 1 ? 's' : ''} de dégâts au rang ${enemy.grade}` : ''}`;
  enemy.weaponEffect = weapon.properties;
  enemy.armor = armor.name;
  enemy.armorValue = protectionDie(armor.ca);
  enemy.armorEffect = armor.properties;
  enemy.stats.defenseDie = enemy.armorValue;
}

// Paliers reverse pool dice : plus le dé est grand, plus l'action est difficile.
export const DIFFICULTY_TIERS: DifficultyTier[] = [
  { id: 'base', label: 'Base', die: 'D8', costPv: 1, avversite: 0 },
  { id: 'tier1', label: '1 adversité — niv. 1-4', die: 'D10', costPv: 2, avversite: 1 },
  { id: 'tier2', label: '2 adversités — niv. 5-10', die: 'D12', costPv: 6, avversite: 2 },
  { id: 'tier3', label: '4 adversités — niv. 11-16', die: 'D20', costPv: 10, avversite: 4 },
  { id: 'tier4', label: '6 adversités — niv. 17-20', die: 'D100', costPv: 15, avversite: 6 },
];

export interface Scene {
  id: string;
  name: string;
  type: SceneType;
  createdAt: string;
  playerCount: number;
  interactionCount: number;
  difficultyTierId: string;
  die: string;
  costPv: number;
  failureThreshold: number | null;
  baseAdversaries: number;
  extraAdversaries: number;
  gradeIncrease: boolean;
  successes: number;
  failures: number;
  avversitesSpent: number;
  status: SceneStatus;
  notes: string;
  generatedEnemies: GeneratedEnemy[];
}

const STORAGE_KEY = 'rpg-scenes';
const ACTIVE_KEY = 'rpg-active-scene';
const ADVERSITY_KEY = 'rpg-adversity-stock';
const scenes = ref<Scene[]>([]);
const activeSceneId = ref<string | null>(null);
const adversityStock = ref({ hours: 3, rank: 1, spent: 0 });
let initialized = false;

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scenes.value));
    if (activeSceneId.value) localStorage.setItem(ACTIVE_KEY, activeSceneId.value);
    else localStorage.removeItem(ACTIVE_KEY);
  } catch {
    // La scène reste disponible tant que la page est ouverte.
  }
}

function initialize() {
  if (initialized) return;
  initialized = true;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsedScenes = stored ? JSON.parse(stored) as Partial<Scene>[] : [];
    scenes.value = parsedScenes.map((scene) => {
      const legacyScene = scene as Partial<Scene> & { cd?: number; costPf?: number };
      const legacyDice: Record<number, string> = { 12: 'D8', 15: 'D10', 17: 'D12', 19: 'D20', 21: 'D100' };
      return {
        ...scene,
        die: scene.die ?? legacyDice[legacyScene.cd ?? 12] ?? 'D8',
        costPv: scene.costPv ?? legacyScene.costPf ?? 1,
        generatedEnemies: (scene.generatedEnemies ?? []).map((enemy) => {
          const migrated = {
          ...enemy,
          stats: { ...enemy.stats, defenseDie: enemy.stats?.defenseDie ?? protectionDie(Number(enemy.stats?.ca ?? 12)) },
          mainWeapon: enemy.mainWeapon ?? '',
          weaponDamage: enemy.weaponDamage ?? '',
          weaponEffect: enemy.weaponEffect ?? '',
          armor: enemy.armor ?? '',
          armorValue: enemy.armorValue ?? '',
          armorEffect: enemy.armorEffect ?? '',
          equipment: enemy.equipment ?? '',
          skills: enemy.skills ?? '',
          spells: enemy.spells ?? '',
          secret: enemy.secret ?? (enemy.profile === 'Lanceur de sorts' ? '' : 'Aucun'),
          knownSpells: enemy.knownSpells ?? enemy.spells ?? '',
          spellEffect: enemy.spellEffect ?? '',
          spellDamage: enemy.spellDamage ?? '',
          spellUses: enemy.spellUses ?? '',
          injuries: enemy.injuries ?? [
            Boolean((enemy as Partial<GeneratedEnemy> & { conditions?: string[] }).conditions?.[0]),
            Boolean((enemy as Partial<GeneratedEnemy> & { conditions?: string[] }).conditions?.[1]),
            Boolean((enemy as Partial<GeneratedEnemy> & { conditions?: string[] }).conditions?.[2]),
          ],
          exhaustion: enemy.exhaustion instanceof Array ? enemy.exhaustion : [Boolean(enemy.exhaustion), false, false],
          } as GeneratedEnemy;
          if (migrated.profile === 'Lanceur de sorts' && !enemy.secret) configureSpellcaster(migrated);
          return migrated;
        }),
      };
    }) as Scene[];
    const storedStock = localStorage.getItem(ADVERSITY_KEY);
    if (storedStock) adversityStock.value = { ...adversityStock.value, ...JSON.parse(storedStock) };
    const storedActiveId = localStorage.getItem(ACTIVE_KEY);
    activeSceneId.value = scenes.value.some((scene) => scene.id === storedActiveId) ? storedActiveId : null;
  } catch {
    scenes.value = [];
    activeSceneId.value = null;
    adversityStock.value = { hours: 3, rank: 1, spent: 0 };
  }
}

export function useScenes() {
  onMounted(initialize);

  function selectScene(id: string | null) {
    activeSceneId.value = id && scenes.value.some((scene) => scene.id === id) ? id : null;
    persist();
  }

  function createScene(input: {
    name: string;
    type: SceneType;
    playerCount: number;
    difficultyTierId: string;
    failureThreshold: number | null;
  }) {
    const cleanName = input.name.trim();
    if (!cleanName) return null;
    const tier = DIFFICULTY_TIERS.find((candidate) => candidate.id === input.difficultyTierId);
    if (!tier) return null;
    const playerCount = Math.max(1, Math.round(input.playerCount) || 1);
    const scene: Scene = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: cleanName,
      type: input.type,
      createdAt: new Date().toISOString(),
      playerCount,
      interactionCount: playerCount,
      difficultyTierId: tier.id,
      die: tier.die,
      costPv: tier.costPv,
      failureThreshold: input.failureThreshold,
      baseAdversaries: 5,
      extraAdversaries: 0,
      gradeIncrease: false,
      successes: 0,
      failures: 0,
      avversitesSpent: tier.avversite,
      status: 'active',
      notes: '',
      generatedEnemies: [],
    };
    scenes.value = [...scenes.value, scene];
    activeSceneId.value = scene.id;
    updateAdversityStock({ spent: adversityStock.value.spent + tier.avversite });
    persist();
    return scene;
  }

  function updateScene(id: string, patch: Partial<Scene>) {
    scenes.value = scenes.value.map((scene) => scene.id === id ? applyStatus({ ...scene, ...patch }) : scene);
    persist();
  }

  function updateGeneratedEnemy(id: string, enemyId: string, patch: Partial<GeneratedEnemy>) {
    const scene = scenes.value.find((candidate) => candidate.id === id);
    if (!scene) return;
    updateScene(id, {
      generatedEnemies: scene.generatedEnemies.map((enemy) => enemy.id === enemyId ? { ...enemy, ...patch } : enemy),
    });
  }

  function changeGeneratedEnemyProfile(id: string, enemyId: string, profile: GeneratedEnemy['profile']) {
    const scene = scenes.value.find((candidate) => candidate.id === id);
    if (!scene) return;
    const enemies = scene.generatedEnemies.map((enemy) => {
      if (enemy.id !== enemyId) return enemy;
      const updatedEnemy = { ...enemy, profile };
      randomizeEnemyEquipment(updatedEnemy);
      if (profile === 'Lanceur de sorts') {
        configureSpellcaster(updatedEnemy);
      } else {
        updatedEnemy.secret = 'Aucun';
        updatedEnemy.knownSpells = '';
        updatedEnemy.spellEffect = '';
        updatedEnemy.spellDamage = '';
        updatedEnemy.spellUses = '';
        updatedEnemy.spells = '';
      }
      return updatedEnemy;
    });
    updateScene(id, { generatedEnemies: enemies });
  }

  function generateEnemyName(id: string, enemyId: string) {
    const scene = scenes.value.find((candidate) => candidate.id === id);
    if (!scene) return;
    updateScene(id, {
      generatedEnemies: scene.generatedEnemies.map((enemy) => enemy.id === enemyId ? { ...enemy, name: randomEnemyName() } : enemy),
    });
  }

  function updateAdversityStock(patch: Partial<typeof adversityStock.value>) {
    adversityStock.value = {
      ...adversityStock.value,
      ...patch,
      hours: Math.max(0, Math.round(patch.hours ?? adversityStock.value.hours)),
      rank: Math.max(0, Math.round(patch.rank ?? adversityStock.value.rank)),
      spent: Math.max(0, Math.round(patch.spent ?? adversityStock.value.spent)),
    };
    try { localStorage.setItem(ADVERSITY_KEY, JSON.stringify(adversityStock.value)); } catch { /* stockage indisponible */ }
  }

  function adversityTotal() {
    return (adversityStock.value.hours * 3) + (adversityStock.value.rank * 3);
  }

  function applyStatus(scene: Scene): Scene {
    if (scene.status !== 'active') return scene;
    if (scene.failureThreshold != null && scene.failures >= scene.failureThreshold) return { ...scene, status: 'echouee' };
    if (scene.successes >= scene.interactionCount) return { ...scene, status: 'reussie' };
    return scene;
  }

  function setDifficultyTier(id: string, tierId: string) {
    const tier = DIFFICULTY_TIERS.find((candidate) => candidate.id === tierId);
    const scene = scenes.value.find((candidate) => candidate.id === id);
    if (!tier || !scene) return;
    const adversityDelta = tier.avversite - (DIFFICULTY_TIERS.find((candidate) => candidate.id === scene.difficultyTierId)?.avversite ?? 0);
    if (adversityDelta > 0 && adversityStock.value.spent + adversityDelta > adversityTotal()) return;
    updateScene(id, { difficultyTierId: tier.id, die: tier.die, costPv: tier.costPv });
    if (adversityDelta !== 0) updateAdversityStock({ spent: adversityStock.value.spent + adversityDelta });
  }

  function setInteractionCount(id: string, count: number) {
    updateScene(id, { interactionCount: Math.max(1, Math.round(count) || 1) });
  }

  function recordSuccess(id: string) {
    const scene = scenes.value.find((candidate) => candidate.id === id);
    if (scene) updateScene(id, { successes: scene.successes + 1 });
  }

  function recordFailure(id: string) {
    const scene = scenes.value.find((candidate) => candidate.id === id);
    if (scene) updateScene(id, { failures: scene.failures + 1 });
  }

  function spendAvversite(id: string, amount: number) {
    const scene = scenes.value.find((candidate) => candidate.id === id);
    if (!scene || amount <= 0) return;
    if (adversityStock.value.spent + amount > adversityTotal()) return;

    const addedChallenges = Math.max(1, Math.ceil(scene.playerCount / 2));
    const patch: Partial<Scene> = {
      avversitesSpent: scene.avversitesSpent + amount,
    };
    if (scene.type === 'conflit') {
      patch.extraAdversaries = scene.extraAdversaries + (2 * amount);
    } else {
      patch.interactionCount = scene.interactionCount + (addedChallenges * amount);
    }
    updateScene(id, patch);
    updateAdversityStock({ spent: adversityStock.value.spent + amount });
  }

  function generateEnemies(id: string) {
    const scene = scenes.value.find((candidate) => candidate.id === id);
    if (!scene || scene.type !== 'conflit') return;
    const count = Math.max(1, scene.baseAdversaries + scene.extraAdversaries);
    const profiles: GeneratedEnemy['profile'][] = ['Assaillant', 'Gardien', 'Lanceur de sorts', 'Spécialiste'];
    const grade = DIFFICULTY_TIERS.findIndex((tier) => tier.id === scene.difficultyTierId) + 1;
    const enemies = Array.from({ length: count }, (_, index) => ({
      id: `${Date.now()}-${index}-${Math.random().toString(36).slice(2, 6)}`,
      name: randomEnemyName(),
      profile: randomItem(profiles),
      difficulty: DIFFICULTY_TIERS.find((tier) => tier.id === scene.difficultyTierId)?.label ?? 'Base',
      grade: scene.gradeIncrease ? grade + 1 : grade,
      stats: { for: 2, dex: 2, con: 2, int: 1, sag: 1, cha: 1, pv: 10, pvMax: 10, defenseDie: 'D8' },
      mainWeapon: '',
      weaponDamage: '5 dégâts',
      weaponEffect: '',
      armor: '',
      armorValue: '10',
      armorEffect: '',
      equipment: '',
      skills: '',
      spells: '',
      secret: 'Aucun',
      knownSpells: '',
      spellEffect: '',
      spellDamage: '',
      spellUses: '',
      injuries: [false, false, false],
      exhaustion: [false, false, false],
    }));
    for (const enemy of enemies) {
      const rankBonus = Math.max(0, enemy.grade - 1);
      randomizeEnemyEquipment(enemy);
      enemy.stats.pvMax = enemy.profile === 'Gardien' ? 24 : enemy.profile === 'Assaillant' ? 18 : enemy.profile === 'Lanceur de sorts' ? 14 : 16;
      enemy.stats.pvMax += rankBonus * 2;
      enemy.stats.pv = enemy.stats.pvMax;
      if (enemy.profile === 'Assaillant') {
        enemy.stats = { ...enemy.stats, for: 4, dex: 2, con: 3, int: 1, sag: 2, cha: 2 };
        enemy.equipment = 'Arme principale ; arme de secours';
        enemy.skills = 'Athlétisme (4) — escalade et lutte ; Intimidation (3) — faire reculer une cible.';
      } else if (enemy.profile === 'Gardien') {
        enemy.stats = { ...enemy.stats, for: 3, dex: 1, con: 4, int: 1, sag: 3, cha: 1 };
        enemy.equipment = 'Armure ; bouclier ou protection lourde';
        enemy.skills = 'Vigilance (4) — repérer une menace ; Endurance (4) — résister à une contrainte.';
      } else if (enemy.profile === 'Lanceur de sorts') {
        enemy.stats = { ...enemy.stats, for: 1, dex: 2, con: 2, int: 4, sag: 3, cha: 3 };
        enemy.equipment = 'Focaliseur ; composantes simples';
        enemy.skills = 'Concentration (4) — maintenir un sort sous pression ; Érudition (4) — identifier une magie.';
        configureSpellcaster(enemy);
      } else {
        enemy.stats = { ...enemy.stats, for: 2, dex: 4, con: 2, int: 3, sag: 3, cha: 2 };
        enemy.equipment = 'Outils spécialisés ; arme légère';
        enemy.skills = 'Discrétion (4) — se déplacer sans être vu ; Escamotage (3) — manipuler un objet ; Observation (3) — trouver un détail.';
      }
    }
    updateScene(id, { generatedEnemies: enemies });
  }

  function resolveScene(id: string, status: SceneStatus) {
    updateScene(id, { status });
  }

  function resetProgress(id: string) {
    updateScene(id, { successes: 0, failures: 0, status: 'active' });
  }

  function deleteScene(id: string) {
    const deletedScene = scenes.value.find((scene) => scene.id === id);
    scenes.value = scenes.value.filter((scene) => scene.id !== id);
    if (activeSceneId.value === id) activeSceneId.value = scenes.value[0]?.id ?? null;
    if (deletedScene) updateAdversityStock({ spent: Math.max(0, adversityStock.value.spent - deletedScene.avversitesSpent) });
    persist();
  }

  return {
    scenes,
    activeSceneId,
    adversityStock,
    adversityTotal,
    selectScene,
    createScene,
    updateScene,
    updateGeneratedEnemy,
    changeGeneratedEnemyProfile,
    generateEnemyName,
    setDifficultyTier,
    setInteractionCount,
    recordSuccess,
    recordFailure,
    spendAvversite,
    updateAdversityStock,
    generateEnemies,
    resolveScene,
    resetProgress,
    deleteScene,
  };
}
