const Base = require('../base.js');

module.exports = class extends Base {
  __before(){
    return this.checkAuth()
  }
  indexAction() {
    return this.json({msg:"admin page"});
  }
  
  async userInfoAction(){
    let username=this.ctx.state.username
    let user=await this.model('member').where({
      'cmswing_member.username':username
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
    }).field('username,desc,password,mobile,email,role_id,rule_ids').find()

    let ruleList=await this.model('auth_rule').order('id').select()

    let filePath=think.ROOT_PATH+'/www/static/image/avatar/avatar'+user.id+'.png'
    if(think.isFile(filePath)){
      user.avatar=this.config('hostIpPort')+'/static/image/avatar/avatar'+user.id+'.png'
    }else{
      user.avatar=this.config('hostIpPort')+'/static/image/avatar/avatar.jpg'
    }
    return this.json({userInfo:user,ruleList:ruleList})
  }
};
