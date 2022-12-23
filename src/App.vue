<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
  <van-tabbar route>
    <van-tabbar-item replace to="/contract" icon="description">合同</van-tabbar-item>
    <van-tabbar-item replace to="/me" icon="contact">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
</style>
