<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView class="safe-bottom" />
  <van-tabbar route>
    <van-tabbar-item replace to="/contract/list" icon="description">合同</van-tabbar-item>
    <van-tabbar-item replace to="/contract/me" icon="contact">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
.safe-bottom {
  padding-bottom: 50PX;
  background-color: #F2F2F2;
  min-height: 100vh;
}
</style>
