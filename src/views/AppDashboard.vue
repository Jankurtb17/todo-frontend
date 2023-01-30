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

    <div class="grid-2"></div>
  </div>
</template>

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
  border: 1px solid lightgray;
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

.material-symbols-sharp {
  font-size: 50px;
}
</style>
