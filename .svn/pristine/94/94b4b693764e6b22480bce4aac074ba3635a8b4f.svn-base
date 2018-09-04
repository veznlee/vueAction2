<template>
    <div class="table">
        <el-row :gutter="30">
            <el-col :lg="16" :xl="18">
                <div class="grid-content bg-purple-dark">
                    <div class="layout-wrap layout-blue">
                        <div class="layout-title">
                            <h4>各地区仓库储存量</h4>
                            <div class="layout-title-r">
                                <el-select clearable placeholder="仓库类型" class="handle-select" v-model="useParam.typeId" @change="storeUse">
                                    <el-option v-for="item in storeTypeList" :key="item.guid" :label="item.cname" :value="item.guid"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="layout-content content-blue" style="position: relative; padding-bottom: 0; height: 335px">
                            <button class="el-carousel__arrow el-carousel__arrow--left" :disabled="isPreButton" @click="prev"><i class="el-icon-arrow-left"></i></button>
                            <button class="el-carousel__arrow el-carousel__arrow--right" :disabled="isNextButton" @click="next"><i class="el-icon-arrow-right"></i></button>
                            <el-row :gutter="30">
                                <el-col :lg="12" :xl="8" v-for="(item,index) in storeUseList" :key="index" v-loading="listLoading" element-loading-text="给我一点时间">
                                    <!--<router-link :to="{path:'/storeView_region',query:{storeId:item.guid, storeName:item.name}}">-->
                                        <a href="javascript:;" @click="turnPage(item.guid, item.name)">
                                            <div class="grid-content bg-purple">
                                                <div class="box-content" style="border-top: 1px solid #99cef2; margin-bottom: 15px">
                                                    <div class="iconShow">
                                                        <div class="iconItem" style="flex:0.8">
                                                            <i class="iconfont icon-cangkuguanli"></i>
                                                        </div>
                                                        <div class="iconItem" style="flex:1">
                                                            <h4 class="storeName" :title="item.name">{{item.name.toString().substring(0,6)}}</h4>
                                                        </div>
                                                        <div class="iconItem" style="flex:0.8">
                                                            <p class="circle"><el-progress type="circle" :percentage="Number(item.used)/Number(item.total)*100 | capitalize" color="#41a1e3" :stroke-width="5" :width="80"></el-progress></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    <!--</router-link>-->
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :lg="8" :xl="6">
                <div class="grid-content bg-purple-dark">
                    <div class="layout-wrap layout-blue">
                        <div class="layout-title">
                            <h4>温度湿度</h4>
                        </div>
                        <div class="layout-content content-blue" style="padding: 0;">
                            <div class="grid-content bg-purple">
                                <el-scrollbar>
                                    <div class="box-ambient">
                                        <div class="iconShow" v-for="(item,index) in storeAmbientList" :key="index">
                                            <div class="iconItem" style="flex:1; text-align: left">
                                                <h4 class="storeName">{{item.name}}</h4>
                                            </div>
                                            <div class="iconItem" style="flex:1; font-size: 16px; color: #555">
                                                <p>温度：{{item.temperature.toString().substring(0,4)}}℃</p>
                                                <p>湿度：{{item.humidity.toString().substring(0,4)}}%RH</p>
                                            </div>
                                        </div>
                                    </div>
                                </el-scrollbar>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col  :lg="24" :xl="18">
                <div class="grid-content bg-purple-dark">
                    <div class="layout-wrap layout-green">
                        <div class="layout-title">
                            <h4>仓库储存量统计</h4>
                        </div>
                        <div class="layout-content content-blue" style="position: relative">
                            <button class="el-carousel__arrow el-carousel__arrow--left" :disabled="isPreChartButton" @click="prevChart"><i class="el-icon-arrow-left"></i></button>
                            <button class="el-carousel__arrow el-carousel__arrow--right" :disabled="isNextChartButton" @click="nextChart"><i class="el-icon-arrow-right"></i></button>
                            <div id="main" style="width: 100%; min-height: 318px;"></div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :lg="24" :xl="6">
                <div class="grid-content bg-purple-dark">
                    <div class="layout-wrap layout-green">
                        <div class="layout-title">
                            <h4>消息提示</h4>
                        </div>
                        <div class="layout-content content-blue" style="padding: 0">
                            <div class="grid-content bg-purple">
                                <el-scrollbar>
                                    <div class="box-ambient">
                                        <div class="iconShow" v-for="(item,index) in storeInfoList" :key="index">
                                            <div class="iconItem" style="margin-right:15px; text-align: left">
                                                <h4 class="storeName">{{item.storeName}}</h4>
                                            </div>
                                            <div class="iconItem" style="flex:1; font-size: 16px; color: #555">
                                                <p :class="[item.flag==0 ? activeClass : '', errorClass]"><span>{{item.flag==1?'即将过期':'最新上架'}}</span>{{item.productName}}{{item.sum}}{{item.unit}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </el-scrollbar>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    var echarts = require('echarts');
    import request from '../../../utils/request'
    import baseMixin from '../../common/tableBase';
    export default {
        mixins: [baseMixin],
        data() {
            return {
                Urls:{
                    tableList:'/sysparameters/list',
                    storeUseUrl:'/zhccstore/showStore',
                    storeAmbientUrl:'/zhccstore/getTAndH',
                    storeInfoUrl:'/zhccstore/getMessage',
                    storeChartUrl:'/zhccstore/getStoreChart'
                },
                listParam:{
                    ctype:2
                },
                itemParam:{
                    typeId:'',
                    page: 1,
                    pageSize: 6
                },
                useParam:{
                    typeId:'',
                },
                chartParam:{
                    typeId:'',
                    page: 1,
                    pageSize: 2
                },
                value4: '',
                value5: '',
                storeTypeList:[],
                storeUseList:[],
                storeAmbientList:[],
                storeInfoList:[],
                chartLegend:[],
                xAxisData:[],
                yAxisData:[],
                legendName:'',
                seriesData:[],
                isPreButton:false,
                isNextButton:false,
                isPreChartButton:false,
                isNextChartButton:false,
                activeClass: 'normal',
                errorClass: 'warning',
            }
        },
        created() {
        },
        mounted(){

        },
        watch:{},
        computed: {},
        filters:{
            capitalize(value){
                return Number(value.toString().substring(0,5))
            }
        },
        methods: {
            getTableData() {
                request({
                    url:this.Urls.tableList,
                    method: 'get',
                    params: this.listParam
                }).then(response => {
                    if(response.data.code==0){
                        this.storeTypeList = response.data.data;
                        this.itemParam.typeId=response.data.data[0].guid
                        this.chartParam.typeId=response.data.data[0].guid
                        this.useParam.typeId=response.data.data[0].guid
                        this.getStoreUseData()
                        this.getAmbientData()
                        this.getInfoData()
                        this.initPurchaseChart()
                    }
                })
            },
            storeUse(value){
                this.useParam.typeId=value;
                this.itemParam.typeId=value;
                this.chartParam.typeId=value;
                this.getStoreUseData()
                this.getAmbientData()
                this.getInfoData()
                this.initPurchaseChart()
            },
            getStoreUseData() {
                this.listLoading = true;
                request({
                    url:this.Urls.storeUseUrl,
                    method: 'get',
                    params: this.itemParam
                }).then(response => {
                    if(response.data.code==0){
                        this.storeUseList = response.data.data;
                        if(this.storeUseList.length<6){
                            this.isNextButton=true
                            this.isPreButton=false
                        }else{
                            this.isNextButton=false
                            this.isPreButton=true
                        }
                        if(this.itemParam.page==1){
                            this.isPreButton=true
                        }
                        this.listLoading = false
                    }
                })
            },
            getAmbientData() {
                this.listLoading = true;
                request({
                    url:this.Urls.storeAmbientUrl,
                    method: 'get',
                    params: this.useParam
                }).then(response => {
                    if(response.data.code==0){
                        this.storeAmbientList = response.data.data;
                        this.listLoading = false
                    }
                })
            },
            getInfoData() {
                this.listLoading = true;
                request({
                    url:this.Urls.storeInfoUrl,
                    method: 'get',
                    params: this.useParam
                }).then(response => {
                    if(response.data.code==0){
                        this.storeInfoList = response.data.data;
                        this.listLoading = false
                    }
                })
            },
            initPurchaseChart(){
                var myChart = echarts.init(document.getElementById('main'));
                request({
                    url:this.Urls.storeChartUrl,
                    method: 'get',
                    params: this.chartParam
                }).then(response => {
                    myChart.clear();
                    myChart.resize();
                    if(response.data.code==0){
                        let resData=response.data.data;
                        if(resData.length<= 2){
                            this.isNextChartButton=true
                            this.isPreChartButton=false
                        }else{
                            this.isNextChartButton=false
                            this.isPreChartButton=true
                        }
                        if(this.chartParam.page==1){
                            this.isPreChartButton=true
                            this.isNextChartButton=false
                        }
                        var option={
                            color:['#00acee', '#52cdd5', '#79d9f1', '#a7e7ff', '#c8efff', '#86c9f4','#4da8ec','#3a91d2','#005fa6','#315f97'],
                            title:this.functionName(resData),
                            tooltip : {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c}"
                            },
                            series:this.functionData(resData)
                        }
                        myChart.setOption(option,true);
                    }
                })
            },
            next(){
                this.itemParam.page+=1
                this.getStoreUseData()
            },
            prev(){
                this.itemParam.page-=1
                this.getStoreUseData()
            },
            nextChart(){
                this.chartParam.page+=1
                this.initPurchaseChart()
            },
            prevChart(){
                this.chartParam.page-=1
                this.initPurchaseChart()
            },
            functionName(data){
                var title = [];
                for(var i = 0; i < data.length; i++){
                    var item = {
                        text: data[i].storeName,
                        subtext: '总计'+data[i].storeChartInfo.length+'种商品',
                        x:25+50*i+'%',
                        textAlign: 'center',
                        textStyle: {
                            fontSize:16,
                            color: '#666'
                        }
                    };
                    title.push(item);
                }
                return title;
            },
            functionData(data){
                var series = [];
                for(var i = 0; i < data.length; i++){
                    var temp = data[i].storeChartInfo;
                    var pieData=[]
                    for(var j = 0;j<temp.length;j++){
                        pieData[j]={
                            value:temp[j].number,
                            name:temp[j].productName
                        }
                    }
                    var item = {
                        name: data[i].storeName,
                        type: 'pie',
                        radius : '60%',
                        center: [25+50*i+'%', '60%'],
                        data:pieData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    };
                    series.push(item );
                }
                return series;
            },
            turnPage(guid,name){
                sessionStorage.setItem("storeId", guid);
                sessionStorage.setItem("storeName", name);
                this.$router.push({path:'/storeView_region',query:{storeId:guid, storeName:name}});
            }
        }
    }
</script>

<style scoped>
    .handle-date{
        width: 120px;
    }
    .storeName{
        font-size: 22px;
    }
    .box-content .iconShow .iconItem p.circle{
        margin-bottom: -5px;
    }
    .box-content .iconShow{
        height: 144px;
    }
    .content-blue .iconShow .iconItem i{
        font-size: 80px;
    }
    .box-ambient{
        padding: 0 15px;
        height: 348px;
    }
    .box-ambient .iconShow .storeName{
        font-size: 18px;
    }
    .box-ambient .iconShow{
        display: flex;
        align-items: center;
        padding: 15px 0;
        border-bottom: 1px solid #ddd;
    }
    .box-ambient .iconShow .iconItem p.warning{
        color: #F56C6C;
    }
    .box-ambient .iconShow .iconItem p.normal{
        color: #67C23A;
    }
</style>
