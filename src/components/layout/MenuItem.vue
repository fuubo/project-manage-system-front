<script setup lang="ts">import type { Menu } from '@/types/base';

/**
 * 页面挂载
 */
onMounted(() => {
  // TODO 加载菜单
});

defineProps<{ list: Menu[] }>()
 
</script>

<template>
  <template v-for="(menu, index) in list" :key="index">
    <el-sub-menu v-if="menu.children.length > 0" :index="menu.path">
      <template #title>
        <svg-icon v-if="menu.icon" :name="menu.icon" class="menu-icon" />
        {{ menu.title }}
      </template>
      <menu-item :list="menu.children"></menu-item>
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path" >
      <template #title>
        <svg-icon v-if="menu.icon" :name="menu.icon" class="menu-icon" />
        {{menu.title}}
      </template>
    </el-menu-item>
  </template>
</template>
<style lang="scss" scoped>
.menu-icon {
  margin: 0 10px;
}
</style>
