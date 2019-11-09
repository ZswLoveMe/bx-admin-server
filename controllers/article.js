const db = require("../models/db")
const articleModel = require("../models/articleModel")
const {SuccessModel, ErrorModel} = require("../models/resModel")
module.exports = {
  getAllArticle: async (ctx, next) => {
    let {pageSize, currentPage, categoryId, statusId, keyWord} = ctx.request.body
    pageSize = parseInt(pageSize)
    currentPage = parseInt(currentPage)
    if (categoryId === "" || categoryId === 0) {
      categoryId = null
    }
    if (statusId === "" || statusId === "allstate" || statusId === 0) {
      statusId = null
    }
    if (keyWord === "" || !keyWord) {
      keyWord = null
    }
    await articleModel.getAllArticle(pageSize, currentPage, categoryId, statusId, keyWord).then(res => {
      ctx.body = new SuccessModel(res, "查询成功")
    })

  },
  delArticle: async (ctx, next) => {
    let {id} = ctx.request.body
    await articleModel.delArticle(id).then(res => {
      if (res) {
        ctx.body = new SuccessModel(true, "删除成功")
      } else {
        ctx.body = new ErrorModel(false, "删除失败")
      }
    })
  },
  getArticle: async (ctx, next) => {
    let {id} = ctx.request.body
    // 根据Id 查询详情
    await articleModel.getArticle(id).then(res => {
      console.log("res：", res)
      ctx.body = new SuccessModel(res, "查询成功")
    })
  },
  updateArticle: async (ctx, next) => {
    let posts = ctx.request.body
    // 获取session 中的 user
    let user = ctx.session["userInfo"]
    posts.userId = user.id
    await articleModel.updateArticle(posts).then(res => {
      if (res.affectedRows > 0) {
        ctx.body = new SuccessModel(true, "编辑成功")
      } else {
        ctx.body = new SuccessModel(false, "编辑失败")
      }
    })
  },
  addArticle: async (ctx, next) => {
    let posts = ctx.request.body
    // 获取session 中的 user
    let user = ctx.session["userInfo"]
    posts.userId = user.id
    await articleModel.addArticle(posts).then(res => {
      if (res.affectedRows > 0) {
        ctx.body = new SuccessModel(true, "新建成功")
      } else {
        ctx.body = new SuccessModel(false, "新建失败")
      }
    })
  },
  getCategories: async (ctx, next) => {
    await articleModel.getCategories().then(res => {
      ctx.body = new SuccessModel(res, "查询成功")
    })
  },
  addCategories: async (ctx, next) => {
    let categories = ctx.request.body
    await articleModel.addCategories(categories).then(res => {
      if (res.affectedRows > 0) {
        ctx.body = new SuccessModel(true, "添加成功")
      }else{
        ctx.body = new SuccessModel(false, "添加失败")
      }
    })

  },
  getCategoriesById:async (ctx,next) => {
    let {id} = ctx.request.body
    console.log('id：', id)
    await articleModel.getCategoriesById(id).then(res => {
      ctx.body = new SuccessModel(res, "查询成功")
    })
  },
  updateCategories:async (ctx,next) => {
    let categories = ctx.request.body
    await articleModel.updateCategories(categories).then(res => {
      if (res.affectedRows > 0) {
        ctx.body = new SuccessModel(true, "更新成功")
      }else{
        ctx.body = new SuccessModel(false, "更新失败")
      }
    })
  }
}
