<template>
  <div class="grid">
    <div class="grid-1">
      <div class="welcome-text">
        <h1>Hello {{ data.displayName }}</h1>
        <span class="welcome">Welcome Back!</span>
      </div>
      <h1 class="overview">Overview</h1>
      <el-row :gutter="10">
        <el-col :lg="8" :xs="24" :sm="24" class="grid-item">
          <el-card class="cards-task">
            <div class="project-text">
              <div class="today-icon">
                <img src="../assets/sun.svg" />
              </div>
              <div class="today-text">
                <h2>Today</h2>
                <span>{{ notCompleted }} task</span>
              </div>
            </div>
            <div>
              <el-progress :color="colors" :percentage="result" />
            </div>
          </el-card>
        </el-col>
        <el-col :lg="8" :xs="24" :sm="24" class="grid-item">
          <el-card class="cards-taks">
            <div class="project-text">
              <div class="personal-icon">
                <img src="../assets/boy.svg" />
              </div>
              <div class="personal-text">
                <h2>Personal</h2>
                <span>{{ personalNotCompleted }} task</span>
              </div>
            </div>
            <div>
              <el-progress :color="colors" :percentage="personalPercent" />
            </div>
          </el-card>
        </el-col>
        <el-col :lg="8" :xs="24" :sm="24" class="grid-item">
          <el-card class="cards-taks">
            <div class="project-text">
              <div class="work-icon">
                <img src="../assets/work.svg" />
              </div>
              <div class="work-text">
                <h2>Work</h2>
                <span>{{ workNotCompleted }} task</span>
              </div>
            </div>
            <div>
              <el-progress :color="colors" :percentage="workPercent" />
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-row class="todays-task">
            <h1 class="task-today">Task Today</h1>
            <router-link to="/task">See All</router-link>
          </el-row>
          <div class="tasks" v-if="!status.isLoading">
            <el-row v-if="todayTaskNotCompleted.length > 0">
              <el-col :span="24">
                <div>
                  <div class="grid-row-item"
                    v-for="task in todayTaskNotCompleted.slice(0, 3)"
                    :key="task._id"
                  >
                    <div class="task-list">
                      <img src="../assets/list.svg" />
                    </div>
                    <div class="task-name">
                      <span class="header">Task name</span>
                      <span class="text">{{ task.title }}</span>
                    </div>
                    <div class="start">
                      <span class="header">Start time</span>
                      <span class="text"> {{ task.start }}</span>
                    </div>
                    <div class="time-remaining">
                      <span class="header">End time</span>
                      <span class="text">{{ task.end }}</span>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row v-else justify="center">
              <el-empty description="you don't have any task today"></el-empty>
            </el-row>
          </div>
          <el-row v-else>
            <el-col :span="24" class="skeleton-load">
              <BaseSkeleton :cardLong="true" />
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div class="overall">
      <h2>Overall Progress</h2>
      <div class="progress">
        <el-progress
          type="circle"
          :percentage="allPercent"
          status="success"
          :stroke-width="20"
          :width="280"
        >
          <template #default="{ percentage }">
            <span class="percentage-value">{{ percentage }}%</span> <br />
            <span class="percentage-label">Task finished</span>
          </template>
        </el-progress>
      </div>
      <div>
        <h2>Recent Updates</h2>
        <el-scrollbar height="50vh">
          <div v-if="!status.isLoading">
            <el-row v-if="allTasks.length > 0">
              <div
                v-for="task in allTasks"
                :key="task._id"
                class="task-updates"
              > 
                <div class="recent-updates">
                  <div  v-if="task.type === 'Today'" class="task-today-icon">
                    <img src="@/assets/sun.svg" class="" />
                  </div>
                  <div class="task-personal-icon" v-else-if="(task.type === 'Personal')">
                      <img src="../assets/boy.svg" />
                  </div>
                  <div class="task-work-icon" v-else>
                      <img src="../assets/work.svg" />
                  </div>
    
                  <div class="recent-title">
                    <h3>{{ task.title }}</h3> 
                    <span :class="[task.completed ? 'completed': 'ongoing']">{{ task.completed !== true ? "Ongoing" : `Completed`}}</span>
                  </div>
                </div>
              </div>
            </el-row>
            <el-row  v-else justify="center">
              <el-empty description="No updates"></el-empty>
            </el-row>
          </div>
          <div v-else>
            <BaseSkeleton />
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import useTask from "@/composables/task";
import BaseSkeleton from "@/components/BaseSkeleton.vue";
import { colors } from "@/utils/common";
import useUserStore from "@/stores/user";
import type { FormType, TaskType } from "@/utils/types";
const data = JSON.parse(localStorage.getItem("creds") as any)
const store = useUserStore();
const { getTasks, status } = useTask();
const taskToday = ref([]);
const taskPersonal = ref([]);
const taskWork = ref([]);
const notCompleted = ref(0);
const workNotCompleted = ref(0);
const workPercent = ref();
const personalPercent = ref();
const personalNotCompleted = ref(0);
const result = ref();
const todayTaskNotCompleted = ref([] as any);
const allTasks = ref([] as FormType[]);
const allPercent = ref();
const getData = async () => {
  const today = await getTasks("Today");
  const personal = await getTasks("Personal");
  const work = await getTasks("Work");
  allTasks.value = await getTasks("alls");
  // taskToday.value = task
  taskToday.value = today as any;
  taskPersonal.value = personal as any;
  taskWork.value = work as any;
  todayTaskNotCompleted.value = taskToday.value.filter(
    (item: any) => item.completed !== true
  );
  // task today length
  notCompleted.value = taskToday.value.filter(
    (item: any) => item.completed !== true
  ).length;
  const completed = taskToday.value.filter(
    (item: any) => item.completed === true
  ).length;
  taskToday.value.length > 0
    ? (result.value = Number(
        ((completed / taskToday.value.length) * 100).toFixed(0)
      ))
    : (result.value = 0);

  //personal length
  personalNotCompleted.value = taskPersonal.value.filter(
    (item: any) => item.completed !== true
  ).length;
  const personalCompleted = taskPersonal.value.filter(
    (item: any) => item.completed === true
  ).length;
  taskPersonal.value.length > 1
    ? (personalPercent.value = Number(
        ((personalCompleted / taskPersonal.value.length) * 100).toFixed(0)
      ))
    : (personalPercent.value = 0);

  //work length
  workNotCompleted.value = taskWork.value.filter(
    (item: any) => item.completed !== true
  ).length;
  const workCompleted = taskWork.value.filter(
    (item: any) => item.completed === true
  ).length;
  taskWork.value.length > 1
    ? (workPercent.value = Number(
        ((workCompleted / taskWork.value.length) * 100).toFixed(0)
      ))
    : (workPercent.value = 0);

  //overall progress
  const progress = personalCompleted + workCompleted + completed;
  const allTaskLength =
    taskToday.value.length + taskPersonal.value.length + taskWork.value.length;

  allPercent.value = Number(((progress / allTaskLength) * 100).toFixed(0));
  if (isNaN(allPercent.value)) {
    return (allPercent.value = Number(0));
  }
  console.log(data)
};

