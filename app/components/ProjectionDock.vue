<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from '#imports';
import type { ContentEntry } from '../types/content';
import { CHARACTER_TAGS, characterEntries, entryName, sectionCollections, useContentCollection } from '../composables/useContent';
import { DEFAULT_BACKGROUND, useProjectionController, type ProjectionActor } from '../composables/useProjection';
import { useCampoFrontiera, CAMPO_CONSTRUCTIONS, campoCandidateSlug } from '../composables/useCampoFrontiera';

const route = useRoute();
const { state, start } = useProjectionController();
const camp = useCampoFrontiera();
const open = ref(false);
const showCatalog = ref(false);
const catalogTab = ref<'characters' | 'locations'>('characters');
const activeCharacterTag = ref<typeof CHARACTER_TAGS[number]>('Personnage principal');
const catalogSearch = ref('');
const isCatalogSearching = computed(() => Boolean(searchable(catalogSearch.value).trim()));

onMounted(start);

// Le dock est monté sur toutes les pages : il amène donc tout le contenu dans le cache dès la première visite.
useContentCollection('arcs');
const { data: locations } = useContentCollection('locations');
const { data: npcs } = useContentCollection('npcs');
const { data: enemies } = useContentCollection('enemies');

const withImage = (entries: ContentEntry[] | null | undefined) => (entries ?? []).filter((entry) => Boolean(entry.data.image));

