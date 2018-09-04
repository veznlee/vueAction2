<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <div class="layout-wrap layout-green">
                        <div class="layout-title">
                            <h4>工作台</h4>
                        </div>
                        <div class="layout-content content-green">
                            <el-row :gutter="30">
                                <el-col :md="24" :lg="12" :xl="8">
                                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                                        <div class="grid-content grid-con-wrap grid-con-2">
                                            <i class="el-icon-view grid-con-icon"></i>
                                            <div class="grid-cont-right">
                                                <router-link :to="{path:'/jobManage',query:{status:'0'}}">
                                                    <div class="grid-num">{{auditNum}}</div>
                                                    <div class="grid-tit">待审核单</div>
                                                </router-link>
                                            </div>
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <div class="layout-wrap layout-blue">
                        <div class="layout-title">
                            <h4>业务监控</h4>
                        </div>
                        <div class="layout-content content-blue" style="margin-top: -30px;">
                            <el-row :gutter="30">
                                <el-col :md="12" :lg="8">
                                    <div class="grid-content bg-purple" style="margin-top: 30px">
                                        <div class="box-title">
                                            <h4>销售监控</h4>
                                        </div>
                                        <div class="box-content">
                                            <div class="head">
                                                <div class="headTitle">待处理单<el-badge class="mark" :value="marketTb" /></div>
                                                <div class="line"></div>
                                                <div class="headTitle">今日已处理单<el-badge class="mark" :value="marketTd" /></div>
                                            </div>
                                            <div class="iconShow">
                                                <router-link :to="{path:'/indexSellOrder'}">
                                                    <div class="iconItem">
                                                        <i class="iconfont icon-xiaoshoudan"></i>
                                                        <span>销售单</span>
                                                    </div>
                                                </router-link>
                                                <router-link :to="{path:'/salesBack'}">
                                                    <div class="iconItem">
                                                        <i class="iconfont icon-tuihuodan" style="font-size: 72px"></i>
                                                        <span>退货单</span>
                                                    </div>
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :md="12" :lg="8">
                                    <div class="grid-content bg-purple" style="margin-top: 30px">
                                        <div class="box-title">
                                            <h4>生产监控</h4>
                                        </div>
                                        <div class="box-content">
                                            <div class="head">
                                                <div class="headTitle">待处理单<el-badge class="mark" :value="productTb" /></div>
                                                <div class="line"></div>
                                                <div class="headTitle">今日已处理单<el-badge class="mark" :value="productTd" /></div>
                                            </div>
                                            <div class="iconShow">
                                                <router-link :to="{path:'/indexProductionManage'}">
                                                    <div class="iconItem">
                                                        <i class="iconfont icon-shengchandan"></i>
                                                        <span>生产单</span>
                                                    </div>
                                                </router-link>
                                                <router-link :to="{path:'/picking'}">
                                                    <div class="iconItem">
                                                        <i class="iconfont icon-lingliaodan"></i>
                                                        <span>领料单</span>
                                                    </div>
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :md="12" :lg="8">
                                    <div class="grid-content bg-purple" style="margin-top: 30px">
                                        <div class="box-title">
                                            <h4>采购监控</h4>
                                        </div>
                                        <div class="box-content">
                                            <div class="head">
                                                <div class="headTitle">待处理单<el-badge class="mark" :value="procureTb" /></div>
                                                <div class="line"></div>
                                                <div class="headTitle">今日已处理单<el-badge class="mark" :value="procureTd" /></div>
                                            </div>
                                            <div class="iconShow">
                                                <router-link :to="{path:'/purchaseOrder'}">
                                                    <div class="iconItem">
                                                        <i class="iconfont icon-caigoudan"></i>
                                                        <span>采购单</span>
                                                    </div>
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :md="12" :lg="8">
                                    <div class="grid-content bg-purple" style="margin-top: 30px">
                                        <div class="box-title">
                                            <h4>财务监控</h4>
                                        </div>
                                        <div class="box-content">
                                            <div class="head">
                                                <div class="headTitle">待处理单<el-badge class="mark" :value="financeTb" /></div>
                                                <div class="line"></div>
                                                <div class="headTitle">今日已处理单<el-badge class="mark" :value="financeTd" /></div>
                                            </div>
                                            <div class="iconShow">
                                                <router-link :to="{path:'/financeAudit'}">
                                                    <div class="iconItem">
                                                        <i class="iconfont icon-caiwushenhe"></i>
                                                        <span>财务审核</span>
                                                    </div>
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :md="24" :lg="16">
                                    <div class="grid-content bg-purple" style="margin-top: 30px">
                                        <div class="box-title">
                                            <h4>仓库监控</h4>
                                        </div>
                                        <div class="box-content">
                                            <div class="head">
                                                <div class="headTitle">待处理单<el-badge class="mark" :value="wareTb" /></div>
                                                <div class="line"></div>
                                                <div class="headTitle">今日已处理单<el-badge class="mark" :value="wareTd" /></div>
                                            </div>
                                            <div class="iconShow">
                                                <router-link :to="{path:'/sellOutStore'}">
                                                    <div class="iconItem">
                                                        <i class="iconfont icon-xiaoshouchuku"></i>
                                                        <span>销售出库</span>
                                                    </div>
                                                </router-link>
                                                <router-link :to="{path:'/getOutStore'}">
                                                    <div class="iconItem">
                                                        <i class="iconfont icon-lingliaochuku"></i>
                                                        <span>领料出库</span>
                                                    </div>
                                                </router-link>
                                                <router-link :to="{path:'/stockInStore'}">
                                                    <div class="iconItem">
                                                        <i class="iconfont icon-caigouruku"></i>
                                                        <span>采购入库</span>
                                                    </div>
                                                </router-link>
                                                <router-link :to="{path:'/returnInStore'}">
                                                    <div class="iconItem">
                                                        <i class="iconfont icon-tuihuoruku"></i>
                                                        <span>退货入库</span>
                                                    </div>
                                                </router-link>
                                                <router-link :to="{path:'/yieldingInStore'}">
                                                    <div class="iconItem">
                                                        <i class="iconfont icon-shengchanruku"></i>
                                                        <span>生产入库</span>
                                                    </div>
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <el-row :gutter="30">
                        <el-col :md="24" :xl="12">
                            <div class="layout-content layout-independent content-orange">
                                <div class="box-title">
                                    <h4>商品库存预警<span class="goods-count">共{{warnStoreTotal}}种商品</span></h4>
                                    <router-link :to="{path:'/warnStore'}"><span class="more">查看更多>></span></router-link>
                                </div>
                                <div class="box-content">
                                    <div class="goods-box">
                                        <el-row :gutter="15">
                                            <el-col :xl="12" :lg="12" :sm="24" v-for="(item,index) in warnStoreData" :key="index">
                                                <div class="grid-content bg-purple">
                                                    <div class="good">
                                                        <div class="goodImg"><img :src="item.imgUrl"/></div>
                                                        <ul class="goodInfo">
                                                            <li><h4>{{item.productName}}<span class="spec" :title="item.specification+item.smallUnit+'/'+item.bigUnit">({{item.specification}} {{item.smallUnit}}/{{item.bigUnit}})</span></h4></li>
                                                            <li><span>剩余数量<b class="surplus">{{item.restNum}} {{item.smallUnit}}</b></span></li>
                                                            <el-scrollbar>
                                                                <div class="goodsWrap">
                                                                    <p v-for="item in item.houseWaring">
                                                                        <span class="detail">{{item.storeName}}-{{item.regionName}}-{{item.regionInfoCode}}号<b class="number">{{item.num}}{{item.unit}}</b></span>
                                                                    </p>
                                                                </div>
                                                            </el-scrollbar>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :md="24" :xl="12">
                            <div class="layout-content layout-independent content-orange">
                                <div class="box-title">
                                    <h4>商品过期预警<span class="goods-count">共{{warnOverdueTotal}}种商品</span></h4>
                                    <router-link :to="{path:'/warnOverdue'}"><span class="more">查看更多>></span></router-link>
                                </div>
                                <div class="box-content">
                                    <div class="goods-box">
                                        <el-row :gutter="15">
                                            <el-col :xl="12" :lg="12" :sm="24" v-for="(item,index) in warnOverdueData" :key="index">
                                                <div class="grid-content bg-purple">
                                                    <div class="good">
                                                        <div class="goodImg"><img :src="item.imgUrl"/></div>
                                                        <ul class="goodInfo">
                                                            <li><h4>{{item.productName}}<span class="spec" :title="item.specification+item.smallUnit+'/'+item.bigUnit">({{item.specification}} {{item.smallUnit}}/{{item.bigUnit}})</span></h4></li>
                                                            <li><span>快过期数量<b class="surplus">{{item.restNum}} {{item.smallUnit}}</b></span></li>
                                                            <el-scrollbar>
                                                                <div class="goodsWrap">
                                                                    <p v-for="item in item.houseWaring">
                                                                        <span class="detail">{{item.storeName}}-{{item.regionName}}-{{item.regionInfoCode}}号<b class="number">{{item.num}}{{item.unit}}</b></span>
                                                                        <span class="date">{{moment(item.date).format('YYYY-MM-DD')}}</span>
                                                                    </p>
                                                                </div>
                                                            </el-scrollbar>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import request from '../../../utils/request'
    export default {
        data() {
            return {
                Urls:{
                    orderList:'/workFlow/countUserTask',
                    warnStoreList:'/commodity/repertory',
                    warnOverdueList:'/commodity/due',
                },
                warnParam: {
                    page: 1,
                    pageSize: 10,
                    productName:''
                },
                warnStoreData:[],
                warnStoreTotal:'',
                warnOverdueData:[],
                warnOverdueTotal:'',
                orderParam: {},
                wareTd:'',
                wareTb:'',
                productTd:'',
                productTb:'',
                marketTd:'',
                marketTb:'',
                financeTd:'',
                financeTb:'',
                procureTd:'',
                procureTb:'',
                auditNum:''
            }
        },

        created:function(){
            this.getOrderData();
            this.getWarnStore();
            this.getWarnOverDue();
        },
        methods:{
            getOrderData() {
                request({
                    host:1,
                    url:this.Urls.orderList,
                    method: 'get',
                    params: this.orderParam
                }).then(response => {
                    if(response.data.code==0){
                        var resData=response.data.data.admin
                        this.wareTd=resData.warehouseTodayCompleted
                        this.wareTb=resData.warehouseToBeCompleted

                        this.productTd=resData.productionTodayCompleted
                        this.productTb=resData.productionToBeCompleted

                        this.marketTd=resData.marketTodayCompleted
                        this.marketTb=resData.marketToBeCompleted

                        this.financeTd=resData.financeTodayCompleted
                        this.financeTb=resData.financeToBeCompleted

                        this.procureTd=resData.procurementTodayCompleted
                        this.procureTb=resData.procurementToBeCompleted
                        this.auditNum=response.data.data.user.CheckPending
                    }
                })
            },
            getWarnStore() {
                this.listLoading = true;
                request({
                    url:this.Urls.warnStoreList,
                    method: 'get',
                    params: this.warnParam
                }).then(response => {
                    if(response.data.code==0){
                        this.warnStoreData = response.data.data.slice(0,4);
                        for(var i=0; i<this.warnStoreData.length; i++){
                            this.warnStoreData[i].imgUrl=this.globe.hostUrl+'/'+this.warnStoreData[i].imgUrl
                        }
                        this.warnStoreTotal = response.data.total;
                        this.listLoading = false
                    }
                })
            },
            getWarnOverDue() {
                this.listLoading = true;
                request({
                    url:this.Urls.warnOverdueList,
                    method: 'get',
                    params: this.warnParam
                }).then(response => {
                    if(response.data.code==0){
                        this.warnOverdueData = response.data.data.slice(0,4);
                        for(var i=0; i<this.warnOverdueData.length; i++){
                            this.warnOverdueData[i].imgUrl=this.globe.hostUrl+'/'+this.warnOverdueData[i].imgUrl
                        }
                        this.warnOverdueTotal = response.data.total;
                        this.listLoading = false
                    }
                })
            },
        },
    }
</script>

<style scoped>
    .box-content .iconShow a{
        flex: 1;
        text-align: center;
    }
    .grid-con-wrap {
        display: flex;
        align-items: center;
        height: 100px;
    }
    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 12px;
    }
    .grid-num {
        font-size: 24px;
        font-weight: bold;
    }
    .grid-tit {
        font-size: 16px;
        margin-top: 5px;
        color: #333;
    }
    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }
    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }
    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }
    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(100, 213, 114);
    }
    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }
    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }
</style>
