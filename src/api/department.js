import request from '../utils/request'

//tableData
export function tableList(param) {
    return request({
        url: '/dept/list',
        method: 'get',
        params: param
    })
}
export function tableAdd(data) {
    return request({
        url: '/dept/save',
        method: 'post',
        data
    })
}
export function tableUpdate(data) {
    return request({
        url: '/dept/update',
        method: 'post',
        data
    })
}
export function tableDelete(param) {
    return request({
        url: '/dept/remove',
        method: 'get',
        params: param
    })
}
//下拉菜单列表
export function selectUserList(param) {
    return request({
        url: '/dept/selectList',
        method: 'get',
        params: param
    })
}
//名称重复验证
export function isNameRepeat(param) {
    return request({
        url: '/dept/isExist',
        method: 'get',
        params: param
    })
}
