import query from '../connection/mysql.js';
import crypto from 'crypto';
import moment from 'moment';

function md5(data) {
    // 以md5的格式创建一个哈希值
    let hash = crypto.createHash('md5');
    return hash.update(data).digest('base64');
}

class Exhibition {
    async create(ctx) {
        const { name, time, address } = ctx.request.body;
        const date = moment().format('YYYY/MM/DD')
        const result = await query(`INSERT INTO exhibition (name, time, address, inviteCode, created_at, updated_at) values ('${name}', '${time}', '${address}', '${md5(`${name} ${time} ${address}`)}', '${date}', '${date}');`);
        console.log(result.insertId);
        if (!result) {
            ctx.body = {
                code: 101,
                msg: '生成失败！',
                body: null
            }
        } else {
            const row = await query(`select inviteCode from exhibition where id=${result.insertId}`);
            ctx.body = {
                code: 0,
                msg: 'success',
                body: {
                    ...row[0]
                }
            }
        }
    }
}

export default new Exhibition();