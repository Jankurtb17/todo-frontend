<template>
  <router-view name="Login" class="router-view"> </router-view>
  <router-view name="Content" class="router-view" v-slot="{ Component, route }">
    <Transition name="page-up" mode="out-in">
      <div :key="route.name">
        <component :is="Component" />
      </div>
    </Transition>
  </router-view>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import useUserStore from "./stores/user";
const store = useUserStore()
let auth: any;
const router = useRouter();
let creds: any = ref(null);
auth = getAuth();
onMounted(() => {
  onAuthStateChanged(auth, (user: any) => {
    if (user) {
      store.setUser(user.auth.currentUser)
    } else {
      store.setUser(null)
      router.push("/login")
    }
  });
});
</script>
<style scoped>
.page-slide-enter-active,
.page-slide-leave-active {
  transition: 600ms ease all;
}

.page-slide-enter-from,
.page-slide-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.page-up-enter-active,
.page-up-leave-active {
  transition: 600ms ease all;
}

.page-up-enter-from,
.page-up-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
</style>
