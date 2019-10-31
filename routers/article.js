const Route = require('koa-router')
const articleRouter =  new Route();
const articleControllers = require('../controllers/article')

articleRouter.prefix('/article')

articleRouter.post('/getAllArticle',articleControllers.getAllArticle)
  .post('/delArticle',articleControllers.delArticle)
module.exports = articleRouter