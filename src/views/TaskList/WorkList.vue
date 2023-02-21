<template>
  <el-timeline-item
    v-for="task in tasks"
    :key="task._id"
    placement="top"
    :timestamp="task.createdAt"
  >
    <timeline-item :task="task">
      <template #btn>
        <check-circle-outline class="check" @click="updateTask(task)" />
      </template>
    </timeline-item>
  </el-timeline-item>
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
  const data = await getTasks("Work");
  tasks.value.push(...data);
};

const updateTask = async (task: any) => {
  console.log("clicked");
  const updateTask = {
    ...task,
    completed: true,
  } as FormType;
  const data = await putTask(task._id, updateTask);
  const index = tasks.value.findIndex((item) => item._id === updateTask._id);
  if (index !== -1) {
    tasks.value.splice(index, 1);
  }
  console.log(tasks.value);
  notification("Yayy you completed a task!", "success", "Success");
};

onMounted(() => {
  getData();
});
</script>
