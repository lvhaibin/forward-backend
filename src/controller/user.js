import query from '../sql/index.js';

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
}

export default new User();