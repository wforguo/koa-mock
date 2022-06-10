import { Context } from 'koa';

const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onError = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const log4j = require('./libs/log4j');

const index = require('./routes/index');
const mock = require('./routes/mock');

// error handler
onError(app);

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'pug'
}));

// logger
app.use(async (ctx: Context, next: any) => {
  if (ctx.request.method === 'GET') {
    log4j.info(`params - ${ctx.method} - ${ JSON.stringify(ctx.query) }`); // 监听get请求
  }
  if (ctx.request.method === 'POST') {
    log4j.info(`body   - ${ctx.method} - ${ JSON.stringify(ctx.body) }`); // 监听post请求
  }
  /**
   * 设置跨域
   */
   ctx.set('Access-Control-Allow-Origin', ctx.headers.origin);
   ctx.set('Access-Control-Allow-Headers', 'X-Auth-Token, Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
   ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
   // 允许跨域携带cookie
   ctx.set('Access-Control-Allow-Credentials', 'true');
   if (ctx.method === 'OPTIONS') {
      ctx.body = 200;
   }
   await next();
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(mock.routes(), mock.allowedMethods());

// error-handling
app.on('error', (err: any, ctx: Context) => {
  console.error('server error', err, ctx);
});

module.exports = app;
