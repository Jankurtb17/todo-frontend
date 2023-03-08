<template>
  <div v-if="tasks.length > 0">
    <el-timeline-item
      v-for="task in tasks"
      :key="task._id"
      placement="top"
      :timestamp="task.createdAt"
      color="#5d3891"
    >
      <timeline-item :task="task" size="nornmal" color="#0bbd87">
        <template #btn>
          <check-circle-outline class="check" @click="updateTask(task)" />
        </template>
      </timeline-item>
    </el-timeline-item>
  </div>
  <div v-else>
    <el-empty description="You don't have any tasks"></el-empty>
  </div>
</template>

<script lang="ts" setup>
import type { FormType } from "@/utils/types";
import TimelineItem from "@/components/TimelineItem.vue";
import useTask from "@/composables/task";
import { ref, onMounted, watchEffect } from "vue";
import { notification } from "@/utils/common";
const tasks = ref([] as FormType[]);
const { getTasks, status, putTask } = useTask();

const getData = async () => {
  tasks.value = await getTasks("Today");
  tasks.value = tasks.value.filter((item) => item.completed !== true)
};

const updateTask = async (task: any) => {
  const updateTask = {
    ...task,
    completed: true,
  } as FormType;
  await putTask(task._id, updateTask);
  const index = tasks.value.findIndex((item) => item._id === updateTask._id);
  if (index !== -1) {
    tasks.value.splice(index, 1);
  }
  notification("Yayy you completed a task!", "success", "Success");
};

defineExpose({
  getData,
});

onMounted(() => {
  getData();
});
</script>

<style>
.check {
  cursor: pointer;
}

.chech:hover {
  color: green !important;
}
</style>
