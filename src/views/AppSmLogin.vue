<template>
  <div>
    <el-icon class="icon" @click="redirectToHome"><Back /></el-icon>
    <div class="sm-login">
      <div>
        <h1>Welcome !</h1>
        <span>Sign in to continue</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();

const redirectToHome = () => {
  router.push("/");
};
</script>

<style scoped>
.icon {
  font-size: 50px;
  margin-top: 50px;
  margin-left: 0.5em;
}

.sm-login {
  padding: 1em 2em;
}

h1 {
  font-size: 50px;
  letter-spacing: 5px;
  font-family: "Roboto Condensed", sans-serif;
}

span {
  font-size: 35px;
  letter-spacing: 5px;
  color: rgb(202, 199, 199);
}
</style>
