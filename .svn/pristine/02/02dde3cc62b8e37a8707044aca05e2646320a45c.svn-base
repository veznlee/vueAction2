<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <div class="search-left">
                    <span class="mr10">日期：{{listParam.startTime}} - {{listParam.endTime}}</span>
                    <span class="ml10">出库次数：{{number}}</span>
                </div>
                <div align="right" class="search-right">
                    <el-button type="success" icon="el-icon-download" @click="handleDownload" :loading="downloadLoading" class="mr10">导出</el-button>
                    <el-date-picker v-model="dateValue" type="daterange" align="right" value-format="yyyy-MM-dd" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" @change="dateChange">
                    </el-date-picker>
                    <el-select v-model="listParam.flag" placeholder="出库类型" class="handle-select mr10" @change="search">
                        <el-option label="销售出库" value="3"></el-option>
                        <el-option label="生产出库" value="4"></el-option>
                    </el-select>
                    <el-input v-model="listParam.condition" placeholder="商品名称/商品类别" @keyup.enter.native="search" class="handle-input"></el-input>
                    <el-button type="primary" @click="search">搜索</el-button>
                </div>
            </div>
            <el-table :data="tableData" stripe border style="width: 100%" v-loading="listLoading" element-loading-text="给我一点时间" class="p-table-center"  highlight-current-row>
                <el-table-column type="index" :index="indexMethod" fixed align="center" width="50" label="序号"></el-table-column>
                <el-table-column prop="type" label="商品类别" width="200">
                </el-table-column>
                <el-table-column prop="name" label="商品名称" min-width="200" align="left">
                </el-table-column>
                <el-table-column prop="specification" label="商品规格" width="200">
                    <template slot-scope="scope">
                        <span>{{ scope.row.specification }}{{scope.row.smallUnit}}/{{scope.row.bigUnit}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="sum" label="出库数量" width="120">
                </el-table-column>
                <el-table-column prop="allSum" label="剩余库存" min-width="120">
                </el-table-column>
            </el-table>
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
                hostPrefix:'http://prc33.858.im',
                Urls:{
                    tableList:'/dataAnalyze/getDataTable',
                    exportExcelUrl:'/dataAnalyze/getExcel'
                },
                listParam: {
                    page: 1,
                    pageSize: 10,
                    startTime:'2018-01-01',
                    endTime:this.moment().format('YYYY-MM-DD'),
                    flag: '',
                    type:'out'
                },
                number:'',
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                dateValue: [],
                downloadLoading:false,
                filename: '出库统计列表'
            }
        },
        created() {
        },
        watch:{},
        computed: {},
        methods: {
            getTableData() {
                this.listLoading = true;
                request({
                    url:this.Urls.tableList,
                    method: 'get',
                    params: this.listParam
                }).then(response => {
                    if(response.data.code==0){
                        this.tableData = response.data.data.result;
                        this.number=response.data.data.number;
                        this.total = response.data.total;
                        this.listLoading = false
                    }
                })
            },
            dateChange(val){
                this.listParam.startTime=val[0]
                this.listParam.endTime=val[1]
                this.getTableData();
            },
            // 导出excel表
            handleDownload() {
                this.downloadLoading = true;
                window.open(this.hostPrefix+this.Urls.exportExcelUrl+'?accessToken='+localStorage.getItem("accessToken")+'&startTime='+this.listParam.startTime+'&endTime='+this.listParam.endTime+'&flag='+this.listParam.flag+'&type='+this.listParam.type+'&condition='+this.listParam.condition);
                this.downloadLoading = false;
                /*import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['商品类别', '商品名称', '商品规格', '出库数量', '剩余库存']
                    const filterVal = ['type', 'name', 'specification', 'sum', 'allSum']
                    const list = this.tableData;
                    const data = this.formatJson(filterVal, list);
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: this.filename
                    });
                    this.downloadLoading = false
                })*/
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            }
        }
    }
</script>

<style scoped>
</style>
