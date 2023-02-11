import { createRouter, createWebHistory, viewDepthKey } from 'vue-router'

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
    {
      path: "/",
      components: {
        Content: () => import('@/components/BaseLayout.vue')
      },
      children: [
        {
          path: '/home',
          component: () => import('@/views/AppHome.vue')
        },
        {
          path: '/dashboard',
          component: () => import('@/views/AppDashboard.vue'),
          meta: {
            hasMain: true
          }
        },
        {
          path: '/task',
          component: () => import('@/views/AppTask.vue')
        },
        {
          path: '/profile',
          component: () => import('@/views/AppProfile.vue')
        }
      ]
    },
  ]
})

export default router
