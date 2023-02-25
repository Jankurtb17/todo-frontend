<template>
  <div class="custom-spinner">
    <div class="spinner-circle"></div>
  </div>
</template>

<style>
.custom-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.spinner-circle {
  width: 20px;
  height: 20px;
  border: 2px solid #67C23A;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>