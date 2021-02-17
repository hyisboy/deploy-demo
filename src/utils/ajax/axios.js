/*
 * @Author: daiwei
 * @since: 2020-03-23 09:08:10
 * @lastTime: 2020-06-08 12:55:38
 * @LastAuthor: Do not edit
 * @FilePath: /ifiregas_web/src/utils/ajax/axios.ts
 * @message:
 */
import axios from 'axios';
const qs = require('qs');
//import { BASE_URL } from './constant';
import store from '@/store/index';
import { Message } from 'element-ui';
import { getToken } from '../public/user-handle';
import { REQUEST } from './constant';
const axiosInstance = axios.create();
axiosInstance.defaults.timeout = 60000;
//axiosInstance.defaults.baseURL = BASE_URL; // 设置 请求接口前缀
let msgInstances = []; //存放弹窗id
const CancelToken = axios.CancelToken;
const _cancelObj = {};
export const source = CancelToken.source();
// 取消当前所有请求
export function cancelRequest() {
    Object.keys(_cancelObj).forEach(key => {
        _cancelObj[key].forEach(_cancelFn => {
            _cancelFn();
        });
    });
}
//重置请求拦截容器
export function resetCancelFns() {
    Object.keys(_cancelObj).forEach(key => {
        delete _cancelObj[key];
    });
}
/**
 * 将请求进行存储
 * @param url
 * @param cancel
 */
export function joinCancel(url, cancel) {
    // 配置忽略cancelToken 列表
    const ignore = ['/dash/gridstat', '/orgs/tree'];
    let isIgnore = false;
    ignore.forEach(_item => {
        if (url.indexOf(_item) > -1) {
            isIgnore = true;
        }
    });
    //对特定的请求进行忽略
    if (isIgnore) {
        return;
    }
    if (!_cancelObj[url]) {
        _cancelObj[url] = [cancel];
    }
    else {
        _cancelObj[url].push(cancel);
    }
}
/**
 * 取消相同的请求
 * @param url
 */
export function cancelSameRequest(url) {
    let _funs = _cancelObj[url];
    if (_funs && Array.isArray(_funs)) {
        _funs.forEach(_cancelFn => {
            _cancelFn();
        });
    }
}
// 请求拦截器
axiosInstance.interceptors.request.use(config => {
    let token = getToken(); //　获取token
    //let token=''; //　获取token
    //测试服务器不需要传token
    if (config.url && config.url.indexOf(REQUEST.test.BASE_URL) > -1) {
        token = '';
    }
    if (token) {
        config.headers.Authorization = 'Basic:' + token;
    }
    //是否需要 清除之前的请求
    if (config.params && config.params.notCancelToken) {
        delete config.params.notCancelToken;
    }
    else {
        cancelSameRequest(config.url);
        config.cancelToken = new CancelToken((cancel => {
            joinCancel(config.url, cancel);
        }));
    }
    // post方法对数据进行处理
    if (config.method == 'post') {
        if (Object.prototype.toString.call(config.data) !== '[object FormData]') { // FormData对象不进行处理
            config.data = qs.stringify(config.data); //post 下对数据进行处理
        }
    }
    return config;
}, error => {
    return Promise.reject(error);
});
// 响应拦截器
axiosInstance.interceptors.response.use(response => {
    if (response.status === 200) {
        return Promise.resolve(response);
    }
    else {
        return Promise.reject(response);
    }
}, 
// 服务器状态码不是200的情况
error => {
    if (typeof error.response == 'object' && error.response.status) {
        switch (error.response.status) {
            case 401:
                if (error.config.url.indexOf('/users/logininfo') > -1) {
                    // 如果是初始化验证token是否失效，则将直接跳转登录页面
                }
                else { // token验证失败, 显示弹框, 进行登录
                    store.commit('setTokenAuth', false);
                }
                break;
            case 404:
                break;
            default:
        }
        return Promise.reject(error.response);
    }
    else {
        closeOldMsg();
        if (axios.isCancel(error)) {
            return;
        }
        let instance = Message({
            type: 'warning', message: '请求超时，请重试'
        });
        msgInstances.push(instance);
    }
});
function closeOldMsg() {
    msgInstances.forEach(_f => {
        _f.close();
    });
}
/**
 * get请求
 * @param {string} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const get = function (url, params) {
    return new Promise((resolve, reject) => {
        axiosInstance.get(url, {
            params: params,
        })
            .then(res => {
            if (res) {
                resolve(res.data);
            }
        })
            .catch(err => {
            reject(err);
        });
    });
};
/**
 * post方法，对应post请求
 * @param {string} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {string} config
 */
export const post = function (url, params, config) {
    console.log('add...');
    return new Promise((resolve, reject) => {
        axiosInstance.post(url, params, config)
            .then(res => {
            resolve(res.data);
        })
            .catch(err => {
            reject(err);
        });
    });
};
/**
 * put方法，对应 sput请求
 * @param {string} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const put = function (url, params) {
    return new Promise((resolve, reject) => {
        axiosInstance.put(url, params)
            .then(res => {
            resolve(res.data);
        })
            .catch(err => {
            reject(err);
        });
    });
};
/**
 * delete方法，对应 sput请求
 * @param {String} url [请求的url地址]
 * @param {any} params [请求时携带的参数]
 */
export const del = function (url, params) {
    return new Promise((resolve, reject) => {
        axiosInstance.delete(url, params)
            .then(res => {
            resolve(res.data);
        })
            .catch(err => {
            reject(err);
        });
    });
};
export const request = { get, del, put, post };