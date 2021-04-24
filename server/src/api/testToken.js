/**
 * @description 测试token登录验证
 * @author eyz
 */

const router = require("koa-router")();
router.prefix("/api/user");

router.post("/test", async (ctx, next) => {
  ctx.body = {
    userName: "eyz",
  };
});

module.exports = router;
