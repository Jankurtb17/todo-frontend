<template>
  <el-timeline-item
    v-for="task in tasks"
    :key="task._id"
    placement="top"
    :timestamp="task.createdAt"
  >
    <timeline-item :task="task" @isUpdated="getData" />
  </el-timeline-item>
</template>

<script lang="ts" setup>
import type { FormType } from "@/utils/types";
import TimelineItem from "@/components/TimelineItem.vue";
import useTask from "@/composables/task";
import { ref, onMounted, watchEffect } from "vue";
const tasks = ref([] as FormType[]);
const { getTasks, status } = useTask();

const getData = async () => {
  const data = await getTasks("Today");
  tasks.value.push(...data);
};

onMounted(() => {
  getData();
});
</script>
