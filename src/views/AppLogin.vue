<template>
  <div class="main-view">
    <el-container>
      <el-main>
        <el-row class="row lg-devices" justify="center">
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
                <img src="@/assets/GoogleIcon.svg" class="google-icon" />
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
              <el-button style="width: 100%" class="btn btn-login"
                >Sign In</el-button
              >

              <div class="login-register">
                <div>
                  Don't have an account yet? Register
                  <router-link to="/" class="register-link">here</router-link>
                </div>
              </div>
            </el-form>
          </el-col>
          <el-col :xl="6" :lg="6" :span="12" class="grid-content right-content">
            <img src="@/assets/task.svg" class="img-right" />
          </el-col>
        </el-row>

        <el-row justify="center" class="mdsm-devices">
          <el-col :span="20">
            <div>
              <img src="@/assets/task.svg" class="img-sm" />
              <h1>Hello!</h1>
              <p>
                Best place to log your task <br /> and 
                share your experiences
              </p>
            </div>
            <div class="md-btn">
              <router-link to="/login" class="login-btn">LOGIN</router-link>
              <router-link to="/register" class="register-btn"
                >REGISTER</router-link
              >
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import BaseInput from "@/components/BaseInput.vue";
import { ref, reactive } from "vue";
defineProps(["class"]);
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
  background-color: #33658a;
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
  color: #f26419;
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
  top: -0.5em;
}

.btn {
  height: 40px;
}

.btn-login {
  margin-top: 15px;
  background-color: #f26419;
  color: white;
  border-color: #f26419;
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

@media only screen and (min-width: 320px) and (max-width: 480px) {
  .el-main {
    overflow-y: hidden;
    min-height: 90vh
  }  
  .lg-devices {
    display: none;
  }

  .mdsm-devices {
    position: relative;
    top: 10%;
  }

  .img-sm {
    position: relative;
    top: 20%;
  }

  .el-col {
    border: none;
  }

  .mdsm-devices h1 {
    margin-top:50px;
    font-size: 40px;
    text-align: center;
    letter-spacing: 5px;
    font-family: "Roboto", sans-serif;
    font-weight: 600;
  }
  .mdsm-devices p {
    text-align: center;
    font-size: 18px;
    color: rgb(178, 184, 185);
  }

  .md-btn {
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: nowrap;
  }

  .login-btn {
    padding: 1em;
    background-color: #33658a;
    color: #fff;
    border: none;
    margin-bottom: 25px;
    font-family: "Roboto Condensed", sans-serif;
    font-size: 15px;
    letter-spacing: 5px;
    text-decoration: none;
    text-align: center;
    /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  }

  .register-btn {
    padding: 1em;
    background-color: #fff;
    color: #33658a;
    border: 2px solid #33658a;
    margin-bottom: 25px;
    font-family: "Roboto Condensed", sans-serif;
    font-size: 15px;
    letter-spacing: 5px;
    text-decoration: none;
    text-align: center;
  }
}

/*  Tablet */
@media only screen and (min-width: 481px) and (max-width: 780px) {
  .lg-devices {
    display: none;
  }

  .img-sm {
    position: relative;
  }

  .el-col {
    border: none;
    min-height: 100vh;
  }

  /* .mdsm-devices {
    transition: 600ms ease all;
    transform: translateX(-50px);
  } */

  .mdsm-devices h1 {
    font-size: 50px;
    text-align: center;
    letter-spacing: 5px;
    font-family: "Roboto", sans-serif;
    font-weight: 600;
  }
  .mdsm-devices p {
    text-align: center;
    font-size: 30px;
    color: rgb(178, 184, 185);
  }

  .md-btn {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0 2.5em;
  }

  .login-btn {
    padding: 1em;
    background-color: #33658a;
    color: #fff;
    border: none;
    margin-bottom: 25px;
    font-family: "Roboto Condensed", sans-serif;
    font-size: 15px;
    letter-spacing: 5px;
    text-decoration: none;
    text-align: center;
    /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
    border-radius: 4px;
  }

  .register-btn {
    padding: 1em;
    background-color: #fff;
    color: #33658a;
    border: 2px solid #33658a;
    margin-bottom: 25px;
    font-family: "Roboto Condensed", sans-serif;
    font-size: 15px;
    letter-spacing: 5px;
    text-decoration: none;
    text-align: center;
    border-radius: 4px;
  }
}

/*  Small Screen Laptop */
@media only screen and (min-width: 769px) and (max-width: 1024px) {
}

/*  Desktop */
@media only screen and (min-width: 1025px) and (max-width: 1200px) {
  .mdsm-devices {
    display: none;
  }

  .md-btn {
    display: none;
  }
}

/*  large  */
@media only screen and (min-width: 1201px) {
  .mdsm-devices {
    display: none;
  }

  .md-btn {
    display: none;
  }
}
</style>
