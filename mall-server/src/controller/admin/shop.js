const Base = require('../base.js');

module.exports = class extends Base {
  __before(){
    return this.checkAuth()
  }
  indexAction() {
    return this.json({msg:"shop page"});
  }
  async categoryListAction(){
    let page=this.get('page')?this.get('page'):1
    let categorylist=await this.model('category').order('id').page(page,10).select()
    let total=await this.model('category').count()
    return this.json({categorylist,total})
  }
  async addCategoryAction(){
    if(this.method=='POST'){
      let category=this.post()
      category.status=category.status==true?'1':'-1'
      category.name=category.title
      await this.model('category').add(category)
      this.json({msg:"添加分类成功"})
    }else{
      this.json({msg:"添加分类失败"})
    }
  }

  async delCategoryAction(){
    let id=this.get('id')
    await this.model('category').where({id:id}).delete()
    this.json({
      msg:"删除成功"
    })
  }

  async editCategoryAction(){
    if(this.method=="POST"){
      let category=this.post()
      category.status=category.status==true?'1':'-1'
      category.name=category.title
      await this.model('category').where({id:category.id}).update({
        name:category.name,title:category.title,status:category.status
      })
      this.json({msg:"分类修改成功"})
    }
  }

  async productListAction(){
    let page=this.get('page')?this.get('page'):1
    let productlist=await this.model('product').join({
      table:"category",
      join:"left",
      as:"l",
      on:['categoryid','id']
    }).field('cmswing_product.id,cmswing_product.title,cmswing_product.imgs,cmswing_product.price,categoryid,price,sku,content,name as category')
    .page(page,10).select()
    let total=await this.model('product').count()
    return this.json({productlist,total})
  }
  async addProductAction(){
    if(this.method=='POST'){
      let product=this.post()
      await this.model('product').add(product)
      this.json({msg:"添加商品成功"})
    }else{
      this.json({msg:"添加商品失败"})
    }
  }

  async delProductAction(){
    let id=this.get('id')
    await this.model('product').where({id:id}).delete()
    this.json({
      msg:"删除成功"
    })
  }

  async editProductAction(){
    if(this.method=="POST"){
      let product=this.post()
      let tempProduct={...product}
      delete tempProduct.id
      await this.model('product').where({id:product.id}).update(tempProduct)
      this.json({msg:"商品修改成功"})
    }
  }
};
