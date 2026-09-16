<script setup lang="ts">
import { computed } from 'vue';
import { useCharacterStatus } from '../composables/useCharacterStatus';
import type { ProjectionState } from '../composables/useProjection';

const props = defineProps<{ state: ProjectionState; compact?: boolean }>();
const { isMarked } = useCharacterStatus();

function actorColor(actor: { id: string; name: string; collection: string }): string {
  let hash = 0;
  for (const character of `${actor.collection}:${actor.id}:${actor.name}`) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }
  return `hsl(${hash % 360} 62% 62%)`;
}

const isSpeaker = (actor: { id: string }) => props.state.speakerActorId === actor.id;
const frontActors = computed(() => {
  const speaker = props.state.actors.find((actor) => isSpeaker(actor));
  const others = props.state.actors.filter((actor) => actor.id !== speaker?.id);
  if (!speaker) return props.state.actors.length <= 3 ? props.state.actors : others.slice(0, 3);
  return [others[0], speaker, others[1]].filter((actor): actor is typeof speaker => Boolean(actor));
});
const remainingActors = computed(() => {
  const frontIds = new Set(frontActors.value.map((actor) => actor.id));
  return props.state.actors.filter((actor) => !frontIds.has(actor.id));
});
const backActors = computed(() => {
  if (remainingActors.value.length <= 4) return remainingActors.value;
  const farCount = Math.max(3, remainingActors.value.length - 4);
  return remainingActors.value.slice(0, remainingActors.value.length - farCount);
});
const farActors = computed(() => {
  if (remainingActors.value.length <= 4) return [];
  const farCount = Math.max(3, remainingActors.value.length - 4);
  return remainingActors.value.slice(remainingActors.value.length - farCount);
});
const hasBackRow = computed(() => backActors.value.length > 0 || farActors.value.length > 0);
const backgroundStyle = computed(() => (props.state.background && props.state.background.id !== 'campo-frontiera-plan'
  ? { backgroundImage: `url("${props.state.background.image}")` }
  : {}));
const showCampStats = computed(() => props.state.background?.id === 'campo-frontiera-plan' && Boolean(props.state.campStatsCaption));
</script>

<template>
  <div :class="$style.stage">
    <transition name="proj-fade">
      <div v-if="state.background" :key="state.background.id" :class="$style.background" :style="backgroundStyle">
        <CampoPlan v-if="state.background.id === 'campo-frontiera-plan'" :class="$style.campoPlan" :built-node-ids="state.background.planNodeIds ?? []" :compact="props.compact" />
      </div>
    </transition>

    <div :class="[$style.actors, hasBackRow && $style.twoRows]">
      <transition-group v-if="farActors.length" name="proj-fade" tag="div" :class="$style.farRow">
        <figure
          v-for="actor in farActors"
          :key="actor.id"
          :class="[$style.actor, isMarked(actor.id) && $style.markedActor, state.speakerActorId && !isSpeaker(actor) && $style.otherActorGreyed]"
        >
          <div :class="$style.portraitBackdrop" :style="{ '--actor-color': actorColor(actor) }">
            <img :src="actor.image" :alt="actor.name" :class="$style.portrait">
          </div>
          <figcaption v-if="state.showNames" :class="$style.name">{{ actor.name }}</figcaption>
        </figure>
      </transition-group>
      <transition-group v-if="hasBackRow" name="proj-fade" tag="div" :class="$style.backRow">
        <figure
          v-for="actor in backActors"
          :key="actor.id"
          :class="[
            $style.actor,
            isMarked(actor.id) && $style.markedActor,
            isSpeaker(actor) && $style.speakerActor,
            state.speakerActorId && !isSpeaker(actor) && $style.otherActorGreyed,
          ]"
        >
          <div :class="$style.portraitBackdrop" :style="{ '--actor-color': actorColor(actor) }">
            <img :src="actor.image" :alt="actor.name" :class="$style.portrait">
          </div>
          <figcaption v-if="state.showNames" :class="$style.name">{{ actor.name }}</figcaption>
        </figure>
      </transition-group>
      <transition-group name="proj-fade" tag="div" :class="$style.frontRow">
        <figure
          v-for="actor in frontActors"
          :key="actor.id"
          :class="[
            $style.actor,
            isMarked(actor.id) && $style.markedActor,
            isSpeaker(actor) && $style.speakerActor,
            state.speakerActorId && !isSpeaker(actor) && $style.otherActorGreyed,
          ]"
        >
          <div :class="$style.portraitBackdrop" :style="{ '--actor-color': actorColor(actor) }">
            <img :src="actor.image" :alt="actor.name" :class="$style.portrait">
          </div>
          <figcaption v-if="state.showNames" :class="$style.name">{{ actor.name }}</figcaption>
        </figure>
      </transition-group>
    </div>

    <transition name="proj-fade">
      <p v-if="showCampStats" :class="$style.caption">{{ state.campStatsCaption }}</p>
    </transition>

    <transition name="proj-fade">
      <p v-if="state.caption" :class="$style.caption">{{ state.caption }}</p>
    </transition>

    <transition name="proj-fade">
      <div v-if="state.blackout" :class="$style.blackout" />
    </transition>
  </div>
