<script setup lang="ts">
import { useCharacterStatus } from '../../../composables/useCharacterStatus';
import { CAMPO_NPC_CANDIDATES, campoCandidateSlug } from '../../../composables/useCampoFrontiera';

const candidates = CAMPO_NPC_CANDIDATES;
const { isMarked } = useCharacterStatus();
</script>

<template>
  <section>
    <p><NuxtLink to="/campo-della-frontiera">&larr; Retour au Campo della Frontiera</NuxtLink></p>
    <header :class="$style.hero">
      <div>
        <p :class="$style.eyebrow">Personnel potentiel du camp</p>
        <h1>Les candidatures du Campo</h1>
        <p>Ces personnages se proposent pour faire vivre les différents bâtiments du Campo della Frontiera. Comparez leurs forces, leurs limites et le poste où chacun peut être engagé.</p>
      </div>
      <strong :class="$style.count">{{ candidates.length }} profils</strong>
    </header>

    <div :class="$style.grid">
      <article v-for="entry in candidates" :key="entry.candidate.id" :class="$style.card">
        <header :class="$style.cardHeader">
          <div>
            <p :class="$style.job">{{ entry.construction }}</p>
            <h2 :class="isMarked(`npcs:${campoCandidateSlug(entry.candidate.id)}`) && $style.marked"><NuxtLink :to="`/personnages/${campoCandidateSlug(entry.candidate.id)}`">{{ entry.candidate.name }}</NuxtLink></h2>
            <p :class="$style.species">{{ entry.candidate.species }}</p>
          </div>
          <span :class="$style.growth">+{{ entry.candidate.growth }} prog.</span>
        </header>
        <p>{{ entry.candidate.background }}</p>
        <dl>
          <div><dt>Atout</dt><dd>{{ entry.candidate.qualities }}</dd></div>
          <div><dt>Limite</dt><dd>{{ entry.candidate.flaws }}</dd></div>
        </dl>
        <footer :class="$style.yield">+{{ entry.candidate.income }} pièces/jour · +{{ entry.candidate.visitors }} visiteur{{ entry.candidate.visitors > 1 ? 's' : '' }}</footer>
      </article>
    </div>
  </section>
</template>

<style module>
.hero { display: flex; justify-content: space-between; align-items: end; gap: 1.5rem; padding: 1.25rem 0 2rem; border-bottom: 1px solid #4a3a28; }
.hero h1 { margin: .25rem 0; }
.hero p { max-width: 42rem; }
.eyebrow, .species, .job { color: var(--muted); }
.eyebrow, .job { margin: 0; text-transform: uppercase; letter-spacing: .08em; font-size: .8rem; }
.count { color: var(--accent); white-space: nowrap; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr)); gap: 1rem; padding: 1.5rem 0 2rem; }
.card { display: flex; flex-direction: column; gap: .7rem; background: var(--panel); border: 1px solid #4a3a28; border-radius: 6px; padding: 1rem; }
.cardHeader { display: flex; justify-content: space-between; align-items: start; gap: .75rem; }
.card h2 { margin: .2rem 0 0; font-size: 1.1rem; }
.card h2 a { color: var(--text); }
.marked { text-decoration: line-through; text-decoration-thickness: .1em; opacity: .72; }
.species { margin: .2rem 0 0; font-style: italic; font-size: .85rem; }
.growth { color: #b8d38b; font-size: .75rem; white-space: nowrap; }
.card > p { margin: 0; font-size: .88rem; }
dl { display: grid; gap: .5rem; margin: 0; font-size: .82rem; }
dt { color: var(--accent); font-weight: bold; }
dd { margin: .1rem 0 0; color: var(--muted); }
.yield { margin-top: auto; padding-top: .65rem; border-top: 1px solid #4a3a28; color: var(--accent); font-size: .8rem; }
@media (max-width: 42rem) { .hero { align-items: stretch; flex-direction: column; } }
</style>