<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useMusicLibrary, useMusicPlayer, type MusicTrack } from '../composables/useMusic';
import { useClickOutside } from '../composables/useClickOutside';

const { tracks, situations } = useMusicLibrary();
const { currentTrack, currentTrackId, isPlaying, volume, loop, play, togglePlay, stop, setVolume, setLoop } = useMusicPlayer();

const open = ref(false);
const activeSituation = ref<string>('');
const audioElement = ref<HTMLAudioElement | null>(null);
const rootElement = ref<HTMLElement | null>(null);
const currentTime = ref(0);
const duration = ref(0);
const playbackError = ref('');

useClickOutside(rootElement, () => { open.value = false; });

const groupedTracks = computed(() => {
  const needle = activeSituation.value;
  return needle ? tracks.value.filter((track) => track.situation === needle) : tracks.value;
});

function isCurrent(track: MusicTrack) {
  return currentTrackId.value === track.id;
}

function playTrack(track: MusicTrack) {
  if (isCurrent(track)) togglePlay();
  else play(track.id);
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const secs = total % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function onTimeUpdate() {
  if (audioElement.value) currentTime.value = audioElement.value.currentTime;
}

function onLoadedMetadata() {
  if (audioElement.value) duration.value = audioElement.value.duration || 0;
}

function seekTo(seconds: number) {
  if (!audioElement.value || !currentTrack.value) return;
  const clamped = Math.min(Math.max(0, seconds), duration.value || seconds);
  audioElement.value.currentTime = clamped;
  currentTime.value = clamped;
}

function onSeekInput(event: Event) {
  seekTo(Number((event.target as HTMLInputElement).value));
}

function seekBy(delta: number) {
  if (!audioElement.value) return;
  seekTo(audioElement.value.currentTime + delta);
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable;
}

// Raccourcis actifs uniquement quand le panneau est ouvert, pour ne pas gêner la navigation ailleurs sur le site.
function onKeydown(event: KeyboardEvent) {
  if (!open.value || isEditableTarget(event.target) || event.metaKey || event.ctrlKey || event.altKey) return;
  switch (event.key) {
    case ' ':
    case 'Spacebar':
      event.preventDefault();
      togglePlay();
      break;
    case 'ArrowRight':
      event.preventDefault();
      seekBy(10);
      break;
    case 'ArrowLeft':
      event.preventDefault();
      seekBy(-10);
      break;
    case 'ArrowUp':
      event.preventDefault();
      setVolume(volume.value + 0.05);
      break;
    case 'ArrowDown':
      event.preventDefault();
      setVolume(volume.value - 0.05);
      break;
    case 'l':
    case 'L':
      setLoop(!loop.value);
      break;
    case 'Escape':
      stop();
      break;
    default:
      break;
  }
}

onMounted(() => document.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown));

watch(currentTrack, (track) => {
  currentTime.value = 0;
  duration.value = 0;
  playbackError.value = '';
  if (!audioElement.value) return;
  audioElement.value.src = track?.source ?? '';
  if (track && isPlaying.value) void audioElement.value.play().catch(() => { isPlaying.value = false; });
});

watch(isPlaying, (playing) => {
  if (!audioElement.value || !currentTrack.value) return;
  if (playing) {
    playbackError.value = '';
    void audioElement.value.play().catch(() => { isPlaying.value = false; });
  } else audioElement.value.pause();
});

watch(volume, (value) => {
  if (audioElement.value) audioElement.value.volume = value;
}, { immediate: true });

watch(loop, (value) => {
  if (audioElement.value) audioElement.value.loop = value;
}, { immediate: true });

function onEnded() {
  if (!loop.value) isPlaying.value = false;
}

function onAudioError() {
  if (!currentTrack.value) return;
  playbackError.value = `Lecture impossible pour « ${currentTrack.value.name} » (fichier introuvable ou manifeste à régénérer).`;
  isPlaying.value = false;
}
</script>

