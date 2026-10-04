import type { Status } from '../../utils/store'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const { status } = await readBody<{ status?: Status }>(event)
  const task = tasks.find(t => t.id === id)
  if (!task) throw createError({ statusCode: 404, statusMessage: 'Tâche introuvable' })
  if (!columns.some(c => c.id === status)) throw createError({ statusCode: 400, statusMessage: 'Statut invalide' })
  task.status = status!
  return task
})
