<template>
  <div>
    <el-container>
      <el-main>
        <el-icon class="icon" @click="redirectToHome"><Back /></el-icon>
        <div class="sm-login">
          <div>
            <h1>Welcome !</h1>
            <span class="continue-text">Sign in to continue</span>
          </div>
          <el-form>
            <el-col :span="24">
              <el-input
                v-model="form.email"
                type="email"
                class="input-type"
                size="large"
                placeholder="Enter Email"
                clearable
              />
              <el-input
                v-model="form.password"
                type="password"
                class="input-type"
                size="large"
                placeholder="Enter Password"
                clearable
              />
              <button class="btn-login">LOGIN</button>
              <div class="forgot-pass">
                <p>Forgot your password? click <router-link to="/">here</router-link></p>
              </div>
            </el-col>

            <div class="group">
              <div class="item line"></div>
              <div class="item text">OR LOGIN WITH GOOGLE</div>
              <div class="item line"></div>
            </div>
            <el-row class="login-google">
              <img src="@/assets/GoogleIcon.svg" class="google-icon" />
              <span class="text-login-google">SIGN IN WITH GOOGLE</span>
            </el-row>
            <el-row class="register-link">
              <el-col>
                <span>Don't have an account? Register <router-link to="/register">here</router-link></span>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
type Login = {
  email: string;
  password: string;
};

const form = reactive({} as Login);
const router = useRouter();
const redirectToHome = () => {
  router.push("/");
};
</script>

<style scoped>
@media only screen and (min-width: 320px) and (max-width: 480px) {
  .icon {
    font-size: 30px;
    margin-top: 10px;
  }

  .sm-login {
    padding: 0 0.5em;
  }

  h1 {
    font-size: 50px;
    letter-spacing: 5px;
    font-family: "Roboto Condensed", sans-serif;
    color: #282047;
  }

  .continue-text {
    position: relative;
    top: -.5em;
    font-size: 30px;
    letter-spacing: 5px;
    color: rgb(202, 199, 199);
  }

  .el-form {
    margin-top: 35px;
  }

  .el-input--large :deep(.el-input__wrapper) {
    border: --el-border-none;
    padding: 10px;
    outline: none;
    margin-bottom: 20px;
  }

  .el-input--large :deep(.el-input__wrapper:hover) {
    border: --el-border-none;
    outline: none;
  }

  .btn-login {
    border: none;
    padding: 1em;
    /* background-color: #f26419; */
    background-color: #5586ef;
    margin-bottom: 25px;
    font-family: "Roboto Condensed", sans-serif;
    font-size: 15px;
    letter-spacing: 5px;
    text-decoration: none;
    text-align: center;
    width: 100%;
    color: #fff;
    border-radius: 4px;
  }

  .forgot-pass {
    position: relative;
    top: -.7em;
    text-align: center;
  }

  .group {
    margin: 10px 0;
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
    border-bottom: 1px solid #282047;
    position: relative;
    top: -0.5em;
  }

  .login-google {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f26419;
    color: #fff;
    padding: 3px;
    cursor: pointer;
    border-radius: 4px;
     margin-top: 30px;
  }

  .google-icon {
    margin-right: 5px;
    font-size: 18px;
  }

  .register-link {
    text-align: center;
    margin-top: 35px;
  }
}

/*  Tablet */
@media only screen and (min-width: 481px) and (max-width: 820px) {
  .icon {
    font-size: 50px;
    margin-top: 10px;
  }

  .sm-login {
    padding: 0 0.5em;
  }

  h1 {
    font-size: 70px;
    letter-spacing: 5px;
    font-family: "Roboto Condensed", sans-serif;
    color: #282047;
  }

  .continue-text {
    position: relative;
    top: -1em;
    font-size: 50px;
    letter-spacing: 5px;
    color: rgb(202, 199, 199);
  }

  .el-form {
    margin-top: 35px;
  }

  .el-input--large :deep(.el-input__wrapper) {
    border: --el-border-none;
    padding: 10px;
    outline: none;
    margin-bottom: 20px;
  }

  .el-input--large :deep(.el-input__wrapper:hover) {
    border: --el-border-none;
    outline: none;
  }

  .btn-login {
    border: none;
    padding: 0.8em;
    /* background-color: #f26419; */
    background-color: #5586ef;
    margin-bottom: 25px;
    font-family: "Roboto Condensed", sans-serif;
    font-size: 20px;
    letter-spacing: 5px;
    text-decoration: none;
    text-align: center;
    width: 100%;
    color: #fff;
    border-radius: 4px;
  }

  .forgot-pass {
    position: relative;
    top: -.7em;
    text-align: center;
  }

  .group {
    margin: 10px 0;
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
    border-bottom: 1px solid #282047;
    position: relative;
    top: -0.5em;
  }

  .login-google {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f26419;
    color: #fff;
    padding: 3px;
    cursor: pointer;
    border-radius: 4px;
    letter-spacing: 3px;
     margin-top: 30px;
  }

  .google-icon {
    margin-right: 5px;
    font-size: 18px;
  }

  .register-link {
    text-align: center;
    margin-top: 35px;
  }
}
</style>
