<template>
  <div class="app-container">
    <div class="addUser-wrap">
        <el-button @click="add()" type="primary" icon="el-icon-edit">添加商品</el-button>
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
      <el-table-column label="商品名称" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="产品图片" align="center">
        <template slot-scope="scope">
          <el-image v-if="scope.row.imgs"
            style="width: 100px; height: 100px"
            :src="base+'static/upload/'+JSON.parse(scope.row.imgs)[0].filename"
            fit="cover">
          </el-image>
          <el-image
            v-else
            style="width: 100px; height: 100px"
            :src="require('@/assets/images/goods.png')"
            fit="cover">
          </el-image>
        </template>
      </el-table-column>
      
      <el-table-column label="产品类别" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.category }}
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
        @current-change="getPageProduct"
        :total="total">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import { productList ,delProduct} from '@/api/shop'
const base = process.env.VUE_APP_BASE_API;
export default {
  
  data() {
    return {
      list: null,
      listLoading: true,
      total:0,
      page:1,
      base:base
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      productList({page:this.page}).then(response => {
        this.list = response.productlist
        console.log(response.productlist)
        this.total=response.total
        this.listLoading = false
      })
    },
    edit(product){
        this.$router.push({
            path:"/shop/editProduct",
            query:product
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
            await delProduct({id})
            this.listLoading=false
            this.fetchData()
          })
          .catch(()=>{
            return new Promise(()=>{})
          })
    },
    getPageProduct(page){
        this.page=page
        this.listLoading=true
        productList({page:page}).then(response=>{
            this.list=response.productlist
            this.total=response.total
            this.listLoading=false
        })
    },
    add(){
        this.$router.push("/shop/addProduct")
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

