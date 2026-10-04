<script setup lang="ts">
useHead({ title: 'Roadmap — Orbit' })
const months = ['Oct.', 'Nov.', 'Déc.', 'Janv.', 'Févr.', 'Mars']
const items = [
  { name: 'Onboarding repensé', start: 0, length: 2, color: '#ff5a36' },
  { name: 'Mode sombre', start: 0.5, length: 1.5, color: '#7c5cff' },
  { name: 'Notifications push', start: 1.5, length: 2, color: '#22d3a6' },
  { name: 'Paiement intégré', start: 2.5, length: 2.5, color: '#ffb86b' },
  { name: 'Version tablette', start: 4, length: 2, color: '#0b84b8' },
]
</script>

<template>
  <main class="page">
    <h1>Roadmap produit</h1>
    <p class="mut">Les six prochains mois, en un coup d'œil.</p>
    <div class="gantt">
      <div class="months"><span />
        <span v-for="m in months" :key="m">{{ m }}</span>
      </div>
      <div v-for="it in items" :key="it.name" class="line">
        <span class="name">{{ it.name }}</span>
        <div class="track">
          <i :style="{ left: `${(it.start / months.length) * 100}%`, width: `${(it.length / months.length) * 100}%`, background: it.color }" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.mut { margin: 6px 0 22px; }
.gantt { background: #fff; border-radius: 16px; padding: 20px; box-shadow: 0 1px 2px rgba(22, 24, 43, .06); overflow-x: auto; }
.months, .line { display: grid; grid-template-columns: 200px 1fr; align-items: center; min-width: 640px; }
.months { grid-template-columns: 200px repeat(6, 1fr); font-size: 12px; color: var(--mut); text-transform: uppercase; letter-spacing: .06em; padding-bottom: 10px; border-bottom: 1px solid var(--line); }
.line { padding: 14px 0; border-bottom: 1px dashed var(--line); }
.line:last-child { border: 0; }
.name { font-weight: 600; font-size: 14px; }
.track { position: relative; height: 28px; }
.track i { position: absolute; top: 0; height: 100%; border-radius: 8px; opacity: .9; transition: opacity .2s; }
.track i:hover { opacity: 1; }
</style>
