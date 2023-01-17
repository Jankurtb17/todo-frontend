<template>
  <router-view name="Login" class="router-view" v-slot="{ Component, route }">
    <Transition name="page-slide" mode="out-in">
      <div :key="route.name">
        <component :is="Component" />
      </div>
    </Transition>
  </router-view>
  <router-view name="Content"></router-view>
  
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
</style>
