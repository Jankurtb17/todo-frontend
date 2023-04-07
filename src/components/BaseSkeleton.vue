<template>
  <div v-if="cardLong">
    <div class="skeleton">
      <el-skeleton style="width: 130px" animated>
        <template #template>
          <el-skeleton-item variant="image" class="skeleton-img" />
        </template>
      </el-skeleton>
      <el-skeleton class="skeleton-2">
        <template #template>
          <el-skeleton-item variant="rect" style="width: 30%" />
          <el-skeleton-item variant="rect" style="width: 50%" />
          <el-skeleton-item variant="rect" style="width: 90%" />
          <el-skeleton-item variant="rect" />
        </template>
      </el-skeleton>
    </div>
    <div class="skeleton">
      <el-skeleton style="width: 130px" animated>
        <template #template>
          <el-skeleton-item variant="image" class="skeleton-img" />
        </template>
      </el-skeleton>
      <el-skeleton class="skeleton-2">
        <template #template>
          <el-skeleton-item variant="rect" style="width: 30%" />
          <el-skeleton-item variant="rect" style="width: 50%" />
          <el-skeleton-item variant="rect" style="width: 90%" />
          <el-skeleton-item variant="rect" />
        </template>
      </el-skeleton>
    </div>
    <div class="skeleton">
      <el-skeleton style="width: 130px" animated>
        <template #template>
          <el-skeleton-item variant="image" class="skeleton-img" />
        </template>
      </el-skeleton>
      <el-skeleton class="skeleton-2">
        <template #template>
          <el-skeleton-item variant="rect" style="width: 30%" />
          <el-skeleton-item variant="rect" style="width: 50%" />
          <el-skeleton-item variant="rect" style="width: 90%" />
          <el-skeleton-item variant="rect" />
        </template>
      </el-skeleton>
    </div>
  </div>
  <div v-else>
    <div class="no-border">
      <el-skeleton style="width: 130px" animated>
        <template #template>
          <el-skeleton-item variant="image" class="noborder-img"/>
        </template>
      </el-skeleton>
      <el-skeleton class="no-border-2">
        <template #template>
          <el-skeleton-item variant="rect" style="width: 30%" />
          <el-skeleton-item variant="rect" style="width: 50%" />
          <el-skeleton-item variant="rect" style="width: 90%" />
          <el-skeleton-item variant="rect" />
        </template>
      </el-skeleton>
      <el-skeleton style="width: 130px" animated>
        <template #template>
          <el-skeleton-item variant="image" class="noborder-img"/>
        </template>
      </el-skeleton>
      <el-skeleton class="no-border-2">
        <template #template>
          <el-skeleton-item variant="rect" style="width: 30%" />
          <el-skeleton-item variant="rect" style="width: 50%" />
          <el-skeleton-item variant="rect" style="width: 90%" />
          <el-skeleton-item variant="rect" />
        </template>
      </el-skeleton>
      <el-skeleton style="width: 130px" animated>
        <template #template>
          <el-skeleton-item variant="image" class="noborder-img"/>
        </template>
      </el-skeleton>
      <el-skeleton class="no-border-2">
        <template #template>
          <el-skeleton-item variant="rect" style="width: 30%" />
          <el-skeleton-item variant="rect" style="width: 50%" />
          <el-skeleton-item variant="rect" style="width: 90%" />
          <el-skeleton-item variant="rect" />
        </template>
      </el-skeleton>
      <el-skeleton style="width: 130px" animated>
        <template #template>
          <el-skeleton-item variant="image" class="noborder-img"/>
        </template>
      </el-skeleton>
      <el-skeleton class="no-border-2">
        <template #template>
          <el-skeleton-item variant="rect" style="width: 30%" />
          <el-skeleton-item variant="rect" style="width: 50%" />
          <el-skeleton-item variant="rect" style="width: 90%" />
          <el-skeleton-item variant="rect" />
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
defineProps(["cardLong"])
const items = ref([1, 2, 3]);
</script>

<style>
.skeleton {
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  height: 15vh;
  border-radius: 10px;
  display: flex;
  padding: 10px 10px;
  margin-bottom: 10px;
}

.no-border {
  display: grid;
  grid-template-columns: .5fr 2fr;
  gap: 20px;
}

.skeleton-img {
  width: 100px;
  height: 100px;
  border-radius: 15px;
  margin-top: 10px;
  margin-left: 5px;
}

.skeleton-2 {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.no-border-2 {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
  right: 40px;
}

.noborder-img {
  padding: 10px;
  width: 100px;
  height: 100px;
  border-radius: 15px;
  display: flex;
  height: 6em;
}
</style>
