export default [
    {
        // 访问数据
        path: 'accessData',
        name: 'accessData',
        meta: {
            title: '访问数据'
        },
        component: () => import('@/views/dataManagement/accessData')
    },
    {
        // 用户流向
        path: 'userGo',
        name: 'userGo',
        meta: {
            title: '用户流向'
        },
        component: () => import('@/views/dataManagement/userGo')
    }
]