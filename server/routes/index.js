module.exports = (router) => {
  router.get("/welcome", async function (ctx, next) {
    ctx.state = {
      title: "koa2 title",
    };

    await ctx.render("welcome", { title: ctx.state });
  });
  router.get("/hello", async (ctx, next) => {
    const session = ctx.session;
    if (!session.num) {
      session.num = 0;
    }
    session.num++;
    ctx.body = { num: session.num };
  });
};
