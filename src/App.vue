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

<script setup lang="ts"></script>
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
