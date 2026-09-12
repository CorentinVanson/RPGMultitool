<script setup lang="ts">
import { computed, reactive } from 'vue';

const abilityKeys = ['for', 'dex', 'con', 'int', 'sag', 'cha'] as const;
type AbilityKey = typeof abilityKeys[number];

const abilityLabels: Record<AbilityKey, string> = {
  for: 'Force', dex: 'Dextérité', con: 'Constitution', int: 'Intelligence', sag: 'Sagesse', cha: 'Charisme',
};

const dndStats = reactive<Record<AbilityKey, number>>({ for: 10, dex: 10, con: 10, int: 10, sag: 10, cha: 10 });
const classicSheet = reactive({ armorClass: 10, hitPoints: 10, proficiencyBonus: 2 });

function dndModifier(score: number) {
  return Math.floor((score - 10) / 2);
}

function campaignSkillLevel(score: number) {
  const modifier = dndModifier(score);
  if (modifier <= -1) return 1;
  if (modifier === 0) return 2;
  if (modifier === 1) return 3;
  if (modifier === 2) return 4;
  if (modifier === 3) return 5;
  return 6;
}

function protectionDie(armorClass: number) {
  if (armorClass <= 11) return 'D6';
  if (armorClass <= 12) return 'D8';
  if (armorClass <= 14) return 'D10';
  if (armorClass <= 16) return 'D12';
  if (armorClass <= 18) return 'D20';
  return 'D100';
}

function modifierLabel(modifier: number) {
  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
}

const convertedStats = computed(() => abilityKeys.map((key) => ({
  key,
  label: abilityLabels[key],
  score: dndStats[key],
  modifier: dndModifier(dndStats[key]),
  skillLevel: campaignSkillLevel(dndStats[key]),
})));

const convertedDefenseDie = computed(() => protectionDie(classicSheet.armorClass));

const diceSteps = [
  { die: 'D4', label: 'Très facile', example: 'Action presque évidente' },
  { die: 'D6', label: 'Facile', example: 'Action familière ou bien préparée' },
  { die: 'D8', label: 'Courante', example: 'Action exigeant une vraie compétence' },
  { die: 'D10', label: 'Difficile', example: 'Action sous pression ou risquée' },
  { die: 'D12', label: 'Très difficile', example: 'Action réservée aux spécialistes' },
  { die: 'D20', label: 'Extrême', example: 'Action rarement réalisable' },
  { die: 'D100', label: 'Impossible', example: 'Action presque hors de portée' },
];

const skillLevels = [
  { level: 1, label: 'Débutant', text: 'Le personnage connaît les bases.' },
  { level: 2, label: 'Compétent', text: 'Le personnage pratique régulièrement.' },
  { level: 3, label: 'Confirmé', text: 'Le personnage est fiable dans ce domaine.' },
  { level: 4, label: 'Expert', text: 'Le personnage maîtrise les situations exigeantes.' },
  { level: 5, label: 'Remarquable', text: 'Le personnage fait partie des meilleurs.' },
  { level: 6, label: 'Exceptionnel', text: 'Le personnage atteint la limite habituelle du système.' },
];
</script>

