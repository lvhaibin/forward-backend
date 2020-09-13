import query from '../connection/mysql.js';
import crypto from 'crypto'
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
        const res = await query(`select user_name, phone, password from user where user_name='${username}';`);
        if (res[0].password == md5(password)) {
            ctx.body = {
                code: 0,
                msg: 'success',
                body: null
            }
        } else {
            ctx.body = {
                code: 0,
                msg: 'faild',
                body: null
            }
        }
    }
}

export default new User();