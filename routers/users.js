// 引入路由中间间
const Router = require('koa-router')
let userRouter = new Router()

const userControllers = require('../controllers/user')

userRouter.post('/user/check_username', userControllers.checkUserName)
  .post('/user/do_register', userControllers.doRegister)
  .post('/user/do-login', userControllers.doLogin)

module.exports = userRouter