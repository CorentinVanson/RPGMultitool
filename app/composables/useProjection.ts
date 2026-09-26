import { effectScope, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue';
import { hydrateLocalStorageKey, mirrorLocalStorageKey } from './useSyncedDocument';

export interface ProjectionActor {
  id: string;
  name: string;
  image: string;
  collection: 'npcs' | 'enemies';
}

export const DEFAULT_ACTOR_IMAGE = '/images/default-character.svg';

export interface ProjectionBackground {
  id: string;
  name: string;
  image: string;
  fit?: 'cover' | 'contain';
  planNodeIds?: string[];
}

export const PROJECTION_MAPS = {
  vallombra: {
    id: 'map-vallombra',
    name: 'Plan de Vallombra',
    image: '/images/locations/vallombra-map.svg',
    fit: 'contain',
  },
  world: {
    id: 'map-vesteria',
    name: 'Carte du monde',
    image: '/images/map.svg',
    fit: 'contain',
  },
} satisfies Record<string, ProjectionBackground>;

export interface ProjectionState {
  background: ProjectionBackground | null;
  actors: ProjectionActor[];
  caption: string;
  campStatsCaption: string;
  showNames: boolean;
  blackout: boolean;
  speakerActorId: string | null;
}

const CHANNEL = 'rpg-projection';
const STORAGE_KEY = 'rpg-projection-state';
export const DEFAULT_BACKGROUND: ProjectionBackground = {
  id: 'default-screen',
  name: 'Écran par défaut',
  image: '/images/default_screen.png',
};

export function defaultProjectionState(): ProjectionState {
  return { background: { ...DEFAULT_BACKGROUND }, actors: [], caption: '', campStatsCaption: '', showNames: true, blackout: false, speakerActorId: null };
}

function readStored(): ProjectionState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProjectionState();
    const stored = JSON.parse(raw) as Partial<ProjectionState>;
    return { ...defaultProjectionState(), ...stored, background: stored.background ?? { ...DEFAULT_BACKGROUND } };
  } catch {
    return defaultProjectionState();
  }
}

const controllerState = ref<ProjectionState>(defaultProjectionState());
let controllerStarted = false;

/**
 * Régie : état unique partagé par toutes les pages, diffusé aux fenêtres de projection.
 * `start()` doit être appelé au montage côté client pour éviter tout écart d'hydratation.
 */
export function useProjectionController() {
  const start = async () => {
    if (controllerStarted) return;
    controllerStarted = true;

    const remote = await hydrateLocalStorageKey(STORAGE_KEY);
    if (remote) localStorage.setItem(STORAGE_KEY, remote);
    controllerState.value = readStored();
    const channel = new BroadcastChannel(CHANNEL);

    const publish = () => {
      const snapshot = JSON.parse(JSON.stringify(controllerState.value)) as ProjectionState;
      channel.postMessage({ type: 'state', state: snapshot });
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
        void mirrorLocalStorageKey(STORAGE_KEY, JSON.stringify(snapshot));
      } catch {
        /* stockage indisponible : la diffusion par canal suffit */
      }
    };

    channel.onmessage = (event) => {
      if (event.data?.type === 'request') publish();
    };

    effectScope(true).run(() => watch(controllerState, publish, { deep: true }));
  };

  return { state: controllerState, start };
}

/** Projection window side: read-only mirror of the controller state. */
export function useProjectionReceiver(): Ref<ProjectionState> {
  const state = ref<ProjectionState>(defaultProjectionState());
  let channel: BroadcastChannel | null = null;

  onMounted(() => {
    void hydrateLocalStorageKey(STORAGE_KEY).then((remote) => {
      if (remote) localStorage.setItem(STORAGE_KEY, remote);
      state.value = readStored();
    });
    channel = new BroadcastChannel(CHANNEL);
    channel.onmessage = (event) => {
      if (event.data?.type === 'state') state.value = event.data.state as ProjectionState;
    };
    channel.postMessage({ type: 'request' });
  });

  onBeforeUnmount(() => {
    channel?.close();
    channel = null;
  });

  return state;
}
