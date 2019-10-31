const db = require('./db.js');
module.exports = {
  getContent:async () => {
    let result ={}
    //查询所有文章
    result.postsnum = await db.single("select count(1) as postsnum from posts")
    //查询所有草稿
    result.draftednum = await db.single("select count(1) as draftednum from posts where `status` = 'drafted'")
    //查询所有分类
    result.category = await db.single("select count(1) as category from categories")
    //查询所有评论
    result.commentsnum = await db.single("select count(1) as commentsnum from comments")
    //查询所有待审核评论
    result.heldnum = await db.single("select count(1) as heldnum from comments where `status` = 'held'")
    return result
  },


}