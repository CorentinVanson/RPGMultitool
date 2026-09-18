<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { usePlayerTeams } from '../composables/usePlayerTeams';
import { DEFAULT_ACTOR_IMAGE, useProjectionController } from '../composables/useProjection';

const { activeTeam, addNpc } = usePlayerTeams();
const { state: projectionState } = useProjectionController();
const saved = ref(false);
const draft = reactive({ name: '', family: '', species: '', role: '', description: '', image: '' });

const speciesOptions = [
  { family: 'Canida', species: ['chiens courants', 'dogues', 'chiens domestiques', 'lévriers', 'chiens primitifs'] },
  { family: 'Edenta', species: ['tatous', 'paresseux', 'fourmiliers', 'pangolins'] },
  { family: 'Eulipa', species: ['hérissons', 'taupes', 'musaraignes'] },
  { family: 'Felide', species: ['chats', 'lynx', 'pumas'] },
  { family: 'Licae', species: ['coyotes', 'loups', 'renards roux'] },
  { family: 'Mustacea', species: ['gloutons', 'loutres', 'martres', 'moufettes', 'ratons laveurs', 'blaireaux'] },
  { family: 'Rodentia', species: ['castors', 'lapins', 'porcs-épics', 'écureuils', 'souris'] },
  { family: 'Ruminsa', species: ['élans', 'bovins', 'caprins', 'cerfs', 'moutons'] },
  { family: 'Sauta', species: ['sangliers', 'cochons'] },
  { family: 'Urcida', species: ['ours bruns', 'ours noirs'] },
  { family: 'Vespertile', species: ['chauves-souris', 'roussettes', 'vampires'] },
  { family: 'Ansera', species: ['canards', 'cygnes', 'oies', 'pélicans'] },
  { family: 'Corbea', species: ['corneilles', 'corbeaux', 'pies'] },
  { family: 'Grarcona', species: ['hérons', 'cigognes', 'grues', 'ibis'] },
  { family: 'Picia', species: ['moineaux', 'rouges-gorges', 'pics', 'rossignols'] },
  { family: 'Rapax', species: ['aigles', 'vautours', 'faucons'] },
  { family: 'Ruspea', species: ['faisans', 'paons', 'poules'] },
  { family: 'Striga', species: ['chouettes hulottes', 'effraies', 'chevêches', 'hiboux'] },
];

const givenNames = [
  'Ada', 'Agnese', 'Alba', 'Alda', 'Ambra', 'Anselmo', 'Argo', 'Baldassare', 'Bice', 'Bianca', 'Bruno', 'Cassio', 'Cesare', 'Ciro', 'Dario', 'Diana', 'Domenico', 'Elio', 'Ermes', 'Ezio', 'Fausto', 'Fiamma', 'Flora', 'Fosco', 'Gabriele', 'Gilda', 'Ilaria', 'Iolanda', 'Isotta', 'Lavinia', 'Lina', 'Livia', 'Lorenzo', 'Lucia', 'Mara', 'Marta', 'Matteo', 'Nardo', 'Nerina', 'Nives', 'Orsina', 'Pietro', 'Pina', 'Renzo', 'Rina', 'Sandro', 'Savia', 'Serafina', 'Silvio', 'Terenzio', 'Tullio', 'Vesta', 'Vittorio',
];
const surnames = [
  'Alba', 'Argine', 'Bastione', 'Bruma', 'Cenere', 'Corneclaire', 'Dal Moro', 'Della Riva', 'Digue', 'Ferro', 'Fossa', 'Gratigna', 'Mirea', 'Pietraferma', 'Riva', 'Salmastra', 'Sifflet', 'Sottofoglia', 'Tralcio', 'Valle', 'Vento', 'Vinaccia', 'Vespera', 'de la Curia',
];
const epithets = ['aux mains calmes', 'à la voix basse', 'des quais', 'du vieux pont', 'au manteau rouge', 'sans foyer', 'de la saulaie', 'aux yeux d’ambre', 'le patient', 'la vigilante', 'le conteur', 'la passeuse'];
const allSpecies = computed(() => speciesOptions.flatMap((option) => option.species.map((species) => ({ family: option.family, species }))));

