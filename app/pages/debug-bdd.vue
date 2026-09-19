<script setup lang="ts">
import { computed, ref } from 'vue';

interface DocumentRow {
  key: string;
  version: number;
  payload: string;
  updatedAt: string;
}

const { data, refresh, pending, error } = await useFetch<DocumentRow[]>('/api/admin/documents', { server: false, default: () => [] });

const search = ref('');
const editingKey = ref<string | null>(null);
const editingPayload = ref('');
const saveError = ref('');
const newKey = ref('');
const newPayload = ref('{\n  \n}');
const createError = ref('');

const documents = computed(() => {
  const needle = search.value.trim().toLowerCase();
  const rows = data.value ?? [];
  if (!needle) return rows;
  return rows.filter((row) => row.key.toLowerCase().includes(needle));
});

function prettyPreview(payload: string) {
  try {
    return JSON.stringify(JSON.parse(payload), null, 2);
  } catch {
    return payload;
  }
}

function startEdit(row: DocumentRow) {
  editingKey.value = row.key;
  editingPayload.value = prettyPreview(row.payload);
  saveError.value = '';
}

function cancelEdit() {
  editingKey.value = null;
  editingPayload.value = '';
  saveError.value = '';
}

async function saveEdit(key: string) {
  saveError.value = '';
  try {
    JSON.parse(editingPayload.value);
  } catch {
    saveError.value = 'Le payload doit être un JSON valide.';
    return;
  }
  try {
    await $fetch('/api/admin/documents', { method: 'POST', body: { key, payload: editingPayload.value } });
    cancelEdit();
    await refresh();
  } catch (err) {
    saveError.value = err instanceof Error ? err.message : 'Échec de l’enregistrement.';
  }
}

async function removeDocument(key: string) {
  if (!confirm(`Supprimer définitivement le document « ${key} » ?`)) return;
  await $fetch(`/api/admin/documents/${encodeURIComponent(key)}`, { method: 'DELETE' });
  if (editingKey.value === key) cancelEdit();
  await refresh();
}

async function createDocument() {
  createError.value = '';
  const key = newKey.value.trim();
  if (!key) { createError.value = 'La clé est obligatoire.'; return; }
  try {
    JSON.parse(newPayload.value);
  } catch {
    createError.value = 'Le payload doit être un JSON valide.';
    return;
  }
  try {
    await $fetch('/api/admin/documents', { method: 'POST', body: { key, payload: newPayload.value } });
    newKey.value = '';
    newPayload.value = '{\n  \n}';
    await refresh();
  } catch (err) {
    createError.value = err instanceof Error ? err.message : 'Échec de la création.';
  }
}
</script>

<template>
  <section>
    <p><NuxtLink to="/">&larr; Retour à l’accueil</NuxtLink></p>
    <h1>Debug base de données</h1>
    <p :class="$style.intro">Consultez, éditez ou supprimez les documents stockés dans la base de synchronisation. Réservé au débogage : nécessite une connexion réseau.</p>

    <div :class="$style.toolbar">
      <input v-model="search" type="search" placeholder="Filtrer par clé" :class="$style.search">
      <button type="button" :disabled="pending" @click="refresh()">Rafraîchir</button>
    </div>

    <p v-if="pending">Chargement…</p>
    <p v-else-if="error" :class="$style.error">Impossible de charger les documents : {{ error.message }}</p>
    <p v-else-if="!documents.length" :class="$style.hint">Aucun document ne correspond.</p>

    <ul v-else :class="$style.list">
      <li v-for="row in documents" :key="row.key" :class="$style.card">
        <header :class="$style.cardHeader">
          <div>
            <strong>{{ row.key }}</strong>
            <small>v{{ row.version }} — mis à jour {{ new Date(row.updatedAt).toLocaleString('fr-FR') }}</small>
          </div>
          <div :class="$style.actions">
            <button type="button" @click="startEdit(row)">Éditer</button>
            <button type="button" :class="$style.danger" @click="removeDocument(row.key)">Supprimer</button>
          </div>
        </header>

        <template v-if="editingKey === row.key">
          <textarea v-model="editingPayload" :class="$style.editor" rows="10" spellcheck="false" />
          <p v-if="saveError" :class="$style.error">{{ saveError }}</p>
          <div :class="$style.actions">
            <button type="button" @click="saveEdit(row.key)">Enregistrer</button>
            <button type="button" @click="cancelEdit">Annuler</button>
          </div>
        </template>
        <pre v-else :class="$style.preview">{{ prettyPreview(row.payload) }}</pre>
      </li>
    </ul>

    <section :class="$style.createSection">
      <h2>Créer un document</h2>
      <label>Clé<input v-model="newKey" type="text" placeholder="ex. content:npcs" maxlength="200"></label>
      <label>Payload (JSON)<textarea v-model="newPayload" :class="$style.editor" rows="6" spellcheck="false" /></label>
      <p v-if="createError" :class="$style.error">{{ createError }}</p>
      <button type="button" @click="createDocument">Créer</button>
    </section>
  </section>
</template>

<style module>
.intro { color: var(--muted); max-width: 40rem; }
.toolbar { display: flex; gap: .75rem; align-items: center; margin: 1rem 0; }
.search { flex: 1 1 auto; max-width: 20rem; }
.hint { color: var(--muted); }
.error { color: #d9534f; }
.list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 1rem; }
.card { background: var(--panel); border: 1px solid #4a3a28; border-radius: 6px; padding: 1rem; }
.cardHeader { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; }
.cardHeader strong { display: block; word-break: break-all; }
.cardHeader small { color: var(--muted); }
.actions { display: flex; gap: .5rem; }
.danger { color: #d9534f; }
.preview { margin-top: .75rem; max-height: 16rem; overflow: auto; background: #1c150f; padding: .75rem; border-radius: 4px; font-size: .82rem; white-space: pre-wrap; word-break: break-word; }
.editor { width: 100%; margin-top: .75rem; font-family: monospace; font-size: .85rem; background: #1c150f; color: var(--text); border: 1px solid #4a3a28; border-radius: 4px; padding: .5rem; }
.createSection { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #4a3a28; display: flex; flex-direction: column; gap: .75rem; max-width: 32rem; }
.createSection label { display: flex; flex-direction: column; gap: .35rem; }
</style>
