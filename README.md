# Orbit

Concept d'outil de gestion de projet en kanban. **Projet concept** : les données sont fictives et stockées en mémoire côté serveur (elles repartent à zéro au redémarrage).

## Pages

- `/` : tableau kanban avec glisser-déposer (le changement de colonne est enregistré par l'API) et création de tâches
- `/projets` : vue des projets, l'avancement du sprint est calculé à partir du tableau
- `/roadmap` : roadmap produit sur six mois façon diagramme de Gantt

## API (Nitro / Node)

- `GET /api/board`
- `POST /api/tasks`
- `PATCH /api/tasks/:id` : change le statut d'une tâche

## Stack

Nuxt 4 · Vue 3 · TypeScript · Drag & Drop HTML5 · Nitro (Node)

## Lancer le projet

```bash
pnpm install
pnpm dev
```
