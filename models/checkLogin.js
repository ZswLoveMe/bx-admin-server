const {ErrorModel} = require("./resModel")
module.exports = async (ctx,next) => {
  // 判断是否以/user开头
  if(ctx.url.startsWith('/user')) {
    await next(); // 直接放行
    return;
  }
  // 需要验证
  if(!ctx.session.userInfo) {
    // url重写
    ctx.body = new ErrorModel('请先登录')
    return;
  }
  await next();
}