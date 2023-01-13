<script setup lang="ts">
import {
  featureList
} from "@/api/feature";

/**
 * 分页条件
 */
var pageNum = ref(1),
  pageSize = ref(20);
/**
 * 查询条件
 */
var condition = reactive({
  featureName: "",
  owner: "",
  jiraUrl: "",
  status: "",
});
var table = reactive({
  list: [],
  total: 0
});

/**
 * 默认加载最近签署
 */
onMounted(() => {
  doSearch();
});

var doSearch = async () => {
  let { data } = await featureList({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    condition,
  });
  table.list = data.list;
  table.total = data.total;
};
</script>

<template>
  <div class="container">
    <el-form inline v-model="condition">
        <el-form-item label="需求名称">
            <el-input v-model="condition.featureName" clearable></el-input>
        </el-form-item>
        <el-form-item label="负责人">
            <el-input v-model="condition.owner" clearable></el-input>
        </el-form-item>
        <el-form-item label="JIRA">
            <el-input v-model="condition.jiraUrl" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
            <el-select filterable v-model="condition.status" clearable></el-select>
        </el-form-item>
    </el-form>
    <el-table :data="table.list">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="featureName" label="需求名称" width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="featureName" label="需求名称" width="200" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作"></el-table-column>
    </el-table>
  </div>
</template>
<style lang="scss" scoped>

</style>
