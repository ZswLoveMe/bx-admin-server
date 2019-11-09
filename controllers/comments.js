const commentsModel = require("../models/commentsModel")
const {SuccessModel, ErrorModel} = require("../models/resModel")
module.exports = {
  getAllComments:async (ctx,next) => {
    let {pageSize, currentPage} = ctx.request.body

    await commentsModel.getAllComments(pageSize, currentPage).then(res =>{
      ctx.body = new SuccessModel(res,'查询成功')
    })
  },
  delCommentsById:async (ctx,next) =>{
    let { id }  = ctx.request.body
    await commentsModel.delCommentsById(id).then(res =>{
      if(res.affectedRows > 0 ){
        ctx.body = new SuccessModel(true,'删除成功')
      }else{
        ctx.body = new SuccessModel(true,'删除失败')
      }
    })
  }
}