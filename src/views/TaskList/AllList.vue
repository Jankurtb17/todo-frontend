<template>
  <div v-if="tasks.length > 0">
    <TimelineItem :arrTask="tasks" />
  </div>
</template>

<script lang="ts" setup>
import type { FormType } from "@/utils/types";
import TimelineItem from "@/components/TimelineItem.vue";
import useTask from "@/composables/task";
import { ref, onMounted } from "vue";
const tasks = ref([] as FormType[]);
const { getTasks, status } = useTask();

const getData = async () => {
  const data = await getTasks("all");
  tasks.value.push(data);
  console.log(tasks.value);
};

onMounted(() => {
  getData();
});
</script>
