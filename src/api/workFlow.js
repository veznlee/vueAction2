import request from '../utils/request'

//流程运行

//点击新增按钮拉取自定义表单格式
export function orderSaveWin(param) {
    return request({
        url: '/workFlow/orderSaveWin',
        method: 'get',
        params: param
    })
}
//点击办理(编辑)按钮拉取自定义表单格式及订单信息
export function orderCompileWin(param) {
    return request({
        url: '/workFlow/orderCompileWin',
        method: 'get',
        params: param
    })
}

//对新增订单进行提交或审核
export function saveOrderdetail(param) {
    return request({
        url: '/workFlow/saveOrderdetail',
        method: 'post',
        params: param
    })
}

//对订单信息进行审核通过或审核不通过
export function checkOrderdetail(param) {
    return request({
        url: '/workFlow/checkOrderdetail',
        method: 'post',
        params: param
    })
}

//显示当前登录人的待审核任务、完成任务、待审核删除任务
export function userTask(param) {
    return request({
        url: '/workFlow/userTask',
        method: 'get',
        params: param
    })
}

//当前登录人需处理任务数和今日完成任务数
export function countUserTask(param) {
    return request({
        url: '/workFlow/countUserTask',
        method: 'get',
        params: param
    })
}

//完成的任务进入待删除状态
export function auditDelete(param) {
    return request({
        url: '/workFlow/auditDelete',
        method: 'post',
        params: param
    })
}

//删除待删除任务或未完成的任务
export function delOrderdetail(param) {
    return request({
        url: '/workFlow/delOrderdetail',
        method: 'post',
        params: param
    })
}



