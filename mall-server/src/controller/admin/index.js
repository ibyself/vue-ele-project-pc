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
    let user=await this.model('member').where({username:username}).find()
    let filePath=think.ROOT_PATH+'/www/static/image/avatar/avatar'+user.id+'.png'
    if(think.isFile(filePath)){
      user.avatar=this.config('hostIpPort')+'/static/image/avatar/avatar'+user.id+'.png'
    }else{
      user.avatar=this.config('hostIpPort')+'/static/image/avatar/avatar.png'
    }
    return this.json({userInfo:user})
  }
};
