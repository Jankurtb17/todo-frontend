<template>
  <el-card>
    <div class="task-text">
      <div>
        <h4>{{ props?.task?.title }}</h4>
        <p>{{ props?.task?.description }}</p>
      </div>
      <div class="task-check">
        <slot name="btn"> </slot>
        <!-- <check-circle-outline class="check" @click="updateTask(props.task)" /> -->
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from "vue";
import type { FormType } from "@/utils/types";
import useTask from "@/composables/task";
import { notification } from "@/utils/common";
const { putTask } = useTask();
const props = defineProps({
  arrTask: Array,
  task: Object,
});
const emit = defineEmits<{
  (e: "isUpdated", updated: boolean): boolean;
}>();

const updateTask = async (task: any) => {
  try {
    emit("isUpdated", false);
    const updateTask = {
      ...task,
      completed: true,
    } as FormType;
    await putTask(task._id, updateTask);
    notification("Yayy you completed a task!", "success", "Success");
  } catch (error) {
    notification("Server error", "danger", "Failed");
  }
};
</script>

<style scoped>
.task-text {
  display: flex;
  justify-content: space-between;
}

.task-check {
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle {
  height: 20px;
}

.check {
  cursor: pointer;
}
</style>
