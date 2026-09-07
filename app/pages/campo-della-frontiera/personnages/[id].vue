<script setup lang="ts">
import { computed } from 'vue';
import { createError } from 'h3';
import { useRoute } from '#imports';
import { CAMPO_CONSTRUCTIONS, type CampoNpcCandidate } from '../../../composables/useCampoFrontiera';

const route = useRoute();
const candidate = computed<CampoNpcCandidate | null>(() => {
  for (const construction of CAMPO_CONSTRUCTIONS) {
    const found = construction.candidates.find((item) => item.id === String(route.params.id));
    if (found) return found;
  }
  return null;
});
if (!candidate.value) throw createError({ statusCode: 404, statusMessage: 'Personnage du camp introuvable' });
const assignments = computed(() => CAMPO_CONSTRUCTIONS.filter((construction) => construction.candidates.some((item) => item.id === candidate.value?.id)).map((construction) => construction.name));
</script>

<template>
  <article v-if="candidate">
    <p><NuxtLink to="/campo-della-frontiera">&larr; Retour au Campo della Frontiera</NuxtLink></p>
    <p :class="$style.eyebrow">Personnel potentiel du camp</p>
    <h1>{{ candidate.name }}</h1>
    <p :class="$style.species">{{ candidate.species }}</p>
    <section :class="$style.profile"><h2>Parcours</h2><p>{{ candidate.background }}</p></section>
    <div :class="$style.columns"><section><h2>Qualités</h2><p>{{ candidate.qualities }}</p></section><section><h2>Défauts</h2><p>{{ candidate.flaws }}</p></section></div>
    <section :class="$style.profile"><h2>Poste possible</h2><p>{{ assignments.join(' · ') }}</p><p :class="$style.muted">Rendement : +{{ candidate.income }} pièces par jour · +{{ candidate.visitors }} visiteur{{ candidate.visitors > 1 ? 's' : '' }} · progression +{{ candidate.growth }}</p></section>
  </article>
</template>

<style module>
.eyebrow, .muted, .species { color: var(--muted); } .eyebrow { margin-bottom: 0; text-transform: uppercase; letter-spacing: .08em; font-size: .8rem; } .species { font-style: italic; }
.profile, .columns section { background: var(--panel); border: 1px solid #4a3a28; border-radius: 6px; padding: 1rem 1.2rem; margin: 1.25rem 0; } h2 { color: var(--accent); font-size: 1rem; margin-top: 0; } .profile p, .columns p { white-space: pre-wrap; }
.columns { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; } .columns section { margin: 0; }
@media (max-width: 42rem) { .columns { grid-template-columns: 1fr; } }
</style>
