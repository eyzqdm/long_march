/**
 * @description utils api 路由
 * @author eyz
 */

 const router = require('koa-router')()
 const koaFrom = require('formidable-upload-koa')
 const { saveFile } = require('../controller/utils')
 
 // router.prefix('/api/utils')
 
 // 上传图片
 router.post('/upload',koaFrom(), async (ctx, next) => {
     // 前端约定的文件字段名
     const file = ctx.req.files['file']
     if (!file) {
         return
     }
     const { size, path, name, type } = file
     ctx.body = await saveFile({
         name,
         type,
         size,
         filePath: path
     })
 })
 
 module.exports = router
 