<template>
  <el-form-item :prop="prop">
    <el-input v-bind="$attrs" />
  </el-form-item>
</template>

<script lang="ts" setup>
defineProps(["label", "text", "prop"]);
</script>
