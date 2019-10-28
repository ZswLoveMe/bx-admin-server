let mysql = require("mysql")
const {dbConfig} = require("../config")
let pool = mysql.createPool(dbConfig)
let db = {}

db.row = function (sql, params) {
  return new Promise((resolve, reject) => {
    // 取出链接
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
        return
      }
      connection.query(sql, params, function (error, results, fields) {
        // 释放连接
        connection.release()
        if (error) {
          reject(err)
          return
        }
        let result = JSON.parse(JSON.stringify(results))
        resolve(result)
      })
    })
  })
}
db.first = (sql, ...params) => {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
        return
      }
      connection.query(sql, params, function (error, res) {
        connection.release()
        if (error) {
          reject(error)
          return
        }
        resolve(res[0] || null)
      })
    })
  })
}

//返回单个查询结果

db.single = (sql, ...params) => {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
        return
      }
      connection.query(sql, params, function (error, res) {
        connection.release()
        if (error) {
          reject(error)
          return
        }
        for (let i in res[0]) {
          resolve(res[0][i] || null)
          return
        }
        resolve(null)
      })
    })
  })
}
//执行代码，返回执行结果
db.execute = (sql, ...params) => {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
        return
      }
      connection.query(sql, params, function (error, res) {
        connection.release()
        if (error) {
          reject(error)
          return
        }
        resolve(res)
      })
    })
  })
}


// 导出对象
module.exports = db