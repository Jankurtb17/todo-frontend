import { createRouter, createWebHistory, viewDepthKey } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
      meta: {
        requiresAuth: true
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
      ]
    },
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    )
  })
}

router.beforeEach(async (to, _from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(await getCurrentUser()) {
      next();
    } else {
      next("/login")
    }
  } else {
    next();
  }
});


export default router
