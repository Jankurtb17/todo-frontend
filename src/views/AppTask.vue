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
            <div class="all" v-loading="status.isLoading" :spinner="customSpinner">
              <el-timeline>
                <TodayList ref="todayList" />
              </el-timeline>
            </div>
          </el-scrollbar>
        </template>
        <template #personal>
          <el-scrollbar height="80vh">
            <div class="all" v-loading="status.isLoading" :spinner="customSpinner">
              <el-timeline>
                <PersonalList ref="personalList"/>
              </el-timeline>
            </div>
          </el-scrollbar>
        </template>
        <template #work>
          <el-scrollbar height="80vh">
            <div class="all" v-loading="status.isLoading" :spinner="customSpinner">
              <el-timeline>
                <WorkList ref="workList" />
              </el-timeline>
            </div>
          </el-scrollbar>
        </template>
        <template #completed>
          <el-scrollbar height="80vh">
            <div class="all" v-loading="status.isLoading" :spinner="customSpinner">
              <el-timeline>
                <CompletedTask ref="completedTask" />
              </el-timeline>
            </div>
          </el-scrollbar>
        </template>
      </BaseTab>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CustomSpinner from "@/components/CustomSpinner.vue";
import PersonalList from "@/views/TaskList/PersonalList.vue";
import TodayList from "./TaskList/TodayList.vue";
import WorkList from "./TaskList/WorkList.vue";
import BaseTab from "@/components/BaseTab.vue";
import TaskForm from "@/components/TaskForm.vue";
import CompletedTask from "./TaskList/CompletedTask.vue"
import { ref, computed } from "vue";
import useTask, { status } from "@/composables/task";
const dialogVisible = ref(false);
const todayList = ref();
const personalList = ref();
const workList = ref();
const completedTask = ref()

const createDialogVisible = (cancel: string) => {
  if (cancel === "cancel") {
    return (dialogVisible.value = false);
  } else {
    if (dialogVisible.value === false) {
      return (dialogVisible.value = true);
    } else {
      todayList.value.getData();
      personalList.value.getData();
      workList.value.getData();
      completedTask.value.getData();
      return (dialogVisible.value = false);
    }
  }
};

const customSpinner = computed(() => {
  return CustomSpinner;
})
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
