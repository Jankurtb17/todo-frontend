<template>
  <div class="main-view">
    <el-container>
      <el-main class="login">
        <div class="overlay-container">
          <div class="login">
            <transition name="login">
              <div class="login-form left-content" v-if="loginIsVisible">
                <h1 class="main-text">Change Password</h1>
                <el-form ref="ruleRefForm" :model="form" :rules="rules">
                  <div>
                    <BaseInput
                      prop="password"
                      v-model="form.password"
                      placeholder="Please your new password"
                      clearable
                      style="height: 45px"
                    />
                    <BaseInput
                      prop="confirmPassword"
                      v-model="form.confirmPassword"
                      placeholder="confirm your password"
                      clearable
                      style="height: 45px"
                    />
                    <!-- <div class="err-email">{{ errorPassword }}</div> -->
                  </div>
                  <el-button
                    style="width: 100%"
                    class="btn btn-login"
                    @click="changePassword(ruleRefForm)"
                    >Reset Password</el-button
                  >
                </el-form>
              </div>
            </transition>
            <transition name="login-img">
              <div class="login-img" v-if="loginIsVisible">
                <img src="@/assets/task.svg" v-if="loginIsVisible" />
              </div>
            </transition>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import BaseInput from "@/components/BaseInput.vue";
import { ref, reactive, onMounted } from "vue";
import useUserStore from "@/stores/user";
import type { FormInstance, FormRules } from "element-plus";
import { notification } from "@/utils/common";
import { useRouter } from "vue-router";
import { computed } from "@vue/reactivity";
const router = useRouter();
const ruleRefForm = ref<FormInstance>();
const store = useUserStore();
const errLogEmailMsg = ref("");
const loginIsVisible = ref(true);
let auth: any;

type SignIn = {
  confirmPassword: string;
  password: string;
};
let form = ref<SignIn>({
  password: "",
  confirmPassword: ""
});


const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input your new password'))
  } else {
    if (form.value.confirmPassword !== '') {
      if (!ruleRefForm.value) return
      ruleRefForm.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== form.value.password) {
    callback(new Error("Password didn't match"))
  } else {
    callback()
  }
}
const rules = reactive<FormRules>({
  password: [{ validator: validatePass, trigger: 'blur' }],
  confirmPassword: [{ validator: validatePass2, trigger: 'blur' }],
});


const changePassword = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })

  // store
  //   .resetPassword(form.value.email)
  //   .then(() => {
  //     notification("Kindly check your email", "success", "Success")
  //     setTimeout(() => {
  //       router.push("/login")
  //     }, 2000)
  //   })
  //   .catch((error) => {
  //     notification(error, "error", "Invalid")
  //   })
};
onMounted(() => { 
  localStorage.removeItem("creds")
})
</script>

<style scoped>
.overlay-container {
  display: grid;
  position: relative;
}

.login {
  display: grid;
  grid-auto-flow: columns;
  grid-template-columns: 550px 550px;
  place-content: center;
  border: 1px solid lightgray;
}

.login {
  z-index: 1;
}

.login-enter-active,
.login-leave-active {
  transition: 400ms ease all;
  position: absolute;
  z-index: 5;
  width: 550px;
  height: 59.7vh;
}

.login-enter-from,
.login-leave-to {
  opacity: 0;
  transform: translateX(100%);
  height: 59.7vh;
}

.login-leave-to {
  z-index: -999;
  height: 59.7vh;
}

.login-enter-from {
  z-index: 10;
  height: 59.7vh;
}

.login-img-enter-active,
.login-img-leave-active {
  position: absolute;
  width: 550px;
  height: 59.7vh;
}

.login-img-enter-from,
.login-img-leave-to {
  opacity: 0;
  transition: 400ms ease all;
  transform: translateX(0);
  height: 59.7vh;
}

.login-img-leave-to {
  z-index: -1;
  height: 59.7vh;
}

.login-img-enter-from {
  z-index: 40;
  height: 59.7vh;
}

.register-enter-active,
.register-leave-active {
  transition: 400ms ease all;
  position: absolute;
  width: 550px;
  transform: translateX(100%);
  z-index: 100;
  height: 59.7vh;
}

.register-enter-from,
.register-leave-to {
  opacity: 0;
  transform: translateX(0);
  z-index: -10;
  height: 59.7vh;
}

.register-img-enter-active,
.register-img-leave-active {
  transition: 400ms ease all;
  transform: translateX(100%);
  z-index: 5;
  width: 550px;
  height: 59.7vh;
}

.register-img-enter-from,
.register-img-leave-to {
  opacity: 0;
  z-index: -10;
  height: 59.7vh;
  transform: translateX(0);
}

/* .register,
.register-form {
  display: none;
} */

.err-msg {
  padding: 0 40px;
}

.left-content,
.right-content {
  background-color: #33658a;
  color: white;
}

.main-text {
  text-align: center;
  font-size: 35px;
  padding-top: 55px;
}
.el-form {
  padding: 50px 40px;
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

.err-email {
  font-size: 12px;
  line-height: 1;
  padding-top: 2px;
  position: relative;
  top: -18px;
  left: 0;
  color: #f56c6c;
}

.err {
  border: 1px solid red;
}

/* Phone */
@media only screen and (min-width: 320px) and (max-width: 480px) {
  .login {
    grid-auto-flow: columns;
    grid-template-columns: 1fr;
  }
  .login-img,
  .register-img {
    display: none;
  }

  .login-form {
    position: relative;
    /* height: 100vh; */
  }

  .el-form {
    padding-bottom: 20px;
  }
}

/*  Tablet */
@media only screen and (min-width: 481px) and (max-width: 820px) {
  .lg-devices {
    display: none;
  }

  .img-sm {
    position: relative;
  }

  .el-col {
    border: none;
    min-height: 90vh;
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
@media only screen and (min-width: 821px) and (max-width: 1024px) {
  .el-main {
    display: none;
  }
}

/*  Desktop */
@media only screen and (min-width: 1025px) and (max-width: 1200px) {
}

/*  large  */
@media only screen and (min-width: 1201px) {
}
</style>
