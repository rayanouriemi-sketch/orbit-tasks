export type Status = 'todo' | 'doing' | 'review' | 'done'
export type Task = { id: number, title: string, tag: 'Design' | 'Dev' | 'Bug' | 'UX', due: string, owner: string, status: Status }

export const columns: { id: Status, label: string }[] = [
  { id: 'todo', label: 'À faire' },
  { id: 'doing', label: 'En cours' },
  { id: 'review', label: 'En revue' },
  { id: 'done', label: 'Terminé' },
]

export const people: Record<string, string> = { Léa: '#ffb86b', Malik: '#7c5cff', Jade: '#22d3a6', Noé: '#ff6b81' }

// Stockage en mémoire : repart à zéro à chaque redémarrage du serveur (projet concept)
export const tasks: Task[] = [
  { id: 1, title: 'Audit UX du parcours d\'inscription', tag: 'UX', due: '28 oct.', owner: 'Léa', status: 'todo' },
  { id: 2, title: 'Explorer 3 directions pour l\'onboarding', tag: 'Design', due: '30 oct.', owner: 'Malik', status: 'todo' },
  { id: 3, title: 'Brancher l\'API de notifications', tag: 'Dev', due: '2 nov.', owner: 'Jade', status: 'todo' },
  { id: 4, title: 'Design system : composants formulaire', tag: 'Design', due: 'Aujourd\'hui', owner: 'Malik', status: 'doing' },
  { id: 5, title: 'Mode sombre sur toutes les vues', tag: 'Dev', due: 'Demain', owner: 'Noé', status: 'doing' },
  { id: 6, title: 'Le clavier masque le bouton « Valider »', tag: 'Bug', due: 'Hier', owner: 'Jade', status: 'review' },
  { id: 7, title: 'Tests utilisateurs : synthèse (5 sessions)', tag: 'UX', due: 'Lun.', owner: 'Léa', status: 'review' },
  { id: 8, title: 'Nouvelle palette & typographie', tag: 'Design', due: '✓', owner: 'Malik', status: 'done' },
  { id: 9, title: 'Animations de transition entre écrans', tag: 'Dev', due: '✓', owner: 'Noé', status: 'done' },
]
