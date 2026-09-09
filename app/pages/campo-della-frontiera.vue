<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useCampoFrontiera, CAMPO_CONSTRUCTIONS, campoCandidateSlug, type CampoConstruction } from '../composables/useCampoFrontiera';
import { useProjectionController } from '../composables/useProjection';

const { state, start } = useProjectionController();
const {
  builtIds, assignments, day, gold, population, builtConstructions, availableConstructions,
  dailyIncome, dailyVisitors, populationGrowth, constructionDiscount, constructionCost, isBuilt, build, demolish, assignNpc, advanceDay,
  addGold, addPopulation, setDay, setDailyIncomeModifier, setDailyVisitorsModifier, gainXp, resetCamp, xpBonus,
} = useCampoFrontiera();
const goldAmount = ref('');
const populationAmount = ref('');
const dayAmount = ref('');
const incomeModifierAmount = ref('');
const visitorsModifierAmount = ref('');
const candidateFor = (construction: CampoConstruction, id: string | undefined) => construction.candidates.find((candidate) => candidate.id === id);
const selectedCandidate = (construction: CampoConstruction) => candidateFor(construction, assignments.value[construction.id]);
const availableIds = computed(() => new Set(availableConstructions.value.map((construction) => construction.id)));
const treeLevels = computed(() => Array.from({ length: Math.max(...CAMPO_CONSTRUCTIONS.map((construction) => construction.level)) + 1 }, (_, level) => ({ level, constructions: CAMPO_CONSTRUCTIONS.filter((construction) => construction.level === level) })));

onMounted(start);

function requirements(construction: CampoConstruction): string {
  if (!construction.requires.length) return 'Aucun prérequis';
  return `Nécessite : ${construction.requires.map((id) => CAMPO_CONSTRUCTIONS.find((item) => item.id === id)?.name ?? id).join(', ')}`;
}

function projectPlan() {
  state.value.background = {
    id: 'campo-frontiera-plan', name: 'Plan du Campo della Frontiera', image: '/images/locations/campo-della-frontiera.png', planNodeIds: [...builtIds.value],
  };
  state.value.campStatsCaption = `Jour ${day.value} · ${gold.value} pièces · ${population.value} habitant·e·s`;
  state.value.caption = '';
}

function candidateName(construction: CampoConstruction, id: string | undefined): string {
  return candidateFor(construction, id)?.name ?? 'Aucun PNJ';
}

function creditGold() {
  if (addGold(Number(goldAmount.value))) goldAmount.value = '';
}

function creditPopulation() {
  if (addPopulation(Number(populationAmount.value))) populationAmount.value = '';
}

function updateDay() {
  if (setDay(Number(dayAmount.value))) dayAmount.value = '';
}

function updateIncomeModifier() {
  if (setDailyIncomeModifier(Number(incomeModifierAmount.value))) incomeModifierAmount.value = '';
}

function updateVisitorsModifier() {
  if (setDailyVisitorsModifier(Number(visitorsModifierAmount.value))) visitorsModifierAmount.value = '';
}

function rewardXp(candidateId: string) {
  gainXp(candidateId);
}

function resetAll() {
  resetCamp();
}
</script>

