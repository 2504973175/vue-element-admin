<template>
    <div class="app-container">
      <div>
        <el-row :gutter="20">
          <el-col :span="24" :xs="24">
            <el-card>
              <el-button type="primary" @click="createTask" round>创建任务</el-button>
            </el-card>
          </el-col>
        </el-row>
        <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="当前任务" name="current">当前任务</el-tab-pane>
    <el-tab-pane label="未完成" name="unfinish">未完成</el-tab-pane>
    <el-tab-pane label="已完成" name="finished">已完成</el-tab-pane>
  </el-tabs>

        <el-row :gutter="20">
          <el-col :span="24" :xs="24">
            <el-table :data="tableData"
              border
              style="width: 100%;">
              <el-table-column
                fixed
                prop="name"
                label="任务名称">
              </el-table-column>
              <el-table-column
                prop="desc"
                label="任务描述"
                width="100">
              </el-table-column>
              <el-table-column
                prop="start_time"
                label="执行开始时间"
                width="120">
                 </el-table-column>
              <el-table-column
                prop="end_time"
                label="执行结束时间"
                width="120">
              </el-table-column>
              <el-table-column
                prop="assign"
                label="执行人">
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="160">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="60">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="editTask(scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="text-align: right; margin: 5px;">


              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="query.pageSize"
                :total="query.total">
              </el-pagination>
            </div>
          </el-col>
        </el-row>



        <el-row :gutter="20">
          <el-col :span="24" :xs="24">
            <el-drawer
              title=""
              :visible.sync="drawer"
              :with-header="false"
              size="50%"
            >
              <div style="padding: 10px;">
                <h3>{{ title }}</h3>
                <el-divider content-position="left"></el-divider>
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="任务名称">
                    <el-input v-model="form.name" placeholder="请输入任务名称名称" />
                  </el-form-item>
                  <el-form-item label="任务描述">
                    <el-input v-model="form.desc" placeholder="请输入任务描述">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="开始时间">
                  <el-date-picker v-model="form.start_time" type="datetime" placeholder="选择开始时间"> </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                  <el-date-picker v-model="form.end_time" type="datetime" placeholder="选择结束时间"> </el-date-picker>
                </el-form-item>
                  <el-form-item label="执行人">
                    <el-input v-model="form.assign" placeholder="请输入执行人" />
                  </el-form-item>
                 
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                    <el-button @click="drawer = false">取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-drawer>
          </el-col>
        </el-row>
      </div>
    </div>
  </template>
   
  <script>
  import { submit, pullData } from '@/api/list'
  export default {
    name: 'List',
    data() {
      return {
        activeName: 'current',
        title: '',
        drawer: false,
        tableData: [],
        form: {
          'name': '',
          'desc': '',
          'start_time': '',
          'end_time': '',
          'assign': ''
        },
        query: {
          pageNum: 1,
          pageSize: 10,
          total: 0
        }
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
        createTask() {
        this.title = '添加任务'
        this.drawer = true
        this.form = {}
      },
      editTask(row) {
        this.title = '编辑任务'
        this.drawer = true
        this.form = row
      },
      onSubmit() {
        submit(this.form).then((response) => {
          if (response.code === 0) {
            this.query.pageNum = 1
            this.fetchData()
            this.$message({
              showClose: true,
              message: '保存成功！',
              type: 'success'
            })
            this.drawer = false
          }
        })
      },
      getTaskList(tab) {
        pullData({tab:tab}).then((response) => {
          if (response.code === 0) {
            this.tableData = response.data;
          }
        })
      },
      handleCurrentChange(val) {
      this.query.pageNum = val
      this.fetchData()
    }
    }
  }
  </script>