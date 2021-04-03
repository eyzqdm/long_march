const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();
const session = require("koa-generic-session");
const redisStore = require("koa-redis");
const views = require("koa-views");
const co = require("co");
const convert = require("koa-convert");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const debug = require("debug")("koa2:server");
const path = require("path");
const { REDIS_CONF } = require('./conf/db') // redis 端口配置
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')
const config = require("./config");
const routes = require("./routes");

const port = process.env.PORT || config.port;

// error handler
onerror(app);

// middlewares
app
  .use(bodyparser())
  .use(json())
  .use(logger())
  .use(require("koa-static")(__dirname + "/public"))
  .use(
    views(path.join(__dirname, "/views"), {
      options: { settings: { views: path.join(__dirname, "views") } },
      map: { ejs: "ejs" },
      extension: "ejs",
    })
  )
  .use(router.routes())
  .use(router.allowedMethods());

// session 配置
app.keys = [SESSION_SECRET_KEY];
app.use(
  session({
    key: "weibo.sid", // cookie name 默认是 `koa.sid` 用户传过来的
    prefix: "weibo:sess:", // redis key 的前缀，默认是 `koa:sess:`
    cookie: {
      path: "/", // 在任何目录下都能访问到cookie
      httpOnly: true, // 只能在服务端修改 客户端无法修改
      maxAge: 24 * 60 * 60 * 1000, // 单位 ms
    },
    // 把session的数据存到redis中
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
    }),
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - $ms`);
});

router.get("/", async (ctx, next) => {
  // ctx.body = 'Hello World'
  ctx.state = {
    title: "Koa2",
  };
  await ctx.render("index", ctx.state);
});

router.get("/hello", async (ctx, next) => {
  ctx.body = "Hello World";
});

routes(router);
app.on("error", function (err, ctx) {
  console.log(err);
  logger.error("server error", err, ctx);
});

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`);
});
