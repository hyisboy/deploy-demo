/*
 * @Author: daiwei
 * @since: 2020-04-22 20:11:46
 * @lastTime: 2020-06-11 18:30:05
 * @LastAuthor: Do not edit
 * @FilePath: /ifiregas_web/src/utils/ajax/api/unit.ts
 * @message:
 */
import { REQUEST, SERVICE } from '../constant';
import { get, post } from '@/utils/ajax/axios';
import { checkRequest } from '../../public/public';
import { storeUserInfo } from '@/utils/public/user-handle';
// 需要token鉴权的前缀
const SECURITY_PRODUCT_PREFIX_URL = REQUEST.product.BASE_URL + SERVICE.Security + REQUEST.product.VERSION;
// URL 后缀
const PRODUCT_SUFFIX = {
    login : '/auths/login', //登陆
    getUserInfo : '/users/getuserinfo',// 根据token获取用户信息
}
/**
 * 登陆
 * @param username
 * @param password
 * @errorCode 2010  用户名或密码错误
 */
 function login(username, password) {
    return post(SECURITY_PRODUCT_PREFIX_URL + PRODUCT_SUFFIX.login, { username, password }).then(res => {
        const response = res;
        let auth = false; // 登陆情况
        if (checkRequest(response)) {
            auth = true;
            storeUserInfo(response.data.UserSessionInfo);
        }
        else if (res.code == '2010') {
            auth = false;
        }
        return auth;
    });
}
/**
 * 根据token 获取当前用户的登录信息
 * @可用于初始化时校验当前token是否过期
 */
 function getUserInfoByToken() {
    return UserAjax.getLoginInfo().then(res => {
        if (checkRequest(res)) {
            let roleId = res.data.UserSessionInfo.roleId;
            storeUserInfo(res.data.UserSessionInfo);
            return roleId;
        }
        else {
            return '';
        }
    });
}
export const SecurityAjax = { login, getUserInfoByToken};
