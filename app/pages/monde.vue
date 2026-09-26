<script setup lang="ts">
import { PROJECTION_MAPS, useProjectionController } from '../composables/useProjection';

const { state } = useProjectionController();

function projectWorldMap() {
  state.value.background = { ...PROJECTION_MAPS.world };
}
</script>

<template>
  <section>
    <h1>Vesteria et la Confédération</h1>
    <p><strong>Historia</strong> se déroule sur le continent de <strong>Vesteria</strong>, une ambiance dark fantasy d'inspiration Renaissance peuplée d'animaux anthropomorphes, d'aviens et d'autres peuples, où la magie est bien réelle.</p>
    <h2>Carte de la région</h2>
    <img src="/images/map.svg" alt="Carte des Marches de Gratigna" :class="$style.map">
    <button type="button" :class="$style.projectButton" @click="projectWorldMap">Projeter la carte du monde</button>
    <h2>Conseils pour le MJ</h2>
    <ul><li>Gardez une trace des choix majeurs après chaque session.</li><li>Variez enquête, combat, politique et exploration.</li></ul>
  </section>
</template>

<style module>
.map { width: 100%; border-radius: 6px; border: 1px solid #4a3a28; }
.projectButton { display: block; margin-top: .75rem; background: var(--accent); color: #1c150f; border: 1px solid var(--accent); border-radius: 4px; padding: .5rem .75rem; font: inherit; font-weight: bold; cursor: pointer; }
</style>