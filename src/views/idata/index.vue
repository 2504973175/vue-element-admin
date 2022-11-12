<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form :inline="true" ref="formData" :rules="rules" :model="formData" label-width="55px">
        <el-form-item label="域名" prop="db_host">
          <el-input
          v-model="formData.db_host"></el-input>
        </el-form-item>
        <el-form-item label="端口" prop="db_port" >
          <el-input
          v-model="formData.db_port" style="width: 80px;"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="db_user">
          <el-input
          v-model="formData.db_user" style="width: 80px;"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="db_passwd">
          <el-input
          v-model="formData.db_passwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="数据库" prop="db_name">
          <el-input
          v-model="formData.db_name"></el-input>
        </el-form-item>
       
  
          <el-row>
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入SQL语句"
        v-model="formData.sql">
      </el-input>
    </el-row>
  <el-row>
          <el-button type="primary" @click="onConnect('formData')">测试连接</el-button>
          <el-button type="primary" @click="onExec('formData')">执行SQL</el-button>
          <p>{{message}}</p>
        </el-row>
    
      
    </el-form>

      
        
        
  
    </el-card>
    <el-card class="box-card">
      <el-table
      :data="tableData"
     
      style="width: 100%">
        <el-table-column v-for="h in tableHead" :key="h"
          :prop="h" :label="h">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getConnect, doConnect, exec } from '@/api/idata'
export default {
  name: 'idata',
  data() {
    return {
      rules: {
        db_host: [
          { required: true, message: '请输入域名', trigger: 'blur' }
        ],
        db_port: [
          { required: true, message: '请输入端口', trigger: 'blur' }
        ],
        db_user: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        db_passwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        db_name: [
          { required: true, message: '请输入数据库', trigger: 'blur' }
        ]
      },

      title: 'iData设置',
      formData: {
        db_charset: 'utf8',
        db_host: null,
        db_port: null,
        db_user: null,
        db_passwd: null,
        db_name: null,
        sql: null,
        param: {},
        key: 'all'
      },
      tableData: [],
      time: 0,
      uniqKey: null,
      maxCount: 20,
      sql: null,
      message:null,
      tableHead: [],
      result:[]
    }
  },
  methods: {
    onConnect (formName) {
        this.$refs[formName].validate((valid) =>{
        if (valid) {
        
         doConnect({
        ...this.formData
      }).then(res => {
        
        this.uniqKey = res.uniq_key
        this.message='连接成功'
        this.$message({
          message: '连接测试成功！',
          type: 'success'
        })
      })
          }
         else {    
          this.$message({
            message: '请检查必填字段！',
            type: 'error'
          })
           
            return false
          }
      }
      )//验证函数结尾
    },
    onExec (formName) {
      this.$refs[formName].validate((valid) =>{
      if (valid) {
          if (!this.formData.sql) {
            this.$message({
              message: 'SQL 语句不能为空。',
              type: 'warning'
            })
            return
          }
      
      exec({                      
            ...this.formData,           
           
          }).then(res => {
           
              if (res.data.length > 0) {  
              this.tableHead = []
              for (let i in res.data[0]) {
                this.tableHead.push(i)
              }
              this.tableData = res.data  
              this.time = res.time_cost
            } else {                      
              this.tableHead = []
              this.tableData = []
            }
            this.message='查询成功'
            this.loading = false
            this.$message({
              message: '查询成功',
              type: 'success'
            }

            )
         
       
  }
           ).catch(err => { 
            this.loading = false
            console.log(err)
            this.$message({
            
              type: 'error'
            })
          })
        }
       else {    
        this.$message({
          message: '请检查必填字段！',
          type: 'error'
        })
          console.log('error submit!!')
          return false
        }
    }
    )//验证函数结尾
  }//onconnect函数结尾
}
}
</script>