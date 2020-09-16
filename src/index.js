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
    }).unless({
        path: [/^api\/v1.0\/login/]
    })).use((ctx, next) => {
        if (ctx.header && ctx.header.authorization) {
            const parts = ctx.header.authorization.split(' ');
            if (parts.length === 2) {
                 //取出token
                const scheme = parts[0];
                const token = parts[1];
                if (/^Bearer$/i.test(scheme)) {
                     try {
                        //jwt.verify方法验证token是否有效
                        jwt.verify(token, secret.sign, { complete: true }); 
                    } catch (error) {
                        ctx.status = 102;
                        ctx.body = 'token 已过期！'; 
                    } 
                } 
            } 
        }
        return next().catch(err => {
            if (err.status === 102) {
                ctx.status = 102;
                ctx.body = 'token 已过期！'; 
            } else {
                throw err;
            }
        });
    });
app.listen(3000);