function searchable(value: unknown): string {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function matchesSearch(values: unknown[], query: string): boolean {
  const needle = searchable(query).trim();
  if (!needle) return true;
  return values.some((value) => searchable(value).includes(needle));
}

/** Normalise un nom de lieu pour comparer « L'Ossario Sepolto » et « L'Ossario Sepolto (catacombes) ». */
function normalizePlace(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/^(l['’]|la |le |les )\s*/, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const toActor = (entry: ContentEntry, collection: 'npcs' | 'enemies'): ProjectionActor => ({
  id: `${collection}:${entry.id}`,
  name: entryName(entry),
  image: String(entry.data.image),
  collection,
});

const availableLocations = computed(() => withImage(locations.value));
const searchableLocations = computed(() => availableLocations.value.filter((entry) => matchesSearch([
  entryName(entry),
  entry.data.type,
  entry.data.region,
  entry.data.summary,
], catalogSearch.value)));
const catalogLocations = computed(() => (isCatalogSearching.value ? searchableLocations.value : availableLocations.value));
const campEmployeeActors = computed<ProjectionActor[]>(() => {
  const seen = new Map<string, ProjectionActor>();
  for (const construction of CAMPO_CONSTRUCTIONS) {
    if (!camp.isBuilt(construction.id)) continue;
    const npcId = camp.assignments.value[construction.id];
    if (!npcId) continue;
    const candidate = construction.candidates.find((item) => item.id === npcId);
    if (!candidate) continue;
    const slug = campoCandidateSlug(candidate.id);
    const actorId = `npcs:${slug}`;
    seen.set(candidate.id, { id: actorId, name: candidate.name, image: `/images/npcs/${slug}.png`, collection: 'npcs' });
  }
  return Array.from(seen.values());
});
const characterActorsByTag = computed<Record<typeof CHARACTER_TAGS[number], ProjectionActor[]>>(() => {
  const groups: Record<typeof CHARACTER_TAGS[number], ProjectionActor[]> = {
    'Personnage principal': [],
    'Employé du camp': [],
    'Personnage secondaire': [],
  };
  for (const entry of withImage(characterEntries(npcs.value ?? []))) {
    const tag = entry.data.tags?.find((item: string) => CHARACTER_TAGS.includes(item as typeof CHARACTER_TAGS[number])) as typeof CHARACTER_TAGS[number] | undefined;
    if (!tag) continue;
    groups[tag].push(toActor(entry, 'npcs'));
  }
  const employeeIds = new Set(groups['Employé du camp'].map((actor) => actor.id));
  for (const actor of campEmployeeActors.value) {
    if (employeeIds.has(actor.id)) continue;
    groups['Employé du camp'].push(actor);
  }
  for (const entry of withImage(enemies.value)) {
    groups['Personnage secondaire'].push(toActor(entry, 'enemies'));
  }
  return groups;
});
const currentCharacterActors = computed(() => characterActorsByTag.value[activeCharacterTag.value]);
const searchableCharacterActors = computed<ProjectionActor[]>(() => {
  const actors: ProjectionActor[] = [];
  const seen = new Set<string>();

  for (const entry of withImage(characterEntries(npcs.value ?? []))) {
    if (!matchesSearch([entryName(entry), entry.data.role, entry.data.location, entry.data.summary], catalogSearch.value)) continue;
    const actor = toActor(entry, 'npcs');
    actors.push(actor);
    seen.add(actor.id);
  }
  for (const actor of campEmployeeActors.value) {
    if (seen.has(actor.id) || !matchesSearch([actor.name], catalogSearch.value)) continue;
    actors.push(actor);
    seen.add(actor.id);
  }
  for (const entry of withImage(enemies.value)) {
    if (!matchesSearch([entryName(entry), entry.data.role, entry.data.location, entry.data.habitat, entry.data.region, entry.data.summary], catalogSearch.value)) continue;
    const actor = toActor(entry, 'enemies');
    actors.push(actor);
  }

  return actors;
});
const catalogResultCount = computed(() => catalogTab.value === 'locations'
  ? catalogLocations.value.length
  : currentCharacterActors.value.length);
const searchResultCount = computed(() => searchableCharacterActors.value.length + searchableLocations.value.length);

const currentEntry = computed(() => {
  const collection = sectionCollections[String(route.params.section ?? '')];
  const slug = String(route.params.slug ?? '');
  if (!collection || collection === 'arcs' || !slug) return null;
  const source = { locations: locations.value, npcs: npcs.value, enemies: enemies.value }[collection];
  const entry = (source ?? []).find((item) => item.id === slug);
  return entry ? { collection, entry } : null;
});

/** PNJ et créatures dont le champ « location » désigne ce lieu. */
const actorsHere = computed<ProjectionActor[]>(() => {
  if (currentEntry.value?.collection !== 'locations') return [];
  const place = normalizePlace(entryName(currentEntry.value.entry));

  const belongs = (entry: ContentEntry) => {
    const raw = entry.data.location ?? entry.data.habitat ?? entry.data.region;
    return typeof raw === 'string' && normalizePlace(raw).includes(place);
  };

  return [
    ...withImage(npcs.value).filter(belongs).map((entry) => toActor(entry, 'npcs')),
    ...withImage(enemies.value).filter(belongs).map((entry) => toActor(entry, 'enemies')),
  ];
});

/** Lieu d'attache du personnage consulté, pour proposer le décor correspondant. */
const homeLocation = computed(() => {
  if (!currentEntry.value || currentEntry.value.collection === 'locations') return null;
  const raw = currentEntry.value.entry.data.location;
  if (typeof raw !== 'string') return null;
  const needle = normalizePlace(raw);
  return availableLocations.value.find((entry) => needle.includes(normalizePlace(entryName(entry)))) ?? null;
});

const contextActor = computed(() => (currentEntry.value && currentEntry.value.collection !== 'locations' && currentEntry.value.entry.data.image
  ? toActor(currentEntry.value.entry, currentEntry.value.collection)
  : null));
const contextLocation = computed(() => (currentEntry.value?.collection === 'locations' && currentEntry.value.entry.data.image
  ? currentEntry.value.entry
  : null));
const hasContext = computed(() => Boolean(contextActor.value || contextLocation.value));

const isOnStage = (actor: ProjectionActor) => state.value.actors.some((item) => item.id === actor.id);

const contextProjected = computed(() => (contextLocation.value
  ? state.value.background?.id === contextLocation.value.id
  : Boolean(contextActor.value && isOnStage(contextActor.value))));

const contextLabel = computed(() => {
  if (contextLocation.value) return contextProjected.value ? 'Décor projeté' : 'Projeter ce décor';
  return contextProjected.value ? 'À l’écran' : 'Projeter';
});

function toggleContext() {
  if (contextLocation.value) {
    state.value.background = contextProjected.value ? null : {
      id: contextLocation.value.id,
      name: entryName(contextLocation.value),
      image: String(contextLocation.value.data.image),
    };
    return;
  }
  if (contextActor.value) toggleActor(contextActor.value);
}

function openProjection() {
  window.open('/projection', 'rpg-projection', 'popup=yes,width=1280,height=720')?.focus();
}

function setBackground(entry: ContentEntry) {
  state.value.background = { id: entry.id, name: entryName(entry), image: String(entry.data.image) };
}

function resetDefaultScreen() {
  state.value.background = { ...DEFAULT_BACKGROUND };
  state.value.blackout = false;
}

function setSpeaker(actor: ProjectionActor | null) {
  state.value.speakerActorId = actor ? actor.id : null;
}

function syncSpeakerPolicy() {
  if (state.value.actors.length === 1) {
    const onlyActor = state.value.actors[0];
    state.value.speakerActorId = onlyActor ? onlyActor.id : null;
  } else {
    state.value.speakerActorId = null;
  }
}

function addActor(actor: ProjectionActor) {
  if (!isOnStage(actor)) {
    state.value.actors = [...state.value.actors, actor];
    syncSpeakerPolicy();
  }
}

function removeActor(actor: ProjectionActor) {
  state.value.actors = state.value.actors.filter((item) => item.id !== actor.id);
  if (state.value.speakerActorId === actor.id) {
    state.value.speakerActorId = null;
  }
  syncSpeakerPolicy();
}

function toggleActor(actor: ProjectionActor) {
  if (isOnStage(actor)) removeActor(actor);
  else addActor(actor);
}

function stageScene() {
  if (!contextLocation.value) return;
  setBackground(contextLocation.value);
  state.value.actors = actorsHere.value;
}

function moveActor(index: number, offset: number) {
  const target = index + offset;
  const actors = [...state.value.actors];
  if (target < 0 || target >= actors.length) return;
  [actors[index], actors[target]] = [actors[target]!, actors[index]!];
  state.value.actors = actors;
}

// Le catalogue complet ne s'ouvre d'office que sur les pages sans contexte projetable.
watch(hasContext, (value) => { showCatalog.value = !value; }, { immediate: true });
watch(isCatalogSearching, (value) => {
  if (value) showCatalog.value = true;
});
</script>

<template>
  <div>
    <div :class="[$style.fabRow, open && $style.dockOpen]">
      <button type="button" :class="$style.preview" title="Aperçu de l’écran de projection" @click="open = true">
        <ProjectionStage :state="state" compact />
        <span :class="$style.previewLabel">Aperçu projection</span>
      </button>
      <div :class="$style.fabButtons">
        <button
          v-if="hasContext"
          type="button"
          :class="[$style.contextFab, contextProjected && $style.contextOn]"
          :aria-pressed="contextProjected"
          :title="contextProjected ? 'Retirer de l’écran de projection' : 'Afficher sur l’écran de projection'"
          @click="toggleContext"
        >
          <span :class="$style.dot" />{{ contextLabel }}
        </button>
        <button type="button" :class="$style.fab" :aria-expanded="open" @click="open = !open">
          🎬 Régie<span v-if="state.actors.length || state.background" :class="$style.badge">{{ state.actors.length }}</span>
        </button>
      </div>
    </div>

    <aside v-show="open" :class="$style.panel" aria-label="Régie de projection">
      <header :class="$style.head">
        <strong>Régie de projection</strong>
        <button type="button" :class="$style.mini" @click="open = false">✕</button>
      </header>

      <div :class="$style.panelPreview">
        <ProjectionStage :state="state" compact />
      </div>

      <div :class="$style.toolbar">
        <button type="button" :class="$style.primary" @click="openProjection">Fenêtre de projection</button>
        <button type="button" :class="$style.button" @click="resetDefaultScreen">
          Écran par défaut
        </button>
        <button type="button" :class="$style.button" @click="state.actors = []">Vider la scène</button>
        <button type="button" :class="[$style.button, state.showNames && $style.active]" @click="state.showNames = !state.showNames">
          Noms {{ state.showNames ? 'on' : 'off' }}
        </button>
      </div>
      <input v-model="state.caption" :class="$style.caption" type="text" placeholder="Légende affichée (optionnelle)">

      <section v-if="hasContext" :class="$style.context">
        <h3 :class="$style.title">Sur cette page</h3>

        <template v-if="contextLocation">
          <div :class="$style.row">
            <img :src="contextLocation.data.image" :alt="entryName(contextLocation)" :class="$style.thumb">
            <span>{{ entryName(contextLocation) }}</span>
          </div>
          <div :class="$style.toolbar">
            <button type="button" :class="$style.primary" @click="stageScene">
              Mettre en scène<template v-if="actorsHere.length"> ({{ actorsHere.length }} présent·e·s)</template>
            </button>
            <button type="button" :class="$style.button" @click="setBackground(contextLocation)">Décor seul</button>
          </div>
          <p v-if="actorsHere.length" :class="$style.hint">Présents ici — cliquez pour les faire entrer ou sortir :</p>
          <div v-if="actorsHere.length" :class="$style.chips">
            <button
              v-for="actor in actorsHere"
              :key="actor.id"
              type="button"
              :class="[$style.chip, isOnStage(actor) && $style.active]"
              @click="toggleActor(actor)"
            >
              <img :src="actor.image" :alt="actor.name" :class="$style.chipImage">{{ actor.name }}
            </button>
          </div>
          <p v-else :class="$style.hint">Aucun personnage rattaché à ce lieu.</p>
        </template>

        <template v-else-if="contextActor">
          <div :class="$style.row">
            <img :src="contextActor.image" :alt="contextActor.name" :class="$style.thumb">
            <span>{{ contextActor.name }}</span>
          </div>
          <div :class="$style.toolbar">
            <button type="button" :class="$style.primary" @click="toggleActor(contextActor)">
              {{ isOnStage(contextActor) ? 'Retirer de la scène' : 'Projeter ce personnage' }}
            </button>
            <button v-if="homeLocation" type="button" :class="$style.button" @click="setBackground(homeLocation)">
              Décor : {{ entryName(homeLocation) }}
            </button>
          </div>
        </template>
      </section>

      <section>
        <h3 :class="$style.title">Scène en cours</h3>
        <p :class="$style.hint">Décor : <strong>{{ state.background?.name ?? 'aucun' }}</strong></p>
        <ol v-if="state.actors.length" :class="$style.stageList">
          <li v-for="(actor, index) in state.actors" :key="actor.id" :class="$style.stageItem">
            <img :src="actor.image" :alt="actor.name" :class="$style.thumb">
            <span :class="$style.grow">{{ actor.name }}</span>
            <button type="button" :class="[$style.mini, state.speakerActorId === actor.id && $style.speakerButton]" @click="setSpeaker(state.speakerActorId === actor.id ? null : actor)">{{ state.speakerActorId === actor.id ? 'Personne' : 'Parler' }}</button>
            <button type="button" :class="$style.mini" :disabled="index === 0" @click="moveActor(index, -1)">←</button>
            <button type="button" :class="$style.mini" :disabled="index === state.actors.length - 1" @click="moveActor(index, 1)">→</button>
            <button type="button" :class="$style.mini" @click="toggleActor(actor)">✕</button>
          </li>
        </ol>
        <p v-else :class="$style.hint">Scène vide.</p>
      </section>

      <section>
        <input v-model="catalogSearch" :class="$style.search" type="search" placeholder="Rechercher un personnage ou un décor">

        <button type="button" :class="$style.disclosure" @click="showCatalog = !showCatalog">
          {{ showCatalog ? '▾' : '▸' }} Catalogue complet
        </button>
        <template v-if="showCatalog">
          <template v-if="isCatalogSearching">
            <p :class="$style.hint">{{ searchResultCount }} résultat{{ searchResultCount > 1 ? 's' : '' }} dans personnages et décors</p>
            <h4 :class="$style.subtitle">Personnages</h4>
            <div v-if="searchableCharacterActors.length" :class="$style.chips">
              <button
                v-for="actor in searchableCharacterActors"
                :key="actor.id"
                type="button"
                :class="[$style.chip, isOnStage(actor) && $style.active, state.speakerActorId === actor.id && $style.speaker]"
                @click="toggleActor(actor)"
              >
                <img :src="actor.image" :alt="actor.name" :class="$style.chipImage">{{ actor.name }}
              </button>
            </div>
            <p v-else :class="$style.hint">Aucun personnage trouvé.</p>

            <h4 :class="$style.subtitle">Décors</h4>
            <div v-if="searchableLocations.length" :class="$style.chips">
              <button
                v-for="entry in searchableLocations"
                :key="entry.id"
                type="button"
                :class="[$style.chip, state.background?.id === entry.id && $style.active]"
                @click="setBackground(entry)"
              >
                <img :src="entry.data.image" :alt="entryName(entry)" :class="$style.chipImage">{{ entryName(entry) }}
              </button>
            </div>
            <p v-else :class="$style.hint">Aucun décor trouvé.</p>
          </template>

          <template v-else>
            <div :class="$style.tabs" role="tablist" aria-label="Catalogue de projection">
              <button type="button" :class="[$style.tab, catalogTab === 'characters' && $style.active]" :aria-selected="catalogTab === 'characters'" role="tab" @click="catalogTab = 'characters'">Personnages</button>
              <button type="button" :class="[$style.tab, catalogTab === 'locations' && $style.active]" :aria-selected="catalogTab === 'locations'" role="tab" @click="catalogTab = 'locations'">Décors</button>
            </div>
            <p :class="$style.hint">{{ catalogResultCount }} résultat{{ catalogResultCount > 1 ? 's' : '' }}</p>

            <template v-if="catalogTab === 'locations'">
              <div :class="$style.chips">
                <button
                  v-for="entry in catalogLocations"
                  :key="entry.id"
                  type="button"
                  :class="[$style.chip, state.background?.id === entry.id && $style.active]"
                  @click="setBackground(entry)"
                >
                  <img :src="entry.data.image" :alt="entryName(entry)" :class="$style.chipImage">{{ entryName(entry) }}
                </button>
              </div>
            </template>

            <template v-else>
              <div :class="$style.filterGroup">
                <span :class="$style.filterLabel">Catégorie</span>
                <div :class="$style.filters" aria-label="Catégories de personnages">
                  <button
                    v-for="tag in CHARACTER_TAGS"
                    :key="tag"
                    type="button"
                    :class="[$style.filter, activeCharacterTag === tag && $style.active]"
                    @click="activeCharacterTag = tag"
                  >{{ tag }} <small>{{ characterActorsByTag[tag].length }}</small></button>
                </div>
              </div>
              <div :class="$style.chips">
                <button
                  v-for="actor in currentCharacterActors"
                  :key="actor.id"
                  type="button"
                  :class="[$style.chip, isOnStage(actor) && $style.active, state.speakerActorId === actor.id && $style.speaker]"
                  @click="toggleActor(actor)"
                >
                  <img :src="actor.image" :alt="actor.name" :class="$style.chipImage">{{ actor.name }}
                </button>
              </div>
              <p v-if="activeCharacterTag === 'Employé du camp' && campEmployeeActors.length" :class="$style.hint">Les employés affectés au Campo restent aussi disponibles selon les bâtiments construits.</p>
            </template>
          </template>
        </template>
      </section>
    </aside>
  </div>
</template>

<style module>
.fabRow { position: fixed; right: 1.25rem; bottom: 1.25rem; z-index: 40; display: flex; flex-direction: column; align-items: flex-end; gap: .5rem; }
.fabButtons { display: flex; align-items: center; gap: .5rem; }
.preview { position: relative; width: 15rem; aspect-ratio: 16 / 9; padding: 0; overflow: hidden; background: #000; border: 2px solid var(--accent); border-radius: 6px; cursor: pointer; box-shadow: 0 4px 14px rgba(0, 0, 0, .5); }
.dockOpen .preview { position: fixed; right: min(25.25rem, calc(100vw - 16.25rem)); bottom: 1.25rem; }
.previewLabel { position: absolute; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, .65); color: var(--muted); font-family: inherit; font-size: .7rem; letter-spacing: .05em; padding: .1rem 0; }
.panelPreview { width: 100%; aspect-ratio: 16 / 9; background: #000; border: 1px solid #4a3a28; border-radius: 4px; overflow: hidden; }
.fab { display: flex; align-items: center; gap: .5rem; background: var(--accent); color: #1c150f; border: none; border-radius: 999px; padding: .7rem 1.1rem; font-family: inherit; font-weight: bold; cursor: pointer; box-shadow: 0 4px 14px rgba(0, 0, 0, .5); }
.contextFab { display: flex; align-items: center; gap: .5rem; background: var(--panel); color: var(--muted); border: 1px solid #4a3a28; border-radius: 999px; padding: .7rem 1.1rem; font-family: inherit; font-size: .85rem; cursor: pointer; box-shadow: 0 4px 14px rgba(0, 0, 0, .5); }
.contextFab:hover { border-color: var(--accent); }
.contextOn { border-color: var(--accent); color: var(--accent); }
.dot { width: .6rem; height: .6rem; border-radius: 999px; background: #4a3a28; }
.contextOn .dot { background: #6ec86e; box-shadow: 0 0 .5rem #6ec86e; }
.badge { background: #1c150f; color: var(--accent); border-radius: 999px; padding: 0 .5rem; font-size: .8rem; }
.panel { position: fixed; top: 0; right: 0; bottom: 0; z-index: 45; width: min(24rem, 100vw); overflow-y: auto; background: var(--panel); border-left: 2px solid var(--accent); padding: 1rem 1.1rem 5rem; display: flex; flex-direction: column; gap: 1rem; }
.head { display: flex; align-items: center; justify-content: space-between; }
.title { margin: 0 0 .4rem; font-size: .95rem; color: var(--accent); }
.toolbar { display: flex; flex-wrap: wrap; gap: .4rem; }
.button, .primary, .disclosure { background: #1c150f; color: var(--text); border: 1px solid #4a3a28; border-radius: 4px; padding: .45rem .8rem; font-family: inherit; font-size: .85rem; cursor: pointer; }
.primary { background: var(--accent); color: #1c150f; border-color: var(--accent); font-weight: bold; }
.disclosure { width: 100%; text-align: left; }
.button:hover, .disclosure:hover { border-color: var(--accent); }
.active { border-color: var(--accent); color: var(--accent); }
.caption, .search { background: #1c150f; color: var(--text); border: 1px solid #4a3a28; border-radius: 4px; padding: .45rem .7rem; font-family: inherit; }
.search { width: 100%; }
.disclosure { margin: 10px 0; }
.tabs { display: grid; grid-template-columns: 1fr 1fr; gap: .35rem; padding: .2rem; background: #1c150f; border: 1px solid #4a3a28; border-radius: 6px; }
.tab { background: transparent; color: var(--muted); border: 0; border-radius: 4px; padding: .5rem .65rem; font: inherit; font-size: .86rem; font-weight: bold; cursor: pointer; }
.tab.active { background: var(--accent); color: #1c150f; }
.filterGroup { display: flex; flex-direction: column; gap: .35rem; border-left: 2px solid #4a3a28; padding-left: .65rem; }
.filterLabel { color: var(--muted); font-size: .72rem; text-transform: uppercase; letter-spacing: .06em; }
.filters { display: flex; flex-wrap: wrap; gap: .3rem; }
.filter { background: transparent; color: var(--muted); border: 1px solid #4a3a28; border-radius: 3px; padding: .28rem .5rem; font: inherit; font-size: .76rem; cursor: pointer; }
.filter small { color: var(--accent); }
.tab:hover, .filter:hover { border-color: var(--accent); }
.filter.active { background: #3a2c1d; border-color: var(--accent); color: var(--accent); }
.filter.active small { color: var(--accent); }
.subtitle { margin: .65rem 0 .35rem; color: var(--accent); font-size: .82rem; }
.context { border: 1px solid #4a3a28; border-radius: 6px; padding: .75rem; display: flex; flex-direction: column; gap: .6rem; }
.row { display: flex; align-items: center; gap: .6rem; font-weight: bold; }
.hint { margin: 0; color: var(--muted); font-size: .8rem; }
.chips { display: flex; flex-wrap: wrap; gap: .35rem; }
.chip { display: flex; align-items: center; gap: .35rem; background: #1c150f; color: var(--text); border: 1px solid #4a3a28; border-radius: 999px; padding: .25rem .7rem .25rem .25rem; font-family: inherit; font-size: .8rem; cursor: pointer; }
.chip:hover { border-color: var(--accent); }
.chipImage { width: 1.6rem; height: 1.6rem; object-fit: cover; border-radius: 999px; }
.speaker { border-color: var(--accent); color: var(--accent); box-shadow: 0 0 0 1px var(--accent) inset; }
.speakerButton { color: var(--accent); border-color: var(--accent); }
.stageList { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: .35rem; }
.stageItem { display: flex; align-items: center; gap: .4rem; background: #1c150f; border: 1px solid #4a3a28; border-radius: 4px; padding: .3rem .45rem; font-size: .85rem; }
.grow { flex: 1; }
.thumb { width: 2rem; height: 2rem; object-fit: cover; border-radius: 3px; }
.mini { background: transparent; color: var(--muted); border: 1px solid #4a3a28; border-radius: 3px; cursor: pointer; padding: 0 .35rem; }
.mini:disabled { opacity: .35; cursor: default; }

@media (max-width: 52rem) {
  .dockOpen .preview { top: 1rem; right: 1rem; bottom: auto; z-index: 50; }
}
</style>
