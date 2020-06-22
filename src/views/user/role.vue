<template>
  <div class="app-container">
    <div class="addUser-wrap">
        <el-button @click="addRole()" type="primary" icon="el-icon-edit">添加角色</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
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
      <el-table-column label="角色名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column label="权限规则编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.rule_ids }}</span>
        </template>
      </el-table-column>
      
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status==1?"正常":"禁用" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
           <el-button @click="edit(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
           <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginating-wrap">
        <el-pagination
        background
        layout="prev, pager, next"
        @current-change="getPageUsers"
        :total="total">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import { roleList ,delRole} from '@/api/admin'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '1': 'success',
        '0': 'gray',
        '-1': 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total:0,
      page:1
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      roleList({page:this.page}).then(response => {
        this.list = response.rolelist
        this.total=response.total
        this.listLoading = false
      })
    },
    edit(role){
        this.$router.push({
            path:"/role/editRole",
            query:role
        })
    },
    del(id){
        this.$confirm(`确认删除id为${id}的信息吗?`, '确认删除', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        })
          .then(async()=>{
            this.listLoading=true
            await delRole({id})
            this.listLoading=false
            this.fetchData()
          })
    },
    getPageUsers(page){
        this.page=page
        this.listLoading=true
        roleList({page:page}).then(response=>{
            this.list=response.rolelist
            this.total=response.total
            this.listLoading=false
        })
    },
    addRole(){
        this.$router.push("/role/addRole")
    }
  }
}
</script>
<style lang="scss">
    .addUser-wrap{
        padding-bottom:20px;
    }
    .paginating-wrap{
        height:100px;
        display: flex;
        justify-content:center;
        align-items:center;
    }
</style>

