<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="角色名称">
        <el-input v-model="form.desc"/>
      </el-form-item>
      
      <el-table
        v-loading="listLoading"
        :data="rulelist"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="95">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="权限名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.desc }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="权限路径">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="授予权限" width="200">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isAuth"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="启用"
              inactive-text="禁用">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
     
     
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {ruleList,addRole} from '@/api/admin'
export default {
  
  data() {
    return {
      form: {
        desc: '',
      },
      rulelist:[],
      listLoading:false,
      page:1
    }
  },
  beforeMount(){
    this.listLoading = true
    ruleList({page:this.page}).then(response => {
        this.rulelist = response.rulelist
        this.total=response.total
        
        this.listLoading = false
      })
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
      this.authIds=this.rulelist.reduce((pre,item)=>{
        if(item.isAuth){
          pre.push(item.id)
        }
        return pre
      },[])
      this.form.rule_ids=this.authIds.join(',')
      addRole(this.form)
      this.$router.push('/user/rolelist')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
      this.$router.push('/user/rolelist')
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

