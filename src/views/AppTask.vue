<template>
  <div class="grid">
    <div class="task">
      <h1>Task Activities</h1>
      <el-button type="primary" @click="createDialogVisible" class="btn">
        <el-icon class="circleplus"><CirclePlus /></el-icon> Add task
      </el-button>

      <el-dialog
        v-model="dialogVisible"
        :destroy-on-close="true"
        title="Task"
        width="30%"
      >
        <TaskForm
          @closeDialog="createDialogVisible"
          @cancelDialog="createDialogVisible"
        />
      </el-dialog>
    </div>
    <div class="tabs">
      <BaseTab>
        <template #today>
          <el-scrollbar height="80vh">
            <div class="all" v-loading="status.isLoading">
              <el-timeline>
                <TodayList ref="todayList" />
              </el-timeline>
            </div>
          </el-scrollbar>
        </template>
        <template #personal>
          <el-scrollbar height="80vh">
            <div class="all" v-loading="status.isLoading">
              <el-timeline>
                <PersonalList />
              </el-timeline>
            </div>
          </el-scrollbar>
        </template>
        <template #work>
          <el-scrollbar height="80vh">
            <div class="all" v-loading="status.isLoading">
              <el-timeline>
                <WorkList />
              </el-timeline>
            </div>
          </el-scrollbar>
        </template>
      </BaseTab>
    </div>
    <div></div>
  </div>
</template>

<script lang="ts" setup>
import PersonalList from "@/views/TaskList/PersonalList.vue";
import TodayList from "./TaskList/TodayList.vue";
import WorkList from "./TaskList/WorkList.vue";
import BaseTab from "@/components/BaseTab.vue";
import TaskForm from "@/components/TaskForm.vue";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import useTask, { status } from "@/composables/task";
const dialogVisible = ref(false);
const todayList = ref();

const createDialogVisible = (cancel: string) => {
  if (cancel === "cancel") {
    return (dialogVisible.value = false);
  } else {
    if (dialogVisible.value === false) {
      return (dialogVisible.value = true);
    } else {
      todayList.value.getData();
      return (dialogVisible.value = false);
    }
  }
};
</script>

<style scoped>
.grid {
  display: grid;
  /* grid-template-columns: 2fr 1fr; */
}

.grid .task {
  font-size: 30px;
}

.all {
  padding: 20px 50px 20px 0;
}
</style>
