import { Context } from 'koa';

const router1 = require('koa-router')();

router1.get('/', async (ctx: Context, next: any) => {
  await ctx.render('index', {
    title: 'Koa-Mock!'
  });
});

module.exports = router1;
