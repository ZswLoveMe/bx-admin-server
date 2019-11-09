const Route = require('koa-router')
const commentsRoute =  new Route()
const commentsControllers = require('../controllers/comments')

commentsRoute.prefix('/comments')
commentsRoute.post('/getAllComments',commentsControllers.getAllComments)
  .post('/delCommentsById',commentsControllers.delCommentsById)

module.exports = commentsRoute