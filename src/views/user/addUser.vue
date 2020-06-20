<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.mobile" />
      </el-form-item>
      <el-form-item label="管理员角色选择">
        <el-select v-model="form.role_id">
          <el-option v-for="(item,index) in rolelist" :key="index" :label="item.desc" :value="item.id" />
          
        </el-select>
      </el-form-item>
     
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {roleList,addUser} from '@/api/admin'
export default {
  
  data() {
    return {
      form: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        role_id:''
      },
      rolelist:[]
    }
  },
  async beforeMount(){
      let res=await roleList()
      this.rolelist=res.rolelist
  },
  methods: {
    async onSubmit() {
      this.$message('submit!')
      let res=await addUser(this.form)
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
        this.$router.push('/user/userlist')
      }
      
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
      this.$router.push('/user/userlist')
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

