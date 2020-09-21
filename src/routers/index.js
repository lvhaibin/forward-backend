import User from '../controller/user.js';
import Exhibition from '../controller/exhibition.js';

export const appRoutes = [
    {
        path: '/api/v1.0/user',
        method: 'get',
        action: User.userInfo
    },
    {
        path: '/api/v1.0/login',
        method: 'post',
        action: User.login
    },
    {
        path: '/api/v1.0/register',
        method: 'post',
        action: User.register
    },


    {
        path: '/api/v1.0/exhibition/create',
        method: 'post',
        action: Exhibition.create
    },
    {
        path: '/api/v1.0/exhibition/list',
        method: 'get',
        action: Exhibition.list
    },
]
