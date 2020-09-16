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
        const res = await query("select user_name, phone from user where id=1;");
        ctx.body = {
            code: 0,
            msg: 'success',
            body: {
                name: res[0].user_name,
                phone: res[0].phone
            }
        }
    }

    async login(ctx) {
        const { username, password } = ctx.request.body;
        const res = await query(`select id, user_name, phone, password, email from user where user_name='${username}';`);
        if (!res) {
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
                    token
                }
            }
        }
    }
}

export default new User();