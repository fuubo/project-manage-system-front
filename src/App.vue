<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import { ref } from "vue";
var router = useRouter();
var active = ref("contract");
var changeTab = (tab: string) => {
  if (tab == "contract") {
    router.push("/contract");
  } else if (tab == "me") {
    router.push("/me");
  }
};
</script>

<template>
  <RouterView />
  <van-tabbar v-model="active" @change="changeTab">
    <van-tabbar-item name="contract" icon="description">合同</van-tabbar-item>
    <van-tabbar-item name ="me" icon="contact">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
</style>
