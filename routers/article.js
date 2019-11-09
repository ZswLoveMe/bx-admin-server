const Route = require('koa-router')
const articleRouter =  new Route();
const articleControllers = require('../controllers/article')

articleRouter.prefix('/article')

articleRouter.post('/getAllArticle',articleControllers.getAllArticle)
  .post('/delArticle',articleControllers.delArticle)
  .post('/getArticle',articleControllers.getArticle)
  .post('/updateArticle',articleControllers.updateArticle)
  .post('/addArticle',articleControllers.addArticle)
  .post('/getCategories',articleControllers.getCategories)
  .post('/getCategoriesById',articleControllers.getCategoriesById)
  .post('/addCategories',articleControllers.addCategories)
  .post('/updateCategories',articleControllers.updateCategories)

module.exports = articleRouter