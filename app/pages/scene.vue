<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import {
  DIFFICULTY_TIERS,
  ARMOR_OPTIONS,
  WEAPON_OPTIONS,
  useScenes,
  type GeneratedEnemy,
  type SceneType,
} from '../composables/useScenes';

const {
  scenes,
  activeSceneId,
  selectScene,
  createScene,
  setDifficultyTier,
  setInteractionCount,
  recordSuccess,
  recordFailure,
  spendAvversite,
  resolveScene,
  resetProgress,
  updateScene,
  updateGeneratedEnemy,
  changeGeneratedEnemyProfile,
  generateEnemyName,
  deleteScene,
  adversityStock,
  adversityTotal,
  updateAdversityStock,
  generateEnemies,
} = useScenes();

const typeLabels: Record<SceneType, string> = {
  libre: 'Séquence libre',
  narration: 'Séquence de narration',
  conflit: 'Séquence de conflit',
};

const draft = reactive({
  name: '',
  type: 'narration' as SceneType,
  playerCount: 4,
  difficultyTierId: 'base',
  useFailureThreshold: false,
});

const activeScene = computed(() => scenes.value.find((scene) => scene.id === activeSceneId.value) ?? null);
const scenesOpen = ref(true);
const selectedEnemyIndex = ref(0);
const displayedEnemyIndex = computed(() => Math.min(selectedEnemyIndex.value, Math.max(0, (activeScene.value?.generatedEnemies.length ?? 1) - 1)));
const adversityAvailable = computed(() => Math.max(0, adversityTotal() - adversityStock.value.spent));

function previousEnemy() {
  selectedEnemyIndex.value = Math.max(0, displayedEnemyIndex.value - 1);
}

function nextEnemy() {
  const lastIndex = Math.max(0, (activeScene.value?.generatedEnemies.length ?? 1) - 1);
  selectedEnemyIndex.value = Math.min(lastIndex, displayedEnemyIndex.value + 1);
}

function regenerateEnemies(id: string) {
  generateEnemies(id);
  selectedEnemyIndex.value = 0;
}

function submitCreate() {
  const scene = createScene({
    name: draft.name,
    type: draft.type,
    playerCount: draft.playerCount,
    difficultyTierId: draft.difficultyTierId,
    failureThreshold: draft.useFailureThreshold ? Math.floor(draft.playerCount / 2) + 1 : null,
  });
  if (scene) draft.name = '';
}

function statusLabel(status: string) {
  if (status === 'reussie') return 'Réussie';
  if (status === 'echouee') return 'Échouée';
  return 'En cours';
}

const weaponTranslations: Record<string, string> = {
  Accetta: 'Hachette', Bastone: 'Bâton', Giavellotto: 'Javelot', Lancia: 'Lance', Martello: 'Marteau',
  'Pugnale o Stiletto': 'Dague ou stylet', Randello: 'Gourdin', Spadino: 'Épée fine', Mazza: 'Masse',
  Arco: 'Arc', 'Balestra Leggera': 'Arbalète légère', Cerbottana: 'Sarbacane', Frombola: 'Fronde',
  'Ascia da Battaglia': 'Hache de bataille', 'Martello d’Armi': "Marteau d'armes", 'Spada da Lato': 'Épée de côté',
  Spadone: 'Espadon', 'Scure da Guerra': 'Hache de guerre', Azza: 'Hache d’arme', Brandistocco: 'Brandistoc',
  Cinquedea: 'Cinquedea', Falcione: 'Fauchon', Manosinistra: 'Main gauche', Mazzafrusto: 'Fléau',
  Mazzapicco: 'Marteau-pic', 'Picco d’Armi': 'Pic d’armes', Sciabola: 'Sabre', Spada: 'Épée',
  'Spada Bastarda': 'Épée bâtarde', Spezzalama: 'Brise-lame', 'Stella del Mattino': 'Étoile du matin',
  Striscia: 'Rapière', Trilama: 'Trilame', Voulge: 'Vouge', 'Zweihänder': 'Zweihänder',
  'Arco Ricurvo': 'Arc recourbé', 'Balestra a Mano': 'Arbalète de poing', 'Balestra Pesante': 'Arbalète lourde',
};

const armorTranslations: Record<string, string> = {
  Gambesone: 'Gambison', 'Tabarda Imbottita': 'Tabard rembourré', Brigantina: 'Brigandine',
  'Giaco di Maglia': 'Cotte de mailles', 'Maglia di Ferro': 'Maille de fer', Cuirass: 'Cuirasse',
  'Armatura Lamellare': 'Armure lamellaire', Corazzina: 'Corset d’armure', "Cotta d'Arme": 'Cotte d’armes',
  'Usbergo Rinforzato': 'Haubert renforcé', 'Armatura a Piastre': 'Armure à plaques',
  Brocchiero: 'Bocle', Scudo: 'Bouclier', Tavolaccio: 'Pavois de bois', Palvese: 'Pavois',
};

function weaponLabel(name: string) {
  return weaponTranslations[name] ?? name;
}

function armorLabel(name: string) {
  return armorTranslations[name] ?? name;
}

