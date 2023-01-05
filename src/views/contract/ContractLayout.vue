<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="ContractPage">
      <component class="safe-bottom" :is="Component" />
    </keep-alive>
  </router-view>
  <van-tabbar route v-if="route.path !== '/contract/preview'">
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
