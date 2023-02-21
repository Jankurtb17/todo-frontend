<template>
  <div class="grid">
    <div class="task">
      <h1>Task Activities</h1>
      <Modal text="Add Task" type="primary" @dialogVisible="closeDialog">
        <template #body>
          <el-form ref="ruleRefForm" :model="form" :rules="rules">
            <label>Name</label>
            <el-form-item prop="title">
              <el-input v-model="form.title" />
            </el-form-item>
            <label>Type</label>
            <el-form-item prop="type">
              <el-select style="width: 100%" v-model="form.type">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <label>Time</label>
            <el-form-item>
              <el-time-picker
                v-model="form.start"
                is-range
                range-separator="To"
                start-placeholder="Start time"
                end-placeholder="End time"
                format="HH:mm"
              />
            </el-form-item>
            <label>Description</label>
            <el-form-item prop="description">
              <el-input v-model="form.description" type="textarea" />
            </el-form-item>

            <div class="formBtn">
              <el-form-item>
                <el-button @click="closeDialog">Cancel</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="submit" @click="submitForm">
                  Confirm
                </el-button>
              </el-form-item>
            </div>
          </el-form>
        </template>
      </Modal>
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
import AllList from "@/views/TaskList/AllList.vue";
import PersonalList from "@/views/TaskList/PersonalList.vue";
import TodayList from "./TaskList/TodayList.vue";
import WorkList from "./TaskList/WorkList.vue";
import BaseTab from "@/components/BaseTab.vue";
import Modal from "@/components/ModalDialog.vue";
import { ref, reactive, onMounted } from "vue";
import type { FormType } from "@/utils/types";
import type { FormInstance, FormRules } from "element-plus";
import useTask, { status } from "@/composables/task";
import { message } from "@/utils/common";
const { postTask } = useTask();
const form = reactive({} as FormType);
const ruleRefForm = ref<FormInstance>();
const activeName = ref("All");  
const dialogVisible = ref(false);
const getVal = ref();
const today = ref();

const closeDialog = (open) => {
  console.log(open);
};
const rules = ref<FormRules>({
  title: [
    {
      required: true,
      message: "Please enter a task name",
      trigger: "blur",
    },
  ],
  type: [
    {
      required: true,
      message: "Please enter a task type",
      trigger: "change",
    },
  ],
  time: [
    {
      required: true,
      message: "Please enter a time",
      trigger: "change",
    },
  ],
  description: [
    {
      required: true,
      message: "Please enter a description",
      trigger: "blur",
    },
  ],
});

const options = ref([
  {
    value: "Personal",
    label: "Personal",
  },
  {
    value: "Week",
    label: "Week",
  },
  {
    value: "Today",
    label: "Today",
  },
  {
    value: "Work",
    label: "Work",
  },
]);

const submitForm = () => {
  if (!ruleRefForm.value) return;
  ruleRefForm.value.validate(async (isValid) => {
    if (isValid) {
      await postTask(form);
      console.log(form);
      message("Successfully Added", "success");
      dialogVisible.value = false;
    } else {
      message("Kindly check the required fields", "error");
    }
  });
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

.formBtn {
  display: flex;
  justify-content: end;
}

.submit {
  margin-left: 5px;
}

.all {
  padding: 20px 50px 20px 0;
}
</style>
