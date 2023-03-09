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
        <delete-circle class="check" @click="deleteTask(task._id)" />
      </template>
    </timeline-item>
  </el-timeline-item>
</template>

<script lang="ts" setup>
import type { FormType } from "@/utils/types";
import TimelineItem from "@/components/TimelineItem.vue";
import useTask from "@/composables/task";
import { ref, onMounted } from "vue";
import { ElMessageBox } from "element-plus";
import { notification, message } from "@/utils/common";
const tasks = ref([] as FormType[]);
const { getTasks, status, delTask } = useTask();
const getData = async () => {
  status.isLoading = true;
  const data = await getTasks("all");
  tasks.value.push(...data);
  status.isLoading = false;
};

const getColor = (type: string): string => {
  let color = "";
  if (type === "Personal") {
    return (color = "#f99417");
  } else if (type === "Today") {
    return (color = "#5d3891");
  } else if (type === "Work") {
    return (color = "#e8e2e2");
  }
  return color;
};

defineExpose({
  getData,
});

const deleteTask = (id: string) => {
  ElMessageBox.confirm(
    "Are you sure you want to delete project",
    "Delete task",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    }
  )
    .then(async () => {
      await delTask(id);
      tasks.value = tasks.value.filter((item) => item._id !== id);
      notification("Successfully deleted!", "success", "Success");
    })
    .catch(() => {
      message("info", "Canceled");
    });
};

onMounted(() => {
  getData();
});
</script>

<style>
.check {
  cursor: pointer;
  height: 20px;
}

.chech:hover {
  color: green !important;
}
</style>
