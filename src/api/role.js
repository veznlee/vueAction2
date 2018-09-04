import request from '../utils/request'

//tableData
export function tableList(param) {
    return request({
        url: '/role/list',
        method: 'get',
        params: param
    })
}
export function tableAdd(param) {
    return request({
        url: '/role/save',
        method: 'post',
        params: param
    })
}
export function tableUpdate(param) {
    return request({
        url: '/role/update',
        method: 'post',
        params: param
    })
}
export function tableDelete(param) {
    return request({
        url: '/role/remove',
        method: 'get',
        params: param
    })
}
//权限列表
export function treeList(param) {
    return request({
        url: '/role/role_perm/permTree',
        method: 'get',
        params: param
    })
}
//权限保存
export function treeAdd(param) {
    return request({
        url: '/role/role_perm/save',
        method: 'post',
        params: param
    })
}
//名称重复验证
export function isNameRepeat(param) {
    return request({
        url: '/role/isExist',
        method: 'get',
        params: param
    })
}
