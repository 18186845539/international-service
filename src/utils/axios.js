import Vue from 'vue';
import axios from 'axios';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const instance = axios.create({
    baseURL: '/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
});
// 拦截请求头
instance.interceptors.request.use(
    config => {
        config.headers['X-Access-Token'] = Vue.prototype.$accessToken || '';
        return config;
    },
    error => {
        return Promise.reject(error.response);
    }
);
// 拦截响应头
instance.interceptors.response.use(
    response => {
        if (response.data.code === '0') {
            return response;
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        return Promise.reject(error.response);
    }
);
// 请求回调处理函数
const sucFun = res => {
    NProgress.done();
    return res.data;
};
const errFun = err => {
    NProgress.done();
    // Vue.prototype.$message({
    //     type: 'error',
    //     message: err.data.message || err.statusText || '数据异常'
    // });
    return err.data;
};
// 普通POST请求
const Posting = (url = '', data = {}) => {
    NProgress.start();
    return instance.post(url, data).then(sucFun).catch(errFun);
};
// 普通Get请求
const Geting = (url = '', data = {}) => {
    NProgress.start();
    let reqData = {
        params: data
    };
    return instance.get(url, reqData).then(sucFun).catch(errFun);
};
// 文件流请求
const GetingBlob = (url = '', data = {}) => {
    let str = url + '?';
    for (const key in data) {
        if (data[key] || data[key] === 0) {
            str += key + '=' + data[key] + '&';
        } else {
            str += key + '=&';
        }
    }
    NProgress.start();
    let config = {
        method: 'get',
        url: str,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    return axios(config).then(sucFun).catch(errFun);
};
// 文件流请求
const PostingBlob = (url = '', data = {}) => {
    NProgress.start();
    let config = {
        method: 'post',
        url,
        data,
        headers: {
            'Content-Type': 'multipart/form-data;'
        }
    };
    return axios(config).then(sucFun).catch(errFun);
};
//  默认请求
Vue.prototype.$axios = axios;
Vue.axios = axios;
// 普通POST请求
Vue.prototype.$Posting = Posting;
Vue.Posting = Posting;
// 普通Get请求
Vue.prototype.$Geting = Geting;
Vue.Geting = Geting;
// post文件流请求
Vue.prototype.$PostingBlob = PostingBlob;
Vue.PostingBlob = PostingBlob;
// get文件流请求
Vue.prototype.$GetingBlob = GetingBlob;
Vue.GetingBlob = GetingBlob;
