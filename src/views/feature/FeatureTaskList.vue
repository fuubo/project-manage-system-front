<script setup lang="ts">
import type {
  FeatureTaskListDto,
  FeatureTaskCreateDto,
  FeatureTaskUpdateDto,
} from "@/types/feature";
import { tableDateFormatter } from "@/utils/date";
import { featureTaskList, createFeatureTask, updateFeatureTask, deleteFeatureTaskById } from "@/api/feature";
import { ElMessage, type FormInstance, type FormRules, ElMessageBox } from "element-plus";
const route = useRoute();
var createForm = ref<FormInstance>();
const featureTaskCreateForm = ref<FeatureTaskCreateDto>({
  featureId: "",
  taskName: "",
  description: "",
  engineer: "",
  project: "",
  module: "",
  startDate: "",
  endDate: "",
  status: "",
  remark: "",
});
var updateForm = ref<FormInstance>();
const featureTaskUpdateForm = ref<FeatureTaskUpdateDto>({
  _id: "",
  featureId: "",
  taskName: "",
  description: "",
  engineer: "",
  project: "",
  module: "",
  startDate: "",
  endDate: "",
  status: "",
  remark: "",
});
const state = reactive({
  list: [],
  showAddDialog: false,
  showEditDialog: false,
});
const rules: FormRules = {
  taskName: [{ required: true, message: "请输入任务名称" }],
  engineer: [{ required: true, message: "请输入开发者" }],
  status: [{ required: true, message: "请选择任务状态" }],
};
const projects = ['ssc_web_frontstage', 'xdf-ssc-web', 'xdf-ssc-aio-main', 'xdf-ssc-aio']
const modules = ['一管异动', '考勤', '电子签', '证明申请']
/**
 * 默认加载最近签署
 */
onMounted(() => {
  doSearch();
});
var doSearch = async () => {
  const id = route.query._id as string;
  if (id) {
    let data: any = await featureTaskList(id);
    state.list = data.list;
  }
};
var iconNameByStatus = (value: string) => {
  switch(value){
    case '未开始':
       return 'wait'
    case '开发中':
       return 'start'
    case '已完成':
       return 'done'
    default:
  }
  return ''
}
var add = () => {
  if (createForm.value) createForm.value.resetFields();
  featureTaskCreateForm.value = {
    featureId: route.query._id as string,
    taskName: "",
    description: "",
    engineer: "",
    project: "",
    module: "",
    startDate: "",
    endDate: "",
    status: "",
    remark: "",
  };
  state.showAddDialog = true;
};
var edit = (row: FeatureTaskListDto) => {
  if (updateForm.value) updateForm.value.resetFields();
  featureTaskUpdateForm.value = { ...row };
  state.showEditDialog = true;
};
/**
 * 删除数据二次确认
 */
var del = (row: FeatureTaskListDto) => {
  ElMessageBox.confirm("确定删除？", "提示", {
    callback: async (action: string) => {
      if (action === "confirm") {
        await deleteFeatureTaskById(row._id);
        ElMessage.success("删除成功");
        doSearch();
      }
    },
  });
};
var confirmAdd = () => {
  if (!createForm.value) return;
  createForm.value.validate(async (valid)=>{
    if(valid){
      await createFeatureTask(featureTaskCreateForm.value);
      ElMessage.success("新增成功");
      doSearch();
      state.showAddDialog = false;
    }
  })
};
var confirmEdit = () => {
  if (!updateForm.value) return;
  updateForm.value.validate(async (valid)=>{
    if(valid){
      await updateFeatureTask(featureTaskUpdateForm.value);
      ElMessage.success("编辑成功");
      doSearch();
      state.showEditDialog = false;
    }
  })};
</script>

