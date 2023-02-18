<template>
  <div class="grid">
    <div class="grid-1">
      <div class="welcome-text">
        <h1>Hello Jan Kurt</h1>
        <span>Welcome Back!</span>
      </div>
      <h1>Overview</h1>
      <div class="grid-cols">
        <div class="grid-item">
          <div class="project-text todays">
            <div>
              <h2>Today</h2>
              <p>11 project</p>
            </div>
            <div class="overview-img">asd</div>
          </div>
        </div>
        <div class="grid-item">
          <span class="material-symbols-sharp"> language </span>
          <div class="project-text">
            <h2>Web Development</h2>
            <span>11 project</span>
          </div>
        </div>
        <div class="grid-item">
          <span class="material-symbols-sharp"> travel_explore </span>
          <div class="project-text">
            <h2>Quality Assurance</h2>
            <span>11 project</span>
          </div>
        </div>
      </div>

      <h1 class="task-today">Task Today</h1>
      <div class="grid-row">
        <div class="grid-row-item">
          <div class="memo">
            <el-icon><Memo class="icon" /></el-icon>
          </div>
          <div class="start">
            <span class="header">Start From</span>
            <span class="text">09: 00am</span>
          </div>
          <div class="task-name">
            <span class="header">Task Name</span>
            <span class="text">Task Description</span>
          </div>
          <div class="time-remaining">
            <span class="header">Time Remaining</span>
            <span class="text">Task Description</span>
          </div>
        </div>
      </div>
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
import { ArrowLeft } from "@element-plus/icons-vue";
import { ref, computed } from "vue";
let month = new Date().getMonth();
let year = new Date().getFullYear();
const today = new Date().getDate();
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

.grid-1 .task-today {
  font-size: 30px;
  letter-spacing: 1px;
}

.welcome-text span {
  font-size: 30px;
  position: relative;
  top: -1.1em;
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
/*
.grid-1 {
  grid-row: 2;
} */

.grid-item {
  border: 1px solid lightgray;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  height: 150px;
  border-radius: 10px;
  /* display: flex; */
  /* justify-content: center;
  align-items: center; */
}

/* .grid-item:nth-child(1) {
  background-color: #282047;
  color: #f2f6ff;
}

.grid-item:nth-child(2) {
  background-color: #f78d35;
  color: #f2f6ff;
}

.grid-item:nth-child(3) {
  background-color: #5586ef;
  color: #f2f6ff;
} */

.grid-row-item {
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  height: 150px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 60px 0.5fr 2fr 1fr;
  grid-auto-flow: columns;
  padding: 15px;
}

.grid-row-item .header {
  font-weight: bold;
  font-size: 20px;
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

/* .project-text {
  margin-left: 10px;
}
.project-text span {
  position: relative;
  top: -1em;
} */

.project-text {
  display: flex;
  justify-content: space-between;
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
  background-position: top right;
  height: 10vh;
  width: 56%;
  background-size: cover;
}
</style>