</template>

<style module>
/* Les tailles sont exprimées en unités de conteneur : le même rendu sert au plein écran et à la miniature. */
.stage { container-type: size; position: relative; width: 100%; height: 100%; background: #000; overflow: hidden; }
.background { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background-size: cover; background-position: center; }
.campoPlan { flex: 0 0 auto; width: auto !important; height: 100%; max-width: 100%; }
.background::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0, 0, 0, .75), rgba(0, 0, 0, 0) 55%); }
.actors { position: absolute; inset: auto 0 0 0; display: flex; justify-content: center; align-items: flex-end; gap: 1cqh; padding: 0 3cqw 2cqh; }
.frontRow, .backRow, .farRow { display: flex; justify-content: center; align-items: flex-end; gap: 2cqw; width: 100%; }
.twoRows { gap: 0; }
.backRow { position: absolute; bottom: 31cqh; z-index: 1; width: min(92cqw, 100%); flex-wrap: nowrap; gap: 1cqw; transform: translateX(1.5cqw); opacity: .82; }
.backRow .actor { flex: 1 1 0; min-width: 0; }
.farRow { position: absolute; bottom: 54cqh; z-index: 0; width: min(78cqw, 100%); flex-wrap: nowrap; gap: 1cqw; transform: translateX(-1.5cqw); opacity: .62; }
.farRow .actor { flex: 1 1 0; min-width: 0; }
.frontRow { position: relative; z-index: 2; }
.actor { margin: 0; text-align: center; }
.otherActorGreyed { filter: grayscale(1); opacity: .58; }
.markedActor { text-decoration: line-through; text-decoration-thickness: .1em; opacity: .58; }
.speakerActor { z-index: 5; transform: translateY(-5cqh) scale(1.08); }
.speakerActor .portraitBackdrop { border-radius: 50%; padding: .4cqh; box-shadow: 0 0 1cqh var(--actor-color), 0 0 4cqh var(--actor-color), 0 0 7cqh var(--actor-color); }
.portraitBackdrop { display: inline-flex; align-items: flex-end; line-height: 0; }
.portrait { display: block; height: 52cqh; max-width: 26cqw; object-fit: contain; filter: drop-shadow(0 0 2cqh var(--actor-color)) drop-shadow(0 0 1.5cqh rgba(0, 0, 0, .95)); }
.backRow .portrait { height: 34cqh; max-width: 18cqw; filter: drop-shadow(0 0 1.5cqh var(--actor-color)) drop-shadow(0 0 1cqh rgba(0, 0, 0, .95)); }
.farRow .portrait { height: 25cqh; max-width: 14cqw; filter: drop-shadow(0 0 1cqh var(--actor-color)) drop-shadow(0 0 .75cqh rgba(0, 0, 0, .95)); }
.backRow .name { font-size: 3cqh; }
.farRow .name { font-size: 2.5cqh; }
.name { margin-top: .5cqh; font-size: 4cqh; letter-spacing: .12em; text-transform: uppercase; color: #f1e6d3; text-shadow: 0 2px 6px #000; }
.caption { position: absolute; top: 3cqh; left: 50%; transform: translateX(-50%); margin: 0; padding: 1cqh 3cqh; background: rgba(0, 0, 0, .6); border: 1px solid #b3813a; border-radius: 4px; color: #f1e6d3; font-size: 5cqh; white-space: nowrap; }
.blackout { position: absolute; inset: 0; background: #000; }
</style>

<style>
.proj-fade-enter-active, .proj-fade-leave-active { transition: opacity .45s ease; }
.proj-fade-enter-from, .proj-fade-leave-to { opacity: 0; }
.proj-fade-leave-active { position: absolute; }
</style>