const spellDetails: Record<string, { description: string; effect: string; damage: string }> = {
  'Poigne électrique': { description: 'Une décharge frappe une créature au contact.', effect: 'Sur une touche, la cible ne peut plus utiliser sa réaction jusqu’à son prochain tour.', damage: '1d8 dégâts de foudre.' },
  'Trait de feu': { description: 'Un projectile de flammes vise une créature à distance.', effect: 'Attaque magique à distance contre une cible.', damage: '1d10 dégâts de feu.' },
  'Sauver les mourants': { description: 'Le lanceur stabilise une créature à l’agonie.', effect: 'La cible cesse de faire des jets contre la mort.', damage: 'Aucun dégât.' },
  'Héroïsme': { description: 'Le lanceur inspire une créature alliée.', effect: 'La cible devient immunisée à la peur et reçoit des PV temporaires tant que le sort agit.', damage: 'Aucun dégât.' },
  'Fausse vie': { description: 'Le lanceur s’entoure d’une réserve vitale artificielle.', effect: 'Accorde des PV temporaires.', damage: 'Aucun dégât.' },
  'Agrandir/Rétrécir': { description: 'La taille d’une créature ou d’un objet est modifiée.', effect: 'Accorde un avantage narratif lié à la taille, ou impose une gêne selon le choix.', damage: 'Aucun dégât direct.' },
  Lenteur: { description: 'Le mouvement et les réactions d’une cible sont ralentis.', effect: 'Réduit ses possibilités d’action et gêne ses attaques.', damage: 'Aucun dégât direct.' },
  Rapidité: { description: 'Une créature alliée est accélérée.', effect: 'Améliore sa mobilité et ses défenses pendant la durée du sort.', damage: 'Aucun dégât.' },
  Amitié: { description: 'Le lanceur adopte une attitude persuasive envers une créature.', effect: 'Facilite temporairement les interactions sociales.', damage: 'Aucun dégât.' },
  'Moquerie cruelle': { description: 'Une insulte magique déstabilise une cible qui l’entend.', effect: 'La cible est gênée sur sa prochaine action offensive.', damage: 'Dégâts psychiques selon la résolution du sort.' },
  'Charme-personne': { description: 'Le lanceur tente de rendre une créature humanoïde amicale.', effect: 'Modifie temporairement l’attitude de la cible.', damage: 'Aucun dégât.' },
  Injonction: { description: 'Un ordre bref impose une action immédiate.', effect: 'La cible suit l’ordre si elle échoue à sa résistance mentale.', damage: 'Aucun dégât direct.' },
  'Détection des pensées': { description: 'Le lanceur perçoit les pensées superficielles d’une créature.', effect: 'Révèle des intentions ou permet une investigation mentale plus profonde.', damage: 'Aucun dégât.' },
  'Mains brûlantes': { description: 'Une nappe de flammes jaillit des mains du lanceur.', effect: 'Touche les créatures dans une zone rapprochée.', damage: '3d6 dégâts de feu, réduits en cas de réussite au jet de sauvegarde.' },
  'Rayon ardent': { description: 'Des rayons de feu frappent des cibles choisies.', effect: 'Plusieurs attaques magiques à distance.', damage: '2d6 dégâts de feu par rayon.' },
  'Boule de feu': { description: 'Une explosion embrase une zone autour d’un point choisi.', effect: 'Toutes les créatures dans la zone doivent résister à l’explosion.', damage: '8d6 dégâts de feu, moitié en cas de réussite.' },
  'Mur de feu': { description: 'Une barrière de flammes brûle une zone et en interdit le passage.', effect: 'Inflige des dégâts aux créatures qui traversent ou terminent leur tour près du mur.', damage: '5d8 dégâts de feu.' },
  'Rayon de givre': { description: 'Un rayon de glace frappe une créature à distance.', effect: 'Réduit la vitesse de la cible jusqu’au prochain tour du lanceur.', damage: '1d8 dégâts de froid.' },
  'Contact glacial': { description: 'Une main spectrale glaciale agrippe une cible.', effect: 'La cible ne peut pas récupérer de PV jusqu’au prochain tour du lanceur.', damage: '1d8 dégâts nécrotiques.' },
  'Image miroir': { description: 'Des doubles illusoires entourent le lanceur.', effect: 'Les attaques peuvent toucher une image au lieu du lanceur, ce qui améliore sa protection.', damage: 'Aucun dégât.' },
  'Restauration mineure': { description: 'Une énergie réparatrice soigne une altération corporelle.', effect: 'Met fin à une maladie ou à une condition parmi les plus courantes.', damage: 'Aucun dégât.' },
  'Rafale de vent': { description: 'Un courant violent repousse les créatures dans une ligne.', effect: 'Repousse et ralentit les cibles qui résistent mal au vent.', damage: 'Aucun dégât direct.' },
  Lévitation: { description: 'Une créature ou un objet s’élève dans les airs.', effect: 'Permet un déplacement vertical et rend certaines positions inaccessibles.', damage: 'Aucun dégât.' },
  Fracassement: { description: 'Une vibration sonore destructrice frappe les objets et créatures.', effect: 'Endommage les structures fragiles dans la zone.', damage: '3d8 dégâts de tonnerre.' },
  'Peau de pierre': { description: 'La peau du lanceur devient dure comme la roche.', effect: 'Réduit les dégâts physiques reçus ; dans ce projet, cela améliore le dé de défense d’un palier.', damage: 'Aucun dégât.' },
  'Projectile magique': { description: 'Des projectiles de force atteignent automatiquement leurs cibles.', effect: 'Les projectiles peuvent être répartis entre plusieurs créatures.', damage: '1d4 + 1 dégâts de force par projectile.' },
  Invisibilité: { description: 'Le lanceur ou une cible devient invisible.', effect: 'Facilite la discrétion et gêne les attaques qui ciblent directement la créature.', damage: 'Aucun dégât.' },
  Ténèbres: { description: 'Une zone d’obscurité surnaturelle masque la vue.', effect: 'Bloque la vision ordinaire dans la zone.', damage: 'Aucun dégât.' },
  'Altérer soi-même': { description: 'Le lanceur modifie son apparence physique.', effect: 'Il adapte ses traits, sa taille apparente ou ses caractéristiques visibles pour tromper une observation.', damage: 'Aucun dégât.' },
  'Aura de vie': { description: 'Une aura protectrice entoure les alliés proches.', effect: 'Les créatures choisies dans l’aura résistent mieux à la mort et aux effets qui réduisent leurs points de vie maximum.', damage: 'Aucun dégât.' },
  'Interdiction à la mort': { description: 'Une créature est protégée contre la mort imminente.', effect: 'Empêche ou retarde un effet qui tuerait directement la cible ; la protection se déclenche une seule fois.', damage: 'Aucun dégât.' },
  'Animer les objets': { description: 'Des objets proches s’animent et obéissent au lanceur.', effect: 'Chaque objet agit comme un serviteur temporaire et peut se déplacer ou attaquer selon sa forme.', damage: 'Dégâts physiques selon l’objet animé.' },
  Contagion: { description: 'Une maladie magique s’attaque au corps d’une créature touchée.', effect: 'La cible résiste à la maladie ; en cas d’échec, elle subit une condition durable jusqu’à guérison.', damage: 'Aucun dégât immédiat ; affaiblissement progressif.' },
  'Apaiser les émotions': { description: 'Le lanceur calme les émotions dans une zone.', effect: 'Réduit la peur ou l’hostilité et peut interrompre une escalade émotionnelle.', damage: 'Aucun dégât.' },
  Clairvoyance: { description: 'Le lanceur observe ou écoute un lieu à distance.', effect: 'Crée un point sensoriel invisible permettant de surveiller une zone connue.', damage: 'Aucun dégât.' },
  Envoi: { description: 'Le lanceur transmet un message mental à une créature connue.', effect: 'La cible peut répondre brièvement, même si elle se trouve très loin.', damage: 'Aucun dégât.' },
  Confusion: { description: 'Une magie désordonne les pensées des créatures dans une zone.', effect: 'Chaque cible doit résister mentalement ou agir de manière imprévisible pendant la durée du sort.', damage: 'Aucun dégât direct.' },
  'Œil arcanique': { description: 'Un œil magique invisible explore les environs.', effect: 'Le lanceur peut déplacer le capteur et voir dans toutes les directions.', damage: 'Aucun dégât.' },
  'Dominer une personne': { description: 'Le lanceur impose sa volonté à une créature humanoïde.', effect: 'La cible résiste mentalement ; en cas d’échec, elle suit les ordres et peut refaire un jet lorsqu’elle subit un préjudice.', damage: 'Aucun dégât direct.' },
  Scrutation: { description: 'Le lanceur observe une créature ou un lieu à distance.', effect: 'La cible peut résister à la surveillance ; en cas d’échec, le lanceur perçoit ses actions pendant la durée du sort.', damage: 'Aucun dégât.' },
  'Produire une flamme': { description: 'Une petite flamme apparaît dans la main du lanceur.', effect: 'Elle éclaire, peut être transportée et peut enflammer un objet inflammable au contact.', damage: 'Aucun dégât direct.' },
  'Imposer la peur': { description: 'Le lanceur projette une image terrifiante sur une créature.', effect: 'La cible résiste mentalement ou devient effrayée et doit s’éloigner de la source de sa peur.', damage: 'Aucun dégât.' },
  'Chauffer le métal': { description: 'Un objet métallique devient brûlant.', effect: 'Une créature qui le porte doit lâcher l’objet ou subir la douleur ; maintenir le contact perturbe ses actions.', damage: 'Dégâts de feu à chaque tour de contact.' },
  'Protection contre l’énergie': { description: 'Une créature reçoit une protection contre un type d’énergie choisi.', effect: 'Réduit de moitié les dégâts du type choisi pendant la durée du sort.', damage: 'Aucun dégât.' },
  'Bouclier de feu': { description: 'Des flammes entourent le lanceur sans le brûler.', effect: 'Accorde une résistance au froid ou au feu et inflige une brûlure aux créatures qui le touchent au corps à corps.', damage: 'Dégâts de feu à l’attaquant au contact.' },
  'Frappe enflammée': { description: 'Une colonne de flammes frappe une zone depuis le ciel.', effect: 'Les créatures dans la zone résistent à l’explosion.', damage: 'Dégâts de feu, moitié en cas de réussite au jet de sauvegarde.' },
  'Invoquer un élémentaire de feu': { description: 'Un élémentaire de feu apparaît et combat pour le lanceur.', effect: 'La créature invoquée agit à son tour et obéit aux ordres simples.', damage: 'Dégâts de feu selon les attaques de l’élémentaire.' },
  'Créer ou détruire l’eau': { description: 'Le lanceur crée ou retire une quantité importante d’eau.', effect: 'Remplit un récipient, étanche une réserve ou assèche une zone d’eau non magique.', damage: 'Aucun dégât.' },
  'Nuage de brume': { description: 'Un brouillard dense remplit une zone.', effect: 'La visibilité y est fortement réduite ; les créatures peuvent s’y dissimuler.', damage: 'Aucun dégât.' },
  'Marcher sur l’eau': { description: 'Le lanceur permet aux créatures choisies de rester à la surface d’un liquide.', effect: 'Les cibles se déplacent sur l’eau comme sur un sol ferme.', damage: 'Aucun dégât.' },
  'Respirer sous l’eau': { description: 'Les créatures choisies peuvent respirer sous l’eau.', effect: 'Permet aussi de conserver leur capacité à parler sous la surface.', damage: 'Aucun dégât.' },
  'Contrôler l’eau': { description: 'Le lanceur déplace et façonne une masse d’eau.', effect: 'Modifie le courant, crée une vague ou ouvre temporairement un passage.', damage: 'Dégâts possibles selon la forme de l’eau et la décision du MJ.' },
  Dessiccation: { description: 'La magie retire l’humidité du corps d’une créature.', effect: 'La cible résiste à l’effet qui l’affaiblit et peut être ralentie par la déshydratation.', damage: 'Dégâts nécrotiques.' },
  'Invoquer un élémentaire d’eau': { description: 'Un élémentaire d’eau apparaît et combat pour le lanceur.', effect: 'La créature invoquée agit à son tour et obéit aux ordres simples.', damage: 'Dégâts contondants ou de froid selon les attaques de l’élémentaire.' },
  'Restauration supérieure': { description: 'Une énergie réparatrice soigne une altération grave.', effect: 'Met fin à plusieurs affections importantes, comme une maladie, un malus durable ou un épuisement.', damage: 'Aucun dégât.' },
  Guidance: { description: 'Le lanceur guide une créature dans une tâche précise.', effect: 'La cible ajoute un bonus magique à un test avant la fin du sort.', damage: 'Aucun dégât.' },
  'Interdiction aux lames': { description: 'Une protection invisible détourne les armes.', effect: 'La cible améliore sa défense contre les attaques physiques jusqu’à la fin du sort.', damage: 'Aucun dégât.' },
  'Chute amortie': { description: 'Le sort ralentit la chute de plusieurs créatures.', effect: 'Les cibles descendent sans subir les dégâts d’une chute normale.', damage: 'Aucun dégât de chute.' },
  'Pas rapide': { description: 'Le déplacement d’une créature est accéléré.', effect: 'La cible gagne en mobilité et peut franchir plus facilement une zone dangereuse.', damage: 'Aucun dégât.' },
  'Forme gazeuse': { description: 'Une créature devient un nuage de vapeur.', effect: 'Elle traverse les ouvertures étroites, flotte et résiste aux dégâts physiques.', damage: 'Aucun dégât.' },
  'Tempête de grêle': { description: 'Une averse de grêlons tombe sur une zone.', effect: 'La zone devient difficile à traverser et les créatures doivent résister à l’impact.', damage: 'Dégâts contondants et de froid.' },
  'Liberté de mouvement': { description: 'Une créature se déplace sans être entravée.', effect: 'Ignore les terrains difficiles et résiste aux effets qui immobilisent ou ralentissent.', damage: 'Aucun dégât.' },
  'Tempête de glace': { description: 'Une tempête de glace frappe une zone étendue.', effect: 'La zone devient dangereuse et les créatures doivent résister à la grêle et au froid.', damage: 'Dégâts contondants et de froid.' },
  'Cône de froid': { description: 'Un cône de froid glacial jaillit du lanceur.', effect: 'Les créatures dans le cône résistent à l’explosion de froid.', damage: 'Dégâts de froid, moitié en cas de réussite au jet de sauvegarde.' },
  'Mur de force': { description: 'Une paroi de force invisible bloque un passage.', effect: 'Elle est infranchissable par les moyens ordinaires et peut être façonnée en panneaux.', damage: 'Aucun dégât direct.' },
  'Gourdin enchanté': { description: 'Un gourdin ou un bâton devient une arme magique.', effect: 'L’arme utilise la caractéristique magique du lanceur et ses dégâts augmentent.', damage: 'Dégâts de l’arme, augmentés par l’enchantement.' },
  Résistance: { description: 'Le lanceur protège une créature contre un danger précis.', effect: 'La cible réduit ou évite un effet dangereux si elle réussit sa résistance.', damage: 'Aucun dégât.' },
  Enchevêtrement: { description: 'Des plantes et des racines jaillissent du sol.', effect: 'Les créatures dans la zone résistent ou deviennent entravées ; le terrain reste difficile.', damage: 'Aucun dégât direct.' },
  'Onde tonnante': { description: 'Une onde sonore éclate autour du lanceur.', effect: 'Les créatures proches doivent résister ou être repoussées ; les objets fragiles peuvent tomber.', damage: 'Dégâts de tonnerre.' },
  'Peau d’écorce': { description: 'La peau d’une créature prend l’aspect d’une écorce protectrice.', effect: 'Le dé de défense de la cible ne peut pas être inférieur à D8 tant que le sort agit.', damage: 'Aucun dégât.' },
  'Se fondre dans la pierre': { description: 'Une créature entre dans une surface de pierre.', effect: 'Elle y reste cachée, perçoit les vibrations proches et peut en sortir avant la fin du sort.', damage: 'Aucun dégât.' },
  'Glyphe de protection': { description: 'Le lanceur inscrit un piège magique sur une surface ou un objet.', effect: 'Le glyphe se déclenche lorsqu’une créature non autorisée l’active.', damage: 'Dégâts ou effet du sort stocké dans le glyphe.' },
  'Façonner la pierre': { description: 'La pierre est modelée par la magie.', effect: 'Crée, ouvre ou referme une forme simple dans une masse de pierre.', damage: 'Aucun dégât direct.' },
  'Mur de pierre': { description: 'Des panneaux de pierre forment une barrière.', effect: 'Le mur bloque une zone et peut être façonné avec des ouvertures ou des angles.', damage: 'Aucun dégât direct.' },
  'Onde destructrice': { description: 'Une vibration massive frappe les créatures proches.', effect: 'Les cibles résistent à l’onde et les objets fragiles peuvent être détruits.', damage: 'Dégâts de tonnerre.' },
  'Illusion mineure': { description: 'Le lanceur crée un petit son ou une image immobile.', effect: 'L’illusion dure brièvement et peut distraire ou tromper une observation attentive.', damage: 'Aucun dégât.' },
  Lumière: { description: 'Un objet émet une lumière claire.', effect: 'Éclaire la zone jusqu’à la fin du sort ; le lanceur peut déplacer la source en touchant un nouvel objet.', damage: 'Aucun dégât.' },
  'Image silencieuse': { description: 'Une image illusoire apparaît dans une zone visible.', effect: 'L’illusion peut être déplacée et manipulée pour tromper la vue.', damage: 'Aucun dégât.' },
  'Arme spirituelle': { description: 'Une arme de force apparaît et attaque à distance.', effect: 'Le lanceur la déplace et lui ordonne une attaque à chaque tour.', damage: 'Dégâts de force.' },
  'Rayon lunaire': { description: 'Un rayon de lumière frappe une colonne de terrain.', effect: 'Le lanceur peut déplacer le rayon et révéler certaines formes cachées.', damage: 'Dégâts radiants, augmentés contre certaines créatures.' },
  'Lumière du jour': { description: 'Une lumière intense remplit une large zone.', effect: 'Dissipe les ténèbres ordinaires et gêne les créatures sensibles à la lumière.', damage: 'Aucun dégât direct.' },
  'Trame hypnotique': { description: 'Des motifs lumineux captivent les créatures dans une zone.', effect: 'Les cibles qui échouent à résister sont charmées et incapables d’agir tant qu’elles ne sont pas réveillées.', damage: 'Aucun dégât.' },
  'Localiser une créature': { description: 'Le lanceur perçoit la direction d’une créature connue.', effect: 'La distance et les obstacles peuvent empêcher ou brouiller la détection.', damage: 'Aucun dégât.' },
  'Terrain illusoire': { description: 'Une illusion transforme l’apparence d’un terrain étendu.', effect: 'Masque un chemin, crée un obstacle apparent ou dissimule un lieu.', damage: 'Aucun dégât.' },
  'Immobiliser un monstre': { description: 'Une créature est paralysée par une contrainte magique.', effect: 'La cible résiste mentalement au début de ses tours pour mettre fin à l’immobilisation.', damage: 'Aucun dégât.' },
  Semblant: { description: 'Le lanceur modifie l’apparence de plusieurs créatures.', effect: 'Les cibles prennent une apparence cohérente jusqu’à ce qu’une inspection révèle la supercherie.', damage: 'Aucun dégât.' },
  'Frappe précise': { description: 'Le lanceur marque une cible pour guider une attaque.', effect: 'La prochaine attaque contre la cible bénéficie d’une précision accrue.', damage: 'Dégâts de l’attaque ; le sort n’ajoute pas de dégâts directs.' },
  'Déflagration occulte': { description: 'Un trait d’énergie occulte frappe une cible à distance.', effect: 'Le lanceur effectue une attaque magique à distance.', damage: 'Dégâts occultes.' },
  'Se déguiser': { description: 'Le lanceur change son apparence pendant un court moment.', effect: 'Modifie les traits visibles, la tenue et la silhouette ; une inspection peut révéler l’illusion.', damage: 'Aucun dégât.' },
  'Serviteur invisible': { description: 'Une force invisible accomplit des tâches simples.', effect: 'Le serviteur porte, ouvre, nettoie ou manipule des objets sans combattre.', damage: 'Aucun dégât.' },
  Peur: { description: 'Une manifestation terrifiante effraie les créatures dans une zone.', effect: 'Les cibles qui échouent à résister lâchent éventuellement ce qu’elles tiennent et fuient.', damage: 'Aucun dégât.' },
  Exil: { description: 'Le lanceur tente de retirer une créature du plan actuel.', effect: 'La cible résiste ; en cas d’échec, elle disparaît temporairement et peut être renvoyée ailleurs.', damage: 'Aucun dégât direct.' },
  'Invisibilité supérieure': { description: 'Une créature devient invisible malgré ses actions.', effect: 'Elle reste invisible même en attaquant ou en lançant des sorts, jusqu’à la fin de la durée.', damage: 'Aucun dégât.' },
  'Passe-muraille': { description: 'Une ouverture traverse temporairement un mur.', effect: 'Les créatures peuvent franchir la paroi par le passage créé.', damage: 'Aucun dégât.' },
  Rêve: { description: 'Le lanceur envoie un message ou une vision dans le sommeil d’une créature.', effect: 'La cible reçoit le rêve et peut répondre ou subir une vision perturbante.', damage: 'Dégâts psychiques si le rêve est hostile.' },
};

