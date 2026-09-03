<script setup lang="ts">
import { computed } from 'vue';
import type { ProjectionState } from '../composables/useProjection';

const props = defineProps<{ state: ProjectionState }>();

function actorColor(actor: { id: string; name: string; collection: string }): string {
  let hash = 0;
  for (const character of `${actor.collection}:${actor.id}:${actor.name}`) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }
  return `hsl(${hash % 360} 62% 62%)`;
}

const backgroundStyle = computed(() => (props.state.background
  ? { backgroundImage: `url("${props.state.background.image}")` }
  : {}));
</script>

<template>
  <div :class="$style.stage">
    <transition name="proj-fade">
      <div v-if="state.background" :key="state.background.id" :class="$style.background" :style="backgroundStyle" />
    </transition>

    <div :class="$style.actors">
      <transition-group name="proj-fade">
        <figure v-for="actor in state.actors" :key="actor.id" :class="$style.actor">
          <div :class="$style.portraitBackdrop" :style="{ '--actor-color': actorColor(actor) }">
            <img :src="actor.image" :alt="actor.name" :class="$style.portrait">
          </div>
          <figcaption v-if="state.showNames" :class="$style.name">{{ actor.name }}</figcaption>
        </figure>
      </transition-group>
    </div>

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
.background { position: absolute; inset: 0; background-size: cover; background-position: center; }
.background::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0, 0, 0, .75), rgba(0, 0, 0, 0) 55%); }
.actors { position: absolute; inset: auto 0 0 0; display: flex; justify-content: center; align-items: flex-end; gap: 2cqw; padding: 0 3cqw 2cqh; }
.actor { margin: 0; text-align: center; }
.portraitBackdrop { display: inline-flex; align-items: flex-end; line-height: 0; }
.portrait { display: block; height: 52cqh; max-width: 26cqw; object-fit: contain; filter: drop-shadow(0 0 2cqh var(--actor-color)) drop-shadow(0 0 1.5cqh rgba(0, 0, 0, .95)); }
.name { margin-top: .5cqh; font-size: 4cqh; letter-spacing: .12em; text-transform: uppercase; color: #f1e6d3; text-shadow: 0 2px 6px #000; }
.caption { position: absolute; top: 3cqh; left: 50%; transform: translateX(-50%); margin: 0; padding: 1cqh 3cqh; background: rgba(0, 0, 0, .6); border: 1px solid #b3813a; border-radius: 4px; color: #f1e6d3; font-size: 5cqh; white-space: nowrap; }
.blackout { position: absolute; inset: 0; background: #000; }
</style>

<style>
.proj-fade-enter-active, .proj-fade-leave-active { transition: opacity .45s ease; }
.proj-fade-enter-from, .proj-fade-leave-to { opacity: 0; }
.proj-fade-leave-active { position: absolute; }
</style>
