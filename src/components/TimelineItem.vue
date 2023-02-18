<template>
  <div v-for="tasks in props.arrTask" :key="tasks">
    <div v-if="isCompleted">
      <el-timeline-item
        v-for="task in tasks"
        :key="task._id"
        placement="top"
        :timestamp="task.createdAt"
      >
        <el-card>
          <div class="task-text">
            <div>
              <h4>{{ task.title }}</h4>
              <p>{{ task.description }}</p>
            </div>
            <div class="task-check">
              <check-circle-outline class="check" />
            </div>
          </div>
        </el-card>
      </el-timeline-item>
    </div>
    <div>
      <el-empty
        :image-size="200"
        description="You don't have any task today yay"
      >
        <template #image>
          <img src="../assets/task.png" />
        </template>
      </el-empty>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from "vue";
import type { FormType } from "@/utils/types";
const props = defineProps({
  arrTask: Array,
});
const isCompleted = ref(false);
const createdAt = ref("");
const checkIsCompleted = () => {
  props.arrTask?.forEach((item: any) => {
    isCompleted.value = item.completed;
  });
};

onMounted(() => {
  checkIsCompleted();
});
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
