/*
 * @Author: daiwei
 * @since: 2020-03-20 18:17:07
 * @lastTime: 2020-06-08 10:59:14
 * @LastAuthor: Do not edit
 * @FilePath: /ifiregas_web/src/utils/public/public.ts
 * @message:  工具
 */
import screenfull from "screenfull";
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import Axios from 'axios';
export const _toString = Object.prototype.toString;
const _store = window.localStorage; // 存储
export function isObject(obj) {
    if (typeof obj === 'object') {
        return true;
    }
    return false;
}
/**
 * 存储
 * @param key
 * @param value
 */
export function setStore(key, value) {
    if (isObject(value)) {
        value = JSON.stringify(value);
    }
    _store.setItem(key, value);
}
/**
 * 取出存储的值
 * @param key
 */
export function getStore(key) {
    let value = _store.getItem(key);
    return value;
}
/**
 * 删除存储的值
 * @param key
 */
export function delStore(key) {
    _store.removeItem(key);
}
/**
 * 是否为拦截请求错误
 * @param error
 */
export function isRequestCancel(error) {
    return Axios.isCancel(error);
}
/**
 * 循环请求
 * @param func
 */
export function loopRequest(func, time) {
    let _time = time ? time : 15000;
    let loopId = setInterval(func, _time);
    return loopId;
}
/**
 * 获取屏幕高度
 */
export function getFullHeihgt() {
    return document.documentElement.offsetHeight;
}
export function isFunction(fn) {
    if (typeof fn === 'function') {
        return true;
    }
    return false;
}
export function tiggerNotify(message, type, self, title) {
    self.$notify({
        title: title || '提示',
        message, type
    });
}
function isVue(self) {
    return self.$data ? true : false;
}
/**
 * 初始化
 * @param promises 异步进程
 * @param closeProgress  是否当结束异步时不关闭 进度条，默认为关闭
 */
export function initProgress(promises, closeProgress) {
    const _task = promises || [];
    return Promise.all(_task).catch(err => {
        console.log('task err:', err);
    }).then(res => {
        if (typeof closeProgress !== 'boolean' || closeProgress) {
            doneProgress();
        }
        return res;
    });
}
/**
 *
 * @param text
 * @param _vue
 */
