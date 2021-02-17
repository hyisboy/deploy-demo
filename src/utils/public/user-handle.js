import { isObject, setStore, delStore, getStore } from './public';
/**
 * 存储用户信息： localStore => key = userInfo
 * @param userInfo 用户信息
 */
export function storeUserInfo(userInfo) {
    setStore('userInfo', JSON.stringify(userInfo));
}
/**
 * 清除用户信息
 */
export function clearUserInfo() {
    delStore('userInfo');
}
function isUserInfo(info) {
    if (info) {
        return true;
    }
    return false;
}
/**
 *  获取用户名
 */
export function getUserName() {
    let userInfo = getUserInfo();
    if (isUserInfo(userInfo)) {
        return userInfo.username;
    }
    return '';
}
// 获取token
export function getToken() {
    let userInfo = getUserInfo();
    let _token = '';
    if (userInfo != null && isObject(userInfo)) {
        _token = userInfo.token;
    }
    return _token;
}
export function getUserInfo() {
    let userInfo = getStore('userInfo');
    if (userInfo) {
        return JSON.parse(userInfo);
    }
    return null;
}
export function getUserDomain() {
    let userInfo = getUserInfo();
    let domain = '';
    if (userInfo != null && isObject(userInfo)) {
        domain = userInfo.userDomain;
    }
    return domain;
}
/**
 * 获取用户保存的账户信息
 */
export function getSaveUser() {
    let _userserize = getStore('saveUser');
    if (_userserize) {
        const user = JSON.parse(_userserize);
        return user;
    }
    return null;
}
/**
 * 保存用户登录的账户信息
 * @param user
 */
export function setSaveUser(user) {
    setStore('saveUser', JSON.stringify(user));
}
// 获取unitId
export function getUnitId() {
    const uInfo = getUserInfo();
    if (isUserInfo(uInfo)) {
        return uInfo.orgId;
    }
    return '';
}
//# sourceMappingURL=user-handle.js.map