import request from '../utils/request'

//tableData
export function tableList(param) {
    return request({
        url: '/zhccstore/list',
        method: 'get',
        params: param
    })
}
export function tableAdd(param) {
    return request({
        url: '/zhccstore/add',
        method: 'post',
        params: JSON.stringify(param)
    })
}
export function tableUpdate(param) {
    return request({
        url: '/zhccstore/update',
        method: 'post',
        params: JSON.stringify(param)
    })
}
export function tableDelete(param) {
    return request({
        url: '/zhccstore/delete',
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
//仓库类型
export function storeList(param) {
    return request({
        url: '/zhccstore/selectById',
        method: 'get',
        params: param
    })
}
//省市区获取
export function addressList(param) {
    return request({
        url: '/sysparameters/choseArea',
        method: 'get',
        params: param
    })
}
