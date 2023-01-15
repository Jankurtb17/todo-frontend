<template>
  <el-form-item prop="label">
    <el-input v-bind="$attrs" />
  </el-form-item>
</template>

<script lang="ts" setup>
defineProps(["label", "text"]);
</script>
