const uploadRouter = require('koa-router')
const koaBody = require('koa-body');

const articleRouter =  new uploadRouter();
const articleControllers = require('../controllers/upload')
articleRouter.prefix('/upload')

articleRouter.post('/uploadImage',koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}),articleControllers.uploadImage)

module.exports = articleRouter