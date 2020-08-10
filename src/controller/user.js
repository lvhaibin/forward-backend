class User {
    async userInfo(ctx) {
        ctx.body = {
            code: 0,
            msg: 'success',
            body: {
                name: 'lhb',
                phone: '+86 18210981719'
            }
        }
    }
}

export default new User();