function getSpellDetail(spell: string) {
  return spellDetails[spell] ?? {
    description: `${spell} est connu par ce lanceur, mais sa fiche détaillée n’est pas disponible.`,
    effect: 'Consulter le manuel avant de résoudre ce sort.',
    damage: 'Non précisé.',
  };
}

function selectWeapon(enemy: GeneratedEnemy) {
  const weapon = WEAPON_OPTIONS.find((option) => option.name === enemy.mainWeapon);
  if (!weapon) return;
  enemy.weaponDamage = weapon.damage;
  enemy.weaponEffect = weapon.properties;
  if (activeSceneId.value) updateGeneratedEnemy(activeSceneId.value, enemy.id, {
    mainWeapon: enemy.mainWeapon,
    weaponDamage: enemy.weaponDamage,
    weaponEffect: enemy.weaponEffect,
  });
}

function selectArmor(enemy: GeneratedEnemy) {
  const armor = ARMOR_OPTIONS.find((option) => option.name === enemy.armor);
  if (!armor) return;
  enemy.armorValue = armor.ca <= 1 ? 'D6' : armor.ca <= 11 ? 'D6' : armor.ca <= 12 ? 'D8' : armor.ca <= 14 ? 'D10' : armor.ca <= 16 ? 'D12' : 'D20';
  enemy.armorEffect = armor.properties;
  enemy.stats.defenseDie = enemy.armorValue;
  if (activeSceneId.value) updateGeneratedEnemy(activeSceneId.value, enemy.id, {
    armor: enemy.armor,
    armorValue: enemy.armorValue,
    armorEffect: enemy.armorEffect,
    stats: { ...enemy.stats },
  });
}
</script>

