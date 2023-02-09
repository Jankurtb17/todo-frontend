<template>
  <div class="grid">
    <div class="grid-1">
      <div class="welcome-text">
        <h1>Hello Jan Kurt</h1>
        <span>Welcome Back!</span>
      </div>
      <div class="grid-cols">
        <div class="grid-item">
          <span class="material-symbols-sharp"> devices </span>
          <div class="project-text">
            <h2>Product Design</h2>
            <span>11 project</span>
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

      <h3>Task Today</h3>
      <div class="grid-row">
        <div class="grid-row-item"></div>
        <div class="grid-row-item"></div>
        <div class="grid-row-item"></div>
      </div>
    </div>

    <div class="grid-2">
      <h2>Overall Progress</h2>
      <div class="progress">
        <el-progress type="circle" :percentage="20" status="success" :stroke-width="20" :width="300">
          <template #default="{ percentage }">
            <span class="percentage-value">{{ percentage }}%</span> <br/>
            <span class="percentage-label">Task finished</span>
          </template>
        </el-progress>
      </div>
      <div class="date">
        <div>
          <span>{{ getMonth }} {{ year }}</span>
        </div>
        <div>
          <el-icon><ArrowLeft /></el-icon>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </div>
      <div class="days">
        <div v-for="week in weeks" :key="week" class="days-item">
          <span>{{ week }}</span>
        </div>
        
      </div>
      <div class="dates">
        <div v-for="(days, index) in daysOfTheWeek" :key="index" class="days-item">
          <span >{{ days }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
const getDate = new Date();
const month = getDate.getUTCMonth() + 1;
const year = getDate.getFullYear()
const getMonth = ref("")
const curr = new Date; // get current date
const first = curr.getDate() 
const firstday = (new Date(curr.setDate(first+1))).toString();
const daysOfTheWeek = ref<Array<string>>([])
const isActive = ref(false)
for(let i = 0; i < 7; i++) {
   const next = new Date(curr.getTime());
   next.setDate(first+i);
   if(curr.getDate() === next.getDate()) {
    isActive.value = true;
   } 
   daysOfTheWeek.value.push(next.getDate())
}
const weeks = ref([ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"])
switch (month) {
  case 1:
    getMonth.value = "Jan"
    break;
  case 2:
    getMonth.value = "Feb"
    break;
  case 3:
    getMonth.value = "Mar"
    break;
  case 4:
    getMonth.value = "Apr"
    break;
  case 5:
    getMonth.value = "May"
    break;
  case 6:
    getMonth.value = "Jun"
    break;
  case 7:
    getMonth.value = "Jul"
    break;
  case 8:
    getMonth.value = "Aug"
    break;
  case 9:
    getMonth.value = "Sep"
    break;
  case 10:
    getMonth.value = "Oct"
    break;
  case 11:
    getMonth.value = "Nov"
    break;
  case 12:
    getMonth.value = "Dec"
    break;
  default:
    break;
}
</script>

<style scoped>
.grid-1 {
  position: relative;
  top: -1.5em;
}
.welcome-text h1 {
  font-size: 50px;
  font-family: "Roboto Condensed", sans-serif;
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
  height: 150px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid-item:nth-child(1) {
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
}

.grid-row-item {
  border: 1px solid lightgray;
  height: 150px;
  border-radius: 4px;
}

.grid-row {
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 10px;
}

.grid-2 {
  margin-bottom: 1.5em;
}

.icon {
  height: 80px;
  border: 1px solid white;
}

.project-text {
  margin-left: 10px;
}
.project-text span {
  position: relative;
  top: -1em;
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
}

.date {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.date span {
  font-size: 20px;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
}

.days {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: center;
  justify-content: center;
  text-align: center;
}

.dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: center;
  justify-content: center;
  text-align: center;
}

.active {
  background-color: red;
}

</style>
