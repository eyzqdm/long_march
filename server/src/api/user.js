/**
 * @description user API 路由
 * @author eyz
 */

const router = require("koa-router")();
const { isExist, login, register } = require("../controller/user");
const { genValidator } = require("../middlewares/validator");
const userValidate = require("../validator/user");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../conf/constant");
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
  const res = await login(ctx, userName, password);
  console.log("res");
  console.log(res);
  const { id } = res;
  let token = jwt.sign(
    {
      id,
      userName,
    },
    "token",
    { expiresIn: "1h" }
  );
  ctx.body = {
    ...res,
    token,
  };
  /*
  1 koa-jwt 如何限制路由
  2 自己写token中间件？
  3 完成登录 
   */
});
module.exports = router;
