import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main-login',
      components: {
        Login: () => import('@/views/AppLogin.vue')
      }
    },
    {
      path: '/login',
      name: 'md-login',
      components: {
        Login: () => import('@/views/AppSmLogin.vue')
      }
    },
    {
      path: '/register',
      name: 'md-register',
      components: {
        Login: () => import('@/views/AppSmRegister.vue')
      }
    },
  ]
})

export default router
