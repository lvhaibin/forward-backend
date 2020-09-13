import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaBody from 'koa-body';
import KoaJwt from 'koa-jwt';
import { appRoutes } from './routers/index.js';

const app = new Koa();
const router = new KoaRouter()

appRoutes.forEach(route => router[route.method](route.path, route.action));

app.use(koaBody()).use(router.routes())
    .use(KoaJwt({
        secret: 'forward_secret',
    }));
app.listen(3000);