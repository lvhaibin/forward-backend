import query from '../connection/mysql.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

function md5(data) {
    // 以md5的格式创建一个哈希值
    let hash = crypto.createHash('md5');
    return hash.update(data).digest('base64');
}

class User {
    async userInfo(ctx) {
        const name = ctx.query.name;
        if (name) {
            const res = await query(`select user_name, phone from user where user_name='${ctx.query.name}';`);
            ctx.body = {
                code: 0,
                msg: 'success',
                body: {
                    name: res[0].user_name,
                    phone: res[0].phone
                }
            }
        } else {
            ctx.body = {
                code: 101,
                msg: '未查到相关信息！',
                body: null
            }
        }
    }

    async login(ctx) {
        const { username, password } = ctx.request.body;
        const res = await query(`select id, user_name, phone, password, email from user where user_name='${username}' or phone='${username}';`);
        if (!res || !res[0]) {
            ctx.body = {
                code: 101,
                msg: '用户不存在！',
                body: null
            }
        } else if (res[0].password != md5(password)) {
            ctx.body = {
                code: 101,
                msg: '密码错误',
                body: null
            }
        } else if (res[0].password === md5(password)) {
            const payload = { userName: res[0].user_name, id: res[0].id, email: res[0].email };
            const token = jwt.sign(payload, 'forward_secret', { expiresIn: '12h' });
            ctx.body = {
                code: 0,
                msg: 'success',
                body: {
                    uame: res[0].user_name,
                    uid: res[0].id,
                    email: res[0].email,
                    token
                }
            }
        }
    }

    async register(ctx) {
        const { username, password, phone, email, profile } = ctx.request.body;
        const res = await query(`select id, user_name, phone, password, email from user where user_name='${username}' or phone='${phone}';`);
        if (res && res[0]) {
            ctx.body = {
                code: 101,
                msg: '用户已存在！',
                body: null
            }
        } else {
            let curProfile = profile;
            if (!profile) {
                curProfile = 'demand';
            }
            const result = await query(`INSERT INTO user (user_name, password, phone, email, profile) values ('${username}', '${md5(password)}', '${phone}', '${email}', '${curProfile}');`);
            if (!result) {
                ctx.body = {
                    code: 101,
                    msg: '注册失败！',
                    body: null
                }
            } else {
                ctx.body = {
                    code: 0,
                    msg: 'success',
                    body: {
                        ...result[0]
                    }
                }
            }
        }
    }
}

export default new User();