<template>
  <section>
    <p><NuxtLink to="/">&larr; Retour à l’accueil</NuxtLink></p>
    <h1>Gestion de scène</h1>
    <p :class="$style.intro">
      Préparez une séquence (libre, narration ou conflit) en choisissant le nombre d’interactions à surmonter
      et la difficulté des épreuves, puis suivez sa progression en jeu.
    </p>

    <details :class="$style.help">
      <summary>Comment choisir la difficulté et utiliser les adversités ?</summary>
      <div :class="$style.helpContent">
        <p><strong>Nombre d'épreuves :</strong> pour une séquence de narration, le manuel conseille une épreuve par joueur. Le groupe agit à tour de rôle et chaque réussite contribue à l'objectif. Vous pouvez augmenter ce nombre si la scène doit durer davantage.</p>
        <p><strong>Difficulté :</strong> choisissez le dé selon la situation : plus le dé est grand, plus l'action est difficile. La base utilise un D8, puis les adversités font progresser vers D10, D12, D20 et D100. Le coût en PV reste celui de la scène : 1, 2, 6, 10 ou 15 PV par épreuve selon le palier.</p>
        <p><strong>Réserve du MJ :</strong> le MJ dispose de 3 adversités par heure de jeu, plus 3 par rang de l'aventure. Elles servent à rendre une séquence plus exigeante, pas seulement à augmenter le dé.</p>
        <ul>
          <li>En narration : augmenter le dé, augmenter le coût en PV, ajouter des épreuves (la moitié des joueurs) ou ajouter un indicateur d'échec.</li>
          <li>En conflit : améliorer le profil d'un adversaire, ajouter un effet de terrain, activer une capacité, augmenter le rang de tous les participants ou ajouter 2 adversaires de base.</li>
        </ul>
        <p class="hint">Conseil : gardez la difficulté de base pour une scène ordinaire et dépensez les adversités lorsque les choix des joueurs ou la fiction justifient une complication.</p>
      </div>
    </details>

    <section :class="$style.stock">
      <div>
        <p :class="$style.eyebrow">Ressource du maître de jeu</p>
        <h2>Réserve d'adversités</h2>
        <p :class="$style.stockValue"><strong>{{ adversityAvailable }}</strong> / {{ adversityTotal() }} disponibles</p>
        <p :class="$style.hint">Le total est calculé avec 3 adversités par heure de jeu et 3 par rang d'aventure.</p>
      </div>
      <div :class="$style.stockForm">
        <label>Heures de jeu
          <input type="number" min="0" :value="adversityStock.hours" @change="updateAdversityStock({ hours: +($event.target as HTMLInputElement).value })">
        </label>
        <label>Rang de l'aventure
          <input type="number" min="0" :value="adversityStock.rank" @change="updateAdversityStock({ rank: +($event.target as HTMLInputElement).value })">
        </label>
      </div>
    </section>

    <form :class="$style.create" @submit.prevent="submitCreate">
      <div :class="$style.formGrid">
        <label>Nom de la scène
          <input v-model="draft.name" type="text" required maxlength="80" placeholder="Ex. Fuite dans la Fossa Verde">
        </label>
        <label>Type de séquence
          <select v-model="draft.type">
            <option value="libre">Séquence libre</option>
            <option value="narration">Séquence de narration</option>
            <option value="conflit">Séquence de conflit</option>
          </select>
        </label>
        <label>Nombre de joueurs
          <input v-model.number="draft.playerCount" type="number" min="1" max="12">
        </label>
        <label>Difficulté
          <select v-model="draft.difficultyTierId">
            <option v-for="tier in DIFFICULTY_TIERS" :key="tier.id" :value="tier.id">
              {{ tier.label }} — {{ tier.die }} ({{ tier.costPv }} PV)
            </option>
          </select>
        </label>
      </div>
      <label :class="$style.checkbox">
        <input v-model="draft.useFailureThreshold" type="checkbox">
        Ajouter un indicateur d'échec (la scène se termine si les échecs atteignent la moitié des joueurs + 1)
      </label>
      <button type="submit" :disabled="!draft.name.trim()">Créer la scène</button>
    </form>

    <div v-if="scenes.length" :class="[$style.layout, scenesOpen && $style.layoutMenuOpen]">
      <aside :class="[$style.sidebar, !scenesOpen && $style.sidebarCollapsed]">
        <button type="button" :class="$style.menuToggle" :aria-expanded="scenesOpen" aria-controls="scene-list" @click="scenesOpen = !scenesOpen">
          <span aria-hidden="true">☰</span>
          <span v-if="scenesOpen">Vos scènes</span>
          <span v-else :class="$style.srOnly">Afficher les scènes</span>
        </button>
        <div v-if="scenesOpen" id="scene-list" :class="$style.sceneList">
          <button
            v-for="scene in scenes"
            :key="scene.id"
            type="button"
            :class="[$style.sceneButton, activeSceneId === scene.id && $style.selected]"
            @click="selectScene(scene.id)"
          >
            <strong>{{ scene.name }}</strong>
            <span>{{ typeLabels[scene.type] }} · {{ statusLabel(scene.status) }}</span>
          </button>
        </div>
      </aside>

      <div v-if="activeScene" :class="$style.content">
        <header :class="$style.sceneHeader">
          <div>
            <p :class="$style.eyebrow">{{ typeLabels[activeScene.type] }}</p>
            <h2>{{ activeScene.name }}</h2>
          </div>
          <button type="button" :class="$style.danger" @click="deleteScene(activeScene.id)">Supprimer</button>
        </header>

        <section :class="$style.settings">
          <h3>Réglages</h3>
          <div :class="$style.formGrid">
            <label>Nombre d'épreuves
              <input
                type="number"
                min="1"
                :value="activeScene.interactionCount"
                @change="setInteractionCount(activeScene.id, +($event.target as HTMLInputElement).value)"
              >
            </label>
            <label>Difficulté
              <select :value="activeScene.difficultyTierId" @change="setDifficultyTier(activeScene.id, ($event.target as HTMLSelectElement).value)">
                <option v-for="tier in DIFFICULTY_TIERS" :key="tier.id" :value="tier.id">
                  {{ tier.label }} — {{ tier.die }} ({{ tier.costPv }} PV)
                </option>
              </select>
            </label>
          </div>
          <p :class="$style.hint">
            Dé {{ activeScene.die }}, coût de {{ activeScene.costPv }} PV par épreuve.
            <template v-if="activeScene.failureThreshold != null">
              La scène échoue à {{ activeScene.failureThreshold }} échecs.
            </template>
          </p>
        </section>

        <section v-if="activeScene.type === 'conflit'" :class="$style.settings">
          <h3>Adversaires</h3>
          <div :class="$style.formGrid">
            <label>Adversaires de base
              <input type="number" min="0" :value="activeScene.baseAdversaries" @change="updateScene(activeScene.id, { baseAdversaries: +($event.target as HTMLInputElement).value })">
            </label>
            <label>Adversaires supplémentaires (adversités)
              <input type="number" min="0" step="2" :value="activeScene.extraAdversaries" @change="updateScene(activeScene.id, { extraAdversaries: +($event.target as HTMLInputElement).value })">
            </label>
          </div>
          <label :class="$style.checkbox">
            <input type="checkbox" :checked="activeScene.gradeIncrease" @change="updateScene(activeScene.id, { gradeIncrease: ($event.target as HTMLInputElement).checked })">
            Augmenter d'1 le rang de tous les participants (1 adversité)
          </label>
          <div :class="$style.generator">
            <div>
              <strong>Générateur de groupe</strong>
              <p :class="$style.hint">Crée {{ activeScene.baseAdversaries + activeScene.extraAdversaries }} profils standards avec des statistiques adaptées au rang de la scène.</p>
            </div>
            <button type="button" @click="regenerateEnemies(activeScene.id)">Générer les ennemis</button>
          </div>
          <div v-if="activeScene.generatedEnemies.length" :class="$style.enemyGrid">
            <aside :class="$style.enemySidebar">
              <h4>Adversaires</h4>
              <button
                v-for="(enemyOption, enemyIndex) in activeScene.generatedEnemies"
                :key="enemyOption.id"
                type="button"
                :class="[$style.enemyListButton, displayedEnemyIndex === enemyIndex && $style.selected]"
                @click="selectedEnemyIndex = enemyIndex"
              >
                <strong>{{ enemyOption.name }}</strong>
                <span>{{ enemyOption.profile }}</span>
              </button>
            </aside>
            <div :class="$style.enemyDetail">
              <div :class="$style.enemyNavigation">
                <button type="button" :disabled="displayedEnemyIndex === 0" @click="previousEnemy">← Précédent</button>
                <strong>Adversaire {{ displayedEnemyIndex + 1 }} / {{ activeScene.generatedEnemies.length }}</strong>
                <button type="button" :disabled="displayedEnemyIndex === activeScene.generatedEnemies.length - 1" @click="nextEnemy">Suivant →</button>
              </div>
              <article v-for="enemy in activeScene.generatedEnemies.slice(displayedEnemyIndex, displayedEnemyIndex + 1)" :key="enemy.id" :class="$style.enemyCard">
              <div :class="$style.enemyHeader">
                <div :class="$style.enemyNameLine">
                  <strong>{{ enemy.name }}</strong>
                  <button type="button" :class="$style.secondaryButton" title="Générer un nouveau nom" @click="generateEnemyName(activeScene.id, enemy.id)">Nouveau nom</button>
                </div>
                <span>{{ enemy.profile }}</span>
              </div>
              <div :class="$style.enemyMeta">
                <label>Profil
                  <select v-model="enemy.profile" @change="changeGeneratedEnemyProfile(activeScene.id, enemy.id, enemy.profile)">
                    <option>Assaillant</option><option>Gardien</option><option>Lanceur de sorts</option><option>Spécialiste</option>
                  </select>
                </label>
                <span>Rang : <strong>{{ enemy.grade }}</strong></span>
              </div>
              <fieldset>
                <legend>Statistiques</legend>
                <div :class="$style.statGrid">
                  <span v-for="key in ['for', 'dex', 'con', 'int', 'sag', 'cha']" :key="key"><strong>{{ key.toUpperCase() }}</strong> {{ enemy.stats[key as keyof typeof enemy.stats] }}</span>
                  <span><strong>Dé</strong> {{ enemy.stats.defenseDie }}</span>
                </div>
                <div :class="$style.enemyMeta">
                  <label>PV actuels
                    <input v-model.number="enemy.stats.pv" type="number" min="0" :max="enemy.stats.pvMax" @change="updateGeneratedEnemy(activeScene.id, enemy.id, { stats: { ...enemy.stats } })">
                  </label>
                  <span>PV maximum <strong>{{ enemy.stats.pvMax }}</strong></span>
                </div>
              </fieldset>
              <fieldset>
                <legend>Arme principale</legend>
                <label>Arme
                  <select v-model="enemy.mainWeapon" @change="selectWeapon(enemy)">
                    <option v-for="weapon in WEAPON_OPTIONS" :key="weapon.name" :value="weapon.name">{{ weaponLabel(weapon.name) }}</option>
                  </select>
                </label>
                <span>Dégâts : <strong>{{ enemy.weaponDamage }}</strong></span>
                <span>Propriétés : {{ enemy.weaponEffect }}</span>
              </fieldset>
              <fieldset v-if="enemy.profile === 'Lanceur de sorts'">
                <legend>Magie</legend>
                <div :class="$style.spellGrid">
                  <div><strong>Secret maîtrisé</strong><span>{{ enemy.secret }}</span></div>
                  <div><strong>Résumé du Secret</strong><span>{{ enemy.spellEffect }}</span></div>
                  <div><strong>Types de dégâts possibles</strong><span>{{ enemy.spellDamage }}</span></div>
                  <div><strong>Utilisations</strong><span>{{ enemy.spellUses }}</span></div>
                </div>
                <div :class="$style.spellList">
                  <strong>Sorts connus</strong>
                  <details v-for="spell in enemy.knownSpells.split(' ; ').filter(Boolean)" :key="spell">
                    <summary>{{ spell }}</summary>
                    <div :class="$style.spellDetail">
                      <p>{{ getSpellDetail(spell).description }}</p>
                      <p><strong>Effet :</strong> {{ getSpellDetail(spell).effect }}</p>
                      <p><strong>Dégâts :</strong> {{ getSpellDetail(spell).damage }}</p>
                      <p><strong>Utilisations :</strong> {{ enemy.spellUses }}</p>
                    </div>
                  </details>
                </div>
              </fieldset>
              <fieldset>
                <legend>Armure</legend>
                <label>Armure ou bouclier
                  <select v-model="enemy.armor" @change="selectArmor(enemy)">
                    <option v-for="armor in ARMOR_OPTIONS" :key="armor.name" :value="armor.name">{{ armorLabel(armor.name) }}</option>
                  </select>
                </label>
                <span>Dé de protection : <strong>{{ enemy.armorValue }}</strong></span>
                <span>Propriétés : {{ enemy.armorEffect }}</span>
              </fieldset>
              <div><strong>Équipement :</strong> {{ enemy.equipment }}</div>
              <div><strong>Compétences :</strong> {{ enemy.skills }}</div>
              <div><strong>Sorts :</strong> {{ enemy.spells || 'Aucun sort' }}</div>
              <div :class="$style.stateGrid">
                <fieldset>
                  <legend>Blessures</legend>
                  <label v-for="(_, injuryIndex) in enemy.injuries" :key="`injury-${injuryIndex}`">
                    <input v-model="enemy.injuries[injuryIndex]" type="checkbox" @change="updateGeneratedEnemy(activeScene.id, enemy.id, { injuries: [...enemy.injuries] as [boolean, boolean, boolean] })">
                    Blessure {{ injuryIndex + 1 }}
                  </label>
                </fieldset>
                <fieldset>
                  <legend>Épuisements</legend>
                  <label v-for="(_, exhaustionIndex) in enemy.exhaustion" :key="`exhaustion-${exhaustionIndex}`">
                    <input v-model="enemy.exhaustion[exhaustionIndex]" type="checkbox" @change="updateGeneratedEnemy(activeScene.id, enemy.id, { exhaustion: [...enemy.exhaustion] as [boolean, boolean, boolean] })">
                    Épuisement {{ exhaustionIndex + 1 }}
                  </label>
                </fieldset>
              </div>
              </article>
            </div>
          </div>
        </section>

        <section :class="$style.progress">
          <h3>Progression</h3>
          <p :class="$style.counters">
            Réussites : <strong>{{ activeScene.successes }}</strong> / {{ activeScene.interactionCount }}
            &nbsp;·&nbsp; Échecs : <strong>{{ activeScene.failures }}</strong>
            &nbsp;·&nbsp; Adversités dépensées : <strong>{{ activeScene.avversitesSpent }}</strong>
          </p>
          <p :class="$style.hint">Une adversité ajoutée augmente le nombre d'épreuves de la moitié des joueurs ; en conflit, elle ajoute 2 adversaires de base.</p>
          <div :class="$style.actions">
            <button type="button" @click="recordSuccess(activeScene.id)">+ Réussite</button>
            <button type="button" @click="recordFailure(activeScene.id)">+ Échec</button>
            <button type="button" :disabled="adversityAvailable < 1" @click="spendAvversite(activeScene.id, 1)">+ 1 adversité</button>
            <button type="button" @click="resetProgress(activeScene.id)">Réinitialiser</button>
          </div>
          <p :class="[$style.status, $style[activeScene.status]]">Statut : {{ statusLabel(activeScene.status) }}</p>
          <div v-if="activeScene.status === 'active'" :class="$style.actions">
            <button type="button" @click="resolveScene(activeScene.id, 'reussie')">Clore en réussite</button>
            <button type="button" :class="$style.danger" @click="resolveScene(activeScene.id, 'echouee')">Clore en échec</button>
          </div>
        </section>

        <section>
          <h3>Notes</h3>
          <textarea
            :value="activeScene.notes"
            rows="5"
            maxlength="4000"
            placeholder="Obstacles rencontrés, accroches narratives, conséquences..."
            @change="updateScene(activeScene.id, { notes: ($event.target as HTMLTextAreaElement).value })"
          ></textarea>
        </section>
      </div>
    </div>
    <p v-else :class="$style.empty">Aucune scène pour le moment. Créez votre première scène ci-dessus.</p>
  </section>
