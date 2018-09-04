<template>
    <div class="table">
        <div class="handle-box">
            <div class="search-left">
                <router-link :to="{path:'/storeView'}"><el-button type="info" icon="el-icon-back">返 回</el-button></router-link>
            </div>
        </div>
        <el-row :gutter="30">
            <el-col :span="24">
                <div class="layout-content layout-independent content-blue">
                    <div class="box-title">
                        <h4>{{this.$route.query.storeName | getStoreName}}</h4>
                    </div>
                    <div class="box-content">
                        <div class="goods-box">
                            <el-row :gutter="15">
                                <el-col :xl="24" v-for="(item,index) in regionList" :key="index" class="layout-number" v-loading="listLoading" element-loading-text="给我一点时间">
                                    <div class="grid-content bg-purple">
                                        <div class="layout-wrap layout-grey">
                                            <div class="layout-title">
                                                <h4>{{item.name}}</h4>
                                            </div>
                                            <div class="layout-content content-blue" style="position: relative; padding-bottom: 0;">
                                                <el-row :gutter="30">
                                                    <el-col :lg="6" :xl="4" v-for="(item,index) in item.storeDetailInfo" :key="index">
                                                        <div class="grid-content bg-purple" style="cursor: pointer">
                                                            <div class="box-content" style="margin-bottom: 15px">
                                                                <div class="iconShow">
                                                                    <div class="iconItem" style="flex:0.8; position: absolute; right: 5px; top: -5px" v-show="item.dateWarningFlag==1">
                                                                        <el-popover
                                                                            placement="right"
                                                                            width="280"
                                                                            trigger="click">
                                                                            <div class="numBox">
                                                                                <p class="numTop" style="background-color: rgb(249, 132, 8)">即将过期</p>
                                                                                <h4 class="numName">{{item.code}}号</h4>
                                                                                <div class="numCon" v-for="item in regionWarnList">
                                                                                    <ul class="numProduct">
                                                                                        <li>商品：{{item.cname}}<span>余量 {{item.number}}{{item.unit}}</span></li>
                                                                                    </ul>
                                                                                    <ul class="numTime">
                                                                                        <li>入库日期： {{item.inDate | dateCapitalize}}</li>
                                                                                        <li>生产日期： {{item.cDate}}</li>
                                                                                        <li>保质期至： {{item.loseDate | dateCapitalize}}</li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <i class="iconfont icon-fengxianyujing" slot="reference" @click="getRegionWarn(item.guid)" style="font-size: 32px; color:rgb(249, 132, 8);"></i>
                                                                        </el-popover>
                                                                    </div>
                                                                    <div class="iconItem" style="flex:1; text-align: center">
                                                                        <el-popover
                                                                            placement="right"
                                                                            width="280"
                                                                            trigger="click">
                                                                            <div class="numBox">
                                                                                <h4 class="numName" style="margin-top: 0">{{item.code}}号 已用存储量 {{Number(item.used)/Number(item.total)*100 | capitalize}}%</h4>
                                                                                <div class="numCon" v-for="item in regionInfoList">
                                                                                <ul class="numProduct">
                                                                                    <li>商品：{{item.cname}}<span>余量{{item.number}}件</span></li>
                                                                                </ul>
                                                                                <ul class="numTime">
                                                                                    <li>入库日期： {{item.inDate | dateCapitalize}}</li>
                                                                                    <li>生产日期： {{item.cDate}}</li>
                                                                                    <li>保质期至： {{item.loseDate | dateCapitalize}}</li>
                                                                                </ul>
                                                                                </div>
                                                                            </div>
                                                                            <p class="circle" slot="reference" @click="getRegionId(item.guid)"><el-progress type="circle" :percentage="Number(item.used)/Number(item.total)*100 | capitalize" color="#13ce66" :stroke-width="5" :width="80"></el-progress></p>
                                                                        </el-popover>
                                                                    </div>
                                                                    <div class="iconItem" style="flex:0.8; position: absolute; right: 5px; bottom: 5px" v-show="item.newFlag==1">
                                                                        <el-popover
                                                                            placement="right"
                                                                            width="250"
                                                                            trigger="click">
                                                                            <div class="numBox">
                                                                                <p class="numTop" style="background-color: #13ce66">最新入库</p>
                                                                                <h4 class="numName">{{item.code}}号</h4>
                                                                                <div class="numCon" v-for="item in regionNewList">
                                                                                <ul class="numProduct">
                                                                                    <li>商品：{{item.cname}}<span>余量{{item.numbe}}件</span></li>
                                                                                </ul>
                                                                                <ul class="numTime">
                                                                                    <li>入库日期： {{item.inDate | dateCapitalize}}</li>
                                                                                    <li>生产日期： {{item.cDate}}</li>
                                                                                    <li>保质期至： {{item.loseDate | dateCapitalize}}</li>
                                                                                </ul>
                                                                                </div>
                                                                            </div>
                                                                            <i class="iconfont icon-new" slot="reference" @click="getRegionNew(item.guid)" style="font-size: 32px; color:#13ce66;"></i>
                                                                        </el-popover>
                                                                    </div>
                                                                </div>
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
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import request from '../../../utils/request'
    import baseMixin from '../../common/tableBase';
    import moment from 'moment'
    export default {
        mixins: [baseMixin],
        data() {
            return {
                Urls:{
                    tableList:'/zhccstore/showStoreById',
                    regionInfo:'/zhccstore/getDataByRegionInfo',
                    regionWarn:'/zhccstore/getWarnByRegionInfo',
                    regionNew:'/zhccstore/getNewByRegionInfo'
                },
                storeId:'',
                regionList:[],
                storeUseList:[],
                regionWarnList:[],
                regionNewList:[],
                regionInfoList:[],
            }
        },
        created() {},
        activated(){
            this.storeId=this.$route.query.storeId
            this.getTableData();
        },
        computed: {},
        filters:{
            getStoreName(value){
                if(value==undefined){
                   return sessionStorage.getItem("storeName")
                }else{
                    return value
                }
            },
            capitalize(value){
                return Number(value.toString().substring(0,4))
            },
            dateCapitalize(value){
                let dateTime=parseInt(value)
                return moment(dateTime).format("YYYY-MM-DD HH:mm:ss")
            }
        },
        methods: {
            getRegionId(value){
                request({
                    url:this.Urls.regionInfo,
                    method: 'get',
                    params: {regionInfo:value}
                }).then(response => {
                    if(response.data.code==0){
                        this.regionInfoList=response.data.data
                    }
                })

            },
            getRegionWarn(value){
                request({
                    url:this.Urls.regionWarn,
                    method: 'get',
                    params: {regionInfo:value}
                }).then(response => {
                    if(response.data.code==0){
                        this.regionWarnList=response.data.data
                    }
                })

            },
            getRegionNew(value){
                request({
                    url:this.Urls.regionNew,
                    method: 'get',
                    params: {regionInfo:value}
                }).then(response => {
                    if(response.data.code==0){
                        console.log(response.data.data)
                        this.regionNewList=response.data.data
                    }
                })

            },
            getTableData() {
                this.listLoading = true;
                if(this.storeId==''){
                    this.storeId=sessionStorage.getItem("storeId")
                }else{
                    this.storeId=this.$route.query.storeId
                }
                request({
                    url:this.Urls.tableList,
                    method: 'get',
                    params: {storeId:this.storeId}
                }).then(response => {
                    if(response.data.code==0){
                        this.regionList=response.data.data;
                        this.listLoading = false
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .layout-title{
        padding: 10px 0 10px 15px;;
    }
    .layout-title h4{
        font-size: 18px;
        color: #666;
        font-weight: bold;
    }
    .layout-number:nth-of-type(odd) .layout-wrap .iconShow{
        background-color: #fafdff;
    }
    .layout-number:nth-of-type(even) .layout-wrap .iconShow{
        background-color: #fcfff8;
    }
    .layout-number:nth-of-type(odd) .layout-wrap .box-content{
        border: 1px solid #41a1e3;
    }
    .layout-number:nth-of-type(even) .layout-wrap .box-content{
        border: 1px solid #a6cf4c;
    }
    .handle-date{
        width: 120px;
    }
    .storeName{
        font-size: 26px;
    }
    .box-content .iconShow .iconItem p.circle{
        display: inline-block;
    }
    .box-content .iconShow{
        position: relative;
        height: 110px;
    }
    .content-blue .iconShow .iconItem i{
        font-size: 80px;
    }
    .numBox{
        max-height: calc(100vh - 360px);
        overflow-y: auto;
    }
    .numBox .numName{
        font-size: 14px;
        text-align: center;
        margin-bottom: 0;
        margin-top: 15px;
        font-weight: bold;
    }
    .numBox .numTop{
        text-align: center;
        background-color: #999;
        border-radius: 5px 5px 0 0;
        color: #fff;
    }
    .numBox .numProduct{
        margin-bottom: 5px;
    }
    .numBox .numProduct li{
        margin: 4px 0;
        color: #333;
    }
    .numBox .numProduct span{
        margin-left: 10px;
    }
    .numBox .numTime li{
        margin: 4px 0;
        font-size: 12px;
    }
    .numCon{
        margin-top: 10px;
    }
</style>
