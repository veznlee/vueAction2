import request from '../utils/request'

//流程

//设置流程基本信息(新增或修改)
export function saveAndUpdateBaseProcessInfo(param) {
    return request({
        url: '/process/saveAndUpdateBaseProcessInfo',
        method: 'post',
        params: param
    })
}
//流程启用禁用
export function enableDisable(param) {
    return request({
        url: '/process/enableDisable',
        method: 'get',
        params: param
    })
}

//条件查询流程
export function findBaseProcessInfo(param) {
    return request({
        host:2,
        url: '/process/findBaseProcessInfo',
        method: 'post',
        params: param
    })
}

//删除流程
export function delProcess(param) {
    return request({
        url: '/process/delProcess',
        method: 'get',
        params: param
    })
}

//显示部门信息(获得经办人)
export function getUserByDepartment(param) {
    return request({
        url: '/process/getUserByDepartment',
        method: 'get',
        params: param
    })
}

//部署流程(发布)
export function deploy(param) {
    return request({
        url: '/process/deploy',
        method: 'get',
        params: param
    })
}



