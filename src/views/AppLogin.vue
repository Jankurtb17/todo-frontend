<template>
  <div class="main-view">
    <el-container>
      <el-main>
        <el-row class="row" justify="center">
          <el-col
            :xl="6"
            :lg="6"
            :md="8"
            :span="4"
            class="grid-content left-content"
          >
            <h1 class="pl-10">Login</h1>
            <el-form>
              <div>
                <BaseInput
                  v-model="form.email"
                  placeholder="Enter email"
                  clearable
                  style="height: 45px"
                />
                <BaseInput
                  v-model="form.password"
                  placeholder="Enter password"
                  type="password"
                  style="height: 45px"
                  clearable
                />
              </div>
              <el-button style="height: 40px">Sign In</el-button>

              <div>
                <span>- or sign in with -</span>
                <button>GOOGLE</button>
              </div>
            </el-form>
          </el-col>
          <el-col :xl="6" :lg="6" :span="12" class="grid-content right-content"
            >JFETM Todo Application</el-col
          >
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import BaseInput from "@/components/BaseInput.vue";
import { ref, reactive } from "vue";

type FormInput = {
  email: string;
  password: string;
};

const form = reactive({} as FormInput);
</script>

<style scoped>
.main-view {
  margin-top: 8%;
}

.el-col {
  height: 60vh;
  border: 1px solid lightgray;
}

.left-content {
  background-color: #7569de;
  color: white;
}

.el-form {
  padding-left: 10px;
  padding-right: 10px;
}

.pl-10 {
  padding-left: 10px;
}
</style>
