const db = require("../models/db")
module.exports = {
  getAllComments: async (pageSize = 10, currentPage = 0) => {
    let sql = "select  * from comments where 1 = 1 "
    let sql1 = `select count(*) as total from comments as a  where 1 = 1`
    sql += ` limit  ${(currentPage - 1) * pageSize},${pageSize}`
    let result = {}
    await db.row(sql).then(res => {
      result.data = res
    })
    await db.first(sql1).then(res => {
      console.log("res：", res)
      result.total = res.total
    })
    return result
  },
  delCommentsById: async (id) => {
    let sql = `delete from comments where 1= 1 and id = ${id} `
    console.log("sql：", sql)
    let result = {}
    await db.row(sql).then(res => {
      result.affectedRows = res.affectedRows
    })
  }
}
