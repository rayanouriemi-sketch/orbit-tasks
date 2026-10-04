<script setup lang="ts">
type Status = 'todo' | 'doing' | 'review' | 'done'

const { data: board, refresh } = await useFetch('/api/board', { deep: true })
const dragged = ref<number | null>(null)
const over = ref<Status | null>(null)
const title = ref('')
const tag = ref('Dev')

const byStatus = (s: Status) => (board.value?.tasks ?? []).filter(t => t.status === s)

async function drop(status: Status) {
  over.value = null
  const task = board.value?.tasks.find(t => t.id === dragged.value)
  if (!task || task.status === status) return
  task.status = status // mise à jour optimiste, puis enregistrement côté serveur
  await $fetch(`/api/tasks/${task.id}`, { method: 'PATCH', body: { status } }).catch(() => refresh())
}

async function add() {
  if (!title.value.trim()) return
  await $fetch('/api/tasks', { method: 'POST', body: { title: title.value, tag: tag.value } })
  title.value = ''
  await refresh()
}
</script>

<template>
  <main v-if="board" class="page">
    <div class="head">
      <div><p class="mut">Projet · Refonte app mobile</p><h1>Sprint 14</h1></div>
      <form class="add" @submit.prevent="add">
        <input v-model="title" placeholder="Nouvelle tâche…">
        <select v-model="tag"><option>Dev</option><option>Design</option><option>UX</option><option>Bug</option></select>
        <button class="btn">＋ Ajouter</button>
      </form>
    </div>
    <div class="board">
      <section
        v-for="c in board.columns"
        :key="c.id"
        class="col"
        :class="{ over: over === c.id }"
        @dragover.prevent="over = c.id"
        @dragleave="over = null"
        @drop="drop(c.id)"
      >
        <h2>{{ c.label }}<span>{{ byStatus(c.id).length }}</span></h2>
        <article
          v-for="t in byStatus(c.id)"
          :key="t.id"
          class="task"
          :class="{ drag: dragged === t.id }"
          draggable="true"
          @dragstart="dragged = t.id"
          @dragend="dragged = null"
        >
          <span class="tag" :class="`t-${t.tag}`">{{ t.tag }}</span>
          <p>{{ t.title }}</p>
          <div class="meta"><span>{{ t.due }}</span><span class="a" :style="{ background: board.people[t.owner] }" :title="t.owner" /></div>
        </article>
      </section>
    </div>
  </main>
</template>

<style scoped>
.head { display: flex; justify-content: space-between; align-items: end; gap: 16px; flex-wrap: wrap; margin-bottom: 20px; }
.add { display: flex; gap: 8px; }
.add input, .add select { font: inherit; font-size: 14px; border: 1px solid var(--line); border-radius: 10px; padding: 9px 12px; background: #fff; }
.add input { width: 240px; }
.board { display: grid; grid-template-columns: repeat(4, minmax(240px, 1fr)); gap: 18px; overflow-x: auto; }
.col { background: var(--col); border-radius: 16px; padding: 14px; min-height: 420px; transition: background .2s; }
.col.over { background: #ffe3db; }
.col h2 { font-size: 13px; text-transform: uppercase; letter-spacing: .08em; color: var(--mut); display: flex; justify-content: space-between; margin: 4px 4px 12px; }
.task { background: var(--card); border-radius: 12px; padding: 14px; margin-bottom: 10px; box-shadow: 0 1px 2px rgba(22, 24, 43, .06); cursor: grab; transition: transform .15s, box-shadow .15s; }
.task:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(22, 24, 43, .08); }
.task.drag { opacity: .4; }
.task .tag { margin-bottom: 8px; }
.task p { font-size: 14px; font-weight: 600; line-height: 1.4; }
.meta { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; font-size: 12px; color: var(--mut); }
.meta .a { width: 22px; height: 22px; border-radius: 50%; }
@media (max-width: 860px) { .add { width: 100%; } .add input { flex: 1; width: auto; } }
</style>
