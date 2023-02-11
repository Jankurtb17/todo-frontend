<template>
  <div class="grid">
    <div class="task">
      <h1>Task Activities</h1>
    </div>
    <div>
      <BaseTab>
        <template #all>
          <el-timeline>
            <el-timeline-item timestamp="2018/4/12" placement="top">
              <el-card>
                <h4>Update Github template</h4>
                <p>Tom committed 2018/4/12 20:46</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top">
              <el-card>
                <h4>Update Github template</h4>
                <p>Tom committed 2018/4/3 20:46</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top">
              <el-card>
                <h4>Update Github template</h4>
                <p>Tom committed 2018/4/2 20:46</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </template>
      </BaseTab>
    </div>
    <div></div>
  </div>
</template>

<script lang="ts" setup>
import BaseTab from "@/components/BaseTab.vue";
import { ref } from "vue";
const activeName = ref("All");
</script>

<style scoped>
.grid {
  display: grid;
  /* grid-template-columns: 2fr 1fr; */
}

.grid .task {
  font-size: 30px;
}
</style>
