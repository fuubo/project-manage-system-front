<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView class="safe-bottom"/>
  <van-tabbar route>
    <van-tabbar-item replace to="/contract" icon="description">合同</van-tabbar-item>
    <van-tabbar-item replace to="/me" icon="contact">我的</van-tabbar-item>
  </van-tabbar>
  
  <!-- 开启底部安全区适配 -->
  <van-number-keyboard safe-area-inset-bottom />
  <van-notify/>
</template>

<style scoped>
.safe-bottom {
  padding-bottom: 50PX;
  background-color: white;
}
</style>
