<template>
  <el-row>
    <el-col :span="24">
      
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const emit = defineEmits<{
  (e: "toggleMenu", isTrue: boolean): boolean
}>()
const isClick = ref(false)


const isCollapse = () => {
  emit("toggleMenu")
}


</script>

<style scoped>
.el-menu-vertical-demo {
  min-height: 100vh;
}
</style>