<template>
  <div ref="rootElement" :class="[$style.wrapper, open && $style.open]">
    <audio ref="audioElement" @ended="onEnded" @timeupdate="onTimeUpdate" @loadedmetadata="onLoadedMetadata" @error="onAudioError" />

    <button type="button" :class="$style.fab" :aria-expanded="open" @click="open = !open">
      🎵 Musique<span v-if="currentTrack" :class="[$style.badge, isPlaying && $style.badgePlaying]">{{ isPlaying ? '▶' : '⏸' }}</span>
    </button>

    <aside v-show="open" :class="$style.panel" aria-label="Gestion de la musique">
      <header :class="$style.head">
        <strong>Musique d’ambiance</strong>
        <button type="button" :class="$style.mini" title="Fermer" @click="open = false">✕</button>
      </header>

      <section v-if="currentTrack" :class="$style.player">
        <p :class="$style.nowPlaying">{{ currentTrack.name }}<small v-if="currentTrack.situation"> — {{ currentTrack.situation }}</small></p>
        <div :class="$style.seekRow">
          <span :class="$style.time">{{ formatTime(currentTime) }}</span>
          <input type="range" min="0" :max="duration || 0" step="0.1" :value="currentTime" :class="$style.seek" @input="onSeekInput">
          <span :class="$style.time">{{ formatTime(duration) }}</span>
        </div>
        <div :class="$style.toolbar">
          <button type="button" :class="$style.button" title="Reculer de 10s (←)" @click="seekBy(-10)">⏪ 10s</button>
          <button type="button" :class="$style.primary" @click="togglePlay">{{ isPlaying ? '⏸ Pause' : '▶ Lecture' }}</button>
          <button type="button" :class="$style.button" title="Avancer de 10s (→)" @click="seekBy(10)">10s ⏩</button>
          <button type="button" :class="$style.button" @click="stop">Arrêter</button>
          <label :class="$style.loopToggle"><input type="checkbox" :checked="loop" @change="setLoop(($event.target as HTMLInputElement).checked)"> Boucle (L)</label>
        </div>
        <label :class="$style.volumeRow">Volume (↑ / ↓)
          <input type="range" min="0" max="1" step="0.05" :value="volume" @input="setVolume(Number(($event.target as HTMLInputElement).value))">
        </label>
        <p v-if="open" :class="$style.shortcuts">Espace lecture/pause · ← → reculer/avancer 10s · ↑ ↓ volume · L boucle · Échap arrêter</p>
        <p v-if="playbackError" :class="$style.error">{{ playbackError }}</p>
      </section>
      <p v-else :class="$style.hint">Aucune musique en cours.</p>

      <section>
        <h3 :class="$style.title">Bibliothèque</h3>
        <div v-if="situations.length" :class="$style.chips">
          <button type="button" :class="[$style.chip, !activeSituation && $style.active]" @click="activeSituation = ''">Toutes</button>
          <button v-for="situation in situations" :key="situation" type="button" :class="[$style.chip, activeSituation === situation && $style.active]" @click="activeSituation = situation">{{ situation }}</button>
        </div>

        <p v-if="!groupedTracks.length" :class="$style.hint">Aucune piste trouvée. Ajoutez des fichiers dans public/audio/&lt;thème&gt;/.</p>
        <ul v-else :class="$style.trackList">
          <li v-for="track in groupedTracks" :key="track.id" :class="[$style.trackItem, isCurrent(track) && $style.trackActive]">
            <button type="button" :class="$style.playButton" @click="playTrack(track)">{{ isCurrent(track) && isPlaying ? '⏸' : '▶' }}</button>
            <span :class="$style.grow">
              <strong>{{ track.name }}</strong>
              <small v-if="!activeSituation && track.situation"> — {{ track.situation }}</small>
            </span>
          </li>
        </ul>
      </section>
    </aside>
  </div>
</template>

