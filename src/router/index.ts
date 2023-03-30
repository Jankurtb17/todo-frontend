import { createRouter, createWebHistory, viewDepthKey } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useUserStore from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "main-login",
      components: {
        Login: () => import("@/views/AppLogin.vue"),
      },
    },
    {
      path: "/",
      redirect: "/login",
    },
    // {
    //   path: "/login",
    //   name: "md-login",
    //   components: {
    //     Login: () => import("@/views/AppSmLogin.vue"),
    //   },
    // },
    // {
    //   path: "/register",
    //   name: "md-register",
    //   components: {
    //     Signup: () => import("@/views/AppSmRegister.vue"),
    //   },
    // },
    {
      path: "/",
      components: {
        Content: () => import("@/components/BaseLayout.vue"),
      },
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/home",
          component: () => import("@/views/AppHome.vue"),
        },
        {
          path: "/dashboard",
          component: () => import("@/views/AppDashboard.vue"),
          meta: {
            hasMain: true,
          },
        },
        {
          path: "/task",
          component: () => import("@/views/AppTask.vue"),
        },
      ],
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const data = JSON.parse(localStorage.getItem("creds") as any)
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!data) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router;
