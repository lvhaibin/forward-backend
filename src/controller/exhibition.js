import query from '../connection/mysql.js';
import crypto from 'crypto';
import moment from 'moment';

function md5(data) {
    // 以md5的格式创建一个哈希值
    let hash = crypto.createHash('md5');
    return hash.update(data).digest('base64');
}

class Exhibition {
    async list(ctx) {
        const { page, pageSize } = ctx.query;
        const count = await query('select count(id) as count from exhibition;');
        const list = await query(`select * from exhibition order by id desc limit ${(page - 1) * pageSize}, ${pageSize};`);

        if (count && count[0] &&list) {
            ctx.body = {
                code: 0,
                msg: 'success',
                body: {
                    count: count[0].count,
                    list: list
                }
            }
        } else {
            ctx.body = {
                code: 101,
                msg: '数据查询失败，请稍后重试',
                body: null
            }
        }
    }

    async create(ctx) {
        const { name, time, address } = ctx.request.body;
        const date = moment().format('YYYY/MM/DD');
        const result = await query(`INSERT INTO exhibition (name, time, address, inviteCode, created_at, updated_at) values ('${name}', '${new Date().getTime()}', '${address}', '${md5(`${name} ${time} ${address}`)}', '${date}', '${date}');`);
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