<template>
  <div>
    <el-button type="primary" @click="add">新增</el-button>
    <el-table :data="state.list" border size="small" :header-cell-style="{background: '#F5F5F5'}">
      <el-table-column align="center" type="index" label="序号" width="60" fixed="left"></el-table-column>
      <el-table-column align="center" prop="taskName" label="任务名称" width="200" show-overflow-tooltip fixed="left"></el-table-column>
      <el-table-column align="left" prop="description" label="详细说明" width="280" fixed="left">
        <template #default="scope">
          <span style="white-space: pre-line;">{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="engineer" label="开发者" width="90" fixed="left"></el-table-column>
      <el-table-column align="center" prop="project" label="所属项目" width="150"></el-table-column>
      <el-table-column align="center" prop="module" label="所属模块" width="120"></el-table-column>
      <el-table-column align="center" prop="startDate" :formatter="tableDateFormatter" label="开始日期" width="100"></el-table-column>
      <el-table-column align="center" prop="endDate" :formatter="tableDateFormatter" label="结束日期" width="100"></el-table-column>
      <el-table-column align="center" prop="status" label="当前状态" width="100" show-overflow-tooltip>
        <template #default="scope">
          <svg-icon className="margin-right" :name=iconNameByStatus(scope.row.status)></svg-icon>{{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column align="left" prop="remark" label="备注" min-width="200">
        <template #default="scope">
          <span style="white-space: pre-line;">{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="120" fixed="right">
        <template #default="scope">
          <el-button type="primary" link @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" link @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增任务" v-model="state.showAddDialog" width="420px">
      <el-form :model="featureTaskCreateForm" ref="createForm" class="form-padding" label-width="70px" :rules="rules">
        <el-form-item label="任务名称" prop="taskName">
          <el-input placeholder="请输入任务名称" v-model="featureTaskCreateForm.taskName" clearable></el-input>
        </el-form-item>
        <el-form-item label="详细说明">
          <el-input
            v-model="featureTaskCreateForm.description"
            :rows="5"
            type="textarea"
            placeholder="请输入详细说明"
          />
        </el-form-item>
        <el-form-item label="开发者" prop="engineer">
          <el-input placeholder="请输入开发者" v-model="featureTaskCreateForm.engineer" clearable></el-input>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker
            clearable
            placeholder="请选择开始日期"
            value-format="YYYY-MM-DD"
            v-model="featureTaskCreateForm.startDate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker
            clearable
            placeholder="请选择结束日期"
            value-format="YYYY-MM-DD"
            v-model="featureTaskCreateForm.endDate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="所属项目">
          <el-select allow-create v-model="featureTaskCreateForm.project" filterable clearable>
            <el-option v-for="opt in projects" :key="opt" :value="opt"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属模块" prop="module">
          <el-select placeholder="请选择所属模块" allow-create v-model="featureTaskCreateForm.module" filterable clearable>
            <el-option v-for="opt in modules" :key="opt" :value="opt"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="当前状态" prop="status">
          <el-select filterable v-model="featureTaskCreateForm.status" clearable placeholder="请选择当前状态">
              <el-option label="未开始" value="未开始"></el-option>
              <el-option label="开发中" value="开发中"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="featureTaskCreateForm.remark"
            :rows="8"
            type="textarea"
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="default" @click="state.showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
      </template>
    </el-dialog>
    <el-dialog title="编辑需求" v-model="state.showEditDialog" width="420px">
      <el-form :model="featureTaskUpdateForm" ref="updateForm" class="form-padding" label-width="70px" :rules="rules">
        <el-form-item label="任务名称" prop="taskName">
          <el-input placeholder="请输入任务名称" v-model="featureTaskUpdateForm.taskName" clearable></el-input>
        </el-form-item>
        <el-form-item label="详细说明">
          <el-input
            v-model="featureTaskUpdateForm.description"
            :rows="5"
            type="textarea"
            placeholder="请输入详细说明"
          />
        </el-form-item>
        <el-form-item label="开发者" prop="engineer">
          <el-input placeholder="请输入开发者" v-model="featureTaskUpdateForm.engineer" clearable></el-input>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker
            clearable
            placeholder="请选择开始日期"
            value-format="YYYY-MM-DD"
            v-model="featureTaskUpdateForm.startDate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker
            clearable
            placeholder="请选择结束日期"
            value-format="YYYY-MM-DD"
            v-model="featureTaskUpdateForm.endDate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="所属项目">
          <el-select allow-create v-model="featureTaskUpdateForm.project" filterable clearable>
            <el-option v-for="opt in projects" :key="opt" :value="opt"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属模块" prop="module">
          <el-select placeholder="请选择所属模块" allow-create v-model="featureTaskUpdateForm.module" filterable clearable>
            <el-option v-for="opt in modules" :key="opt" :value="opt"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="当前状态" prop="status">
          <el-select filterable v-model="featureTaskUpdateForm.status" clearable placeholder="请选择当前状态">
              <el-option label="未开始" value="未开始"></el-option>
              <el-option label="开发中" value="开发中"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="featureTaskUpdateForm.remark"
            :rows="8"
            type="textarea"
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="default" @click="state.showEditDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmEdit">确定</el-button>
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
.margin-right {
  margin-right: 5px;
}
</style>