onMounted(() => {
  getData();
});
</script>

<style scoped>

.menu-icon {
  display: none;
}
.grid {
  display: grid;
  grid-auto-columns: 2fr 1fr;
  grid-gap: 20px;
  grid-auto-flow: column;
  column-gap: 20px;
}

.grid-1 {
  position: relative;
  top: -1.5em;
  padding-left: 20px;
}
.welcome-text h1 {
  font-size: 50px;
  font-family: "Roboto Condensed", sans-serif;
}

.grid-1 .task-today,
.overview {
  font-family: "Roboto";
  color: #8c8c8c;
}

.welcome-text span {
  font-size: 25px;
  position: relative;
  top: -2em;
  color: #8c8c8c;
}

.grid-cols {
  /* display: grid; */
  /* grid-auto-columns: 1fr; */
  /* grid-gap: 10px; */
  /* grid-auto-flow: column; */
}
.grid-item {
  /* box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px; */
  /* height: 150px; */
  /* border-radius: 10px; */
  /* padding-left: 50px; */
  margin-bottom: 10px;
}

.grid-row-item {
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  height: 15vh;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr;
  grid-auto-flow: columns;
  padding: 15px;
  border-radius: 0;
  margin-bottom: 10px;
  /* border-bottom: 1px solid var(--el-border-color); */
  }

