<script setup lang="ts">
import { usePlayerTeams } from '../composables/usePlayerTeams';

const { teams, activeTeamId, selectTeam } = usePlayerTeams();
</script>

<template>
  <div :class="$style.selector">
    <label for="active-team">Équipe</label>
    <select id="active-team" :value="activeTeamId ?? ''" @change="selectTeam(($event.target as HTMLSelectElement).value || null)">
      <option value="">Notes générales</option>
      <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
    </select>
    <NuxtLink to="/equipe" title="Gérer les équipes">Gérer</NuxtLink>
  </div>
</template>

<style module>
.selector { display: flex; align-items: center; gap: .45rem; margin-left: auto; color: var(--muted); font-size: .85rem; }
.selector select { max-width: 12rem; background: var(--bg); color: var(--text); border: 1px solid #4a3a28; border-radius: 3px; padding: .3rem .45rem; font: inherit; }
.selector select:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
.selector a { color: var(--accent); white-space: nowrap; }
@media (max-width: 52rem) { .selector { width: 100%; margin-left: 0; } }
</style>
