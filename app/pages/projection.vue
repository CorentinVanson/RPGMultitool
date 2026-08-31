<script setup lang="ts">
import { useHead } from '#imports';
import { useProjectionReceiver } from '../composables/useProjection';

const state = useProjectionReceiver();

useHead({ title: 'Projection' });
</script>

<template>
  <div :class="$style.screen">
    <ProjectionStage :state="state" />
  </div>
</template>

<style module>
.screen { position: fixed; inset: 0; background: #000; }
</style>
