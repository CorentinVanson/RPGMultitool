import { computed, onMounted, ref } from 'vue';

export interface PlayerCharacter {
  id: string;
  name: string;
  species: string;
  className: string;
  level: string;
  background: string;
  stats: Record<string, string>;
}

export interface PlayerTeam {
  id: string;
  name: string;
  characterIds: string[];
  characters: PlayerCharacter[];
  createdAt: string;
}

const TEAMS_KEY = 'rpg-player-teams';
const ACTIVE_TEAM_KEY = 'rpg-active-team';
const teams = ref<PlayerTeam[]>([]);
const activeTeamId = ref<string | null>(null);
let initialized = false;

function persist() {
  try {
    localStorage.setItem(TEAMS_KEY, JSON.stringify(teams.value));
    if (activeTeamId.value) localStorage.setItem(ACTIVE_TEAM_KEY, activeTeamId.value);
    else localStorage.removeItem(ACTIVE_TEAM_KEY);
  } catch {
    // L'equipe reste disponible tant que la page est ouverte.
  }
}

function initialize() {
  if (initialized) return;
  initialized = true;
  try {
    const storedTeams = localStorage.getItem(TEAMS_KEY);
    const parsedTeams = storedTeams ? JSON.parse(storedTeams) as Partial<PlayerTeam>[] : [];
    teams.value = parsedTeams.map((team) => ({
      ...team,
      characterIds: team.characterIds ?? [],
      characters: team.characters ?? [],
    })) as PlayerTeam[];
    const storedActiveId = localStorage.getItem(ACTIVE_TEAM_KEY);
    activeTeamId.value = teams.value.some((team) => team.id === storedActiveId) ? storedActiveId : null;
  } catch {
    teams.value = [];
    activeTeamId.value = null;
  }
}

export function usePlayerTeams() {
  onMounted(initialize);

  const activeTeam = computed(() => teams.value.find((team) => team.id === activeTeamId.value) ?? null);

  function selectTeam(id: string | null) {
    activeTeamId.value = id && teams.value.some((team) => team.id === id) ? id : null;
    persist();
  }

  function addTeam(name: string) {
    const cleanName = name.trim();
    if (!cleanName) return null;
    const team: PlayerTeam = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: cleanName,
      characterIds: [],
      characters: [],
      createdAt: new Date().toISOString(),
    };
    teams.value = [...teams.value, team];
    activeTeamId.value = team.id;
    persist();
    return team;
  }

  function renameTeam(id: string, name: string) {
    const cleanName = name.trim();
    if (!cleanName) return;
    teams.value = teams.value.map((team) => team.id === id ? { ...team, name: cleanName } : team);
    persist();
  }

  function deleteTeam(id: string) {
    teams.value = teams.value.filter((team) => team.id !== id);
    if (activeTeamId.value === id) activeTeamId.value = teams.value[0]?.id ?? null;
    persist();
  }

  function addCharacter(teamId: string, character: Omit<PlayerCharacter, 'id'>) {
    const newCharacter: PlayerCharacter = {
      ...character,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    };
    teams.value = teams.value.map((team) => team.id === teamId
      ? { ...team, characters: [...team.characters, newCharacter] }
      : team);
    persist();
    return newCharacter;
  }

  function deleteCharacter(teamId: string, characterId: string) {
    teams.value = teams.value.map((team) => team.id === teamId
      ? { ...team, characters: team.characters.filter((character) => character.id !== characterId) }
      : team);
    persist();
  }

  return { teams, activeTeamId, activeTeam, selectTeam, addTeam, renameTeam, deleteTeam, addCharacter, deleteCharacter };
}
