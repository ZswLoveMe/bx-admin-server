const userModel = require("../models/user.js")
const {ErrorModel} = require("../models/resModel")
const {SuccessModel} = require("../models/resModel")
const JwtUtil = require('../utils/jwt');
module.exports = {
  getPortrait: async function (ctx, next) {
    //接收请求的繁琐事务
    let {email} = ctx.request.query
    //查询数据库中是否存在该用户名
    let user = await userModel.findUserByName(email)
    ctx.body = new SuccessModel(user)
  },
  logout: function (ctx, next) {
    console.log('ctx：', ctx)
    ctx.body = new ErrorModel("退出成功")
    return
  },
  doLogin: async function (ctx, next) {
    let {email, password} = ctx.request.body

    let user = await userModel.findUserByName(email)
    if(user.length === 0){
      ctx.body = new ErrorModel("用户名不正确")
      return
    }
    if(user[0].password.trim() !== password){
      ctx.body = new ErrorModel("密码不正确")
      return
    }
    let jwt = new JwtUtil(user[0].id);
    let token = jwt.generateToken();
    let result = {
      state:true,
      token:token
    }
    ctx.session.userInfo = user[0]
    ctx.body = new SuccessModel(result,"登录成功",)
    return
  }
}
