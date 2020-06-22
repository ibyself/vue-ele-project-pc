const Base = require('../base.js');

module.exports = class extends Base {
  __before(){
    return this.checkAuth()
  }
  indexAction() {
    return this.json({msg:"role page"});
  }
  
  async rolelistAction(){
    let page=this.get('page')?this.get('page'):1
    let rolelist=await this.model('auth_role').order('id').page(page,10).select()
    let total=await this.model('auth_role').count()
    return this.json({rolelist,total})
  }

  async addRoleAction(){
    if(this.method=="POST"){
      let role=this.post()
      role.status=1
      this.model('auth_role').add(role)
      this.json({msg:"角色添加成功"})
    }
  }

  async delRoleAction(){
    let roleid=this.get('id')
    await this.model('auth_role').where({id:roleid}).delete()
    this.json({msg:"角色删除成功"})
  }

  async editRoleAction(){
    if(this.method=='POST'){
      let role=this.post()
      role.status=1
      await this.model('auth_role').where({id:role.id}).update({desc:role.desc,rule_ids:role.rule_ids})
      this.json({msg:"角色信息更新成功"})
    }else{
      this.json({msg:'角色信息更新失败'})
    }
  }
};
