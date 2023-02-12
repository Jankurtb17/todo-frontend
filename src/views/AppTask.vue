<template>
  <div class="grid">
    <div class="task">
      <h1>Task Activities</h1>
      <Modal text="Create Task" type="primary" @dialogVisible="closeDialog">
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
                v-model="form.startTime"
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
                <el-button type="primary" class="submit" @click="submitForm"> Confirm </el-button>
              </el-form-item>
            </div>
          </el-form>
        </template>
      </Modal>
    </div>
    <div>
      <BaseTab>
        <template #all>
          <el-timeline>
            <AllList />
          </el-timeline>
        </template>
      </BaseTab>
    </div>
    <div></div>
  </div>
</template>

<script lang="ts" setup>
import AllList from "@/views/TaskList/AllList.vue";
import BaseTab from "@/components/BaseTab.vue";
import Modal from "@/components/ModalDialog.vue";
import { ref, reactive } from "vue";
import type { FormType } from "@/utils/types";
import type { FormInstance, FormRules } from "element-plus";
import useTask from "@/composables/task";
import { message } from "@/utils/common";
const { getTasks, postTask } = useTask();
const form = reactive({} as FormType);
const ruleRefForm = ref<FormInstance>();
const activeName = ref("All");
const dialogVisible = ref(false);

const closeDialog = (open) => {
  open = false;
}
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
      // const data = {
      //   title: form.title,
      //   description: form.description,
      //   time: form.startTime,
      //   type: form.type
      // }
      await postTask(form);
      message("Successfully Added", "success");
      dialogVisible.value = false;
    } else {
      message("Please double check the submitted form", "error");
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
</style>