export function showLoadingDialog(text, _vue) {
    return new Promise((success, fail) => {
        const h = _vue.$createElement;
        _vue.$msgbox({
            title: '消息',
            message: h('p', null, [
                h('i', {
                    class: {
                        'el-icon-warning': true, tc_warning: true
                    },
                    style: {
                        marginRight: '2px'
                    }
                }),
                h('span', null, text)
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done, error) => {
                if (action === 'confirm') {
                    instance.confirmButtonLoading = true;
                    instance.confirmButtonText = '执行中';
                    success(() => { instance.confirmButtonLoading = false; done(); });
                }
                else {
                    fail(instance);
                    done();
                    instance.confirmButtonLoading = false;
                }
            }
        });
    });
}
export function showDel(text, _vue) {
    return new Promise((success, fail) => {
        const h = _vue.$createElement;
        _vue.$msgbox({
            title: '消息',
            message: h('p', null, [
                h('i', {
                    class: {
                        'el-icon-warning': true, tc_warning: true
                    },
                    style: {
                        marginRight: '2px'
                    }
                }),
                h('span', null, text)
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done, error) => {
                if (action === 'confirm') {
                    instance.confirmButtonLoading = true;
                    instance.confirmButtonText = '执行中';
                    success(() => { instance.confirmButtonLoading = false; done(); });
                }
                else {
                    fail(instance);
                    done();
                    instance.confirmButtonLoading = false;
                }
            }
        });
    });
}
//校验手机号
export function regPhone(phone) {
    let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    if (reg.test(phone)) {
        return true;
    }
    return false;
}
/**
 * 验证中文
 * @param str
 */
export function isChenese(str) {
    var sucess = typeof str === "string" && str != "" || false;
    for (var i in str) {
        var j = str.substr(i, 1);
        if (!/^[\u4e00-\u9fa5]/.test(j)) {
            sucess = false;
            break;
        }
    }
    return sucess;
}
;
//校验邮箱
export function regEmail(email) {
    let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if (reg.test(email)) {
        return true;
    }
    return false;
}
//序列化
export function serialization(params) {
    let arr = [];
    Object.keys(params).forEach(key => {
        arr.push(`${key}=${params[key]}`);
    });
    return arr.join('&');
}
/**
 * 重置对象值
 * @param params
 * @param ignore 忽略的字段
 */
export function resetFields(params, ignore) {
    Object.keys(params).forEach(key => {
        let type = _toString.call(params[key]);
        if (ignore && ignore.indexOf(key) != -1) {
            return;
        }
        switch (type) {
            case '[object String]':
                params[key] = '';
                break;
            case '[object Number]':
                params[key] = 0;
                break;
            default:
                params[key] = null;
        }
    });
    return params;
}
/**
 * 将数字以三位数为一个单位，每个单位之前使用逗号进行分隔
 */
export function transformNum(num) {
    const _insertStr = function (soure, start, newStr) {
        return soure.slice(0, start) + newStr + soure.slice(start);
    };
    let space = ',';
    let tempStr = num.toString().split('').reverse().join('');
    let spanceNum = tempStr.length % 3 == 0 ? Math.floor(tempStr.length / 3) - 1 : Math.floor(tempStr.length / 3);
    Array.from({ length: spanceNum }).forEach((_, index) => {
        let _start = (index + 1) * 3 + index;
        tempStr = _insertStr(tempStr, _start, space);
    });
    return tempStr.split('').reverse().join('');
}
/**
 * 深拷贝
 * @param source 源数据
 */
export function copy(source) {
    /**
     * 类型判断
     * @param _source
     * @return   'Array' | 'Object' | 'other' //other为简单值
     */
    const _getType = (_source) => {
        let _objType; //other为简单值
        let _type = _toString.call(_source) !== null || undefined ? _toString.call(_source) : '[object Null | object Undefind]';
        switch (_type) {
            case '[object Object]':
                _objType = 'Object';
                break;
            case '[object Array]':
                _objType = 'Array';
                break;
            default:
                _objType = 'other';
        }
        return _objType;
    };
    /**
     * 循环递归赋值
     * @param _source
     */
    const _cp = (_source) => {
        let _dest;
        switch (_getType(_source)) {
            case 'Array':
                _dest = [];
                _source.forEach((item, index) => {
                    try {
                        _dest[index] = _cp(item);
                    }
                    catch (e) {
                        console.log(e);
                    }
                });
                break;
            case 'Object':
                _dest = {};
                for (const [k, v] of Object.entries(_source)) {
                    try {
                        _dest[k] = _cp(v);
                    }
                    catch (e) {
                        console.log({ k, v, e, value: _cp(v) });
                    }
                }
                break;
            default:
                _dest = _source;
        }
        return _dest;
    };
    return _cp(source);
}
/**
 * 获取时分秒
 */
export function getTime(date) {
    if (!date) {
        date = new Date();
    }
    if (typeof date === 'string') {
        date = new Date(date);
    }
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() + '';
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() + '';
    let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() + '';
    return hours + ':' + minutes + ':' + seconds;
}
export function formatTime(time, type) {
    if (!time) {
        time = new Date();
    }
    if (typeof time != 'object') {
        time = new Date(time);
    }
    let year = time.getFullYear();
    let month = time.getMonth() + 1 + '';
    month = +month < 10 ? '0' + month : month + '';
    let day = time.getDate() + '';
    day = +day < 10 ? "0" + day : day;
    let timepath = year + '-' + month + '-' + day;
    if (type) {
        switch (type) {
            case 'month':
                timepath = year + '-' + month;
                break;
            case 'year':
                timepath = year + '';
                break;
        }
    }
    return timepath;
}
export function getCurMonth() {
    return formatTime(new Date(), 'month');
}
/**
 * 获取昨天
 */
export function getYestrday() {
    const time = new Date();
    const curTime = time.getTime() - 24 * 3600 * 1000;
    time.setTime(curTime);
    return formatTime(time);
}
export function getCurrentTime() {
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1 + '';
    month = +month < 10 ? '0' + month : month + '';
    let day = time.getDate() + '';
    day = +day < 10 ? "0" + day : day;
    let h = time.getHours() + '';
    h = +h > 10 ? '0' + h : h;
    let m = time.getMinutes() + '';
    m = +m > 10 ? '0' + m : m;
    let s = time.getSeconds() + '';
    s = +s > 10 ? '0' + s : s;
    return year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;
}
/**
 * 返回上个月的日期
 * @param time  当前日期
 */
export function getUpperMonth(time) {
    if (typeof time != 'object') {
        time = new Date(time);
    }
    let year = time.getFullYear();
    let month = time.getMonth() + 1 + '';
    let day = time.getDate() + '';
    //当 1月份时候，年为上一年，月为12月
    if (month == '1') {
        month = '12';
        year = year - 1;
    }
    else {
        month = +month - 1 + '';
    }
    month = +month < 10 ? '0' + month : month + '';
    day = +day < 10 ? "0" + day : day;
    return year + '-' + month + '-' + day;
}
/**
 * 全屏
 * @param element 全屏的元素
 */
export function requestFullScreen(element) {
    /* // 如果当前外层还嵌套一层iframe，则调用上层的全屏函数
    if(inMain()){
        console.log((window.parent as any).vueApp.$fn);
       (window.parent as any).vueApp.$fn.requestFullScreen(element);
       return;
    } */
    if (screenfull.isEnabled) {
        screenfull.toggle(element);
    }
    else {
        Message.warning('当前浏览器不支持全屏');
    }
}
/**
 * 校验请求是否成功
 * @param res
 */
export function checkRequest(res) {
    if (res.success && res.code === '0000') {
        return true;
    }
    else {
        return false;
    }
}
/* ----- 顶部进度条 --- */
// 开始
export function startProgress() {
    NProgress.start();
}
// 结束
export function doneProgress() {
    NProgress.done();
}
/**
 * 将参数对象转化成FormData对象
 * @param params
 * @retuen FormData
 */
export function transformFormData(params) {
    let fromData = new FormData();
    for (const [key, value] of Object.entries(params)) {
        fromData.set(key, value);
    }
    return fromData;
}
/**
 * 设置根节点字体大小
 */
export function initRemMode() {
    setHtmlFontSize();
    window.addEventListener('resize', () => {
        setHtmlFontSize();
    });
}
/**
 * 1080的设计稿
 */
function setHtmlFontSize() {
    const deviceWidth = document.documentElement.clientWidth;
    document.getElementsByTagName('html')[0].style.cssText = 'font-size:' + deviceWidth / 19.20 + 'px !important';
}
//# sourceMappingURL=public.js.map