<template>
  <section>
    <p><NuxtLink to="/lieux">&larr; Retour aux lieux</NuxtLink></p>
    <header :class="$style.hero">
      <div><p :class="$style.eyebrow">Base des PJ · Gestion de campagne</p><h1>Campo della Frontiera</h1><p>Développez le poste frontière, choisissez les personnes qui le font vivre et observez sa croissance jour après jour.</p><NuxtLink to="/candidatures-campo" :class="$style.peopleLink">Voir les candidatures du camp</NuxtLink></div>
      <button type="button" :class="$style.project" @click="projectPlan">Projeter le plan évolutif</button>
    </header>

    <section :class="$style.dashboard">
      <div :class="$style.resource"><span>Jour</span><strong>{{ day }}</strong></div>
      <div :class="$style.resource"><span>Trésor</span><strong>{{ gold }} pièces</strong></div>
      <div :class="$style.resource"><span>Population</span><strong>{{ population }}</strong></div>
      <div :class="$style.resource"><span>Par jour</span><strong>+{{ dailyIncome }} pièces · +{{ populationGrowth }} pop.</strong></div>
      <button type="button" :class="$style.nextDay" @click="advanceDay">Ajouter un jour <small>(+{{ dailyIncome }} pièces, +{{ populationGrowth }} pop.)</small></button>
    </section>

    <section :class="$style.adminTools" aria-label="Ajuster les ressources du camp">
      <h2>Ressources du MJ</h2>
      <form @submit.prevent="creditGold"><label>Ajouter des pièces<input v-model="goldAmount" type="number" min="1" step="1" placeholder="Montant"><button type="submit" :disabled="!goldAmount">Créditer</button></label></form>
      <form @submit.prevent="creditPopulation"><label>Ajouter des habitants<input v-model="populationAmount" type="number" min="1" step="1" placeholder="Nombre"><button type="submit" :disabled="!populationAmount">Ajouter</button></label></form>
      <form @submit.prevent="updateDay"><label>Jour<input v-model="dayAmount" type="number" min="1" step="1" placeholder="Jour"><button type="submit" :disabled="!dayAmount">Appliquer</button></label></form>
      <form @submit.prevent="updateIncomeModifier"><label>Ressources/jour<input v-model="incomeModifierAmount" type="number" step="1" placeholder="Δ pièces"><button type="submit" :disabled="!incomeModifierAmount">Appliquer</button></label></form>
      <form @submit.prevent="updateVisitorsModifier"><label>Visiteurs/jour<input v-model="visitorsModifierAmount" type="number" step="1" placeholder="Δ visiteurs"><button type="submit" :disabled="!visitorsModifierAmount">Appliquer</button></label></form>
      <button type="button" :class="$style.secondary" @click="resetAll">Reset everything</button>
    </section>

    <section :class="$style.planSection">
      <div :class="$style.sectionHeader"><div><h2>Plan du camp</h2><p :class="$style.muted">{{ builtConstructions.length }} bâtiment{{ builtConstructions.length > 1 ? 's' : '' }} · {{ dailyVisitors }} visiteur{{ dailyVisitors > 1 ? 's' : '' }} potentiel{{ dailyVisitors > 1 ? 's' : '' }} par jour</p></div><button type="button" :class="$style.secondary" @click="projectPlan">Mettre à jour la projection</button></div>
      <CampoPlan :built-node-ids="builtIds" />
    </section>

    <section :class="$style.treeSection">
      <div :class="$style.sectionHeader"><div><h2>Arbre de constructions</h2><p :class="$style.muted">Les tentes et la palissade sont déjà là. Les joueurs choisissent ensuite leurs priorités et leurs responsables<span v-if="constructionDiscount"> · Atelier : -{{ Math.round(constructionDiscount * 100) }} % sur les nouveaux chantiers</span>.</p></div></div>
      <div :class="$style.tree">
        <div v-for="row in treeLevels" :key="row.level" :class="$style.treeLevel">
          <div :class="$style.levelLabel">N{{ row.level }}</div>
          <div :class="$style.levelNodes">
        <article v-for="construction in row.constructions" :key="construction.id" :class="[$style.node, isBuilt(construction.id) && $style.built, !isBuilt(construction.id) && !availableIds.has(construction.id) && $style.locked]">
          <div :class="$style.nodeTop"><span :class="$style.level">N{{ construction.level }}</span><span :class="$style.category">{{ construction.category }}</span></div>
          <h3>{{ construction.name }}</h3><p>{{ construction.description }}</p>
          <p v-if="construction.cost" :class="$style.cost"><strong :class="constructionCost(construction) < construction.cost && $style.discounted">{{ constructionCost(construction) }} pièces</strong><s v-if="constructionCost(construction) < construction.cost">{{ construction.cost }} pièces</s> · +{{ construction.baseIncome }} pièces/jour · +{{ construction.baseVisitors }} visiteur{{ construction.baseVisitors > 1 ? 's' : '' }}/jour</p>
          <p :class="$style.benefit"><strong>Effet :</strong> {{ construction.benefit }}</p>
          <ul v-if="construction.access?.length" :class="$style.access"><li v-for="item in construction.access" :key="item">{{ item }}</li></ul>
          <p v-if="!isBuilt(construction.id)" :class="$style.requirements">{{ requirements(construction) }}</p>
          <div v-if="isBuilt(construction.id)" :class="$style.nodeState"><span>Construit</span><button v-if="construction.level > 0" type="button" :class="$style.smallDanger" :disabled="CAMPO_CONSTRUCTIONS.some((item) => item.requires.includes(construction.id) && isBuilt(item.id))" @click="demolish(construction.id)">Démolir</button></div>
          <button v-else type="button" :class="$style.build" :disabled="!availableIds.has(construction.id)" @click="build(construction.id)">{{ availableIds.has(construction.id) ? 'Construire' : 'Verrouillé' }}</button>
          <div v-if="isBuilt(construction.id) && construction.candidates.length" :class="$style.assignmentBlock">
            <label :class="$style.assignment">Responsable
              <select :value="assignments[construction.id] ?? ''" @change="assignNpc(construction.id, ($event.target as HTMLSelectElement).value)"><option value="">Choisir parmi 3 PNJ</option><option v-for="candidate in construction.candidates" :key="candidate.id" :value="candidate.id">{{ candidate.name }}</option></select>
            </label>
            <div v-if="selectedCandidate(construction)" :class="$style.profile"><NuxtLink :to="`/personnages/${campoCandidateSlug(selectedCandidate(construction)?.id ?? '')}`"><strong>{{ selectedCandidate(construction)?.name }}</strong></NuxtLink><span>Qualités : {{ selectedCandidate(construction)?.qualities }}</span><span>Défauts : {{ selectedCandidate(construction)?.flaws }}</span></div>
            <div v-else :class="$style.candidates"><article v-for="candidate in construction.candidates" :key="candidate.id"><NuxtLink :to="`/personnages/${campoCandidateSlug(candidate.id)}`"><strong>{{ candidate.name }}</strong></NuxtLink><small>{{ candidate.qualities }}</small><small class="flaw">Point faible : {{ candidate.flaws }}</small><button type="button" :class="$style.choose" @click="assignNpc(construction.id, candidate.id)">Choisir</button></article></div>
            <div v-if="selectedCandidate(construction)" :class="$style.xpRow">
              <span>{{ xpBonus(selectedCandidate(construction)?.id ?? '').levelName }}</span>
              <button type="button" :class="$style.xpButton" @click="rewardXp(selectedCandidate(construction)?.id ?? '')">+XP</button>
            </div>
          </div>
          <p v-if="isBuilt(construction.id) && construction.candidates.length && selectedCandidate(construction)" :class="$style.assignedYield">{{ candidateName(construction, assignments[construction.id]) }} : +{{ selectedCandidate(construction)?.income }} pièces/jour<span v-if="selectedCandidate(construction)?.visitors"> · +{{ selectedCandidate(construction)?.visitors }} visiteurs</span><span v-if="selectedCandidate(construction)?.growth"> · progression +{{ selectedCandidate(construction)?.growth }}</span><span> · {{ xpBonus(selectedCandidate(construction)?.id ?? '').levelName }}</span></p>
        </article>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<style module>
