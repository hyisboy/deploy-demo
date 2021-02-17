/*
 * @Author: daiwei
 * @since: 2020-06-05 18:28:01
 * @lastTime: 2020-06-08 12:42:12
 * @LastAuthor: Do not edit
 * @FilePath: /ifiregas_web/src/utils/public/system.ts
 * @message:
 */
import {setStore,getStore} from './public';
/**
 * 是否为主系统跳转过来的
 */
const MAIN_SYSTEM = {
    DOMAIN: 'xiaoanyun.cn'
};
export function inMain() {
    return getStore('inMain');
}
/**
 * 调用主系统的跳转
 * @param path  '/login'  | '/index'  ,前往登录页面还是返回主页， 
 * @param params 如果返回主页则不需要 @params 参数,
 */
export function goMain(path, params) {
    window.parent.vueApp.$router.replace({ path: path, query: params });
}
//设置成一级域名
export function setDomain() {
    try {
        document.domain = MAIN_SYSTEM.DOMAIN;
    }
    catch (e) {
        console.warn('必须切换到线上系统！', e);
    }
}