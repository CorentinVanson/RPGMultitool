import { effectScope, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue';

export interface ProjectionActor {
  id: string;
  name: string;
  image: string;
  collection: 'npcs' | 'enemies';
}

export interface ProjectionBackground {
  id: string;
  name: string;
  image: string;
}

export interface ProjectionState {
  background: ProjectionBackground | null;
  actors: ProjectionActor[];
  caption: string;
  showNames: boolean;
  blackout: boolean;
}

const CHANNEL = 'rpg-projection';
const STORAGE_KEY = 'rpg-projection-state';

export function defaultProjectionState(): ProjectionState {
  return { background: null, actors: [], caption: '', showNames: true, blackout: false };
}

function readStored(): ProjectionState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultProjectionState(), ...JSON.parse(raw) } : defaultProjectionState();
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
  const start = () => {
    if (controllerStarted) return;
    controllerStarted = true;

    controllerState.value = readStored();
    const channel = new BroadcastChannel(CHANNEL);

    const publish = () => {
      const snapshot = JSON.parse(JSON.stringify(controllerState.value)) as ProjectionState;
      channel.postMessage({ type: 'state', state: snapshot });
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
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
    state.value = readStored();
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
