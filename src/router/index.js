import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import menuPage from '@/views/menuPage'
import option from './routers/option'
import accountManagement from './routers/accountManagement'
import dataManagement from './routers/dataManagement'


// 解决导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: '首页'
      },
      component: home
    },
    {
      path: '/menuPage',
      name: 'menuPage ',
      children: [
        // 产品管理菜单路由配置
        ...option,
        // 用户管理菜单路由配置
        ...accountManagement,
        // 数据管理菜单路由配置
        ...dataManagement
      ],
      component: menuPage
    }
  ]
});
export default router;
