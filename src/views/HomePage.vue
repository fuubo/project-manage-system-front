<script setup lang="ts">
import { userInfo } from "@/api/base";
import type { User } from "@/types/base";
import { onMounted, ref } from "vue";

var user = ref<User>({
  employName: "",
  employEmail: "",
  employId: "",
});
onMounted(async () => {
  const { data } = await userInfo();
  user.value = data
});
var logout = () => {
  window.location.href = import.meta.env.VITE_APP_LOGOUT_URL;
};
</script>

<template>
  <div class="user">
    <div class="user-avatar">
        <img :src="`https://adpassport.xdf.cn/A2apis/GetUserPhoto?AccountID=${user.employEmail.split('@')[0]}`" class="avatar-image"/>
    </div>  
    <div class="user-info">
        <div>{{ user.employName }}</div>
        <div>{{ user.employId }}</div>
    </div>  
    <div class="logout-operator">
        <van-button type="primary" class="logout-button" @click="logout">退出登录</van-button>
    </div>  
  </div>
</template>
<style lang="scss" scoped>
.user {
  padding: 32px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #ddd;
}
.user-avatar {
  height: 160px;
  width: 160px;
}
.avatar-image {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.user-info {
  padding: 32px;
  font-size: 28px;
  line-height: 48px;
  text-align: center;
  vertical-align: middle;
}
.logout-operator {
  flex: 1;
  position: relative;
}
.logout-button {
  width: 200px;
  height: 60px;
  top: 50px;
  right: 32px;
  position: absolute;
}
</style>
