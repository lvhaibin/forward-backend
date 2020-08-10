import User from '../controller/user.js';

export const appRoutes = [
    {
        path: '/api/v1.0/user',
        method: 'get',
        action: User.userInfo
    }
]