.grid-row-item .header {
  font-weight: bold;
  font-size: 20px;
}

.tasks,
.skeleton-load {
  margin-top: 30px;
}

.todays-task {
  position: relative;
  top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todays-task a {
  text-decoration: none;
  color: #8c8c8c;
  font-family: "Roboto";
}

.grid-row-item .text {
  color: gray;
}

.memo {
  display: flex;
  align-items: center;
  color: #5586ef;
  font-size: 50px;
}

.task-name,
.time-remaining,
.start {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.grid-row {
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 10px;
}

.grid-2 {
  display: grid;
  margin-bottom: 1.5em;
  gap: 20px;
}

.icon {
  height: 80px;
  border: 1px solid white;
}

.project-text {
  display: flex;
  align-items: center;
  padding: 15px 0;
}

.today-icon {
  background-color: #5d3891;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  margin-right: 20px;
  height: 6em;
}

.today-text span {
  position: relative;
  top: -15px;
  color: #a9acad;
}

.personal-icon {
  background-color: #f99417;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  margin-right: 20px;
  height: 6em;
  fill: white;
}

.personal-text span {
  position: relative;
  top: -15px;
  color: #a9acad;
}

.work-icon {
  background-color: #e8e2e2;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  margin-right: 20px;
  height: 6em;
  fill: white;
}

.work-text span {
  position: relative;
  top: -15px;
  color: #a9acad;
}

.grid-item img {
  border-radius: 10px;
  padding: 10px;
}

.progress {
  display: flex;
  justify-content: center;
  align-items: center;
}

.recent-updates{
  display: grid;
  grid-template-columns: .5fr 2fr;
  gap: 20px;
}
 
.recent-title {
  display: flex;
  flex-direction: column;
}

.completed {
  color: #67c23a;
}

.ongoing {
  color: #909399;
}

.material-symbols-sharp {
  font-size: 50px;
}
.percentage-label {
  font-size: 20px;
}

.task-list {
  padding: 10px;
  display: flex;
  height: 7em;
}

.grid-2 h2 {
  margin-left: 20px;
  letter-spacing: 1.5px;
}

.monthAndYear {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.active {
  background-color: red;
}

table {
  width: 100%;
  /* border-collapse: collapse; */
}

td,
th {
  padding: 20px;
  text-align: center;
}

.daysOfTheMonth .currMonth {
  padding-left: 20px;
  font-size: 25px;
  letter-spacing: 1.5px;
}

.arrow {
  padding-right: 60px;
}

th {
  color: gray;
}

.today {
  background-color: rgb(19, 206, 102);
  color: white;
  border-radius: 50px;
}

.overview-img {
  background-image: url("../assets/Ellipse.png");
  background-position: bottom right;
  width: 56%;
  background-size: cover;
}

.task-updates{
  padding: 10px;
}

.task-today-icon {
  background-color: #5d3891;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  height: 6em;
}

.task-personal-icon {
  background-color: #f99417;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  height: 6em;
}

.task-work-icon {
  background-color: #e8e2e2;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  height: 6em;
}

.task-title {
  font-size: 18px;
  color:#8c8c8c;
}

@media only screen and (min-width: 320px) and (max-width: 480px) {

  .menu-icon {
    display: block;
    position: absolute;
    top: 10px;
    color: gray;
    cursor: pointer;
  }

  .grid {
    display: grid;
    grid-auto-columns: 1fr 1fr;
    grid-gap: 20px;
    grid-auto-flow: column;
    column-gap: 20px;
  }

  .grid-1 {
    padding-left: 0;
  }

  .overall {
    display: none;
  }
}
</style>
