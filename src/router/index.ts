import { createRouter, createWebHistory } from 'vue-router'
import Board from '../views/Board.vue'
import Backlog from '../views/Backlog.vue'
import Sprints from '../views/Sprints.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/board'
    },
    {
      path: '/board',
      component: Board
    },
    {
      path: '/backlog',
      component: Backlog
    },
    {
      path: '/sprints',
      component: Sprints
    }
  ]
})

export default router