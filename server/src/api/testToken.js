/**
 * @description 测试token登录验证
 * @author eyz
 */

 const router = require("koa-router")();
 const { isExist, login, register } = require("../controller/user");
 const jwt = require("jsonwebtoken");
 const { SECRET } = require("../conf/constant");
 router.prefix("/api/user");
 
 // 用户名是否存在
 router.post("/isExist", async (ctx, next) => {
   const { userName } = ctx.request.body;
   ctx.body = await isExist(userName);
 });
 
 // 注册
 router.post(
   "/test",
  async (ctx, next) => {
     const { userName, password, gender } = ctx.request.body;
     ctx.body = await register({
       userName,
       password,
       gender,
     });
   }
 );
 
 module.exports = router;
 