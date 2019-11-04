const Route = require('koa-router')
const articleRouter =  new Route();
const articleControllers = require('../controllers/article')

articleRouter.prefix('/article')

articleRouter.post('/getAllArticle',articleControllers.getAllArticle)
  .post('/delArticle',articleControllers.delArticle)
  .post('/getArticle',articleControllers.getArticle)
  .post('/updateArticle',articleControllers.updateArticle)
module.exports = articleRouter