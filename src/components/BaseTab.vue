<template>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="All" style="" name="All">
      <slot name="all"></slot>
    </el-tab-pane>
    <el-tab-pane label="Today" name="second">
      <slot name="today"></slot>
    </el-tab-pane>
    <el-tab-pane label="Personal" name="fourth">
      <slot name="personal"></slot>
    </el-tab-pane>
    <el-tab-pane label="Work" name="fifth">
      <slot name="work"></slot>
    </el-tab-pane>
    <el-tab-pane label="Completed" name="sixth">
      <slot name="completed"></slot>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const activeName = ref("All");
</script>
