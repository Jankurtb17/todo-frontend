<template>
  <div class="grid">
    <div class="grid-1">
      <div class="welcome-text">
        <h1>Hello Jan Kurt</h1>
        <span class="welcome">Welcome Back!</span>
      </div>
      <h1 class="overview">Overview</h1>
      <div class="grid-cols">
        <div class="grid-item">
          <div class="project-text">
            <div class="today-icon">
              <img src="../assets/sun.svg" />
            </div>
            <div class="today-text">
              <h2>Today</h2>
              <span>{{ taskToday.length }} task</span>
            </div>
          </div>
          <div>
            <el-progress :color="colors" :percentage="20" />
          </div>
        </div>
        <div class="grid-item">
          <div class="project-text">
            <div class="personal-icon">
              <img src="../assets/boy.svg" />
            </div>
            <div class="personal-text">
              <h2>Personal</h2>
              <span>{{ taskPersonal.length }} task</span>
            </div>
          </div>
          <div>
            <el-progress :color="colors" :percentage="40" />
          </div>
        </div>
        <div class="grid-item">
          <div class="project-text">
            <div class="work-icon">
              <img src="../assets/work.svg" />
            </div>
            <div class="work-text">
              <h2>Work</h2>
              <span>{{ taskWork.length }} task</span>
            </div>
          </div>
          <div>
            <el-progress :color="colors" :percentage="80" />
          </div>
        </div>
      </div>

      <div class="todays-task">
        <h1 class="task-today">Task Today</h1>
        <router-link to="/task">See All</router-link>
      </div>
      <div v-if="taskToday.length > 0">
        <div class="grid-row" v-for="today in taskToday" :key="today">
          <div
            class="grid-row-item"
            v-for="task in today.slice(0, 3)"
            :key="task._id"
          >
            <div class="task-list">
              <img src="../assets/list.svg" />
            </div>
            <div class="start">
              <span class="header">Start From</span>
              <span class="text">{{ task.start }}</span>
            </div>
            <div class="task-name">
              <span class="header">Task Name</span>
              <span class="text">{{ task.title }}</span>
            </div>
            <div class="time-remaining">
              <span class="header">Time Remaining</span>
              <span class="text">Task Description</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else><BaseSkeleton /></div>
    </div>

    <div class="grid-2">
      <h2>Overall Progress</h2>
      <div class="progress">
        <el-progress
          type="circle"
          :percentage="20"
          status="success"
          :stroke-width="20"
          :width="300"
        >
          <template #default="{ percentage }">
            <span class="percentage-value">{{ percentage }}%</span> <br />
            <span class="percentage-label">Task finished</span>
          </template>
        </el-progress>
      </div>
      <div class="daysOfTheMonth">
        <div class="monthAndYear">
          <h1 class="currMonth">{{ monthName }} {{ year }}</h1>
          <div class="arrow">
            <el-icon @click="prevMonth"><ArrowLeft /></el-icon>
            <el-icon @click="nextMonth"><ArrowRight /></el-icon>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th v-for="day in weekDays" :key="day">
                {{ day }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, index) in weeks" :key="index">
              <td
                v-for="day in week"
                :key="day.date"
                :class="{ today: isToday(day.date) }"
              >
                {{ day.date }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import useTask from "@/composables/task";
import BaseSkeleton from "@/components/BaseSkeleton.vue";
import { colors } from "@/utils/common";
const { getTasks, status } = useTask();
let month = new Date().getMonth();
let year = new Date().getFullYear();
const today = new Date().getDate();
const taskToday = ref([]);
const taskPersonal = ref([]);
const taskWork = ref([]);
const monthNames = ref<Array<string>>([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);
const daysInMonth = ref([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
const weekDays = ref<Array<string>>([
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
]);

const monthName = computed(() => {
  return monthNames.value[month];
});

const weeks = computed(() => {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month, daysInMonth.value[month]).getDay();
  const lastDate = daysInMonth.value[month];
  const weeks = [];
  let week = [];

  for (let i = 1; i <= firstDay; i++) {
    week.push({ date: "" });
  }
  for (let i = 1; i <= lastDate; i++) {
    week.push({ date: i });
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  for (let i = lastDay; i < 7; i++) {
    week.push({ date: "" });
  }
  if (week.length) {
    weeks.push(week);
  }

  return weeks;
});

const nextMonth = () => {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
};

const prevMonth = () => {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
};

const isToday = (date: any) => {
  return date === today;
};

const getData = async () => {
  const today = await getTasks("Today");
  const personal = await getTasks("Personal");
  const work = await getTasks("Work");
  taskToday.value = today;
  taskPersonal.value = personal;
  taskWork.value = work;
};

onMounted(() => {
  getData();
});
</script>

<style scoped>
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
.grid {
  display: grid;
  grid-auto-columns: 2fr 1fr;
  grid-gap: 20px;
  grid-auto-flow: column;
  column-gap: 20px;
}

.grid-cols {
  display: grid;
  grid-auto-columns: 1fr;
  grid-gap: 10px;
  grid-auto-flow: column;
}
.grid-item {
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  height: 150px;
  border-radius: 10px;
  padding-left: 20px;
}

.grid-row-item {
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  height: 15vh;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 0.5fr 2fr 1fr;
  grid-auto-flow: columns;
  padding: 15px;
}

.grid-row-item .header {
  font-weight: bold;
  font-size: 20px;
}

.todays-task {
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
</style>
