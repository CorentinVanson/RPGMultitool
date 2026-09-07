<script setup lang="ts">
import { CAMPO_CONSTRUCTIONS } from '../composables/useCampoFrontiera';

defineProps<{ builtNodeIds: string[] }>();

const positions: Record<string, { left: string; top: string; width: string }> = {
  tents: { left: '43%', top: '53%', width: '24%' },
  palisade: { left: '50%', top: '30%', width: '88%' },
  gate: { left: '73%', top: '57%', width: '18%' },
  barracks: { left: '16%', top: '54%', width: '22%' },
  cistern: { left: '26%', top: '78%', width: '16%' },
  workshop: { left: '57%', top: '74%', width: '18%' },
  watchtower: { left: '72%', top: '25%', width: '14%' },
  cellar: { left: '43%', top: '72%', width: '15%' },
  walls: { left: '7%', top: '30%', width: '86%' },
  'map-room': { left: '43%', top: '24%', width: '22%' },
  infirmary: { left: '18%', top: '35%', width: '20%' },
  'signal-fire': { left: '79%', top: '12%', width: '13%' },
};
</script>

<template>
  <div :class="$style.plan">
    <img src="/images/locations/campo-della-frontiera.png" alt="Plan du Campo della Frontiera" :class="$style.base">
    <div v-for="construction in CAMPO_CONSTRUCTIONS" :key="construction.id" v-show="builtNodeIds.includes(construction.id)" :class="$style.building" :style="positions[construction.id]">
      <span>{{ construction.name }}</span>
    </div>
  </div>
</template>

<style module>
.plan { position: relative; width: 100%; aspect-ratio: 1024 / 683; overflow: hidden; background: #201a14; }
.base { display: block; width: 100%; height: 100%; object-fit: cover; }
.building { position: absolute; min-height: 9%; transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center; padding: .35rem; background: rgba(179, 129, 58, .78); border: 2px solid #f1e6d3; color: #1c150f; font-size: clamp(.52rem, 1.2vw, .85rem); font-weight: bold; text-align: center; text-shadow: 0 1px rgba(255,255,255,.35); box-shadow: 0 0 0 2px rgba(28, 21, 15, .45); }
.building span { max-width: 100%; overflow-wrap: anywhere; }
</style>
