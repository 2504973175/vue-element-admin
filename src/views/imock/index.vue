<template>
  <div class="app-container">
    <el-form ref="form" :model="formData" label-width="90px">
      <el-form-item label="请求地址">
        <el-input v-model="reqURL" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="匹配域名">
        <el-input
        v-model="formData.host"
        placeholder="Mock匹配的请求域名，比如： www.baidu.com。 匹配任意域名可使用*"></el-input>
      </el-form-item>
      <el-form-item label="匹配路径">
        <el-input
        v-model="formData.path"
        placeholder="Mock匹配的请求路径，比如：/"></el-input>
      </el-form-item>
      <el-form-item label="匹配方法">
        <el-input
        v-model="formData.method"
        placeholder="Mock匹配的请求方法，比如： GET。匹配全部请求方法可使用*"></el-input>
      </el-form-item>
      <el-form-item label="Mock响应码">
        <el-input
          placeholder="请输入Mock响应码。 比如：200"
          v-model.number="formData.code">
        </el-input>
      </el-form-item>
      <el-form-item label="Mock响应头">
        <el-input
          type="textarea"
          :rows="4"
          placeholder='请输入Mock响应头，以JSON字典的形式描述。 比如：{"Content-Type": "application/json"}'
          v-model="formData.headers">
        </el-input>
      </el-form-item>
      <el-form-item label="Mock类型">
        <el-select v-model="formData.type" >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Mock响应体">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入Mock响应体内容，需要与Mock头信息指定的格式一致"
          v-model="formData.content">
        </el-input>
      </el-form-item>
      <el-form-item label="未匹配处理">
        <el-radio v-model="formData.noMatch" label="empty">空字符</el-radio>
        <el-radio v-model="formData.noMatch" label="proxy">代理模式</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">设置</el-button>
        <el-button type="primary" @click="onView">查看</el-button>
      </el-form-item>
    </el-form>

    <el-drawer title="" :visible.sync="drawer" :direction="direction" :with-header="true" size="300">
     <p>{{mockData}}</p>
    </el-drawer>
  </div>
</template>
<script>
/* eslint-disable */
import { getTestMock, setTestMock } from '@/api/imock'
export default {
  name: 'iMock',
  data() {
    return {
      title: 'iMock设置',
      drawer: false,
      direction: 'rtl',
      activeName: 'prod',
      options: [{
          value: 'text',
          label: '纯文本'
        }, {
          value: 'dynamic',
          label: '参数化'
        }, {
          value: 'express',
          label: 'Python表达式'
        }],
      formData: {
        host: null,
        path: null,
        method: null,
        type:null,
        code: null,
        noMatch: 'empty'
      },
      mockData: {}
    }
  },
  computed: {
    reqURL: {
      get() {
        if (this.formData.host) {
          return `http://${this.formData.host}${this.formData.path}`
        } else {
          return ''
        }
      }
    }
  },
  methods: {
    warpData() {
      const data = {}
      data.host = this.formData.host || '*'
      data.url = this.formData.path || '/'
      data.method = this.formData.method || '*'
      data.no_pattern_response = this.formData.noMatch
      data.code = this.formData.code || 200
      data.headers = this.formData.headers || '{}'
      data.type=this.formData.type
      data.data = this.formData.content || ''
      data.headers = JSON.parse(data.headers)

      return data
    },
    onSubmit() {
      const data = this.warpData()
      setTestMock(data).then(res => {
        this.$message({
          message: '设置Mock成功！',
          type: 'success'
        })
      }).catch(err => {
        this.$log.danger(err)
      })
    },
    onView() {
      const data = this.warpData()
      getTestMock(data).then(res => {
        this.mockData = res
        this.$message({
          message: '获取Mock成功！',
          type: 'success'
        })
      }).catch(err => {
        this.$log.danger(err)
      })
      this.drawer = true
    }
  }
}
</script>
