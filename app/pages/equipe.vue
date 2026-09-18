<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { usePlayerTeams, type PlayerCharacter } from '../composables/usePlayerTeams';
import { DEFAULT_ACTOR_IMAGE, useProjectionController } from '../composables/useProjection';

const { teams, activeTeam, addTeam, renameTeam, deleteTeam, selectTeam, addCharacter, deleteCharacter } = usePlayerTeams();
const { state: projectionState } = useProjectionController();
const newTeamName = ref('');
const editingName = ref('');
const statKeys = ['for', 'dex', 'con', 'int', 'sag', 'cha', 'pv', 'ca'];
const statLabels: Record<string, string> = { for: 'FOR', dex: 'DEX', con: 'CON', int: 'INT', sag: 'SAG', cha: 'CHA', pv: 'PV', ca: 'CA' };
const speciesOptions = [
  { family: 'Canida', species: ['chiens courants', 'dogues', 'chiens domestiques', 'lévriers', 'chiens primitifs'] },
  { family: 'Edenta', species: ['tatous', 'paresseux', 'fourmiliers', 'pangolins'] },
  { family: 'Eulipa', species: ['hérissons', 'taupes', 'musaraignes'] },
  { family: 'Felide', species: ['chats', 'lynx', 'pumas'] },
  { family: 'Licae', species: ['coyotes', 'loups', 'renards roux'] },
  { family: 'Mustacea', species: ['gloutons', 'loutres', 'martres', 'moufettes', 'ratons laveurs', 'blaireaux'] },
  { family: 'Rodentia', species: ['castors', 'lapins', 'porcs-épics', 'écureuils', 'souris'] },
  { family: 'Ruminsa', species: ['élans', 'bovins', 'chèvres', 'cerfs', 'moutons'] },
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
const characterDraft = reactive<Omit<PlayerCharacter, 'id'>>({
  name: '', family: '', species: '', className: '', level: '', background: '', image: '',
  stats: Object.fromEntries(statKeys.map((key) => [key, ''])),
});

const allSpecies = computed(() => speciesOptions.flatMap((option) => option.species.map((species) => ({ family: option.family, species }))));

function onCharacterImageSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file || !file.type.startsWith('image/') || file.size > 4 * 1024 * 1024) return;
  const reader = new FileReader();
  reader.addEventListener('load', () => { characterDraft.image = typeof reader.result === 'string' ? reader.result : ''; });
  reader.readAsDataURL(file);
}

function setFamilyFromSpecies() {
  characterDraft.family = allSpecies.value.find((option) => option.species === characterDraft.species)?.family ?? '';
}

function createTeam() {
  const team = addTeam(newTeamName.value);
  if (team) { newTeamName.value = ''; editingName.value = team.name; }
}

function saveName() {
  if (activeTeam.value) renameTeam(activeTeam.value.id, editingName.value);
}

function addPlayerCharacter() {
  if (!activeTeam.value || !characterDraft.name.trim()) return;
  addCharacter(activeTeam.value.id, {
    ...characterDraft,
    name: characterDraft.name.trim(), species: characterDraft.species.trim(),
    family: characterDraft.family.trim(), className: characterDraft.className.trim(), level: characterDraft.level.trim(),
    background: characterDraft.background.trim(), stats: { ...characterDraft.stats },
  });
  resetCharacterDraft();
}

function resetCharacterDraft() {
  characterDraft.name = ''; characterDraft.family = ''; characterDraft.species = ''; characterDraft.className = '';
  characterDraft.level = ''; characterDraft.background = '';
  characterDraft.image = '';
  for (const key of statKeys) characterDraft.stats[key] = '';
}

function removeActiveTeam() {
  if (activeTeam.value) { deleteTeam(activeTeam.value.id); editingName.value = ''; }
}

function projectCharacter(character: PlayerCharacter) {
  if (!activeTeam.value) return;
  const actor = { id: `team-player:${activeTeam.value.id}:${character.id}`, name: character.name, image: character.image || DEFAULT_ACTOR_IMAGE, collection: 'npcs' as const };
  if (!projectionState.value.actors.some((item) => item.id === actor.id)) projectionState.value.actors = [...projectionState.value.actors, actor];
}
</script>

