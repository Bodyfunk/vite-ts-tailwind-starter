<template>
  <div class="common-layout">
    <div class="aside-bar">
      <!-- asideBar -->
      <aside-bar></aside-bar>
    </div>
    <div class="main-container">
      <div class="header"></div>
      <div class="main-content">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AsideBar from './components/AsideBar.vue';


</script>

<style scoped>
.common-layout {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  display: flex;
}

.aside-bar {
  height: 100%;
  background-color: #f5f5f5;
}

.header {
  height: 60px;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}



.main-content {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
