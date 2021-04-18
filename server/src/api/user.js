/**
 * @description user API 路由
 * @author eyz
 */

const router = require("koa-router")();
const { isExist, login, register } = require("../controller/user");

router.prefix("/api/user");

// 用户名是否存在
router.post("/isExist", async (ctx, next) => {
  const { userName } = ctx.request.body;
  ctx.body = await isExist(userName);
});

// 注册
router.post("/register", genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body;
  ctx.body = await register({
    userName,
    password,
    gender,
  });
});

// 登录
router.post("/login", async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  ctx.body = await login(ctx, userName, password);
});
module.exports = router;
