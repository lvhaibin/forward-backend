class User {
    async userInfo(ctx) {
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