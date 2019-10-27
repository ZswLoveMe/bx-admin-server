
const userModel = require('../models/user.js');
module.exports = {
  checkUserName: async function (ctx,next) {
    //接收请求的繁琐事务
    let { username } = ctx.request.body;
    //查询数据库中是否存在该用户名
    let user = await userModel.findUserByname(username);
    if (user.length === 0){
      ctx.body = {code:'001',msg:"可以注册"}
      return;
    }
    ctx.body = {code:'002',msg:"用户名已经存在"}
  },
  doRegister: function () {

  },
  doLogin:function () {
    
  }
}
