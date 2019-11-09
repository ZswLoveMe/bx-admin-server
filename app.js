const Koa = require("koa");
const {appPort,viewsRoot,staticRoot} = require('./config.js');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const JwtUtil = require('./utils/jwt');
// 引入中间件
const usersRouter = require('./routers/users')
const pandectRouter = require('./routers/pandect')
const articleRouter = require('./routers/article')
const uploadeRouter = require('./routers/upload')
const commentsRouter = require('./routers/comments')

const checkLogin = require('./models/checkLogin')
// 创建服务器

let app = new Koa()

//开启服务器
app.listen(appPort, () => {
  console.log("run....");
});


//为静态资源重写url
app.use(async (ctx, next) => {
  if (ctx.request.url.startsWith("/public")) {
    ctx.request.url = ctx.request.url.replace('/public', '');
  }
  await next();
});

//处理静态资源
app.use(require('koa-static')(staticRoot));




let store = {
  storage: {},
  get (key) {  // key就是 cookie中的session_id
    return this.storage[key]
  },
  set (key, session) {
    this.storage[key] = session
  },
  destroy (key) {
    delete this.storage[key]
  },
  maxAge:84000
};

app.keys = ['zsw']; //基于zsw字符串进行签名运算 保证数据不被串改
app.use(session({store:store},app));
// 判断某些页面url的时候是否有session上的url(登陆)
// app.use(checkLogin);


//处理请求体数据

app.use(bodyParser());

app.use(usersRouter.routes());
app.use(usersRouter.allowedMethods());

app.use(articleRouter.routes());
app.use(articleRouter.allowedMethods());

app.use(pandectRouter.routes());
app.use(pandectRouter.allowedMethods());

app.use(uploadeRouter.routes())
app.use(uploadeRouter.allowedMethods())

app.use(commentsRouter.routes())
app.use(commentsRouter.allowedMethods())