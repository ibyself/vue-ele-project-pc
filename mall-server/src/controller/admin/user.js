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
    let total=await this.model('member').count()
    this.json({userlist,total})
  }

  async deluserAction(){
    let userId=this.get('id')
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
      on:['id','user_id']
    }).join({
      table:"auth_role",
      join:'left',
      as:'c',
      on:['l.role_id','id']
    }).field('username,desc,password,mobile,email,role_id').find()
    this.json({user})
  }

  async updateUserAction(){
    let user=this.post()
    if(this.method=='POST'&&user.password!==''){
      await this.model('member').where({id:user.id}).update({
        password:this.verifyPassword(user.password),email:user.email,mobile:user.mobile
      })
      let role= await this.model('auth_user_role').where({user_id:user.id}).find()
      if(role.id){
        await this.model('auth_user_role').where({user_id:user.id}).update({
          role_id:user.role_id
        })
      }else{
        await this.model('auth_user_role').where({user_id:user.id}).add({
          role_id:user.role_id,user_id:user.id
        })
      }
      this.json({msg:"更新成功1"})
    }else if(this.method=='POST'){
      await this.model('member').where({id:user.id}).update({
        email:user.email,mobile:user.mobile
      })
      let role= await this.model('auth_user_role').where({user_id:user.id}).find()
      if(role.id){
        await this.model('auth_user_role').where({user_id:user.id}).update({
          role_id:user.role_id
        })
      }else{
        await this.model('auth_user_role').where({user_id:user.id}).add({
          role_id:user.role_id,user_id:user.id
        })
      }
      this.json({msg:"更新成功2"})
    }else{
      this.json({error:"100","msg":"请使用post方法"})
    }
    

  }

  async addUserAction(){
    if(this.method=='POST'){
      let addUser=this.post()
      let user=await this.model('member').where({username:addUser.username}).find()
      if(!user.username){
        addUser.status=1
        addUser.password=this.verifyPassword(addUser.password)
        await this.model('member').add(addUser)
        let res=await this.model('member').where({username:addUser.username}).find()
        await this.model('auth_user_role').add({
          role_id:addUser.role_id,user_id:res.id
        })
        this.json({msg:"添加成功"})
      }else{
        this.json({msg:"添加失败",content:"用户名已存在"})
      }
      
    }

  }

  verifyPassword(password){
    return think.md5(think.md5('www.cmswing.com')+think.md5(password)+think.md5('Arterli'))
  }
};
