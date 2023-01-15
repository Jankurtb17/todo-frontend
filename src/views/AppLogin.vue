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
            <h1 class="main-text">Welcome</h1>
            <el-form>
              <el-row class="login-google">
                <img src="@/assets/google.svg" class="google-icon" />
                <span>SIGN IN WITH GOOGLE</span>
              </el-row>
              <div class="group">
                <div class="item line"></div>
                <div class="item text">or login with email</div>
                <div class="item line"></div>
              </div>
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
              <el-button style="width: 100%" class="btn btn-login">Sign In</el-button>

              <div class="login-register">
                <div>Don't have an account yet? Register <router-link to="/" class="register-link">here</router-link></div>
              </div>
            </el-form>
          </el-col>
          <el-col :xl="6" :lg="6" :span="12" class="grid-content right-content"
            >
            <img src="@/assets/task.svg" class="img-right"/>            
            </el-col
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
  min-height: 60vh;
  border: 1px solid lightgray;
}

.left-content {
  background-color: #33658A;
  color: white;
}

.main-text {
  text-align: center;
  font-size: 35px;
  padding-top: 25px;
}
.el-form {
  padding: 0 40px;
}

.pl-10 {
  padding-left: 5px;
}

.login-google {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: #F26419;
  padding: 3px;
  cursor: pointer;
  border-radius: 4px;
}

.google-icon {
  margin-right: 5px;
  font-size: 18px;
}

.el-form {
  padding-top: 30px;
}

.group {
  margin: 20px 0;
  display: table;
  width: 100%;
}

.item {
  display: table-cell;
}

.text {
  white-space: nowrap;
  width: 1%;
  padding: 0 10px;
  text-transform: uppercase;
  letter-spacing: 3px;
}

.line {
  border-bottom: 1px solid white;
  position: relative;
  top: -.5em
}

.btn {
  height: 40px;
}

.btn-login {
  margin-top: 15px;
  background-color: #F26419;
  color: white;
  border-color: #F26419;
  text-transform: uppercase;
  letter-spacing: 2px;
}


.login-register {
  padding-top: 50px;
  text-align: center;
}

.register-link {
  color: white;
}

.img-right {
  padding-top: 20px;
}
</style>
