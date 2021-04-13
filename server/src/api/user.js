/**
 * @description eyz
 */
const router = require('koa-router')()
router.prefix('/api/user') // 路由前缀

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

module.exports = router