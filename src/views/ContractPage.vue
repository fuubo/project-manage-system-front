<script setup lang="ts">
import { currentList, fileList, contractList } from '@/api/contract'
import type { Contract, ContractFile } from '@/types/contract'
import { useRouter } from 'vue-router'
import { ref, reactive, onMounted } from "vue";

const router = useRouter()
var active = ref('current')

/**
 * 最近签署数据
 */
var activeNames = ref<string[]>([])
let currentContract = reactive<Contract>({
  businessTypeName: '',
  contractNo: '',
  signTime: '',
  files: []
});
/**
 * 全部合同数据
 */
var pageNum = 1, pageSize = 20;
var allContract = reactive<Contract[]>([])
var activeNamesAll = ref<string[]>([])

/**
 * 默认加载最近签署
 */
onMounted(async ()=> {
  await initCurrent();
})

/**
 * 加载最近签署
 */
var initCurrent = async () => {
  let {data} = await currentList();
  currentContract = data;
  if(currentContract && currentContract.contractNo) {
    const result = await fileList(currentContract.contractNo)
    currentContract.files = result.data;
  }
  activeNames.value = ['top']
}

/**
 * 加载全部合同
 */
var initAll = async () => {
  let {data} = await contractList({
    pageNum,
    pageSize
  });
  allContract = data.list
  activeNamesAll.value = [];
}

/**
 * 切换标签栏
 */
var changeTab = (e:string) => {
  if (e == 'current') {
    initCurrent();
  } else if (e == 'all') {
    initAll();
  }
}

var loadContractFiles = async (contractNos: string[]) => {
  if (contractNos.length == 0) {
    return;
  }
  for(var i = 0; i< contractNos.length; i++) {
    let contractNo = contractNos[i];
    const {data} = await fileList(contractNo)
    let selectContract = allContract.find(contract => contract.contractNo == contractNo);
    if (selectContract){
      selectContract.files = data;
    }
  }
  activeNamesAll.value = [...contractNos]
}

var showContract = (file: ContractFile)=>{
  router.push({
    path: '/contract/preview',
    query: {
      docUrl: file.docUrl,
      fileName: file.fileName
    }
  })
}
</script>

<template>
  <div class="container">
    <van-tabs v-model:active="active" color="#22A296" @change="changeTab">
      <van-tab title="近期已签署" name="current">
        <van-collapse v-model="activeNames">
          <van-collapse-item name="top" class="contract-item">
            <template #title>
              <div class="title">{{currentContract.businessTypeName}}</div>
              <div class="sub-title">签署时间：{{ currentContract.signTime.substring(0,10) }}</div>
            </template>
            <template v-if="currentContract.files && currentContract.files.length > 0">
              <van-cell
                v-for="(file, index) in currentContract.files"
                :key="index"
                :title="file.fileName"
                is-link
                @click="showContract(file)" />
            </template>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
      <van-tab title="全部合同" name="all">
        <van-collapse v-model="activeNamesAll" @change="loadContractFiles">
          <van-collapse-item
            v-for="(contract, index) in allContract"
            :key="index"
            :name="contract.contractNo"
            class="contract-item">
            <template #title>
              <div class="title">{{contract.businessTypeName}}</div>
              <div class="sub-title">签署时间：{{ contract.signTime.substring(0,10) }}</div>
            </template>
            <template v-if="contract.files && contract.files.length > 0">
              <van-cell
                v-for="(file, index) in contract.files"
                :key="index"
                :title="file.fileName"
                is-link
                @click="showContract(file)" />
            </template>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
    </van-tabs>
    <div class="desc">
      <p>合同文件下载路径</p>
      <p>1.pc端登录EHR系统:https://hrssc.xdf.cn</p>
      <p>2.常用应用-员工自助-合同管理</p>
      <p>3.点击“查看合同”即可显示“下载合同”按钮</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .container {
    height: 100vh;
    background-color: #F2F2F2;
  }
  .contract-item {
    margin-top: 16px;
  }
  :deep(.van-collapse-item__content) {
    padding: 0;
  }
  .title {
    font-size: 32px;
    font-weight: bold;
  }
  .sub-title {
    font-size: 11px;
  }
  .desc {
    color: #AAAAAA;
    padding: 16px;
  }
</style>
