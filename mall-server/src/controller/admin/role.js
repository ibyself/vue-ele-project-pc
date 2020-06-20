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
};
