/**
 * @description user API 路由
 * @author eyz
 */

const router = require("koa-router")();
const {
  isExist,
  register,
  login,
  getUserInfoByToken,
  deleteCurUser,
  changeInfo,
  changePassword,
} = require("../controller/user");
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
  const { id } = res;
  let token = jwt.sign(
    {
      id,
      userName,
    },
    SECRET,
    { expiresIn: "1h" }
  );
  ctx.body = {
    ...res,
    token: res.code === 0 ? token : "",
  };
  /*
  1 koa-jwt 如何限制路由
  2 自己写token中间件？
  3 完成登录 
   */
});

// 删除
router.post("/delete", async (ctx, next) => {
  if (isTest) {
    // 测试环境下，测试账号登录之后，删除自己
    const { userName } = ctx.session.userInfo;
    ctx.body = await deleteCurUser(userName);
  }
});

// 获取个人信息
router.post("/getUserInfo", async (ctx, next) => {
  const token = ctx.request.header.authorization.split(" ")[1];
  console.log(token)
  const res = await getUserInfoByToken(token,SECRET);
  console.log(res);
  ctx.body = { ...res };
});

// 修改个人信息
router.patch("/changeInfo", genValidator(userValidate), async (ctx, next) => {
  const { nickName, city, picture } = ctx.request.body;
  ctx.body = await changeInfo(ctx, { nickName, city, picture });
});

// 修改密码
router.patch(
  "/changePassword",
  genValidator(userValidate),
  async (ctx, next) => {
    const { password, newPassword } = ctx.request.body;
    const { userName } = ctx.session.userInfo;
    ctx.body = await changePassword(userName, password, newPassword);
  }
);
module.exports = router;