<style module>
.wrapper { position: fixed; left: 1.25rem; bottom: 5.5rem; z-index: 41; }
.fab { display: flex; align-items: center; gap: .5rem; background: var(--accent); color: #1c150f; border: none; border-radius: 999px; padding: .7rem 1.1rem; font-family: inherit; font-weight: bold; cursor: pointer; box-shadow: 0 4px 14px rgba(0, 0, 0, .5); }
.badge { background: #1c150f; color: var(--accent); border-radius: 999px; padding: 0 .5rem; font-size: .8rem; }
.badgePlaying { color: #7ee08a; }
.panel { position: fixed; top: 0; left: 0; width: min(24rem, 100vw); bottom: 0; overflow-y: auto; background: var(--panel); border-right: 2px solid var(--accent); padding: 1rem 1.1rem 5rem; display: flex; flex-direction: column; gap: 1rem; box-shadow: 4px 0 14px rgba(0, 0, 0, .35); scrollbar-width: thin; scrollbar-color: var(--accent) #1c150f; z-index: 46; }
.head { display: flex; align-items: center; justify-content: space-between; }
.title { margin: 0; font-size: .95rem; color: var(--accent); }
.hint { margin: 0; color: var(--muted); font-size: .8rem; }
.error { margin: 0; color: #d9534f; font-size: .8rem; }
.player { display: flex; flex-direction: column; gap: .5rem; border: 1px solid #4a3a28; border-radius: 4px; padding: .6rem .7rem; background: #1c150f; }
.nowPlaying { margin: 0; }
.nowPlaying small { color: var(--muted); }
.seekRow { display: flex; align-items: center; gap: .5rem; }
.seek { flex: 1; }
.time { color: var(--muted); font-size: .75rem; font-variant-numeric: tabular-nums; }
.toolbar { display: flex; align-items: center; gap: .5rem; flex-wrap: wrap; }
.loopToggle { display: flex; align-items: center; gap: .35rem; font-size: .85rem; color: var(--muted); }
.volumeRow { display: flex; flex-direction: column; gap: .25rem; font-size: .8rem; color: var(--muted); }
.shortcuts { margin: 0; color: var(--muted); font-size: .72rem; }
.chips { display: flex; flex-wrap: wrap; gap: .35rem; margin-bottom: .5rem; }
.chip { background: transparent; color: var(--muted); border: 1px solid #4a3a28; border-radius: 999px; padding: .25rem .65rem; font-family: inherit; font-size: .8rem; cursor: pointer; }
.chip:hover { border-color: var(--accent); color: var(--accent); }
.active { border-color: var(--accent); color: var(--accent); }
.trackList { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: .4rem; }
.trackItem { display: flex; align-items: center; gap: .5rem; border: 1px solid #4a3a28; border-radius: 4px; padding: .4rem .5rem; background: #1c150f; }
.trackActive { border-color: var(--accent); }
.trackItem strong, .trackItem small { overflow: hidden; text-overflow: ellipsis; }
.trackItem small { color: var(--muted); }
.grow { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.playButton { flex: 0 0 auto; background: transparent; border: 1px solid #4a3a28; border-radius: 999px; width: 2rem; height: 2rem; cursor: pointer; color: var(--text); }
.playButton:hover { border-color: var(--accent); color: var(--accent); }
.mini { background: transparent; color: var(--muted); border: 1px solid #4a3a28; border-radius: 3px; cursor: pointer; padding: .15rem .4rem; font-family: inherit; }
.mini:hover { border-color: var(--accent); color: var(--accent); }
.primary { align-self: flex-start; background: var(--accent); color: #1c150f; border: 1px solid var(--accent); border-radius: 4px; padding: .45rem .8rem; font-family: inherit; font-weight: bold; cursor: pointer; }
.button { background: transparent; color: var(--text); border: 1px solid #4a3a28; border-radius: 4px; padding: .45rem .8rem; font-family: inherit; cursor: pointer; }
.button:hover { border-color: var(--accent); color: var(--accent); }
@media (max-width: 52rem) {
  .wrapper { left: 1rem; bottom: 4.75rem; }
}
</style>
