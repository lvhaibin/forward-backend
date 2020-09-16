import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaBody from 'koa-body';
import KoaJwt from 'koa-jwt';
import { appRoutes } from './routers/index.js';
import jwt from 'jsonwebtoken';

const app = new Koa();
const router = new KoaRouter()

appRoutes.forEach(route => router[route.method](route.path, route.action));

app.use(koaBody())
    .use(KoaJwt({
        secret: 'forward_secret',
    }).unless({
        path: [/api\/v1.0\/login/]
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
                         jwt.verify(token, 'forward_secret', { complete: true }); 
                    } catch (error) {
                        ctx.body = {
                            code: 102,
                            msg: 'token 已过期！',
                            body: null
                        }
                    } 
                } 
            } 
        }
        return next().catch(err => {
            if (err.status === 102) {
                ctx.body = {
                    code: 102,
                    msg: 'token 已过期！',
                    body: null
                }
            } else {
                throw err;
            }
        });
    }).use(router.routes());
app.listen(3000);