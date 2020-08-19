export default [
    {
        // 管理员列表
        path: 'adminList',
        name: 'adminList',
        meta: {
            title: '管理员列表'
        },
        component: () => import('@/views/userManagement/adminList')
    },
    {
        // 用户列表
        path: 'userList',
        name: 'userList',
        meta: {
            title: '用户列表'
        },
        component: () => import('@/views/userManagement/userList')
    }
]