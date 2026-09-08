<script setup lang="ts">
import { computed } from 'vue';
import { CAMPO_CONSTRUCTIONS } from '../composables/useCampoFrontiera';

const props = defineProps<{ builtNodeIds: string[]; compact?: boolean }>();
const hasStoneWall = computed(() => props.builtNodeIds.includes('stone-wall'));
const hasCabins = computed(() => props.builtNodeIds.includes('cabins'));
const forgeLevel = computed(() => props.builtNodeIds.includes('forge-plus-2') ? 2 : props.builtNodeIds.includes('forge-plus-1') ? 1 : 0);
function upgradeLevel(id: 'tavern' | 'workshop' | 'tannery' | 'artificer') {
  return props.builtNodeIds.includes(`${id}-plus-2`) ? 2 : props.builtNodeIds.includes(`${id}-plus-1`) ? 1 : 0;
}

function buildingLabel(id: string, name: string) {
  const level = id === 'forge' ? forgeLevel.value : ['tavern', 'workshop', 'tannery', 'artificer'].includes(id) ? upgradeLevel(id as 'tavern' | 'workshop' | 'tannery' | 'artificer') : 0;
  return level ? `${name} +${level}` : name;
}

const positions: Record<string, { left: string; top: string; width: string }> = {
  tents: { left: '46%', top: '53%', width: '27%' },
  palisade: { left: '50%', top: '50%', width: '92%' },
  cabins: { left: '26%', top: '53%', width: '20%' },
  tavern: { left: '64%', top: '52%', width: '21%' },
  cistern: { left: '39%', top: '75%', width: '15%' },
  forge: { left: '59%', top: '72%', width: '18%' },
  workshop: { left: '72%', top: '72%', width: '18%' },
  watchtower: { left: '77%', top: '28%', width: '14%' },
  tannery: { left: '80%', top: '55%', width: '16%' },
  'map-room': { left: '48%', top: '29%', width: '20%' },
  church: { left: '25%', top: '31%', width: '17%' },
  infirmary: { left: '24%', top: '72%', width: '17%' },
  'stone-wall': { left: '50%', top: '50%', width: '94%' },
  artificer: { left: '61%', top: '35%', width: '16%' },
};
</script>