</template>

<style module>
.intro, .hint, .empty { color: var(--muted); }
.stock { display: flex; justify-content: space-between; gap: 1.5rem; margin: 1.5rem 0; background: var(--panel); border: 1px solid #4a3a28; border-radius: 6px; padding: 1rem; }
.stock h2 { margin: .15rem 0; }
.stockValue { margin: .35rem 0; font-size: 1.2rem; color: var(--accent); }
.stockForm { display: grid; grid-template-columns: repeat(2, minmax(7rem, 10rem)); gap: .75rem; align-items: end; }
.stockForm label { display: flex; flex-direction: column; gap: .25rem; }
.help { margin: 1.5rem 0; border: 1px solid #4a3a28; border-radius: 6px; background: var(--panel); }
.help summary { padding: .85rem 1rem; color: var(--accent); font-weight: bold; cursor: pointer; }
.helpContent { padding: 0 1rem 1rem; color: var(--muted); line-height: 1.5; }
.helpContent p { margin: .75rem 0; }
.helpContent strong { color: var(--text); }
.helpContent ul { padding-left: 1.25rem; }
.create { display: flex; flex-direction: column; gap: 1rem; margin: 1.5rem 0; background: var(--panel); border: 1px solid #4a3a28; border-radius: 6px; padding: 1rem; }
.formGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .75rem; }
.formGrid label, .create > label { display: flex; flex-direction: column; gap: .25rem; }
.checkbox { display: flex; flex-direction: row; align-items: center; gap: .5rem; }
input, select, textarea { min-width: 0; background: var(--bg); color: var(--text); border: 1px solid #4a3a28; border-radius: 4px; padding: .55rem .65rem; font: inherit; }
textarea { resize: vertical; line-height: 1.45; width: 100%; }
input:focus, select:focus, textarea:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
button { background: var(--accent); color: #1c150f; border: 1px solid var(--accent); border-radius: 4px; padding: .5rem .75rem; font: inherit; font-weight: bold; cursor: pointer; }
button:disabled { opacity: .45; cursor: default; }
.layout { position: relative; display: block; }
.sidebar { position: absolute; z-index: 3; top: 0; left: 0; display: flex; width: min(15rem, calc(100% - 1rem)); flex-direction: column; gap: .5rem; padding: .5rem; background: var(--panel); border: 1px solid #4a3a28; border-radius: 6px; box-shadow: 0 .75rem 2rem rgb(0 0 0 / 25%); }
.sidebarCollapsed { width: 3.25rem; }
.menuToggle { display: flex; align-items: center; justify-content: flex-start; gap: .55rem; width: 100%; background: var(--panel); color: var(--text); border-color: #4a3a28; }
.menuToggle span:first-child { font-size: 1.15rem; line-height: 1; }
.sidebarCollapsed .menuToggle { justify-content: center; padding-inline: .55rem; }
.sceneList { display: flex; flex-direction: column; gap: .5rem; }
.srOnly { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.sidebar h2, .content h2, .content h3 { margin-top: 0; }
.sceneButton { display: flex; flex-direction: column; align-items: flex-start; gap: .15rem; background: var(--panel); color: var(--text); border-color: #4a3a28; text-align: left; }
.sceneButton span { color: var(--muted); font-size: .8rem; font-weight: normal; }
.sceneButton.selected { border-color: var(--accent); box-shadow: inset 3px 0 var(--accent); }
.content { width: 100%; min-width: 0; box-sizing: border-box; display: flex; flex-direction: column; gap: 1.5rem; padding-left: 4.5rem; }
.layoutMenuOpen .content { padding-left: 16rem; }
.sceneHeader { display: flex; justify-content: space-between; align-items: start; gap: 1rem; }
.eyebrow { margin: 0; color: var(--muted); font-size: .8rem; text-transform: uppercase; letter-spacing: .08em; }
.sceneHeader h2 { margin-bottom: 0; }
.danger { background: transparent; color: #e3a39a; border-color: #7e4a42; }
.settings, .progress { background: var(--panel); border: 1px solid #4a3a28; border-radius: 6px; padding: 1rem; }
.generator { display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #4a3a28; }
.generator p { margin-bottom: 0; }
.enemyGrid { display: grid; grid-template-columns: minmax(12rem, 15rem) minmax(0, 1fr); gap: 1rem; margin-top: 1rem; align-items: start; }
.enemySidebar { display: flex; flex-direction: column; gap: .5rem; min-width: 0; }
.enemySidebar h4 { margin: 0; color: var(--accent); }
.enemyListButton { display: flex; flex-direction: column; align-items: flex-start; gap: .15rem; width: 100%; background: var(--panel); color: var(--text); border-color: #4a3a28; text-align: left; }
.enemyListButton span { color: var(--muted); font-size: .8rem; }
.enemyListButton.selected { border-color: var(--accent); box-shadow: inset 3px 0 var(--accent); }
.enemyDetail { display: flex; flex-direction: column; gap: .75rem; min-width: 0; }
.enemyNavigation { display: flex; justify-content: space-between; align-items: center; gap: .75rem; }
.enemySelector { display: flex; flex: 1; max-width: 28rem; flex-direction: column; gap: .2rem; color: var(--muted); font-size: .8rem; }
.enemyCard { display: flex; flex-direction: column; gap: .8rem; min-width: 0; background: var(--bg); border: 1px solid #4a3a28; border-radius: 4px; padding: 1rem; line-height: 1.4; }
.enemyCard label { display: flex; flex-direction: column; gap: .2rem; color: var(--muted); font-size: .8rem; }
.enemyCard input, .enemyCard textarea, .enemyCard select { width: 100%; box-sizing: border-box; padding: .4rem .5rem; font-size: .85rem; }
.enemyCard fieldset { display: flex; flex-direction: column; gap: .55rem; min-width: 0; margin: 0; padding: .7rem; border: 1px solid #4a3a28; }
.enemyCard legend { padding: 0 .3rem; color: var(--accent); font-size: .85rem; }
.enemyHeader { display: flex; flex-direction: column; gap: .35rem; padding-bottom: .25rem; border-bottom: 1px solid #4a3a28; }
.enemyNameLine { display: flex; justify-content: space-between; align-items: center; gap: .75rem; }
.enemyHeader input { color: var(--text); font-weight: bold; }
.enemyHeader span { color: var(--accent); font-size: .85rem; }
.secondaryButton { padding: .3rem .5rem; background: transparent; color: var(--accent); font-size: .75rem; }
.enemyMeta { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .5rem; }
.statGrid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .4rem; }
.statGrid span { display: block; padding: .35rem .25rem; background: var(--panel); border-radius: 3px; text-align: center; font-size: .85rem; }
.stateGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .65rem; }
.stateGrid label { flex-direction: row; align-items: center; gap: .45rem; }
.stateGrid input[type='checkbox'] { width: 1rem; height: 1rem; }
.spellGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .7rem; }
.spellGrid div { display: flex; flex-direction: column; gap: .2rem; }
.spellGrid div:last-child { grid-column: 1 / -1; }
.spellGrid strong { color: var(--muted); font-size: .78rem; }
.spellList { display: flex; flex-direction: column; gap: .4rem; margin-top: .8rem; }
.spellList > strong { color: var(--muted); font-size: .78rem; }
.spellList details { border: 1px solid #4a3a28; border-radius: 3px; background: var(--panel); }
.spellList summary { padding: .45rem .55rem; color: var(--text); cursor: pointer; font-weight: bold; }
.spellDetail { padding: .1rem .65rem .45rem; color: var(--muted); font-size: .82rem; }
.spellDetail p { margin: .35rem 0; }
.spellDetail strong { color: var(--text); }
.counters { margin-top: 0; }
.actions { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: .75rem; }
.status { font-weight: bold; }
.status.reussie { color: #8fce8f; }
.status.echouee { color: #e3a39a; }
@media (max-width: 48rem) {
  .stock, .generator { flex-direction: column; align-items: stretch; }
  .stockForm { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .layout { display: block; }
  .layoutMenuOpen .content { padding-left: 4.5rem; }
  .sidebar { display: grid; grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr)); }
  .sidebar h2 { grid-column: 1 / -1; }
  .formGrid { grid-template-columns: 1fr; }
  .enemyGrid { grid-template-columns: 1fr; }
  .enemySidebar { order: 0; }
  .enemyDetail { order: 1; }
  .enemyNavigation { flex-wrap: wrap; }
  .statGrid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .spellGrid { grid-template-columns: 1fr; }
  .spellGrid div:last-child { grid-column: auto; }
}
</style>