<template>
  <section>
    <p><NuxtLink to="/">&larr; Retour à l’accueil</NuxtLink></p>
    <h1>Équipe de joueurs</h1>
    <p :class="$style.intro">Créez les fiches de vos personnages joueurs et retrouvez leurs notes dans leur contexte d’équipe.</p>

    <form :class="$style.create" @submit.prevent="createTeam">
      <label for="new-team">Ajouter une équipe</label>
      <div :class="$style.formRow"><input id="new-team" v-model="newTeamName" type="text" placeholder="Ex. Les Veilleurs" maxlength="80"><button type="submit" :disabled="!newTeamName.trim()">Créer l’équipe</button></div>
    </form>

    <div v-if="teams.length" :class="$style.layout">
      <aside :class="$style.sidebar">
        <h2>Vos équipes</h2>
        <button v-for="team in teams" :key="team.id" type="button" :class="[$style.teamButton, activeTeam?.id === team.id && $style.selected]" @click="selectTeam(team.id); editingName = team.name">
          <strong>{{ team.name }}</strong><span>{{ team.characters.length }} personnage{{ team.characters.length > 1 ? 's' : '' }}</span>
        </button>
      </aside>

      <div v-if="activeTeam" :class="$style.content">
        <header :class="$style.teamHeader"><div><p :class="$style.eyebrow">Équipe active</p><h2>{{ activeTeam.name }}</h2></div><div :class="$style.headerActions"><NuxtLink to="/creation-npc" :class="$style.actionLink">Créer un PNJ</NuxtLink><button type="button" :class="$style.danger" @click="removeActiveTeam">Supprimer</button></div></header>
        <form :class="$style.rename" @submit.prevent="saveName"><label for="team-name">Nom de l’équipe</label><div :class="$style.formRow"><input id="team-name" v-model="editingName" type="text" maxlength="80"><button type="submit">Renommer</button></div></form>

        <section :class="$style.sheetSection">
          <h3>Créer un personnage pour cette équipe</h3>
          <p :class="$style.hint">La fiche est privée à l’équipe active et reste disponible hors ligne.</p>
          <form :class="$style.characterForm" @submit.prevent="addPlayerCharacter">
            <div :class="$style.formGrid">
              <label>Nom<input v-model="characterDraft.name" type="text" required maxlength="80" placeholder="Nom du personnage"></label>
              <label>Espèce<select v-model="characterDraft.species" required @change="setFamilyFromSpecies"><option value="">Choisir une espèce</option><option v-for="option in allSpecies" :key="option.species" :value="option.species">{{ option.species }} ({{ option.family }})</option></select></label>
              <label>Familia<input :value="characterDraft.family || 'Choisie automatiquement'" readonly></label>
              <label>Classe<input v-model="characterDraft.className" type="text" maxlength="80" placeholder="Classe et spécialité"></label>
              <label>Niveau<input v-model="characterDraft.level" type="text" maxlength="20" placeholder="Ex. 3"></label>
            </div>
            <fieldset><legend>Statistiques</legend><div :class="$style.statsGrid"><label v-for="key in statKeys" :key="key">{{ statLabels[key] }}<input v-model="characterDraft.stats[key]" type="text" maxlength="10"></label></div></fieldset>
            <label>Background<textarea v-model="characterDraft.background" rows="5" maxlength="4000" placeholder="Origine, liens, objectifs, histoire..."></textarea></label>
            <div :class="$style.portraitTools">
              <label>Image du joueur<input type="file" accept="image/*" @change="onCharacterImageSelected"></label>
              <div v-if="characterDraft.image" :class="$style.preview"><img :src="characterDraft.image" alt="Aperçu de l’image du joueur"><span>Image prête pour la projection.</span></div>
            </div>
            <button type="submit" :disabled="!characterDraft.name.trim()">Ajouter la fiche à l’équipe</button>
          </form>
        </section>

        <section><h3>Fiches de l’équipe</h3><p v-if="!activeTeam.characters.length" :class="$style.hint">Aucun personnage joueur n’a encore été ajouté.</p><div v-else :class="$style.characterGrid">
          <article v-for="character in activeTeam.characters" :key="character.id" :class="$style.characterCard">
            <header :class="$style.cardHeader"><div :class="$style.characterIdentity"><img :src="character.image || DEFAULT_ACTOR_IMAGE" :alt="`Portrait de ${character.name}`" :class="$style.avatar"><div><h4>{{ character.name }}</h4><p>{{ [character.family, character.species, character.className, character.level && `Niveau ${character.level}`].filter(Boolean).join(' · ') || 'Fiche sans détails' }}</p></div></div><div :class="$style.cardActions"><button type="button" :class="$style.mini" @click="projectCharacter(character)">Projeter</button><button type="button" :class="$style.miniDanger" title="Supprimer cette fiche" @click="deleteCharacter(activeTeam.id, character.id)">Supprimer</button></div></header>
            <table v-if="Object.values(character.stats).some(Boolean)"><tbody><tr><th v-for="key in statKeys" :key="key">{{ statLabels[key] }}</th></tr><tr><td v-for="key in statKeys" :key="key">{{ character.stats[key] || '—' }}</td></tr></tbody></table>
            <p v-if="character.background" :class="$style.background">{{ character.background }}</p>
          </article>
        </div></section>
      </div>
    </div>
    <p v-else :class="$style.empty">Aucune équipe pour le moment. Créez votre première équipe ci-dessus.</p>
  </section>
