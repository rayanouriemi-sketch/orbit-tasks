<script setup lang="ts">
useHead({ title: 'Projets — Orbit' })
const { data: board } = await useFetch('/api/board')
const done = computed(() => board.value?.tasks.filter(t => t.status === 'done').length ?? 0)
const total = computed(() => board.value?.tasks.length ?? 1)

const projects = computed(() => [
  { name: 'Refonte app mobile', color: '#ff5a36', progress: Math.round((done.value / total.value) * 100), tasks: total.value, live: true },
  { name: 'Site marketing', color: '#7c5cff', progress: 72, tasks: 18, live: false },
  { name: 'Back-office v2', color: '#22d3a6', progress: 35, tasks: 41, live: false },
  { name: 'Programme de parrainage', color: '#ffb86b', progress: 90, tasks: 12, live: false },
])
</script>

<template>
  <main class="page">
    <h1>Projets</h1>
    <p class="mut">L'avancement de « Refonte app mobile » est calculé en direct à partir du tableau.</p>
    <div class="grid">
      <NuxtLink v-for="p in projects" :key="p.name" :to="p.live ? '/' : '/projets'" class="card">
        <div class="dot" :style="{ background: p.color }" />
        <h2>{{ p.name }}</h2>
        <p class="mut">{{ p.tasks }} tâches{{ p.live ? ' · ouvrir le tableau →' : '' }}</p>
        <div class="bar"><i :style="{ width: `${p.progress}%`, background: p.color }" /></div>
        <b>{{ p.progress }} %</b>
      </NuxtLink>
    </div>
  </main>
</template>

<style scoped>
.mut { margin: 6px 0 22px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px; }
.card { background: #fff; border-radius: 16px; padding: 22px; box-shadow: 0 1px 2px rgba(22, 24, 43, .06); transition: transform .2s, box-shadow .2s; }
.card:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(22, 24, 43, .08); }
.dot { width: 36px; height: 36px; border-radius: 10px; margin-bottom: 14px; }
h2 { font-size: 18px; }
.card .mut { margin: 4px 0 16px; }
.bar { height: 8px; background: var(--col); border-radius: 8px; overflow: hidden; margin-bottom: 8px; }
.bar i { display: block; height: 100%; border-radius: 8px; }
</style>
