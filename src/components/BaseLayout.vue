<template>
  <el-container>
    <el-aside>
      <el-row>
        <el-col :span="24">
          <div class="sidebar">
            <div class="sidebar-logo">
              <img src="@/assets/mainLogo2.svg" class="logo" />
            </div>
            <div class="route-links">
              <ul>
                <router-link to="/dashboard"
                  ><el-icon class="sidebar-icon" :size="20"><Menu /></el-icon>
                  Dashboard</router-link
                >
                <router-link to="/task">
                  <el-icon class="sidebar-icon" :size="20"><Memo /></el-icon>
                  Task List
                </router-link>
              </ul>
            </div>
            <div class="route-logout">
              <ul @click="logoutUser" class="logout">
                <el-icon class="sidebar-icon" :size="20"
                  ><SwitchButton
                /></el-icon>
                Logout
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-aside>
    <el-container>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { SwitchButton, UserFilled } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
const router = useRouter();
const isLoggedIn = ref(false);
const isClicked = ref(false);
const foldMenu = () => {
  isClicked.value = !isClicked.value;
};
const isLoading = ref(false);
const menus = ref([
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "Task List",
    link: "/task",
  },
  {
    name: "Profile",
    link: "/profile",
  },
]);

let auth: any;
const logoutUser = () => {
  signOut(auth).then(() => {
    router.push("/login");
  });
};

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});
</script>

<style scoped>
header.el-header {
  border-bottom: 1px solid lightgray;
  height: 9%;
}

.icon {
  margin-top: 18px;
  font-size: 20px;
}
.sidebar {
  background-color: #f2f2f2;
  min-height: 100vh;
  padding: 1em 2em;
  display: flex;
  flex-direction: column;
}

.sidebar-logo {
  flex-grow: 1;
}

.logo {
  height: 100px;
}

.routes-link {
  flex-grow: 1;
}

ul {
  list-style-type: none;
  padding: 0em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
}

li {
  margin: 10px 0px;
}

a {
  margin: 10px 0px;
  text-decoration: none;
  font-size: 20px;
  color: #282047;
  padding: 1.2em 1em;
  border-radius: 10px;
}

.el-icon {
  position: relative;
  top: 3px;
  margin-right: 20px;
}

.router-link-active {
  background-color: #5586ef;
  color: #f2f6ff;
}

.route-logout {
  flex-grow: 5;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.logout {
  display: inline;
  cursor: pointer;
}
</style>
