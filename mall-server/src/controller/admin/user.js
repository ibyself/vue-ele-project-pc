const Base = require('../base.js');

module.exports = class extends Base {
  __before(){
    return this.checkAuth()
  }
  indexAction() {
    return this.json({msg:"用户列表"});
  }
  async userlistAction(){
    let page=this.get('page')?this.get('page'):1
    let userlist=await this.model('member').order('id').page(page,10).select()
  }

  async deluserAction(){
    let usreId=this.get('id')
    await this.model('member').where({id:userId}).delete()
    this.json({"msg":"删除成功"})
  }

  async userinfoAction(){
    let userid=this.get('id')
    let user=await this.model('member').where({
      'cmswing_member.id':userid
    }).join({
      table:"auth_user_role",
      join:"left",
      as:"l",
      on:['id','userid']
    }).join({
      table:"auth_role",
      join:'left',
      as:'c',
      on:['l.role_id',id]
    }).field('username','desc','password','mobile','email','role_id').find()
    this.json({user})
  }
};
