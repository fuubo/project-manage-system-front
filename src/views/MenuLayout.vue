<script setup lang="ts">
var route = useRoute();
var router = useRouter();
var menuList = [
  {
    title: "需求管理",
    path: "/feature",
    icon: "calendar",
    children: [
      {
        title: "需求列表",
        path: "/feature/list",
        children: [],
      },
      {
        title: "需求总览",
        path: "/feature/chart",
        children: [],
      },
    ],
  },
  {
    title: "系统管理",
    path: "/system",
    icon: "setting",
    children: [],
  },
];
var goBack = () => {
  router.back();
};
</script>

<template>
  <el-header class="header">
    <svg-icon name="xdf" size="60px" class-name="xdf-logo"/>
    <el-menu
      active-text-color="#33c2a0"
      background-color="#252b20"
      text-color="#fff"
      :default-active="route.path"
      mode="horizontal"
      router
    >
      <menu-item :list="menuList"/>
    </el-menu>
  </el-header>
  
  <div class="container">
    <el-page-header @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3"> {{route.meta.title}} </span>
      </template>
      <router-view/>
    </el-page-header>
  </div>
</template>
<style lang="scss" scoped>
.container {
  padding: 10px;
}
.header {
  width: 100%;
  display: flex;
  padding: 0;
  background: #252b20;
  color: hsla(0, 0%, 100%, 0.8);
  align-items: center;
}
.el-menu--horizontal {
  border-bottom: none;
}
.xdf-logo {
  margin: 0 20px;
}
</style>