</template>

<style module>
.intro, .hint, .empty { color: var(--muted); }
.create, .rename { display: flex; flex-direction: column; gap: .45rem; margin: 1.5rem 0; }
.formRow { display: flex; gap: .5rem; }
input, textarea, select { min-width: 0; background: var(--bg); color: var(--text); border: 1px solid #4a3a28; border-radius: 4px; padding: .55rem .65rem; font: inherit; }
.formRow input { flex: 1; } textarea { resize: vertical; line-height: 1.45; }
input:focus, textarea:focus, select:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
button { background: var(--accent); color: #1c150f; border: 1px solid var(--accent); border-radius: 4px; padding: .5rem .75rem; font: inherit; font-weight: bold; cursor: pointer; }
button:disabled { opacity: .45; cursor: default; }
.inputAction { display: flex; gap: .4rem; } .inputAction input { flex: 1; min-width: 0; }
.secondary { background: transparent; color: var(--accent); }
.layout { display: grid; grid-template-columns: minmax(10rem, 15rem) 1fr; gap: 2rem; align-items: start; }
.sidebar { display: flex; flex-direction: column; gap: .5rem; } .sidebar h2, .content h2, .content h3 { margin-top: 0; }
.teamButton { display: flex; flex-direction: column; align-items: flex-start; gap: .15rem; background: var(--panel); color: var(--text); border-color: #4a3a28; text-align: left; }
.teamButton span { color: var(--muted); font-size: .8rem; font-weight: normal; } .teamButton.selected { border-color: var(--accent); box-shadow: inset 3px 0 var(--accent); }
.content { min-width: 0; } .teamHeader, .cardHeader { display: flex; justify-content: space-between; align-items: start; gap: 1rem; }
.cardActions { display: flex; gap: .35rem; }
.headerActions { display: flex; align-items: center; gap: .5rem; } .actionLink { color: var(--accent); border: 1px solid var(--accent); border-radius: 4px; padding: .45rem .65rem; text-decoration: none; font-size: .85rem; }
.eyebrow { margin: 0; color: var(--muted); font-size: .8rem; text-transform: uppercase; letter-spacing: .08em; } .teamHeader h2, .cardHeader h4 { margin-bottom: 0; }
.danger, .miniDanger { background: transparent; color: #e3a39a; border-color: #7e4a42; } .miniDanger { padding: .25rem .45rem; font-size: .8rem; }
.sheetSection { margin-bottom: 2rem; } .characterForm { display: flex; flex-direction: column; gap: 1rem; background: var(--panel); border: 1px solid #4a3a28; border-radius: 6px; padding: 1rem; }
.formGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .75rem; } .formGrid label, .characterForm > label { display: flex; flex-direction: column; gap: .25rem; }
fieldset { border: 1px solid #4a3a28; padding: .75rem; } legend { color: var(--accent); padding: 0 .35rem; }
.statsGrid { display: grid; grid-template-columns: repeat(8, minmax(0, 1fr)); gap: .45rem; } .statsGrid label { display: flex; flex-direction: column; gap: .25rem; color: var(--muted); font-size: .8rem; }
.portraitTools { display: flex; align-items: center; flex-wrap: wrap; gap: .75rem; }
.preview { display: flex; align-items: center; gap: .6rem; color: var(--muted); font-size: .85rem; }
.preview img, .avatar { width: 4.5rem; height: 4.5rem; object-fit: cover; border-radius: 50%; border: 1px solid var(--accent); }
.characterGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr)); gap: 1rem; } .characterCard { background: var(--panel); border: 1px solid #4a3a28; border-radius: 6px; padding: 1rem; }
.characterIdentity { display: flex; align-items: center; gap: .7rem; min-width: 0; } .characterIdentity .avatar { width: 3.25rem; height: 3.25rem; flex: 0 0 auto; }
.cardHeader p { margin: .25rem 0 0; color: var(--muted); font-size: .85rem; } .characterCard table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
.characterCard th, .characterCard td { border: 1px solid #4a3a28; padding: .3rem; text-align: center; font-size: .8rem; } .characterCard th { color: var(--accent); }
.background { white-space: pre-wrap; overflow-wrap: anywhere; }
@media (max-width: 48rem) { .layout { grid-template-columns: 1fr; gap: 1rem; } .sidebar { display: grid; grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr)); } .sidebar h2 { grid-column: 1 / -1; } .formGrid, .statsGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
</style>
