<script setup lang="ts">
import { userInfo } from '@/api/base'
import { onMounted, reactive } from 'vue-demi'
interface UserInfo {
    userName: string;
    avatar: string;
    employId: string;
}
var user = reactive<UserInfo>({
    userName: '付博',
    avatar: 'https://upload.jianshu.io/users/upload_avatars/25943974/16391086-2c1a-4592-bd45-336c26d6127d?imageMogr2/auto-orient/strip|imageView2/1/w/80/h/80/format/webp',
    employId: '312690'
})
onMounted(async ()=> {
    // const {data} = await userInfo()
    // user = data;
})
var logout = () => {
    // console.log('退出登录')
}
</script>

<template>
  <div class="user">
    <div class="user-avatar">
        <img :src="user.avatar" class="avatar-image"/>
    </div>  
    <div class="user-info">
        <div>{{ user.userName }}</div>
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