function randomItem<T>(items: T[]): T { return items[Math.floor(Math.random() * items.length)]!; }

function randomizeName() {
  const base = `${randomItem(givenNames)} ${randomItem(surnames)}`;
  draft.name = Math.random() > .42 ? base : `${base}, ${randomItem(epithets)}`;
}

function setFamilyFromSpecies() {
  draft.family = allSpecies.value.find((option) => option.species === draft.species)?.family ?? '';
}

function onImageSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) return;
  if (file.size > 4 * 1024 * 1024) return;
  const reader = new FileReader();
  reader.addEventListener('load', () => { draft.image = typeof reader.result === 'string' ? reader.result : ''; });
  reader.readAsDataURL(file);
}

function saveNpc() {
  if (!activeTeam.value || !draft.name.trim()) return;
  addNpc(activeTeam.value.id, {
    name: draft.name.trim(), family: draft.family, species: draft.species,
    role: draft.role.trim(), description: draft.description.trim(), image: draft.image || undefined,
  });
  saved.value = true;
  draft.name = ''; draft.family = ''; draft.species = ''; draft.role = ''; draft.description = ''; draft.image = '';
}

function projectNpc(npc: { id: string; name: string; image?: string }) {
  if (!activeTeam.value) return;
  const actor = { id: `team-npc:${activeTeam.value.id}:${npc.id}`, name: npc.name, image: npc.image || DEFAULT_ACTOR_IMAGE, collection: 'npcs' as const };
  if (!projectionState.value.actors.some((item) => item.id === actor.id)) projectionState.value.actors = [...projectionState.value.actors, actor];
}
</script>

<template>
  <section>
    <p><NuxtLink to="/equipe">&larr; Retour à l’équipe</NuxtLink></p>
    <p :class="$style.eyebrow">Création rapide pendant la partie</p>
    <h1>Créer un PNJ</h1>
    <p :class="$style.intro">Ce PNJ sera enregistré uniquement dans l’équipe active. Il restera disponible hors ligne et pourra être ajouté à la projection.</p>

    <div v-if="!activeTeam" :class="$style.empty">
      <h2>Choisissez une équipe</h2>
      <p>La création de PNJ est liée à une équipe pour éviter de mélanger les données de table.</p>
      <NuxtLink to="/equipe">Gérer les équipes</NuxtLink>
    </div>

    <form v-else :class="$style.form" @submit.prevent="saveNpc">
      <p v-if="saved" :class="$style.saved" role="status">PNJ ajouté à {{ activeTeam.name }}.</p>
      <div :class="$style.formGrid">
        <label>Nom<div :class="$style.nameLine"><input v-model="draft.name" required maxlength="100" placeholder="Nom du PNJ"><button type="button" :class="$style.secondary" @click="randomizeName">Nom aléatoire</button></div></label>
        <label>Rôle<input v-model="draft.role" maxlength="100" placeholder="Marchande, témoin, guide..."></label>
        <label>Espèce<select v-model="draft.species" required @change="setFamilyFromSpecies"><option value="">Choisir une espèce</option><option v-for="option in allSpecies" :key="option.species" :value="option.species">{{ option.species }} ({{ option.family }})</option></select></label>
        <label>Familia<input :value="draft.family || 'Choisie automatiquement'" readonly></label>
      </div>
      <label>Description<textarea v-model="draft.description" rows="8" maxlength="6000" placeholder="Apparence animale, personnalité, situation, liens, informations à révéler..."></textarea></label>
      <fieldset><legend>Visuel du PNJ</legend><label :class="$style.upload">Importer une image depuis l’ordinateur<input type="file" accept="image/*" @change="onImageSelected"></label><div v-if="draft.image" :class="$style.preview"><img :src="draft.image" alt="Aperçu du portrait importé"><span>Image prête. Elle sera stockée avec l’équipe et utilisable hors ligne.</span></div><p v-else :class="$style.hint">Utilise une illustration existante du projet ou une image préparée dans le style visuel de la campagne.</p></fieldset>
      <button type="submit" :disabled="!draft.name.trim()">Ajouter ce PNJ à l’équipe</button>
    </form>

    <section v-if="activeTeam" :class="$style.existing">
      <h2>PNJ de {{ activeTeam.name }}</h2>
      <p v-if="!activeTeam.customNpcs.length" :class="$style.hint">Aucun PNJ spécifique à cette équipe.</p>
      <div v-else :class="$style.npcGrid"><article v-for="npc in activeTeam.customNpcs" :key="npc.id" :class="$style.npcCard"><img :src="npc.image || DEFAULT_ACTOR_IMAGE" :alt="npc.name"><div><h3>{{ npc.name }}</h3><p>{{ [npc.family, npc.species, npc.role].filter(Boolean).join(' · ') }}</p><p v-if="npc.description">{{ npc.description }}</p><button type="button" :class="$style.secondary" @click="projectNpc(npc)">Projeter</button></div></article></div>
    </section>
  </section>