.hero { display: flex; justify-content: space-between; align-items: end; gap: 1.5rem; padding: 1.25rem 0 2rem; border-bottom: 1px solid #4a3a28; } .hero h1 { margin: .25rem 0; } .hero p { max-width: 42rem; } .peopleLink { display: inline-block; margin-top: .75rem; color: var(--accent); }
.eyebrow, .muted { color: var(--muted); } .eyebrow { margin: 0; text-transform: uppercase; letter-spacing: .08em; font-size: .8rem; }
.project, .nextDay, .build { background: var(--accent); color: #1c150f; border: 1px solid var(--accent); border-radius: 4px; padding: .6rem .8rem; font: inherit; font-weight: bold; cursor: pointer; } .project, .nextDay { white-space: nowrap; }
.dashboard { display: grid; grid-template-columns: repeat(4, 1fr) auto; gap: .75rem; margin: 1.5rem 0; } .resource { display: flex; flex-direction: column; gap: .15rem; background: var(--panel); border: 1px solid #4a3a28; border-radius: 4px; padding: .7rem .8rem; } .resource span { color: var(--muted); font-size: .75rem; text-transform: uppercase; } .resource strong { color: var(--accent); } .nextDay small { display: block; font-weight: normal; font-size: .7rem; }
.adminTools { display: flex; align-items: end; gap: 1rem; flex-wrap: wrap; background: var(--panel); border: 1px solid #4a3a28; border-radius: 4px; padding: .8rem; margin-bottom: 1.5rem; } .adminTools h2 { width: 100%; margin: 0; font-size: .95rem; color: var(--accent); } .adminTools form label { display: flex; align-items: end; gap: .4rem; color: var(--muted); font-size: .8rem; } .adminTools input { width: 7rem; margin-left: .2rem; background: var(--bg); color: var(--text); border: 1px solid #4a3a28; border-radius: 3px; padding: .45rem; font: inherit; } .adminTools button { background: transparent; color: var(--accent); border: 1px solid var(--accent); border-radius: 3px; padding: .45rem .6rem; font: inherit; cursor: pointer; } .adminTools button:disabled { opacity: .45; cursor: default; }
.planSection, .treeSection { padding: 1rem 0 2rem; } .sectionHeader { display: flex; justify-content: space-between; align-items: end; gap: 1rem; margin-bottom: 1rem; } h2 { margin-bottom: .2rem; } .secondary { background: transparent; color: var(--accent); border: 1px solid var(--accent); border-radius: 4px; padding: .5rem .7rem; font: inherit; cursor: pointer; }
.tree { display: flex; flex-direction: column; gap: 1.5rem; } .treeLevel { position: relative; } .treeLevel:not(:first-child)::before { content: ''; position: absolute; top: -1.5rem; left: 0; right: 0; height: 1.5rem; border-top: 1px solid #6b5436; } .levelLabel { position: absolute; top: .75rem; left: 0; z-index: 1; color: var(--accent); font-weight: bold; font-size: .85rem; } .levelNodes { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; padding-left: 2.2rem; } .node { position: relative; display: flex; flex-direction: column; gap: .45rem; min-height: 22rem; background: var(--panel); border: 1px solid #4a3a28; border-radius: 6px; padding: 1rem; } .treeLevel:not(:first-child) .node::before { content: ''; position: absolute; top: -1.5rem; left: 50%; width: 1px; height: 1.5rem; background: #b3813a; } .node.built { border-color: var(--accent); box-shadow: inset 0 3px var(--accent); } .node.locked { opacity: .65; }
.nodeTop { display: flex; justify-content: space-between; color: var(--muted); font-size: .75rem; text-transform: uppercase; } .level { color: var(--accent); font-weight: bold; } .node h3 { margin: .2rem 0 0; font-size: 1.05rem; } .node p { margin: 0; font-size: .86rem; } .cost { color: var(--accent); } .cost s { margin-left: .25rem; color: var(--muted); font-size: .78rem; } .discounted { color: #b8d38b; } .benefit { color: var(--muted); } .requirements { color: #e3a39a; font-size: .8rem !important; }
.access { display: grid; gap: .2rem; margin: 0; padding-left: 1.1rem; color: #d6d0c3; font-size: .79rem; } .access::before { content: 'Accès au camp'; margin-left: -1.1rem; color: var(--accent); font-weight: bold; text-transform: uppercase; font-size: .7rem; }
.nodeState { display: flex; justify-content: space-between; align-items: center; margin-top: auto; color: var(--accent); font-weight: bold; } .smallDanger { background: transparent; color: #e3a39a; border: 1px solid #7e4a42; border-radius: 3px; padding: .2rem .4rem; font: inherit; font-size: .75rem; cursor: pointer; } .smallDanger:disabled { opacity: .45; cursor: default; } .build { margin-top: auto; } .build:disabled { background: #4a3a28; border-color: #4a3a28; color: var(--muted); cursor: default; }
.assignmentBlock { border-top: 1px solid #4a3a28; padding-top: .6rem; } .assignment { display: flex; flex-direction: column; gap: .25rem; color: var(--muted); font-size: .8rem; } .assignment select { background: var(--bg); color: var(--text); border: 1px solid #4a3a28; border-radius: 3px; padding: .35rem; font: inherit; }
.candidates { display: grid; gap: .4rem; } .candidates article { display: flex; flex-direction: column; gap: .15rem; border: 1px solid #4a3a28; border-radius: 3px; padding: .4rem; font-size: .78rem; } .candidates small, .profile span { color: var(--muted); } .flaw { color: #e3a39a !important; } .choose { align-self: start; background: transparent; color: var(--accent); border: 1px solid var(--accent); border-radius: 3px; padding: .2rem .4rem; font: inherit; cursor: pointer; } .profile { display: flex; flex-direction: column; gap: .2rem; font-size: .78rem; } .assignedYield { color: var(--accent); font-size: .78rem !important; } .xpRow { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: .4rem; color: var(--muted); font-size: .75rem; } .xpButton { background: transparent; color: var(--accent); border: 1px solid var(--accent); border-radius: 3px; padding: .2rem .55rem; font: inherit; cursor: pointer; }
@media (max-width: 55rem) { .dashboard { grid-template-columns: repeat(2, 1fr); } .levelNodes { grid-template-columns: repeat(2, minmax(0, 1fr)); } } @media (max-width: 42rem) { .hero, .sectionHeader { align-items: stretch; flex-direction: column; } .levelNodes { grid-template-columns: 1fr; padding-left: 1.8rem; } }
</style>
