<template>
    <div class="table">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <div class="layout-wrap layout-blue">
                        <div class="layout-title">
                            <h4>出库单量走势</h4>
                            <div class="layout-title-r">
                                <el-select v-model="countParam.flag" placeholder="出库类型" class="handle-Mselect mr10" @change="initCountChart">
                                    <el-option label="销售出库" value="3"></el-option>
                                    <el-option label="生产出库" value="4"></el-option>
                                </el-select>
                                <el-date-picker v-model="countParam.date" type="month" placeholder="选择月" value-format="yyyy-MM" class="handle-date" :clearable="false" @change="initCountChart"></el-date-picker>
                            </div>
                        </div>
                        <div class="layout-content content-blue">
                            <div class="grid-content bg-purple">
                                <div id="countAnalyze" style="width: 100%; height: 300px"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <div class="layout-wrap layout-green">
                        <div class="layout-title">
                            <h4>出库商品走势</h4>
                            <div class="layout-title-r">
                                <el-select v-model="proParam.flag" placeholder="出库类型" class="handle-Mselect mr10" @change="initProChart">
                                    <el-option label="销售出库" value="3"></el-option>
                                    <el-option label="生产出库" value="4"></el-option>
                                </el-select>
                                <el-select v-model="proParam.type" placeholder="月度走势" class="handle-Mselect mr10" @change="initProChart">
                                    <el-option label="月度走势" value="0"></el-option>
                                    <el-option label="年度走势" value="1"></el-option>
                                </el-select>
                                <el-button type="success" plain class="mr10" @click="changePro()">切换商品</el-button>
                                <el-date-picker v-model="yearDate" type="year" placeholder="选择年" value-format="yyyy" :clearable="false" class="handle-date" v-show="showYear" @change="initProChart"></el-date-picker>
                                <el-date-picker v-model="monthDate" type="month" placeholder="选择月" value-format="yyyy-MM" :clearable="false" class="handle-date" v-show="showMonth" @change="initProChart"></el-date-picker>
                            </div>
                        </div>
                        <div class="layout-content content-blue">
                            <div id="productAnalyze" style="width: 100%; height: 300px"></div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <div class="layout-wrap layout-blue">
                        <div class="layout-title">
                            <h4>客户购买分析</h4>
                            <div class="layout-title-r">
                                <el-button type="success" plain class="mr10" @click="changeCustomer()">切换客户</el-button>
                                <el-date-picker v-model="customerParam.date" type="date" placeholder="选择月" value-format="yyyy-MM-dd" :clearable="false" class="handle-date" @change="initCustomerChart"></el-date-picker>
                            </div>
                        </div>
                        <div class="layout-content content-blue">
                            <div id="customerAnalyze" style="width: 100%; height: 300px"></div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>

        <!-- 商品弹出框 -->
        <el-dialog :title="formTitle" :visible.sync="editVisible" width="50%" custom-class="mod-el-dialog">
            <div class="handle-box">
                <div align="right" class="search-right">
                    <el-select v-model="listParam.refSysParam" placeholder="商品类别" class="handle-select" @change="search">
                        <el-option label="选择商品类别" value=""></el-option>
                        <el-option v-for="item in typeList" :key="item.guid" :label="item.cname" :value="item.guid"></el-option>
                    </el-select>
                    <el-input v-model="listParam.condition" placeholder="商品编码/商品名称" @keyup.enter.native="search" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                </div>
            </div>
            <el-table :data="tableData" stripe border style="width: 100%" @selection-change="handleSelectionChange" v-loading="listLoading" element-loading-text="给我一点时间">
                <el-table-column width="55" align="center" fixed label="选择">
                    <template slot-scope="scope">
                        <el-radio class="radio" v-model="radioPro" :label="scope.row.guid" @change="radioChange(scope.$index, scope.row)">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column type="index" :index="indexMethod" fixed align="center" width="50" label="序号"></el-table-column>
                <el-table-column prop="ccode" label="商品编码" align="center" width="120">
                </el-table-column>
                <el-table-column prop="cname" label="商品名称" min-width="200">
                </el-table-column>
                <el-table-column prop="refSysParam" label="商品类别" width="120" align="center">
                </el-table-column>
                <el-table-column label="商品规格" width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.pdSpecification }}</span>
                        <span>{{ scope.row.pdSpecificationSUnit }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="包装规格" width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.packSpecification }}</span>
                        <span>{{ scope.row.packSpecificationBUnit }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listParam.page" :page-sizes="[10,20,30, 40]" :page-size="listParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="button" @click="editVisible = false">关闭</el-button>
                <el-button type="primary" @click="getProGuid">保存</el-button>
            </span>
        </el-dialog>

        <!-- 客户弹出框 -->
        <el-dialog title="选择客户" :visible.sync="editCusVisible" width="50%" custom-class="mod-el-dialog">
            <div class="handle-box">
                <div align="right" class="search-right">
                    <el-input v-model="cusParam.condition" placeholder="联系人/企业名称/联系电话" @keyup.enter.native="searchClient" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="searchClient">搜索</el-button>
                </div>
            </div>
            <el-table :data="cusData" stripe border style="width: 100%" @selection-change="handleSelectionChange" v-loading="listLoading" element-loading-text="给我一点时间">
                <el-table-column width="55" align="center" fixed label="选择">
                    <template slot-scope="scope">
                        <el-radio class="radio" v-model="radioCus" :label="scope.row.guid" @change="cusChange(scope.$index, scope.row)">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column type="index" :index="cusindexMethod" fixed align="center" width="50" label="序号"></el-table-column>
                <el-table-column prop="cpName" label="企业名称" min-width="200"></el-table-column>
                <el-table-column prop="name" label="联系人" width="150" align="center"></el-table-column>
                <el-table-column prop="phone" label="联系电话" width="200" align="center"></el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @size-change="handleCusSizeChange" @current-change="handleCusCurrentChange" :current-page="cusParam.page" :page-sizes="[10,20,30, 40]" :page-size="cusParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="CusTotal">
                </el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="button" @click="editCusVisible = false">关闭</el-button>
                <el-button type="primary" @click="getCusGuid">保存</el-button>
            </span>
        </el-dialog>
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
                    tableList:'/zhccproduct/list',
                    customerList:'/zhcccustomer/list',
                    countList:'/dataAnalyze/getOrderCount',
                    proList:'/dataAnalyze/getProductSum',
                    cusList:'/dataAnalyze/getCustomerData',
                },
                listParam: {
                    page: 1,
                    pageSize: 10,
                    condition:'',
                    refSysParam:'',
                    cstatus:''
                },
                cusParam: {
                    page: 1,
                    pageSize: 10,
                    ctype:'',
                    province:'',
                    district:'',
                    name:'',
                    cpName:'',
                    condition:''
                },
                editCusVisible:false,
                cusData:[],
                countParam:{
                    date:this.moment().format('YYYY-MM'),
                    flag:'3'
                },
                xCount:[],
                yCount:[],
                xPro:[],
                yPro:[],
                xCustomer:[],
                yCustomer:[],
                zCustomer:[],
                yearDate:this.moment().format('YYYY'),
                monthDate:this.moment().format('YYYY-MM'),
                proName:'',
                proLegend:[],
                proUnit:'',
                cusUnit:'',
                cusTName:'',
                cusLegend:[],
                typeList:[],
                proParam:{
                    date:this.moment().format('YYYY'),
                    flag:'3',
                    type:'1',
                    pdGuid:''
                },
                customerParam:{
                    date:this.moment().format('YYYY-MM-DD'),
                    customerGuid:'',
                },
                radioPro:'',
                radioCus:'',
                showYear:true,
                showMonth:false,
                CusTotal:''
            }
        },
        created() {
            this.getCusData()
            this.getOneCus()
            this.getOnePro()
        },
        mounted() {
            this.$nextTick(function() {
                this.initCountChart();
            })
        },
        watch:{},
        computed: {},
        methods: {
            initCountChart(){
                var myChart = echarts.init(document.getElementById('countAnalyze'));
                request({
                    url:this.Urls.countList,
                    method: 'get',
                    params: this.countParam
                }).then(response => {
                    if(response.data.code==0){
                        let conStr=[];
                        for(let i=1; i<response.data.data.length+1; i++){
                            conStr.push(i+'日')
                        }
                        this.xCount=conStr;
                        this.yCount=response.data.data;
                        myChart.setOption({
                            color:['#3B9DFC'],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'line',
                                    lineStyle: {
                                        type: 'dashed',
                                        color: '#3B9DFC'
                                    }
                                },
                            },
                            legend: {
                                data:['出库单量'],
                            },
                            grid: {
                                top:'12%',
                                left: '2%',
                                right: '2%',
                                bottom: '1%',
                                containLabel: true
                            },
                            xAxis: {
                                type: 'category',
                                axisLine: {show: false},
                                axisTick:{show:false},
                                data: this.xCount,
                            },
                            yAxis: {
                                name: '出库数量（单）',
                                type: 'value',
                                axisLine: {show: false},
                                axisTick:{show:false}
                            },
                            series: [{
                                name:'出库单量',
                                data: this.yCount,
                                type: 'line',
                                smooth: true,
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(59, 157, 252, 0.3)'
                                        }, {
                                            offset: 0.8,
                                            color: 'rgba(59, 157, 252, 0)'
                                        }], false),
                                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                                        shadowBlur: 10
                                    }
                                },
                            }]
                        });
                    }
                })
            },
            initProChart(){
                if(this.proParam.type==0){
                    this.showMonth=true
                    this.showYear=false
                    this.proParam.date=this.monthDate
                }else if(this.proParam.type==1){
                    this.showYear=true
                    this.showMonth=false
                    this.proParam.date=this.yearDate
                }
                var proChart = echarts.init(document.getElementById('productAnalyze'));
                request({
                    url:this.Urls.proList,
                    method: 'get',
                    params: this.proParam
                }).then(response => {
                    if(response.data.code==0){
                        let proStr=[];
                        for(let i=1; i<response.data.data.length+1; i++){
                            if(response.data.data.length==12){
                                proStr.push(i+'月')
                            }else{
                                proStr.push(i+'日')
                            }
                        }
                        this.xPro=proStr;
                        this.yPro=response.data.data;
                        proChart.setOption({
                            title: {
                                text: this.proName,
                                left: 'center',
                                textStyle: {
                                    fontSize: 14,
                                    fontWeight: 'lighter',
                                    color: '#333'
                                },
                            },
                            color:['#A6CF4C'],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'line',
                                    lineStyle: {
                                        type: 'dashed',
                                        color: '#A6CF4C'
                                    }
                                },
                            },
                            legend: {
                                data:this.proLegend,
                            },
                            grid: {
                                top:'12%',
                                left: '2%',
                                right: '2%',
                                bottom: '1%',
                                containLabel: true
                            },
                            xAxis: {
                                type: 'category',
                                axisLine: {show: false},
                                axisTick:{show:false},
                                data: this.xPro
                            },
                            yAxis: {
                                name: '出库数量（'+this.proUnit+'）',
                                type: 'value',
                                axisLine: {show: false},
                                axisTick:{show:false},
                            },
                            series: [{
                                name:'出库数量',
                                data: this.yPro,
                                type: 'line',
                                smooth: true,
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(137, 189, 27, 0.3)'
                                        }, {
                                            offset: 0.8,
                                            color: 'rgba(137, 189, 27, 0)'
                                        }], false),
                                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                                        shadowBlur: 10
                                    }
                                },
                            }]
                        });
                    }
                })
            },
            initCustomerChart(){
                var customerChart = echarts.init(document.getElementById('customerAnalyze'));
                request({
                    url:this.Urls.cusList,
                    method: 'get',
                    params: this.customerParam
                }).then(response => {
                    if(response.data.code==0){
                        let xCusStr=[]; let yCusStr=[]; let zCusStr=[];
                        for(let i=0; i<response.data.data.length; i++){
                            xCusStr.push(response.data.data[i].name)
                            yCusStr.push(response.data.data[i].sum)
                            zCusStr.push(response.data.data[i].type)
                            this.zCustomer.push(response.data.data[i].type)
                        }
                        this.xCustomer=xCusStr;
                        this.yCustomer=yCusStr;
                        this.zCustomer=zCusStr;
                        function res(arr) {
                            var tmp = [];
                            for(var i in arr) {
                                if (tmp.indexOf(arr[i]) == -1) {
                                    tmp.push(arr[i]);
                                }
                            }
                            return tmp
                        }
                        var result = res(zCusStr);
                        customerChart.setOption({
                            title: {
                                text: this.cusName,
                                left: 'center',
                                textStyle: {
                                    fontSize: 14,
                                    fontWeight: 'lighter',
                                    color: '#333'
                                },
                            },
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {
                                    type : 'shadow'
                                },
                                formatter: function (datas) {
                                    var res = datas[0].name + '<br/>';
                                    for (var i = 0, length = datas.length; i < length; i++) {
                                        res += datas[i].seriesName + '：'
                                            + datas[i].data + '<br/>'
                                    }
                                    return res
                                }
                            },
                            grid: {
                                top:'12%',
                                left: '2%',
                                right: '1%',
                                bottom: '1%',
                                containLabel: true
                            },
                            xAxis : [
                                {
                                    type : 'category',
                                    data : this.xCustomer,
                                    axisTick: {
                                        alignWithLabel: true
                                    },
                                    axisLine: {show: false},
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value',
                                    name: '商品数量',
                                    axisLine: {show: false},
                                    axisTick:{show:false},
                                }
                            ],
                            series : [
                                {
                                    name:'商品类型',
                                    type:'bar',
                                    barWidth:30,
                                    barGap:-1,
                                    data:this.zCustomer
                                },
                                {
                                    name:'购买数量',
                                    type:'bar',
                                    barWidth:30,
                                    data: this.yCustomer,
                                    itemStyle:{
                                        normal:{
                                            color:function (params) {
                                                var colorList = [
                                                    '#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3',
                                                    '#B74AE5','#0AAF9F','#E89589'
                                                ];
                                                return colorList[params.dataIndex]
                                            }
                                        }
                                    }
                                },
                            ]
                        });
                    }
                })
            },
            getOnePro(){
                this.listLoading = true;
                request({
                    url:this.Urls.tableList,
                    method: 'get',
                    params: this.listParam
                }).then(response => {
                    if(response.data.code==0){
                        this.listLoading = false;
                        this.proParam.pdGuid=response.data.data[0].guid;
                        this.proLegend.push(response.data.data[0].cname);
                        this.proName=response.data.data[0].cname;
                        this.proUnit=response.data.data[0].pdSpecificationSUnit;
                        this.radioPro=response.data.data[0].guid;
                        this.initProChart();
                    }
                })
            },
            getTableData() {
                this.listLoading = true;
                request({
                    url:this.Urls.tableList,
                    method: 'get',
                    params: this.listParam
                }).then(response => {
                    if(response.data.code==0){
                        this.listLoading = false;
                        this.tableData = response.data.data;
                        this.total = response.data.total;
                    }
                })
            },
            changePro(){
                this.formTitle='选择商品';
                this.editVisible = true;
                this.getTypeList()
            },
            changeCustomer(){
                this.editCusVisible = true;
            },
            getOneCus(){
                this.listLoading = true;
                request({
                    url:this.Urls.customerList,
                    method: 'get',
                    params: this.cusParam
                }).then(response => {
                    if(response.data.code==0){
                        this.listLoading = false;
                        this.customerParam.customerGuid=response.data.data[0].guid;
                        this.cusName=response.data.data[0].cpName;
                        this.radioCus=response.data.data[0].guid;
                        this.initCustomerChart();
                    }
                })
            },
            getCusData() {
                this.listLoading = true;
                request({
                    url:this.Urls.customerList,
                    method: 'get',
                    params: this.cusParam
                }).then(response => {
                    if(response.data.code==0){
                        this.listLoading = false;
                        this.cusData = response.data.data;
                        this.CusTotal = response.data.total;
                    }
                })
            },
            handleSelectionChange(val) {
            },
            radioChange(index,row){
                this.proParam.pdGuid=row.guid;
                this.proLegend.push(row.cname);
                this.proName=row.cname;
                this.proUnit=row.pdSpecificationSUnit;
            },
            cusChange(index,row){
                this.customerParam.customerGuid=row.guid;
                this.cusName=row.cpName;
            },
            getProGuid(){
                this.initProChart();
                this.editVisible = false;
            },
            getCusGuid(){
                this.initCustomerChart();
                this.editCusVisible = false;
            },
            //客户分页导航
            handleCusCurrentChange(val) {
                this.cusParam.page = val;
                this.getCusData();
            },
            handleCusSizeChange(val) {
                this.cusParam.pageSize = val;
                this.getCusData();
            },
            //商品类别下拉数据
            getTypeList(){
                request({
                    url: '/zhccproduct/type',
                    method: 'get',
                    params: {}
                }).then(response =>{
                    if(response.data.code==0){
                        this.typeList=response.data.data;
                        this.userFormList=response.data.data;
                    }
                })
            },
            //客户搜索
            searchClient() {
                this.listParam.page=1;
                this.getCusData();
            },

            cusindexMethod(index){
                return index + (this.cusParam.page - 1) * this.cusParam.pageSize + 1;
            },
        }
    }
</script>

<style scoped>
    .handle-date{
        width: 140px;
    }
    .handle-Mselect{
        width: 200px;
    }
</style>
