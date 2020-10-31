import query from '../connection/mysql.js';
import moment from 'moment';

class Supplier {
    async list(ctx) {
        const { page, pageSize } = ctx.query;
        const count = await query('select count(id) as count from supplier;');
        const list = await query(`select * from supplier order by id desc limit ${(page - 1) * pageSize}, ${pageSize};`);

        if (count && count[0] && list) {
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
        const { user_id, inviteCode, name, address, web, owner } = ctx.request.body;
        const date = moment().format('YYYY/MM/DD')
        const result = await query(`INSERT INTO supplier (user_id, inviteCode, name, address, web, owner, created_at, updated_at) values ('${user_id}', '${inviteCode}', '${name}', '${address}', '${web}', '${owner}', '${date}', '${date}');`);
        if (!result) {
            ctx.body = {
                code: 101,
                msg: '生成失败！',
                body: null
            }
        }
    }
}

export default new Supplier();