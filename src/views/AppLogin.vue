<template>
  <div class="main-view">
    <el-container>
      <el-main class="login">
        <div class="overlay-container">
          <div class="login">
            <transition name="login">
              <div class="login-form left-content" v-if="loginIsVisible">
                <h1 class="main-text">Welcome</h1>
                <el-form v-model="form" :rules="rules">
                  <el-row class="login-google" @click="signInWithGoogle">
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
                  <el-button
                    style="width: 100%"
                    class="btn btn-login"
                    @click="loginUser"
                    >Sign In</el-button
                  >

                  <div class="login-register">
                    <div>
                      Don't have an account yet? Register
                      <span @click="changeForm">here</span>
                    </div>
                  </div>
                </el-form>
              </div>
            </transition>
            <transition name="login-img">
              <div class="login-img" v-if="loginIsVisible">
                <img src="@/assets/task.svg" v-if="loginIsVisible" />
              </div>
            </transition>
            <transition name="register-img">
              <div class="register" v-if="registerIsVisible">
                <img src="@/assets/task.svg" />
              </div>
            </transition>
            <transition name="register">
              <div class="register-form right-content" v-if="registerIsVisible">
                <h1 class="main-text">Create an account</h1>
                <el-form ref="ruleRefForm" :model="form" :rules="rules">
                  <el-row class="login-google" @click="signInWithGoogle">
                    <img src="@/assets/GoogleIcon.svg" class="google-icon" />
                    <span>REGISTER WITH GOOGLE</span>
                  </el-row>
                  <div class="group">
                    <div class="item line"></div>
                    <div class="item text">or register with email</div>
                    <div class="item line"></div>
                  </div>
                  <div>
                    <BaseInput
                      v-model="form.email"
                      placeholder="Enter email"
                      clearable
                      prop="email"
                      style="height: 45px"
                    />
                    <transition name="err">
                      <div class="err-email">
                        {{ errEmailMsg }}
                      </div>
                    </transition>
                    <BaseInput
                      v-model="form.password"
                      placeholder="Enter password"
                      type="password"
                      prop="password"
                      style="height: 45px"
                      clearable
                    />
                  </div>
                  <el-button
                    style="width: 100%"
                    class="btn btn-login"
                    @click="registerUser"
                    >Register</el-button
                  >

                  <div class="login-register">
                    <div>
                      Already have an account? login
                      <span @click="changeForm">here</span>
                    </div>
                  </div>
                </el-form>
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
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import useUserStore from "@/stores/user";
import type { FormInstance, FormRules } from "element-plus";
const ruleRefForm = ref<FormInstance>();
const store = useUserStore();
const router = useRouter();
const errorEmail = ref(false);
const errorPassword = ref(false);
const errEmailMsg = ref("");
const errMessage = ref();
const loginIsVisible = ref(true);
const registerIsVisible = ref(false);

const rules = reactive<FormRules>({
  email: [
    {
      required: true,
      message: "Please enter a username",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Please enter a password",
      trigger: "blur",
    },
    {
      min: 8,
      max: 50,
      message: "Password should be longer than 8 characters",
      trigger: "blur",
    },
  ],
});

type SignIn = {
  email: string;
  password: string;
};
let form = ref<SignIn>({
  email: "",
  password: "",
});

const changeForm = () => {
  loginIsVisible.value = !loginIsVisible.value;
  registerIsVisible.value = !registerIsVisible.value;
};

const loginUser = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, form.value.email, form.value.password)
    .then(() => {
      router.push("/dashboard");
    })
    .catch((error) => {
      if (form.value.email !== "" && form.value.password !== "") {
        switch (error.code) {
          case "auth/invalid-email":
            errEmailMsg.value = "Please enter a valid email address";
            errorEmail.value = true;
            break;
          case "auth/user-not-found":
            errEmailMsg.value = "No account with that email was found";
            errorEmail.value = true;
            break;
          case "auth/wrong-password":
            errMessage.value = "Password is incorrect";
            errorPassword.value = true;
            break;
          default:
            errMessage.value = "Email or password is incorrect";
            errorEmail.value = true;
            errorPassword.value = true;
            break;
        }
      }
    });
};

const registerUser = () => {
  if (ruleRefForm.value === undefined) {
    return;
  } else {
    ruleRefForm.value.validate((isValid: boolean) => {
      if (isValid) {
        const auth = getAuth();
        createUserWithEmailAndPassword(
          auth,
          form.value.email,
          form.value.password
        )
          .then((data) => {
            console.log(data);
            router.push("/dashboard");
          })
          .catch((error) => {
            console.log(error.message);
            if (form.value.email !== "" && form.value.password !== "") {
              switch (error.code) {
                case "auth/email-already-in-use":
                  errEmailMsg.value = "Email already exists";
                  break;
                case "auth/invalid-email":
                  errEmailMsg.value = "Please enter a valid email address";
                  break;
                default:
                  errMessage.value = "";
                  break;
              }
              console.log(errEmailMsg.value);
            }
          });
      }
    });
  }
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      router.push("/dashboard");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
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
  height: 53.7vh;
}

.login-enter-from,
.login-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.login-leave-to {
  z-index: -999;
}

.login-enter-from {
  z-index: 10;
}

.login-img-enter-active,
.login-img-leave-active {
  position: absolute;
  width: 550px;
  height: 53.7vh;
}

.login-img-enter-from,
.login-img-leave-to {
  opacity: 0;
  transition: 400ms ease all;
  transform: translateX(0);
}

.login-img-leave-to {
  z-index: -1;
}

.login-img-enter-from {
  z-index: 40;
}

.register-enter-active,
.register-leave-active {
  transition: 400ms ease all;
  position: absolute;
  width: 550px;
  transform: translateX(100%);
  z-index: 100;
  height: 53.7vh;
}

.register-enter-from,
.register-leave-to {
  opacity: 0;
  transform: translateX(0);
  z-index: -10;
}

.register-img-enter-active,
.register-img-leave-active {
  transition: 400ms ease all;
  transform: translateX(100%);
  z-index: 5;
  width: 550px;
  height: 53.7vh;
}

.register-img-enter-from,
.register-img-leave-to {
  opacity: 0;
  z-index: -10;
  transform: translateX(0);
}

/* .register,
.register-form {
  display: none;
} */

.left-content,
.right-content {
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
  .el-main {
    position: relative;
    top: -4.5em;
  }
  .el-main {
    overflow-y: hidden;
    min-height: 95vh;
  }
  .lg-devices {
    transform: translateX(0);
    transition: transform 0.5s ease-in-out;
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
    margin-top: 50px;
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
