import request from '../utils/request'

//menu sideBar
export function menuList(param) {
    return request({
        url: '/user/userPermission',
        method: 'get',
        params: param
    })
}

//admin login
export function loginIn(param) {
    return request({
        url: '/sysLogin/login',
        method: 'post',
        params: param
    })
}
export function loginOut(param) {
    return request({
        url: '/sysLogin/outLogin',
        method: 'get',
        params: param
    })
}
