<template>
    <div class="app-container">
    
        <el-card class="box-card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="IP">
    <el-input v-model="formInline.ip" placeholder=""></el-input>
         </el-form-item>
  <el-form-item label="域名">
    <el-input v-model="formInline.domin" placeholder=""></el-input>
  </el-form-item>
  <el-form-item label="端口">
    <el-input v-model="formInline.port" placeholder=""></el-input>
  </el-form-item>
  <el-form-item label="数据库">
    <el-input v-model="formInline.db" placeholder=""></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onConnect">测试连接</el-button>
  </el-form-item>
</el-form>
<el-input
  type="textarea"
  :rows="5"
  placeholder="请输入SQL语句"
            v-model="textarea">
</el-input>
<el-button type="primary"  style="padding-right: 10px" @click="onExcute">执行SQL</el-button>
</el-card>
<el-card class="box-card">
<el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
</el-card>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        formInline: {
          ip: '',
          domin: '',
          port:'',
          db:''
        },
        textarea: '',
        tableData: []
      }
    },
    methods: {
        onConnect() {
        console.log('submit!');
      },
      onExcute() {
        console.log('执行SQL!');
      }
    }
  }
</script>
   