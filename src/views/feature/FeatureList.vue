<script setup lang="ts">
import {
  featureList,
  createFeature,
  deleteFeatureById,
  updateFeatureById,
} from "@/api/feature";
import type {
  FeatureListDto,
  FeatureCreateDto,
  FeatureUpdateDto,
} from "@/types/feature";
import { tableDateFormatter, dateFormatter } from "@/utils/date";
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from "element-plus";
const router = useRouter();
var featureCreateForm = ref<FeatureCreateDto>({
  featureName: "",
  jiraUrl: "",
  prdUrl: "",
  branchName: "",
  protoUrl: "",
  owner: "",
  frontendDays: "",
  backendDays: "",
  testDays: "",
  testSubmitDate: "",
  releaseDate: "",
  status: "",
});
var createForm = ref<FormInstance>();
var featureUpdateForm = ref<FeatureUpdateDto>({
  _id: "",
  featureName: "",
  jiraUrl: "",
  prdUrl: "",
  branchName: "",
  protoUrl: "",
  owner: "",
  frontendDays: "",
  backendDays: "",
  testDays: "",
  testSubmitDate: "",
  releaseDate: "",
  status: "",
});
var updateForm = ref<FormInstance>();
var state = reactive({
  /**
   * 分页条件
   */
  pageNum: 1,
  pageSize: 20,
  /**
   * 查询条件
   */
  condition: {
    featureName: "",
    owner: "",
    jiraUrl: "",
    status: "",
  },
  /**
   * 查询结果
   */
  list: [],
  total: 0,
  /**
   * 弹窗
   */
  showAddDialog: false,
  showEditDialog: false,
  showDetailDialog: false,
  featureDetail: {
    featureName: "",
    jiraUrl: "",
    prdUrl: "",
    branchName: "",
    protoUrl: "",
    owner: "",
    frontendDays: "",
    backendDays: "",
    testDays: "",
    testSubmitDate: "",
    releaseDate: "",
    status: "",
  },
  /**
   * 弹窗内容
   */
  dialogTitle: "",
});
/**
 * 表单校验规则
 */
const rules: FormRules = {
  featureName: [{required: true, message: '请输入需求名称'}],
  owner: [{required: true, message: '请输入负责人'}],
  status: [{required: true, message: '请选择状态'}]
}
/**
 * 默认加载最近签署
 */
onMounted(() => {
  doSearch();
});
/**
 * 打开新的标签页
 * @param url 页面地址
 */
var open = (url: string) => {
  window.open(url, '_blank')
}
/**
 * 单元格内容格式化
 */
var daysSuffix = (row: any, column: any) => {
  return row[column.property] ? row[column.property] + "人天" : "";
};
/**
 * 列表查询
 */
var doSearch = async () => {
  let data: any = await featureList({
    pageNum: state.pageNum,
    pageSize: state.pageSize,
    condition: state.condition,
  });
  state.list = data.list;
  state.total = data.total;
};
/**
 * 打开新增弹窗
 */
var add = () => {
  if (createForm.value) createForm.value.resetFields();
  featureCreateForm.value = {
    featureName: "",
    jiraUrl: "",
    prdUrl: "",
    branchName: "",
    protoUrl: "",
    owner: "",
    frontendDays: "",
    backendDays: "",
    testDays: "",
    testSubmitDate: "",
    releaseDate: "",
    status: "",
  };
  state.showAddDialog = true;
};
/**
 * 删除数据二次确认
 */
var del = (row: FeatureListDto) => {
  ElMessageBox.confirm("确定删除？", "提示", {
    callback: async (action: string) => {
      if (action === "confirm") {
        await deleteFeatureById(row._id);
        ElMessage.success("删除成功");
        doSearch();
      }
    },
  });
};
/**
 * 打开编辑弹窗
 */
var edit = (row: any) => {
  if (updateForm.value) updateForm.value.resetFields();
  featureUpdateForm.value = { ...row };
  state.showEditDialog = true;
};
/**
 * 确认新增
 */
