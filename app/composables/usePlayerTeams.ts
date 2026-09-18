import { computed, onMounted, ref } from 'vue';
import { hydrateLocalStorageKey, mirrorLocalStorageKey } from './useSyncedDocument';

export interface PlayerCharacter {
  id: string;
  name: string;
  species: string;
  family?: string;
  className: string;
  level: string;
  background: string;
  stats: Record<string, string>;
  image?: string;
}

export interface TeamNpc {
  id: string;
  name: string;
  family: string;
  species: string;
  role: string;
  description: string;
  image?: string;
  createdAt: string;
}

export interface PlayerTeam {
  id: string;
  name: string;
  characterIds: string[];
  characters: PlayerCharacter[];
  customNpcs: TeamNpc[];
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
    void mirrorLocalStorageKey(TEAMS_KEY, JSON.stringify({ teams: teams.value, activeTeamId: activeTeamId.value }));
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
      customNpcs: team.customNpcs ?? [],
    })) as PlayerTeam[];
    const storedActiveId = localStorage.getItem(ACTIVE_TEAM_KEY);
    activeTeamId.value = teams.value.some((team) => team.id === storedActiveId) ? storedActiveId : null;
  } catch {
    teams.value = [];
    activeTeamId.value = null;
  }
}

export function usePlayerTeams() {
  onMounted(async () => {
    const remote = await hydrateLocalStorageKey(TEAMS_KEY);
    if (remote) {
      try {
        const parsed = JSON.parse(remote) as { teams?: PlayerTeam[]; activeTeamId?: string | null };
        localStorage.setItem(TEAMS_KEY, JSON.stringify(parsed.teams ?? []));
        if (parsed.activeTeamId) localStorage.setItem(ACTIVE_TEAM_KEY, parsed.activeTeamId);
      } catch { /* cache locale conservé */ }
    }
    initialize();
  });

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
      customNpcs: [],
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

  function addNpc(teamId: string, npc: Omit<TeamNpc, 'id' | 'createdAt'>) {
    const newNpc: TeamNpc = { ...npc, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, createdAt: new Date().toISOString() };
    teams.value = teams.value.map((team) => team.id === teamId
      ? { ...team, customNpcs: [...team.customNpcs, newNpc] }
      : team);
    persist();
    return newNpc;
  }

  function deleteNpc(teamId: string, npcId: string) {
    teams.value = teams.value.map((team) => team.id === teamId
      ? { ...team, customNpcs: team.customNpcs.filter((npc) => npc.id !== npcId) }
      : team);
    persist();
  }

  return { teams, activeTeamId, activeTeam, selectTeam, addTeam, renameTeam, deleteTeam, addCharacter, deleteCharacter, addNpc, deleteNpc };
}
