<template>
  <header :class="$style.header">
    <h1 :class="$style.brand">🗺️ RPGMultitool</h1>
    <nav :class="$style.nav" aria-label="Navigation principale">
      <NuxtLink to="/">Accueil</NuxtLink>
      <NuxtLink to="/monde">Le Monde</NuxtLink>
      <NuxtLink to="/lieux">Lieux</NuxtLink>
      <NuxtLink to="/personnages">Personnages</NuxtLink>
      <NuxtLink to="/ennemis">Ennemis</NuxtLink>
      <NuxtLink to="/campagne">Campagne</NuxtLink>
    </nav>
  </header>
  <main :class="$style.main"><slot /></main>
  <ProjectionDock />
  <footer :class="$style.footer">Outil de maîtrise pour la campagne Historia — usage personnel, non affilié à l’éditeur.</footer>
</template>

<style module>
.header { background: var(--panel); border-bottom: 2px solid var(--accent); padding: 1rem 2rem; display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center; }
.brand { margin: 0; font-size: 1.4rem; }
.nav { display: flex; gap: 1rem; flex-wrap: wrap; }
.nav a { color: var(--muted); text-decoration: none; font-size: .95rem; }
.nav a:hover, .nav a.router-link-active { color: var(--accent); }
.main { max-width: 960px; margin: 0 auto; padding: 2rem; }
.footer { text-align: center; padding: 2rem; color: var(--muted); font-size: .85rem; }
</style>