var confirmAdd = async () => {
  if (!createForm.value) return;
  createForm.value.validate(async (valid)=>{
    if(valid){
      await createFeature(featureCreateForm.value);
      ElMessage.success("新增成功");
      doSearch();
      state.showAddDialog = false;
    }
  })
};
/**
 * 确认编辑
 */
var confirmEdit = async () => {
  if (!updateForm.value) return;
  updateForm.value.validate(async (valid)=>{
    if(valid){
      await updateFeatureById(featureUpdateForm.value);
      ElMessage.success("编辑成功");
      doSearch();
      state.showEditDialog = false;
    }
  })
};
/**
 * 查看详情
 */
var detail = (row: FeatureListDto) => {
  state.featureDetail = { ...row };
  state.showDetailDialog = true;
};
/**
 * 查看任务列表
 */
var taskList = (row: FeatureListDto) => {
  router.push({
    path: '/feature/taskList',
    query: {
      _id: row._id
    }
  })
};
</script>

<template>
  <div class="container">
    <el-form inline v-model="state.condition" size="small">
        <el-form-item label="需求名称">
            <el-input v-model="state.condition.featureName" clearable placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
            <el-input v-model="state.condition.owner" clearable placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item label="JIRA">
            <el-input v-model="state.condition.jiraUrl" clearable placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item label="状态">
            <el-select filterable v-model="state.condition.status" clearable placeholder="请选择">
              <el-option label="待排期" value="待排期"></el-option>
              <el-option label="开发中" value="开发中"></el-option>
              <el-option label="测试中" value="测试中"></el-option>
              <el-option label="验收中" value="验收中"></el-option>
              <el-option label="已上线" value="已上线"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item >
            <el-button type="primary" @click="doSearch">搜索</el-button>
            <el-button type="primary" @click="add">新增</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="state.list" border size="small" :header-cell-style="{background: '#F5F5F5'}">
        <el-table-column align="center" type="index" label="序号" width="60" fixed="left"></el-table-column>
        <el-table-column align="center" prop="featureName" label="需求名称" width="200" show-overflow-tooltip fixed="left"></el-table-column>
        <el-table-column align="center" prop="testSubmitDate" :formatter="tableDateFormatter" label="提测日期" width="140" show-overflow-tooltip fixed="left"></el-table-column>
        <el-table-column align="center" prop="releaseDate" :formatter="tableDateFormatter" label="上线日期" width="140" show-overflow-tooltip fixed="left"></el-table-column>
        <el-table-column align="center" prop="branchName" label="分支名称" width="230" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="owner" label="负责人" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="frontendDays" label="前端时长" :formatter="daysSuffix" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="backendDays" label="后端时长" :formatter="daysSuffix" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="testDays" label="测试时长" :formatter="daysSuffix" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="状态" width="100" show-overflow-tooltip>
          <template #default="scope">
            <div v-if="scope.row.status === '待排期'"><span class='led grey-led'></span>{{ scope.row.status }}</div>
            <div v-else-if="scope.row.status === '开发中'"><span class='led blue-led'></span>{{ scope.row.status }}</div>
            <div v-else-if="scope.row.status === '测试中'"><span class='led orange-led'></span>{{ scope.row.status }}</div>
            <div v-else-if="scope.row.status === '验收中'"><span class='led purple-led'></span>{{ scope.row.status }}</div>
            <div v-else-if="scope.row.status === '已上线'"><span class='led green-led'></span>{{ scope.row.status }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="160" fixed="right">
          <template #default="scope">
            <el-button type="primary" link @click="detail(scope.row)">查看详情</el-button>
            <el-button type="primary" link @click="taskList(scope.row)">任务列表</el-button>
            <el-button type="primary" link @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" link @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-dialog title="新增需求" v-model="state.showAddDialog" width="420px">
      <el-form :model="featureCreateForm" ref="createForm" class="form-padding" label-width="70px" :rules="rules">
        <el-form-item label="需求名称" prop="featureName">
          <el-input placeholder="请输入需求名称" v-model="featureCreateForm.featureName" clearable></el-input>
        </el-form-item>
        <el-form-item label="提测日期">
          <el-date-picker
            clearable
            placeholder="请选择提测日期"
            value-format="YYYY-MM-DD"
            v-model="featureCreateForm.testSubmitDate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label=" 上线日期">
          <el-date-picker
            clearable
            placeholder="请选择上线日期"
            value-format="YYYY-MM-DD"
            v-model="featureCreateForm.releaseDate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="分支名称">
          <el-input placeholder="请输入分支名称" v-model="featureCreateForm.branchName" clearable></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="owner">
          <el-input placeholder="请输入负责人" v-model="featureCreateForm.owner" clearable></el-input>
        </el-form-item>
        <el-form-item label="前端时长">
          <el-input placeholder="请输入前端时长" v-model="featureCreateForm.frontendDays" clearable>
            <template #append>人天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="后端时长">
          <el-input placeholder="请输入后端时长" v-model="featureCreateForm.backendDays" clearable>
            <template #append>人天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="测试时长">
          <el-input placeholder="请输入测试时长" v-model="featureCreateForm.testDays" clearable>
            <template #append>人天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select filterable v-model="featureCreateForm.status" clearable placeholder="请选择">
              <el-option label="待排期" value="待排期"></el-option>
              <el-option label="开发中" value="开发中"></el-option>
              <el-option label="测试中" value="测试中"></el-option>
              <el-option label="验收中" value="验收中"></el-option>
              <el-option label="已上线" value="已上线"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="原型地址">
          <el-input placeholder="请输入原型地址" v-model="featureCreateForm.protoUrl" clearable></el-input>
        </el-form-item>
        <el-form-item label="JIRA地址">
          <el-input placeholder="请输入JIRA地址" v-model="featureCreateForm.jiraUrl" clearable></el-input>
        </el-form-item>
        <el-form-item label="PRD地址">
          <el-input placeholder="请输入PRD地址" v-model="featureCreateForm.prdUrl" clearable></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="default" @click="state.showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
      </template>
    </el-dialog>
    <el-dialog title="编辑需求" v-model="state.showEditDialog" width="420px">
      <el-form :model="featureUpdateForm" ref="updateForm" class="form-padding" label-width="70px" :rules="rules">
        <el-form-item label="需求名称" prop="featureName">
          <el-input placeholder="请输入需求名称" v-model="featureUpdateForm.featureName" clearable></el-input>
        </el-form-item>
        <el-form-item label="提测日期">
          <el-date-picker
            clearable
            placeholder="请选择提测日期"
            value-format="YYYY-MM-DD"
            v-model="featureUpdateForm.testSubmitDate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="上线日期">
          <el-date-picker
            clearable
            placeholder="请选择上线日期"
            value-format="YYYY-MM-DD"
            v-model="featureUpdateForm.releaseDate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="分支名称">
          <el-input placeholder="请输入分支名称" v-model="featureUpdateForm.branchName" clearable></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="owner">
          <el-input placeholder="请输入负责人" v-model="featureUpdateForm.owner" clearable></el-input>
        </el-form-item>
        <el-form-item label="前端时长">
          <el-input placeholder="请输入前端时长" v-model="featureUpdateForm.frontendDays" clearable>
            <template #append>人天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="后端时长">
          <el-input placeholder="请输入后端时长" v-model="featureUpdateForm.backendDays" clearable>
            <template #append>人天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="测试时长">
          <el-input placeholder="请输入测试时长" v-model="featureUpdateForm.testDays" clearable>
            <template #append>人天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select filterable v-model="featureUpdateForm.status" clearable placeholder="请选择">
              <el-option label="待排期" value="待排期"></el-option>
              <el-option label="开发中" value="开发中"></el-option>
              <el-option label="测试中" value="测试中"></el-option>
              <el-option label="验收中" value="验收中"></el-option>
              <el-option label="已上线" value="已上线"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="原型地址">
          <el-input placeholder="请输入原型地址" v-model="featureUpdateForm.protoUrl" clearable></el-input>
        </el-form-item>
        <el-form-item label="JIRA地址">
          <el-input placeholder="请输入JIRA地址" v-model="featureUpdateForm.jiraUrl" clearable></el-input>
        </el-form-item>
        <el-form-item label="PRD地址">
          <el-input placeholder="请输入PRD地址" v-model="featureUpdateForm.prdUrl" clearable></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="default" @click="state.showEditDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmEdit">确定</el-button>
      </template>
    </el-dialog>
    <el-dialog title="需求详情" v-model="state.showDetailDialog" width="820px">
      <el-descriptions border>
        <el-descriptions-item label="需求名称">{{state.featureDetail.featureName}}</el-descriptions-item>
        <el-descriptions-item label="提测日期">{{dateFormatter(state.featureDetail.testSubmitDate)}}</el-descriptions-item>
        <el-descriptions-item label="上线日期">{{dateFormatter(state.featureDetail.releaseDate)}}</el-descriptions-item>
        <el-descriptions-item label="分支名称">{{state.featureDetail.branchName}}</el-descriptions-item>
        <el-descriptions-item label="前端时长">{{state.featureDetail.frontendDays}}人天</el-descriptions-item>
        <el-descriptions-item label="后端时长">{{state.featureDetail.backendDays}}人天</el-descriptions-item>
        <el-descriptions-item label="测试时长">{{state.featureDetail.testDays}}人天</el-descriptions-item>
        <el-descriptions-item label="负责人">{{state.featureDetail.owner}}</el-descriptions-item>
        <el-descriptions-item label="状态" :span="2">{{state.featureDetail.status}}</el-descriptions-item>
        <el-descriptions-item label="JIRA地址" :span="3">
          <el-link @click="open(state.featureDetail.jiraUrl)">{{state.featureDetail.jiraUrl}}</el-link>
        </el-descriptions-item>
        <el-descriptions-item label="PRD地址" :span="3">
          <el-link @click="open(state.featureDetail.prdUrl)">{{state.featureDetail.prdUrl}}</el-link>
        </el-descriptions-item>
        <el-descriptions-item label="原型地址" :span="3">
          <el-link @click="open(state.featureDetail.protoUrl)">{{state.featureDetail.protoUrl}}</el-link>
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <el-button type="primary" @click="state.showDetailDialog = false">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.form-padding {
  padding: 0 20px;
  :deep(.el-input__wrapper) {
    width: 270px;
  }
}

.led {
  margin-right: 5px;
  display: inline-block;
  background-size: 2.5px 2.5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.grey-led {
	background: grey;
  background-image: radial-gradient(grey, transparent);
  box-shadow: 0 0 10px grey inset, 0 0 5px grey;
  animation: 13s grey infinite;
}
.orange-led {
	background: orange;
  background-image: radial-gradient(orange, transparent);
  box-shadow: 0 0 10px orange inset, 0 0 5px orange;
  animation: 13s orange infinite;
}
.purple-led {
	background: #C640FF;
  background-image: radial-gradient(#C640FF, transparent);
  box-shadow: 0 0 10px #C640FF inset, 0 0 5px #C640FF;
  animation: 13s #C640FF infinite;
}
.blue-led {
	background: #409EFF;
  background-image: radial-gradient(#409EFF, transparent);
  box-shadow: 0 0 10px #409EFF inset, 0 0 5px #409EFF;
  animation: 13s #409EFF infinite;
}
.green-led {
	background: #22a296;
  background-image: radial-gradient(lime, transparent);
  box-shadow: 0 0 10px #22a296 inset, 0 0 5px lime;
  animation: 13s #22a296 infinite;
}
.red-led {
	background: red;
  background-image: radial-gradient(brown, transparent);
  box-shadow: 0 0 10px red inset, 0 0 5px red;
  animation: 13s red infinite;
}
</style>
