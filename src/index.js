import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaBodyparser from 'koa-bodyparser';
import { appRoutes } from './routers/index.js';

const app = new Koa();
const router = new KoaRouter()

appRoutes.forEach(route => router[route.method](route.path, route.action))
app.use(router.routes())
    .use(koaBodyparser());
app.listen(3000);