import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const version="1.0000";
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: {title: '首页欢迎页'},
            children: [
                {
                    path: '/home',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: {title: '首页欢迎页'}
                },
                {
                    path: '/mainIndexAdmin',
                    component: resolve => require(['../components/page/home/indexAdmin.vue'], resolve),
                    meta: {title: '首页-管理员'}
                },
                {
                    path: '/mainIndexSale',
                    component: resolve => require(['../components/page/home/indexSale.vue'], resolve),
                    meta: {title: '首页-销售人员'}
                },
                {
                    path: '/mainIndexProduct',
                    component: resolve => require(['../components/page/home/indexProduct.vue'], resolve),
                    meta: {title: '首页-生产人员'}
                },
                {
                    path: '/mainIndexPurchase',
                    component: resolve => require(['../components/page/home/indexPurchase.vue'], resolve),
                    meta: {title: '首页-采购人员'}
                },
                {
                    path: '/mainIndexFinance',
                    component: resolve => require(['../components/page/home/indexFinance.vue'], resolve),
                    meta: {title: '首页-财务人员'}
                },
                {
                    path: '/mainIndexStore',
                    component: resolve => require(['../components/page/home/indexStore.vue'], resolve),
                    meta: {title: '首页-仓储人员'}
                },
                {
                    path: '/job-manage',
                    component: resolve => require(['../components/page/BaseList.vue'], resolve),
                    meta: {title: '模板'}
                },
                {
                    path: '/jobManage',
                    component: resolve => require(['../components/page/audit/manageAudit.vue'], resolve),
                    meta: {title: '工作审核'}
                },
                {
                    path: '/jobManageShow',
                    component: resolve => require(['../components/page/audit/manageView.vue'], resolve),
                    meta: {title: '工作查看'}
                },
                {
                    path: '/stockInStore',
                    component: resolve => require(['../components/page/store/purchaseAudit.vue'], resolve),
                    meta: {title: '采购入库'}
                },
                {
                    path: '/yieldingInStore',
                    component: resolve => require(['../components/page/store/productionAudit.vue'], resolve),
                    meta: {title: '生产入库'}
                },
                {
                    // 退货入库
                    path: '/returnInStore',
                    component: resolve => require(['../components/page/store/salesBackAudit.vue'], resolve),
                    meta: {title: '退货入库'}
                },
                {
                    // 销售出库
                    path: '/sellOutStore',
                    component: resolve => require(['../components/page/store/orderAudit.vue'], resolve),
                    meta: {title: '销售出库'}
                },
                {
                    // 领料出库
                    path: '/getOutStore',
                    component: resolve => require(['../components/page/store/pickingAudit.vue'], resolve),
                    meta: {title: '领料出库'}
                },
                {
                    // 仓库查看
                    path: '/storeView',
                    component: resolve => require(['../components/page/store/storeView.vue'], resolve),
                    meta: {title: '仓库查看', permission: true}
                },
                {
                    // 仓库查看-区域-号
                    path: '/storeView_region',
                    component: resolve => require(['../components/page/store/storeView_region.vue'], resolve),
                    meta: {title: '仓库区域', permission: true}
                },
                {
                    // 仓库盘点
                    path: '/storeCheck',
                    component: resolve => require(['../components/page/store/storeCheck.vue'], resolve),
                    meta: {title: '库存盘点', permission: true}
                },
                {
                    // 仓库盘点-编辑
                    path: '/storeCheck_edit',
                    component: resolve => require(['../components/page/store/storeCheck_edit.vue'], resolve),
                    meta: {title: '库存盘点-新增', permission: true}
                },
                {
                    // 仓库盘点-查看
                    path: '/storeCheck_view',
                    component: resolve => require(['../components/page/store/storeCheck_view.vue'], resolve),
                    meta: {title: '库存盘点-查看', permission: true}
                },
                {
                    // 仓库配置
                    path: '/storeConfig',
                    component: resolve => require(['../components/page/store/storeConfig.vue'], resolve),
                    meta: {title: '仓库配置', permission: true}
                },
                {
                    // 商品管理
                    path: '/commodityManage',
                    component: resolve => require(['../components/page/store/commodityManage.vue'], resolve),
                    meta: {title: '商品管理', permission: true}
                },
                {
                    // 商品库存预警
                    path: '/warnStore',
                    component: resolve => require(['../components/page/warn/warnStore.vue'], resolve),
                    meta: {title: '商品库存预警', permission: true}
                },
                {
                    // 商品过期预警
                    path: '/warnOverdue',
                    component: resolve => require(['../components/page/warn/warnOverdue.vue'], resolve),
                    meta: {title: '商品过期预警', permission: true}
                },
                {
                    // 车辆监控
                    path: '/carMonitor',
                    component: resolve => require(['../components/page/logistics/carMonitor.vue'], resolve),
                    meta: {title: '车辆监控', permission: true}
                },
                {
                    // 车辆管理
                    path: '/carManage',
                    component: resolve => require(['../components/page/logistics/carManage.vue'], resolve),
                    meta: {title: '车辆管理', permission: true}
                },
                {
                    // 入库统计
                    path: '/inputTotal',
                    component: resolve => require(['../components/page/chart/inputTotal.vue'], resolve),
                    meta: {title: '入库统计', permission: true}
                },
                {
                    // 出库统计
                    path: '/outputTotal',
                    component: resolve => require(['../components/page/chart/outputTotal.vue'], resolve),
                    meta: {title: '出库统计', permission: true}
                },
                {
                    // 入库分析
                    path: '/inputAnalyse',
                    component: resolve => require(['../components/page/chart/inputAnalyse.vue'], resolve),
                    meta: {title: '入库分析', permission: true}
                },
                {
                    // 出库分析
                    path: '/outputAnalyse',
                    component: resolve => require(['../components/page/chart/outputAnalyse.vue'], resolve),
                    meta: {title: '出库分析', permission: true}
                },
                {
                    // 部门管理
                    path: '/classManage',
                    component: resolve => require(['../components/page/setting/classManage.vue'], resolve),
                    meta: {title: '部门管理', permission: true}
                },
                {
                    // 角色管理
                    path: '/settingRole',
                    component: resolve => require(['../components/page/setting/settingRole.vue'], resolve),
                    meta: {title: '角色管理', permission: true}
                },
                {
                    // 用户管理
                    path: '/settingUser',
                    component: resolve => require(['../components/page/setting/settingUser.vue'], resolve),
                    meta: {title: '用户管理', permission: true}
                },
                {
                    // 供应商管理
                    path: '/settingSupplier',
                    component: resolve => require(['../components/page/setting/settingSupplier.vue'], resolve),
                    meta: {title: '供应商管理', permission: true}
                },
                {
                    // 采购管理
                    path: '/purchaseOrder',
                    component: resolve => require(['../components/page/purchase/purchaseOrder.vue'], resolve),
                    meta: {title: '采购订单', permission: true}
                },
                {
                    // 客户管理
                    path: '/settingClient',
                    component: resolve => require(['../components/page/setting/settingClient.vue'], resolve),
                    meta: {title: '客户管理', permission: true}
                },
                {
                    // 菜单设计
                    path: '/settingMenu',
                    component: resolve => require(['../components/page/setting/settingMenu.vue'], resolve),
                    meta: {title: '菜单设计', permission: true}
                },
                {
                    // 参数配置
                    path: '/settingParam',
                    component: resolve => require(['../components/page/setting/Tabs.vue'], resolve),
                    meta: {title: '参数配置', permission: true}
                },
                {
                    // 菜单配置
                    path: '/process',
                    component: resolve => require(['../components/page/setting/process.vue'], resolve),
                    meta: {title: '业务设置', permission: true}
                },
                {
                    // 财务审核
                    path: '/financeAudit',
                    component: resolve => require(['../components/page/audit/financeAudit.vue'], resolve),
                    meta: {title: '财务审核', permission: true}
                },
                {
                    // 销售订单
                    path: '/indexSellOrder',
                    component: resolve => require(['../components/page/sales/order.vue'], resolve),
                    meta: {title: '销售订单', permission: true}
                },
                {
                    // 退货管理
                    path: '/salesBack',
                    component: resolve => require(['../components/page/sales/salesBack.vue'], resolve),
                    meta: {title: '退货管理', permission: true}
                },
                {
                    // 生产管理
                    path: '/indexProductionManage',
                    component: resolve => require(['../components/page/production/productionManage.vue'], resolve),
                    meta: {title: '生产管理', permission: true}
                },
                {
                    // 领料申请
                    path: '/picking',
                    component: resolve => require(['../components/page/production/picking.vue'], resolve),
                    meta: {title: '领料申请', permission: true}
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        }
    ]
})
