const fs = require("fs")
const path = require("path")
const {SuccessModel} = require("../models/resModel")

module.exports = {
  uploadImage: async (ctx, next) => {
    console.log("ctx：", ctx.request.files)
    // 上传单个文件
    const file = ctx.request.files.file // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path)
    let extname = path.extname(file.name)
    // 时间戳
    let timestamps = Math.round(new Date().getTime() / 1000).toString()
    let fileName = new Date().getDate() + timestamps + extname
    let filePath = path.join(__dirname, "../public/uploads/") + fileName
    // 创建可写流
    const upStream = fs.createWriteStream(filePath)
    // 可读流通过管道写入可写流
    reader.pipe(upStream)
    let result = {}
    result.key = "/public/uploads/" + fileName
    return ctx.body = new SuccessModel(result, "上传成功")
  }
}