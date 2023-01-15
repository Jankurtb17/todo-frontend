import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      components: {
        Login: () => import('../views/AppLogin.vue')
      }
    },
  ]
})

export default router
