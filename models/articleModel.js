const db = require("./db.js")
module.exports = {
  // 根据条件 按需查询文章
  getAllArticle: async (pageSize = 10, currentPage = 0, categoryId, statusId, keyWord) => {
    let result = {}
    let sql = `select a.id, a.title ,a.created,b.nickname as username,a.status ,a.category_id as category  from posts a JOIN users b ON user_id = b.id where 1 = 1 `
    let sql1 = `select count(*) as total from posts as a  where 1 = 1`
    if (categoryId) {
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
  delArticle: async (id) => {
    let result = await db.row(`DELETE FROM posts where id = ${id}`)
    return result.affectedRows > 0

  },
  /*根据Id 查询 对应的文章*/
  getArticle: async (id) => {
    let sql = `select content,title,status,slug,category_id,feature,created from posts where id = ${id} `
    let result = {}
    await db.first(sql).then(res => {
      result.content = res.content
      result.title = res.title
      result.status = res.status
      result.slug = res.slug
      result.categoryId = res.category_id
      result.feature = res.feature
      result.created = res.created
    })
    return result
  },
  /*
  * 编辑文章
  * */
  updateArticle: async (posts) => {
    let sql = `UPDATE posts SET `
    if (posts.title) {
      sql += ` title = '${posts.title}' , `
    }
    if (posts.userId) {
      sql += `user_id = '${posts.userId}' , `
    }
    if (posts.content) {
      sql += `content = '${posts.content}' , `
    }
    if (posts.status) {
      sql += `status = '${posts.status}' , `
    }
    if (posts.categoryId) {
      sql += `category_id = '${posts.categoryId} ', `
    }
    if (posts.feature) {
      sql += `feature = '${posts.feature}' , `
    }
    if (posts.slug) {
      sql += `slug = '${posts.slug}' , `
    }
    if (posts.created) {
      let d = new Date(posts.created)
      // 把前端传过来的值 转换成后端需要的值
      let date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
      sql += `created = '${date}' `
    }
    if (posts.id) {
      sql += ` where id = '${posts.id}' `
    }
    let result = {}
    await db.row(sql).then(res => {
      result.affectedRows = res.affectedRows
    })
    return result
  },
  // 添加文章
  addArticle: async (posts) => {
    let sql = "INSERT INTO  posts ( `slug`, `title`, `feature`, `created`, `content`, `status`, `user_id`, `category_id`) VALUES ("
    if (posts.slug) {
      sql += `'${posts.slug}',`
    }
    if (posts.title) {
      sql += `'${posts.title}' , `
    }
    if (posts.feature) {
      sql += `'${posts.feature}', `
    }
    if (posts.created) {
      let d = new Date(posts.created)
      // 把前端传过来的值 转换成后端需要的值
      let date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
      sql += ` '${date}', `
    }
    if (posts.content) {
      sql += ` '${posts.content}' , `
    }

    if (posts.status) {
      sql += `'${posts.status}' , `
    }

    if (posts.userId) {
      sql += `'${posts.userId}' , `
    }
    if (posts.categoryId) {
      sql += `'${posts.categoryId} ') `
    }
    console.log('sql：', sql)
    let result = {}
    await db.row(sql).then(res => {
      result.affectedRows = res.affectedRows
    })
    return result
  },
  /* 查询所有分类*/
  getCategories:async ()=>{
    let  sql = "select * from categories"
    let result = []
    await db.row(sql).then(res =>{
      result = res
    })
    return result
  },
  addCategories:async (categories)=>{
    let sql ='insert into categories (`slug`, `name`) values '
    if (categories.slug){
      sql += `( '${categories.slug} ',`
    }
    if (categories.name){
      sql += ` '${categories.name} ' )`
    }
    let result = {}
    console.log('sql：', sql)
    await db.row(sql).then(res => {
      result.affectedRows = res.affectedRows
    })
    return result
  },
  getCategoriesById:async (id) => {
    let  sql = `select * from categories where id = ${id}`
    let result = {}
    await db.first(sql).then(res =>{
      result = res
    })
    return result
  },
  updateCategories:async (categories) =>{
    let sql = 'UPDATE categories SET '
    if(categories.slug){
      sql += `slug = '${categories.slug}' , `
    }
    if(categories.name){
      sql += `name = '${categories.name}'  `
    }
    sql += `where id = ${categories.id}`
    console.log('sql：', sql)
    let result = {}
    await db.row(sql).then(res => {
      result.affectedRows = res.affectedRows
    })
    return result
  }
}