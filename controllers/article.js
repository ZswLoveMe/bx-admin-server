const db = require("../models/db")
const articleModel = require("../models/articleModel")
const {SuccessModel,ErrorModel} = require("../models/resModel")
module.exports = {
  getAllArticle: async (ctx, next) => {
    let {pageSize, currentPage, categoryId,statusId,keyWord} = ctx.request.body
    pageSize = parseInt(pageSize)
    currentPage = parseInt(currentPage)
    if (categoryId === "") {
      categoryId = null
    }
    if(statusId === '' || statusId === "allstate"){
      statusId = null
    }
    if(keyWord === '') {
      keyWord = null
    }
    await articleModel.getAllArticle(pageSize, currentPage, categoryId,statusId,keyWord).then(res => {
      ctx.body = new SuccessModel(res, "查询成功")
    })

  },
  delArticle:async (ctx,next)=>{
    let {id} = ctx.request.body

    await articleModel.delArticle(id).then(res => {
      if(res){
        ctx.body = new SuccessModel(true, "删除成功")
      }else{
        ctx.body = new ErrorModel(false, "删除失败")
      }
    })
  }
}
