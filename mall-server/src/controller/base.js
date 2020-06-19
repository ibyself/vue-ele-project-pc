const jsonwebtoken=require('jsonwebtoken')
module.exports = class extends think.Controller {
  __before() {

  }
  authFail(){
    this.json({error:"JWT校验失败"})
    return false
  }
  checkAuth(){
    const token=this.ctx.headers['x-token']
    const {secret,cookie,expire}=this.config('jwt')
    
    try {
      var tokenObj=token?jsonwebtoken.verify(token,secret):{}
      this.ctx.state.username=tokenObj.name
    } catch (error) {
     return this.authFail()
    }

    if(!tokenObj.name){
      return this.authFail()
    }
    this.updateAuth(tokenObj.name)
  }
  updateAuth(userName){
    const userInfo={
      name:userName
    }
    const {secret,cookie,expire}=this.config('jwt')
    const token=jsonwebtoken.sign(userInfo,secret,{expiresIn:expire})
    // this.cookie(cookie,token)
    this.header('authoriztion',token)
    return token
  }
};
