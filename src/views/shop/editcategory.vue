<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="分类名称">
        <el-input v-model="form.title"/>
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
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {editCategory} from '@/api/shop'
export default {
  
  data() {
    return {
      form: {
        title: '',
        status:true
      }
    }
  },
  beforeMount(){
    let category=this.$route.query
    this.form.id=category.id
    this.form.title=category.title
    this.form.status=category.status==1?true:false
  },
  methods: {
    onSubmit() {
      this.$message('submit!') 
      editCategory(this.form)
      this.$router.push('/shop/category')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
      this.$router.push('/shop/category')
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

