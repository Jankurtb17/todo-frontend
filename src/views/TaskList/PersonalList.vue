<template>
  <TimelineItem :arrTask="tasks" />
</template>

<script lang="ts" setup>
import type { FormType } from "@/utils/types";
import TimelineItem from "@/components/TimelineItem.vue";
import useTask from "@/composables/task";
import { ref, onMounted } from "vue";
const tasks = ref();
const { getTasks, status } = useTask();
const getData = async () => {
  tasks.value = await getTasks("Personal");
};

onMounted(() => {
  getData();
});
</script>
