<template>
  <div>
    <el-timeline-item
      v-for="task in arrTask"
      :key="task._id"
      :timestamp="task.startTime"
    >
      <el-card>
        <h4>{{ task.title }}</h4>
        <p>{{ task.description }}</p>
      </el-card>
    </el-timeline-item>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { FormType } from "@/utils/types";
defineProps({
  arrTask: Array,
});
</script>
