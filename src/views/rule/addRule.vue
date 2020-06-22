<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="权限名称">
        <el-input v-model="form.desc"/>
      </el-form-item>
      <el-form-item label="权限路径">
        <el-input v-model="form.name"/>
      </el-form-item>
      
      <el-form-item label="状态">
        <el-switch
              v-model="form.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="启用"
              inactive-text="禁用">
            </el-switch>
      </el-form-item>
     
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {addRule} from '@/api/admin'
export default {
  
  data() {
    return {
      form: {
        desc: '',
        name: '',
        status: true
      }
    }
  },
 
  methods: {
    async onSubmit() {
      this.$message('submit!')
      let res=await addRule(this.form)
      console.log(res)
      if(res.msg=="添加失败"){
        this.$message({
          message:res.content,
          type:"error"
        })
      }else{
        this.$message({
          message:'添加成功',
          type:"success"
        })
        this.$router.push('/user/authlist')
      }
      
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
      this.$router.push('/user/authlist')
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