<template>
  <div :class="[$style.plan, props.compact && $style.compact]">
    <svg viewBox="0 0 1000 667" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Plan illustré du Campo della Frontiera" :class="$style.base">
      <defs>
        <pattern id="ground" width="44" height="44" patternUnits="userSpaceOnUse"><path d="M0 15 21 0M-8 39 39-8M12 52 52 12" stroke="#a87943" stroke-opacity=".2" stroke-width="3" /></pattern>
        <pattern id="field" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M0 22 24 2" stroke="#6d8241" stroke-opacity=".42" stroke-width="3" /></pattern>
        <pattern id="stone" width="28" height="18" patternUnits="userSpaceOnUse"><rect width="28" height="18" fill="#9ca19c" /><path d="M0 1h28M0 17h28M14 1v8M7 9v8M22 9v8" stroke="#737a78" stroke-width="2" /></pattern>
      </defs>
      <rect width="1000" height="667" fill="#c99b5b" />
      <rect width="1000" height="667" fill="url(#ground)" />
      <path d="M0 0h300l104 210-138 152L0 336zM732 0h268v275l-183 7-75-116z" fill="#7e8b50" />
      <path d="M0 50 149 0h176L211 96 49 146zM1000 86 860 0h-124l102 116z" fill="#5f7045" />
      <path d="M47 667 0 610V416l99-39 178 51 127 239zM1000 667H756l62-154 114-87 68 38z" fill="url(#field)" />
      <path d="M1000 177C856 183 820 238 733 306S586 397 491 432C379 473 271 444 112 494" fill="none" stroke="#dbc286" stroke-width="25" />
      <path d="M1000 177C856 183 820 238 733 306S586 397 491 432C379 473 271 444 112 494" fill="none" stroke="#9d7445" stroke-width="5" stroke-dasharray="8 9" />
      <path d="M155 208 837 201 899 337 831 497 651 577 323 568 126 457 92 326z" fill="#795637" :stroke="hasStoneWall ? 'url(#stone)' : '#4e3523'" :stroke-width="hasStoneWall ? 34 : 18" />
      <path v-if="hasStoneWall" d="M155 208 837 201 899 337 831 497 651 577 323 568 126 457 92 326z" fill="none" stroke="#d8dbd4" stroke-opacity=".85" stroke-width="3" />
      <path v-else d="M155 208 837 201 899 337 831 497 651 577 323 568 126 457 92 326z" fill="#a97a48" stroke="#e4c582" stroke-width="5" stroke-dasharray="6 9" />
      <ellipse cx="500" cy="392" rx="225" ry="120" fill="#b98d56" opacity=".72" />
      <path d="m91 329 48-31 42 32-44 29z" fill="#5b3e28" /><path d="m91 329 48-31 42 32-44 29z" fill="none" stroke="#e4c582" stroke-width="4" />
      <g fill="#6e4d31" opacity=".75"><circle cx="230" cy="260" r="8" /><circle cx="710" cy="455" r="9" /><circle cx="371" cy="308" r="6" /><circle cx="618" cy="263" r="7" /></g>
    </svg>
    <template v-for="construction in CAMPO_CONSTRUCTIONS" :key="construction.id">
    <div v-if="builtNodeIds.includes(construction.id) && !['palisade', 'stone-wall'].includes(construction.id) && !construction.id.includes('-plus-') && (construction.id !== 'tents' || !hasCabins)" :class="$style.building" :style="positions[construction.id]">
      <svg viewBox="0 0 120 90" aria-hidden="true">
        <template v-if="construction.id === 'palisade' || construction.id === 'stone-wall'"><path d="M8 79V32l9-18 9 18 9-18 9 18 9-18 9 18 9-18 9 18 9-18 9 18 9-18 9 18 9-18 9 18v47z" /><path d="M5 56h110M5 70h110" /></template>
        <template v-else-if="construction.id === 'tents'"><path d="m12 75 28-48 25 48zM48 75l28-56 32 56z" /><path d="M40 27v48M76 19v56" /></template>
        <template v-else-if="construction.id === 'watchtower'"><path d="m28 75 15-54h34l15 54M35 51h50M42 21h36v17H42z" /><path d="m43 75 8-24m26 24-8-24" /></template>
        <template v-else-if="construction.id === 'cistern'"><ellipse cx="60" cy="30" rx="35" ry="13" /><path d="M25 30v30c0 18 70 18 70 0V30M25 60c0 17 70 17 70 0" /></template>
        <template v-else-if="construction.id === 'forge' || construction.id === 'workshop' || construction.id === 'artificer'"><path v-if="construction.id === 'forge'" d="M89 10v27h13V10z" /><path d="M18 75V37l42-25 42 25v38zM10 37h100M43 75V52h34v23" /><template v-if="construction.id === 'forge'"><path v-if="forgeLevel >= 1" d="M27 33 60 14l33 19" fill="none" stroke="#59615f" stroke-width="5" /><g v-if="forgeLevel >= 1" fill="#c2c8c1" stroke="none"><circle cx="39" cy="27" r="2.5" /><circle cx="60" cy="16" r="2.5" /><circle cx="81" cy="27" r="2.5" /></g><path v-if="forgeLevel >= 2" d="M18 75h-11V52l16-9 13 9v23zM10 58h10M92 51h10v13H92z" fill="#9ca19c" /></template><template v-else-if="construction.id === 'workshop'"><path v-if="upgradeLevel('workshop') >= 1" d="m22 69 22-18m-12-8 18 18" stroke="#d4b06d" stroke-width="4" /><path v-if="upgradeLevel('workshop') >= 2" d="M93 75V29m-9 11h18" stroke="#59615f" stroke-width="5" /></template><template v-else><path d="M62 17v24m-12-12h24" /><path v-if="upgradeLevel('artificer') >= 1" d="M22 61h17v14H22zM25 61V48h11v13" fill="#9ca19c" /><path v-if="upgradeLevel('artificer') >= 2" d="M99 75V49l13-8v34z" fill="#59615f" /></template></template>
        <template v-else-if="construction.id === 'tavern'"><path d="M14 75V36l46-25 46 25v39zM8 36h104M45 75V52h30v23M39 42h9m24 0h9" /><path v-if="upgradeLevel('tavern') >= 1" d="M12 49h96l-12 13H24z" fill="#b85e36" /><path v-if="upgradeLevel('tavern') >= 2" d="M50 28v-15h20v15" fill="#80512e" /></template>
        <template v-else-if="construction.id === 'church'"><path d="M16 75V39l44-27 44 27v36zM60 12v22m-10-11h20M48 75V52h24v23" /></template>
        <template v-else-if="construction.id === 'tannery'"><path d="M16 75V37l44-25 44 25v38zM12 37h96M48 75V52h24v23" /><path d="M88 34c17 12 7 31-5 28-12-4-5-21 5-28z" /><path v-if="upgradeLevel('tannery') >= 1" d="M5 75V53h19v22M8 57h13M91 69h23" stroke="#d4b06d" stroke-width="4" /></template>
        <template v-else><path d="M14 75V36l46-25 46 25v39zM8 36h104M45 75V52h30v23M39 42h9m24 0h9" /></template>
      </svg>
      <span>{{ buildingLabel(construction.id, construction.name) }}</span>
    </div>
    </template>
  </div>
</template>

<style module>
.plan { position: relative; width: 100%; aspect-ratio: 3 / 2; overflow: hidden; background: #201a14; isolation: isolate; }
.base { display: block; width: 100%; height: 100%; }
.building { position: absolute; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff0c6; filter: drop-shadow(0 2px 1px rgba(34, 21, 12, .8)); font-size: clamp(.48rem, 1.1vw, .82rem); font-weight: bold; line-height: 1.1; text-align: center; pointer-events: none; }
.building svg { width: 100%; max-height: 5.6rem; fill: #80512e; stroke: #2e2117; stroke-linecap: round; stroke-linejoin: round; stroke-width: 4; }
.building:nth-of-type(even) svg { fill: #975f32; }
.building span { max-width: 100%; padding: .16rem .28rem; overflow-wrap: anywhere; background: rgba(45, 29, 18, .72); border: 1px solid rgba(255, 235, 184, .55); }
.compact .building { transform: translate(-50%, -50%) scale(.72); font-size: clamp(.2rem, .52cqh, .34rem); } .compact .building svg { max-height: 2.1rem; } .compact .building span { padding: .04rem .09rem; border-width: 0; }
</style>
