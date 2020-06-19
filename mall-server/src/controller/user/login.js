const Base = require('../base.js');

module.exports = class extends Base {
  indexAction() {
    return this.json({msg:"login page"});
  }
  async loginAction(){
      if(this.method=='POST'){
          let username=this.post('username')
          let password=this.post('password')
          let user=await this.model('member').where({username:username}).find()
          if(user.password==this.verifyPassword(password)){
            const token=this.updateAuth(username)
            this.json({state:"登录成功",token:token})
          }else{
            return this.json({state:"登录失败"})
          }
      }
  }
  verifyPassword(password){
    return think.md5(think.md5('www.cmswing.com')+think.md5(password)+think.md5('Arterli'))
  }
};
