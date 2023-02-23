<template>
  <div>
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
          <el-button @click="$emit('cancelDialog', 'cancel')">Cancel</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="submitForm">
            Confirm
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { FormType } from "@/utils/types";
import type { FormInstance, FormRules } from "element-plus";
import useTask, { status } from "@/composables/task";
import { ElMessage } from "element-plus";
import { message } from "@/utils/common";
const { postTask } = useTask();
const form = reactive({} as FormType);
const ruleRefForm = ref<FormInstance>();
const dialogVisible = ref(false);
const emit = defineEmits<{
  (e: "closeDialog"): void;
  (e: "cancelDialog", cancel: string): void;
}>();
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
      ElMessage({
        message: "Successfully added",
        type: "success",
        onClose: () => emit("closeDialog"),
      });
    } else {
      message("Kindly check the required fields", "error");
    }
  });
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.circleplus {
  margin-right: 5px;
}

.btn {
  margin-bottom: 10px;
}

.formBtn {
  display: flex;
  justify-content: end;
}

.submit {
  margin-left: 5px;
}
</style>
