import { computed, onMounted, ref } from 'vue';

export interface MusicTrack {
  id: string;
  name: string;
  situation: string;
  source: string;
}

const SETTINGS_KEY = 'rpg-music-settings';

const tracks = ref<MusicTrack[]>([]);
let libraryLoaded = false;
let libraryLoading: Promise<void> | null = null;

// État de lecture : propre à cette fenêtre, non synchronisé entre onglets.
const currentTrackId = ref<string | null>(null);
const isPlaying = ref(false);
const volume = ref(0.6);
const loop = ref(true);
let settingsInitialized = false;

async function loadLibrary() {
  if (libraryLoaded) return;
  if (libraryLoading) return libraryLoading;
  libraryLoading = (async () => {
    try {
      const response = await fetch('/audio/manifest.json');
      if (response.ok) tracks.value = await response.json() as MusicTrack[];
    } catch {
      // Hors ligne et manifeste pas encore mis en cache : bibliothèque vide pour l'instant.
    } finally {
      libraryLoaded = true;
    }
  })();
  return libraryLoading;
}

function initializeSettings() {
  if (settingsInitialized) return;
  settingsInitialized = true;
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (!stored) return;
    const parsed = JSON.parse(stored) as { volume?: number; loop?: boolean };
    if (typeof parsed.volume === 'number') volume.value = Math.min(1, Math.max(0, parsed.volume));
    if (typeof parsed.loop === 'boolean') loop.value = parsed.loop;
  } catch {
    // Réglages par défaut conservés.
  }
}

function persistSettings() {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ volume: volume.value, loop: loop.value }));
  } catch {
    // Réglages perdus au rechargement, sans conséquence.
  }
}

export function useMusicLibrary() {
  onMounted(() => { void loadLibrary(); });

  const situations = computed(() => [...new Set(tracks.value.map((track) => track.situation).filter(Boolean))].sort((left, right) => left.localeCompare(right)));

  return { tracks, situations };
}

export function useMusicPlayer() {
  onMounted(initializeSettings);

  const currentTrack = computed(() => tracks.value.find((track) => track.id === currentTrackId.value) ?? null);

  function play(id: string) {
    currentTrackId.value = id;
    isPlaying.value = true;
  }

  function togglePlay() {
    if (!currentTrackId.value) return;
    isPlaying.value = !isPlaying.value;
  }

  function stop() {
    isPlaying.value = false;
    currentTrackId.value = null;
  }

  function setVolume(value: number) {
    volume.value = Math.min(1, Math.max(0, value));
    persistSettings();
  }

  function setLoop(value: boolean) {
    loop.value = value;
    persistSettings();
  }

  return { currentTrack, currentTrackId, isPlaying, volume, loop, play, togglePlay, stop, setVolume, setLoop };
}
