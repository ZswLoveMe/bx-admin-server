// 引入路由中间间
const Router = require('koa-router')
let userRouter = new Router()

const userControllers = require('../controllers/user')

userRouter.get('/user/get-portrait', userControllers.getPortrait)
  .post('/user/do-logout', userControllers.logout)
  .post('/user/do-login', userControllers.doLogin)

module.exports = userRouter