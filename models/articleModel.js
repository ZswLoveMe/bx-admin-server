const db = require("./db.js")
module.exports = {
  getAllArticle: async (pageSize = 10, currentPage = 0, categoryId, statusId, keyWord) => {
    let result = {}
    let sql = `select a.id, a.title ,a.created,b.nickname as username,a.status ,a.category_id as category  from posts a JOIN users b ON user_id = b.id where 1 = 1 `
    let sql1 = `select count(*) as total from posts as a  where 1 = 1`
    if (categoryId || categoryId !== 0) {
      let category = ` and category_id = ${categoryId}`
      sql += category
      sql1 += category
    }
    if (statusId) {
      let status = ` and a.status = '${statusId}'`
      sql += status
      sql1 += status
    }
    if (keyWord) {
      let keyword = ` and a.title like '%${keyWord}%'`
      sql += keyword
      sql1 += keyword
    }
    sql += ` limit  ${(currentPage - 1) * pageSize},${pageSize}`
    console.log("sql：", sql)
    console.log("sql：", sql1)
    result.postsList = await db.row(sql)
    result.total = await db.single(sql1)
    console.log("result：", result)
    return result
  },
  /*
  * 根据id 删除文章
  * */
  delArticle:async (id)=>{
    let result= await db.row(`DELETE FROM posts where id = ${id}`)
    return result.affectedRows > 0;
    
  }
}