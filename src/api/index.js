import Vue from 'vue';
import business from './business'
import system from './system'

Vue.api = Vue.prototype.$api = {
    /*  -------------------------------------------  后台接口  -------------------------------------------*/
    // 业务相关接口文件
    ...business,
    // 系统相关接口文件
    ...system
};
