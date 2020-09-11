import { query } from '../sql/index.js';

class User {
    async userInfo(ctx) {
        query("select user_name, phone from user where id=1;",function(err, vals, fields){
            console.log('err ==>', err)
            console.log('vals ==>', vals)
            console.log('fields ==>', fields)
        });
        ctx.body = {
            code: 0,
            msg: 'success',
            body: {
                name: '张三',
                phone: '13800000000'
            }
        }
    }
}

export default new User();