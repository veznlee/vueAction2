<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <div class="search-left">
                    <el-button type="info" icon="el-icon-back" @click="routeTo('/storeCheck')">返 回</el-button>
                </div>
                <div align="right" class="search-right">
                    <el-tag type="info" size="medium" class="mr10">盘点范围：{{this.$route.query.storeName | getStoreName}}</el-tag>
                    <el-tag type="info" size="medium" class="mr10">盘点时间：{{this.$route.query.createtime | filterTime}}</el-tag>
                    <el-tag type="info" size="medium">盘点人：{{this.$route.query.realName | getRealName}}</el-tag>
                </div>
            </div>
            <div class="layout-content content-green" style="padding:0">
                <div class="grid-content bg-purple">
                    <div class="box-title">
                        <div class="before"><span class="mr10">损益商品：{{this.$route.query.spoiledNum | getSpoiledNum}}</span><span class="ml10">全部商品：{{this.$route.query.productNum | getProductNum}}</span></div>
                    </div>
                    <div class="box-content" style="padding: 20px 20px 0 20px">
                        <el-row :gutter="20">
                            <el-col :xs="24" :md="12" :lg="8" :xl="6" :key="index" v-for="(item,index) in checkDetailList" v-loading="listLoading" element-loading-text="给我一点时间">
                                <div class="grid-content bg-purple">
                                    <ul class="view-wrap">
                                        <li class="viewItem">
                                        <div class="view-head">
                                            <ul>
                                                <li><span>商品数量：{{item.productNum}}</span><span>实盘数量：{{item.realNum==null?'暂无':item.realNum}}</span></li>
                                                <div class="line"></div>
                                                <li><span>损益数量：{{item.realNum==null?'暂无':Number(item.realNum)-Number(item.productNum) | filterNum}}</span></li>
                                            </ul>
                                        </div>
                                        <div class="view-foot">
                                            <ul>
                                                <li class="imgBox"><img :src="item.imgUrl"/></li>
                                                <li class="conBox">
                                                    <h4>{{item.productName}}<span class="spec">({{item.productUnit}})</span></h4>
                                                    <p>{{item.storeName}}-{{item.regionName}}-{{item.regionInfoCode}}</p>
                                                    <p class="reason">{{item.cdesc}}</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    </ul>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listParam.page" :page-sizes="[10,20,30, 40]" :page-size="listParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
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
                    tableList:'/zhccStocktaking/getInfo',
                },
                listParam: {
                    page: 1,
                    pageSize: 10,
                    guid: '',
                },
                imgUrl:'',
                checkDetailList:[]
            }
        },
        created() {},
        activated(){
            this.listParam.guid=this.$route.query.guid;
            this.getTableData();
        },
        filters:{
            getStoreName(value){
                if(value==undefined){
                    return sessionStorage.getItem("storeName")
                }else{
                    return value
                }
            },
            getRealName(value){
                if(value==undefined){
                    return sessionStorage.getItem("realName")
                }else{
                    return value
                }
            },
            getSpoiledNum(value){
                if(value==undefined){
                    return sessionStorage.getItem("spoiledNum")
                }else{
                    return value
                }
            },
            getProductNum(value){
                if(value==undefined){
                    return sessionStorage.getItem("productNum")
                }else{
                    return value
                }
            },
            filterTime(value){
                if(value==undefined){
                    let date=parseInt(sessionStorage.getItem("createtime"))
                    return moment(date).format("YYYY-MM-DD")
                }else{
                    let date=parseInt(value)
                    return moment(date).format("YYYY-MM-DD")
                }
            },
            filterNum(value){
                if(value > 0){
                    return '+'+value
                }else{
                    return value
                }
            }
        },
        computed: {},
        methods: {
            getTableData() {
                this.listLoading = true;
                if(this.listParam.guid==''){
                    this.listParam.guid=sessionStorage.getItem("guid")
                }else{
                    this.listParam.guid=this.$route.query.guid;
                }
                request({
                    url:this.Urls.tableList,
                    method: 'get',
                    params: this.listParam
                }).then(response => {
                    if(response.data.code==0){
                        this.checkDetailList=response.data.data;
                        for(var i=0; i<this.checkDetailList.length; i++){
                            this.checkDetailList[i].imgUrl=this.globe.hostUrl+'/'+this.checkDetailList[i].imgUrl
                        }
                        this.total = response.data.total;
                        this.listLoading = false
                    }
                })
            },
            routeTo(path){
                this.$router.push(path);
            }
        }
    }
</script>

<style scoped>
    .handle-box .search-right .el-tag{
        font-size: 13px;
        color: #555;
    }
</style>
