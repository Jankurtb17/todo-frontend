<template>
  <el-button :type="type" @click="openDialog" class="btn">
    <el-icon class="circleplus"><CirclePlus /></el-icon> {{ text }}
  </el-button>

  <el-dialog v-model="dialogVisible" title="Task" width="30%">
    <slot name="body"></slot>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const dialogVisible = ref(false);
defineProps(["text", "type"]);
const emit = defineEmits<{
  (e: "dialogVisible", close: boolean): boolean;
}>();

const openDialog = () => {
  dialogVisible.value = true;
  emit("dialogVisible", dialogVisible.value);
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.circleplus {
  margin-right: 5px;
}

.btn {
  margin-bottom: 10px;
}
</style>