<template>
  <section>
    <p><NuxtLink to="/">&larr; Retour à l’accueil</NuxtLink></p>
    <p :class="$style.eyebrow">Référence de règles</p>
    <h1>Convertir un personnage</h1>
    <p :class="$style.intro">Saisissez les valeurs d’une fiche D&D 5e classique pour obtenir un point de départ compatible avec le système de la campagne. La conversion ne conserve pas les jets de D20 : elle traduit les scores en compétences de 1 à 6 et la CA en dé de défense.</p>

    <section :class="$style.converter">
      <div>
        <p :class="$style.eyebrow">Import manuel D&D 5e</p>
        <h2>Fiche classique vers fiche de campagne</h2>
        <p :class="$style.muted">Entrez les nombres de la fiche originale. Les résultats à droite sont calculés immédiatement et peuvent être reportés dans la fiche du joueur.</p>
      </div>
      <div :class="$style.converterGrid">
        <fieldset>
          <legend>Caractéristiques D&D 5e</legend>
          <div :class="$style.abilityGrid">
            <label v-for="key in abilityKeys" :key="key">{{ abilityLabels[key] }}
              <input v-model.number="dndStats[key]" type="number" min="1" max="30" :aria-label="`Score de ${abilityLabels[key]}`">
            </label>
          </div>
        </fieldset>
        <fieldset>
          <legend>Défense et survie</legend>
          <div :class="$style.compactFields">
            <label>Classe d’armure (CA)<input v-model.number="classicSheet.armorClass" type="number" min="0" max="40"></label>
            <label>Points de vie (PV)<input v-model.number="classicSheet.hitPoints" type="number" min="0" max="999"></label>
            <label>Bonus de maîtrise D&D<input v-model.number="classicSheet.proficiencyBonus" type="number" min="0" max="20"></label>
          </div>
        </fieldset>
      </div>
      <div :class="$style.conversionResult">
        <div :class="$style.resultHeader">
          <div><p :class="$style.eyebrow">Résultat campagne</p><h3>Valeurs à reporter</h3></div>
          <div :class="$style.defenseResult"><span>Dé de défense</span><strong>{{ convertedDefenseDie }}</strong><small>à partir de CA {{ classicSheet.armorClass }}</small></div>
        </div>
        <div :class="$style.resultGrid">
          <div v-for="stat in convertedStats" :key="stat.key" :class="$style.resultCard">
            <strong>{{ stat.label }}</strong>
            <span>Niveau {{ stat.skillLevel }}</span>
            <small>Score {{ stat.score }} · modificateur {{ modifierLabel(stat.modifier) }}</small>
          </div>
        </div>
        <div :class="$style.transferNotes">
          <p><strong>PV :</strong> conservez {{ classicSheet.hitPoints }} PV comme réserve de survie, puis notez les blessures et l’épuisement séparément.</p>
          <p><strong>Maîtrises :</strong> le bonus D&D {{ modifierLabel(classicSheet.proficiencyBonus) }} ne devient pas une compétence globale. Reportez chaque compétence maîtrisée en première maîtrise ; l’expertise D&D devient une deuxième maîtrise.</p>
          <p><strong>Jets :</strong> remplacez les jets d’attaque, sauvegardes et tests de D20 par le dé choisi par le MJ, puis appliquez les maîtrises de la fiche.</p>
        </div>
      </div>
    </section>

    <section :class="$style.band">
      <div>
        <p :class="$style.eyebrow">Principe central</p>
        <h2>Plus le dé est grand, plus l’action est difficile</h2>
        <p>Le système utilise un <strong>reverse pool dice</strong>. Le MJ choisit le dé selon la difficulté de l’action : le D4 correspond aux actions très faciles et le D100 aux actions impossibles ou presque.</p>
      </div>
      <div :class="$style.callout"><strong>D4</strong><span>Très facile</span><small>vers</small><strong>D100</strong><span>Impossible</span></div>
    </section>

    <section>
      <h2>1. Définir le concept</h2>
      <p>Notez en une phrase qui est le personnage, ce qu’il cherche et ce qu’il risque de perdre. Choisissez ensuite son espèce, son origine, ses liens et ses objectifs en respectant le cadre de Vesteria.</p>
    </section>

    <section>
      <h2>2. Choisir les compétences</h2>
      <p>Une compétence reçoit une valeur entre <strong>1 et 6</strong>. Une valeur élevée décrit une spécialisation forte, mais les valeurs au-delà de 6 doivent rester exceptionnelles et ne sont pas nécessaires pour une fiche normale.</p>
      <div :class="$style.skillGrid">
        <article v-for="skill in skillLevels" :key="skill.level" :class="$style.skillCard">
          <strong>{{ skill.level }}</strong>
          <div><h3>{{ skill.label }}</h3><p>{{ skill.text }}</p></div>
        </article>
      </div>
    </section>

    <section>
      <h2>3. Choisir le dé de l’action</h2>
      <p>Le niveau de compétence décrit le personnage ; le dé décrit la situation. Une compétence élevée ne transforme pas automatiquement une action impossible en action facile : le MJ choisit le palier qui correspond à la fiction.</p>
      <div :class="$style.diceTable">
        <div v-for="step in diceSteps" :key="step.die" :class="$style.diceRow">
          <strong>{{ step.die }}</strong><span>{{ step.label }}</span><small>{{ step.example }}</small>
        </div>
      </div>
    </section>

    <section :class="$style.masterySection">
      <h2>4. Ajouter les maîtrises</h2>
      <div :class="$style.masteryGrid">
        <article :class="$style.masteryCard"><span :class="$style.masteryNumber">1</span><div><h3>Première maîtrise</h3><p>Le personnage utilise le dé du palier immédiatement plus facile. Exemple : une action qui demanderait normalement un D8 se fait avec un D6.</p></div></article>
        <article :class="$style.masteryCard"><span :class="$style.masteryNumber">2</span><div><h3>Deuxième maîtrise</h3><p>Le personnage lance deux dés. Cette situation correspond à l’avantage ; la règle de la table détermine comment les deux résultats sont conservés ou combinés.</p></div></article>
      </div>
      <p :class="$style.note"><strong>À retenir :</strong> deux maîtrises ne remplacent pas la première. Elles représentent deux bénéfices distincts : un dé plus facile, puis deux dés.</p>
    </section>

    <section>
      <h2>5. Vérifier la fiche</h2>
      <ul>
        <li>Le concept du personnage tient en une phrase claire.</li>
        <li>Les compétences principales sont généralement comprises entre 1 et 6.</li>
        <li>Chaque maîtrise est attachée à une compétence ou à un domaine précis.</li>
        <li>La fiche décrit les limites, les liens et les conséquences possibles des échecs.</li>
      </ul>
    </section>
  </section>
</template>

