const pandectModel = require("../models/pandect.js")
const {ErrorModel} = require("../models/resModel")
const {SuccessModel} = require("../models/resModel")
module.exports = {
  getContent:async function (ctx, next) {
    //查询所有文章
    let result = null
   await pandectModel.getContent().then(res => {
      result = res
    })

   let contentStatistics =  {
      countArticle: {
        article: result.postsnum,
          draft: result.draftednum
      },
      classifyCount: {count: result.category},
      comment: {
        commentCount: result.commentsnum,
          toAudit: result.heldnum
      }
    }
    ctx.body= new SuccessModel({contentStatistics})
    return
  }
}