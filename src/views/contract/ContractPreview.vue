<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const docUrl = String(router.currentRoute.value.query.docUrl)
const fileName = String(router.currentRoute.value.query.fileName)
const goBack = () => {
    router.back()
}
</script>

<template>
  <div class="container">
    <van-nav-bar @click-left="goBack" left-arrow :title="fileName" class="fix-top"/>
    <iframe class="contract-content" :src="docUrl"></iframe>
  </div>
</template>
<style lang="scss" scoped>
  .fix-top {
    position: fixed;
    top: 0;
    width: 100%;
  }
  .container {
    :deep(.van-nav-bar__arrow) {
        color: #22A296;
        font-weight: bold;
    }
  }
  .contract-content {
    width: 100vw;
    height: 100vh;
    border: none;
    margin-top: 46PX;
    :deep(.img) {
      width: 100%;
      overflow-y: scroll;
    }
  }
</style>
