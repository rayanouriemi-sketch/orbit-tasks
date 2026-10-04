import type { Task } from '../../utils/store'

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<Task>>(event)
  const title = String(body?.title ?? '').trim()
  if (!title) throw createError({ statusCode: 400, statusMessage: 'Titre requis' })
  const task: Task = {
    id: Math.max(0, ...tasks.map(t => t.id)) + 1,
    title,
    tag: (['Design', 'Dev', 'Bug', 'UX'] as const).includes(body?.tag as Task['tag']) ? body!.tag! : 'Dev',
    due: 'Sans date',
    owner: body?.owner && people[body.owner] ? body.owner : 'Léa',
    status: 'todo',
  }
  tasks.push(task)
  return task
})
