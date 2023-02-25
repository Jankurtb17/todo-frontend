<template>
  <el-timeline-item
    v-for="task in tasks"
    :key="task._id"
    placement="top"
    :timestamp="task.createdAt"
    :color="getColor(task.type)"
  >
    <timeline-item :type="true" :task="task" size="nornmal" color="#0bbd87">
      <template #btn>
        <check-circle-outline class="check"/>
      </template>
    </timeline-item>
  </el-timeline-item>
</template>

<script lang="ts" setup>
import type { FormType } from "@/utils/types";
import TimelineItem from "@/components/TimelineItem.vue";
import useTask from "@/composables/task";
import { ref, onMounted, computed } from "vue";
import { notification } from "@/utils/common";
const tasks = ref([] as FormType[]);
const { getTasks, status, putTask } = useTask();

const getData = async () => {
  const data = await getTasks("all");
  tasks.value.push(...data)
};

const getColor = (type: string): string => {
  let color = ""
  if(type === "Personal") {
    return color = "#f99417"
  } else if(type === "Today") {
    return color = "#5d3891" 
  } else if (type === "Work") {
    return color = "#e8e2e2"
  }
  return color;
}

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