<style module>
.intro { max-width: 48rem; color: var(--muted); font-size: 1.08rem; line-height: 1.55; }
.muted { color: var(--muted); line-height: 1.5; }
.eyebrow { margin: 0; color: var(--accent); font-size: .8rem; font-weight: bold; letter-spacing: .08em; text-transform: uppercase; }
.converter { display: flex; flex-direction: column; gap: 1.25rem; margin: 2rem 0; padding: 1.25rem; background: var(--panel); border: 1px solid var(--accent); border-radius: 6px; }
.converter h2, .conversionResult h3 { margin: .25rem 0 .5rem; }
.converterGrid { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(16rem, .7fr); gap: 1rem; }
.converter fieldset { min-width: 0; border: 1px solid #4a3a28; padding: .85rem; }
.converter legend { color: var(--accent); padding: 0 .35rem; }
.abilityGrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .7rem; }
.abilityGrid label, .compactFields label { display: flex; flex-direction: column; gap: .3rem; color: var(--muted); font-size: .85rem; }
.converter input { width: 100%; box-sizing: border-box; background: var(--bg); color: var(--text); border: 1px solid #4a3a28; border-radius: 4px; padding: .55rem .6rem; font: inherit; }
.converter input:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
.compactFields { display: grid; gap: .7rem; }
.conversionResult { display: flex; flex-direction: column; gap: 1rem; padding: 1rem; background: #271d14; border-left: 3px solid var(--accent); }
.resultHeader { display: flex; justify-content: space-between; gap: 1rem; align-items: start; }
.defenseResult { display: grid; grid-template-columns: auto auto; gap: .15rem .6rem; align-items: center; text-align: right; }
.defenseResult span, .defenseResult small { color: var(--muted); }
.defenseResult small { grid-column: 1 / -1; }
.defenseResult strong { color: var(--accent); font-size: 1.5rem; }
.resultGrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .6rem; }
.resultCard { display: flex; flex-direction: column; gap: .2rem; padding: .7rem; background: var(--panel); border: 1px solid #4a3a28; }
.resultCard span { color: var(--accent); font-weight: bold; }
.resultCard small { color: var(--muted); }
.transferNotes { color: var(--muted); line-height: 1.45; }
.transferNotes p { margin: .35rem 0; }
.transferNotes strong { color: var(--text); }
section > h2 { margin-top: 2rem; }
.band { display: grid; grid-template-columns: 1fr auto; gap: 2rem; align-items: center; margin: 2rem 0; padding: 1.25rem; background: var(--panel); border: 1px solid #4a3a28; border-left: 4px solid var(--accent); border-radius: 6px; }
.band h2 { margin: .25rem 0 .65rem; }
.band p { margin-bottom: 0; color: var(--muted); line-height: 1.5; }
.callout { display: grid; grid-template-columns: auto auto; gap: .15rem .65rem; align-items: center; min-width: 9rem; text-align: right; }
.callout strong { color: var(--accent); font-size: 1.5rem; }
.callout span, .callout small { color: var(--muted); }
.callout small { grid-column: 1 / -1; text-align: center; }
.skillGrid, .masteryGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .75rem; }
.skillCard, .masteryCard { display: flex; gap: .75rem; align-items: flex-start; padding: .85rem; background: var(--panel); border: 1px solid #4a3a28; border-radius: 5px; }
.skillCard > strong { display: grid; place-items: center; width: 2rem; height: 2rem; flex: 0 0 auto; background: var(--accent); color: #1c150f; border-radius: 50%; }
.skillCard h3, .masteryCard h3 { margin: 0; font-size: 1rem; }
.skillCard p, .masteryCard p { margin: .25rem 0 0; color: var(--muted); line-height: 1.4; }
.diceTable { display: flex; flex-direction: column; gap: .4rem; }
.diceRow { display: grid; grid-template-columns: 4rem 10rem 1fr; gap: .75rem; align-items: center; padding: .65rem .8rem; background: var(--panel); border-left: 3px solid #4a3a28; }
.diceRow strong { color: var(--accent); font-size: 1.15rem; }
.diceRow span { font-weight: bold; }
.diceRow small { color: var(--muted); }
.masterySection { margin-top: 2rem; }
.masteryNumber { display: grid; place-items: center; width: 2rem; height: 2rem; flex: 0 0 auto; border: 1px solid var(--accent); color: var(--accent); border-radius: 50%; font-weight: bold; }
.note { margin-top: 1rem; padding: .8rem 1rem; color: var(--muted); background: #271d14; border-left: 3px solid var(--accent); }
@media (max-width: 48rem) { .converterGrid { grid-template-columns: 1fr; } .abilityGrid, .resultGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .resultHeader { flex-direction: column; } .defenseResult { text-align: left; } .band { grid-template-columns: 1fr; } .callout { justify-content: start; text-align: left; } .callout small { text-align: left; } .skillGrid, .masteryGrid { grid-template-columns: 1fr; } .diceRow { grid-template-columns: 3.5rem 1fr; } .diceRow small { grid-column: 2; } }
</style>