</template>

<style module>
.eyebrow { margin: 0; color: var(--accent); font-size: .8rem; font-weight: bold; letter-spacing: .08em; text-transform: uppercase; }
.intro, .hint { color: var(--muted); max-width: 48rem; }
.form { display: flex; flex-direction: column; gap: 1rem; max-width: 55rem; margin: 2rem 0; padding: 1.25rem; background: var(--panel); border: 1px solid var(--accent); border-radius: 6px; }
.formGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
label { display: flex; flex-direction: column; gap: .35rem; } input, textarea, select { min-width: 0; background: var(--bg); color: var(--text); border: 1px solid #4a3a28; border-radius: 4px; padding: .6rem .7rem; font: inherit; } textarea { resize: vertical; line-height: 1.5; }
input:focus, textarea:focus, select:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
.nameLine { display: flex; gap: .4rem; } .nameLine input { flex: 1; }
button { background: var(--accent); color: #1c150f; border: 1px solid var(--accent); border-radius: 4px; padding: .55rem .8rem; font: inherit; font-weight: bold; cursor: pointer; } button:disabled { opacity: .5; cursor: default; }
.secondary { background: transparent; color: var(--accent); white-space: nowrap; }
fieldset { border: 1px solid #4a3a28; padding: 1rem; } legend { color: var(--accent); padding: 0 .35rem; }
.upload { color: var(--muted); } .upload input { padding: .5rem 0; border: 0; }
.preview { display: flex; align-items: center; gap: .8rem; margin-top: .8rem; color: var(--muted); } .preview img { width: 7rem; height: 7rem; object-fit: cover; border: 1px solid var(--accent); border-radius: 6px; }
.saved { margin: 0; padding: .6rem .8rem; color: #cbe5bd; background: #263b27; border-left: 3px solid #83bd77; }
.empty { margin: 2rem 0; padding: 1.25rem; background: var(--panel); border-left: 3px solid var(--accent); } .empty a { color: var(--accent); }
.existing { margin-top: 2rem; } .npcGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr)); gap: 1rem; } .npcCard { display: flex; gap: .8rem; padding: 1rem; background: var(--panel); border: 1px solid #4a3a28; border-radius: 6px; } .npcCard img { width: 5rem; height: 5rem; object-fit: cover; border-radius: 4px; } .npcCard h3, .npcCard p { margin: 0 0 .3rem; } .npcCard p { color: var(--muted); font-size: .88rem; white-space: pre-wrap; }
@media (max-width: 48rem) { .formGrid { grid-template-columns: 1fr; } .nameLine { flex-direction: column; } .preview { align-items: flex-start; flex-direction: column; } }
</style>
