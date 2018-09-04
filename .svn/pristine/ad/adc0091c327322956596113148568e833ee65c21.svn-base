<template>
    <div>
        <div class="handle-box">
            <div class="search-left"></div>
            <div align="right" class="search-right">
                <el-input v-model="listParam.productName" placeholder="商品名称" @keyup.enter.native="search" class="handle-input"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
        </div>
        <div class="container">
            <el-row :gutter="30">
                <el-col :span="24">
                    <div class="box-content">
                        <div class="goods-box" style="padding: 0">
                            <el-row :gutter="15">
                                <el-col :sm="24" :md="12" :lg="8" :xl="6" v-for="(item,index) in tableData" :key="index">
                                    <div class="grid-content bg-purple">
                                        <div class="good">
                                            <div class="goodImg"><img :src="item.imgUrl"/></div>
                                            <ul class="goodInfo">
                                                <li><h4>{{item.productName}}<span class="spec">（{{item.specification}} {{item.smallUnit}}/{{item.bigUnit}}）</span></h4></li>
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
                </el-col>
            </el-row>
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
    export default {
        mixins: [baseMixin],
        data() {
            return {
                Urls:{
                    tableList:'/commodity/repertory',
                    tableAdd:'',
                    tableUpdate:'',
                    tableDelete:'',
                },
                listParam: {
                    page: 1,
                    pageSize: 10,
                    productName:''
                },
            }
        },
        methods:{
            getTableData() {
                this.listLoading = true;
                request({
                    url:this.Urls.tableList,
                    method: 'get',
                    params: this.listParam
                }).then(response => {
                    if(response.data.code==0){
                        this.tableData = response.data.data;
                        for(var i=0; i<this.tableData.length; i++){
                            this.tableData[i].imgUrl=this.globe.hostUrl+'/'+this.tableData[i].imgUrl
                        }
                        this.total = response.data.total;
                        this.listLoading = false
                    }
                })
            },
        },
    }
</script>

<style scoped>

</style>
