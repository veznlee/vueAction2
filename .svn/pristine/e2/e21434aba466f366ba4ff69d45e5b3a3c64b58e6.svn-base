<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <div class="search-left">
                    <el-button type="info" icon="el-icon-back" @click="routeTo('/storeCheck')">返 回</el-button>
                </div>
                <div align="right" class="search-right">
                    <el-button type="primary" @click="CheckSubmit">提交盘点</el-button>
                </div>
            </div>
            <el-table :data="tableData" stripe border style="width: 100%" v-loading="listLoading" element-loading-text="给我一点时间" class="p-table-center" highlight-current-row>
                <el-table-column type="index" :index="indexMethod" fixed width="50" label="序号"></el-table-column>
                <el-table-column label="商品编码" width="140" prop="ccode"></el-table-column>
                <el-table-column label="商品名称" width="140" prop="cname"></el-table-column>
                <el-table-column label="商品类别" width="140" prop="typeName"></el-table-column>
                <el-table-column label="商品规格" width="100" prop="productUnit"></el-table-column>
                <el-table-column label="包装规格" width="100" prop="packageUnit"></el-table-column>
                <el-table-column label="所在位置" width="250">
                    <template slot-scope="scope">
                        <span>{{scope.row.storeName}}-{{scope.row.regionName}}-{{scope.row.regionInfoCode}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="商品数量" width="100" prop="productNum"></el-table-column>
                <el-table-column label="实盘数量" width="160">
                    <template slot-scope="scope">
                        <el-input type="number" v-model="scope.row.realNum"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="损益数量" width="100">
                    <template slot-scope="scope">
                        <span>{{handleSum(scope.$index, scope.row)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="损益原因" min-width="200">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.cdesc"></el-input>
                    </template>
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
                Urls:{
                    tableList:'/zhccStocktaking/getInitDataByStore',
                    checkAdd:'/zhccStocktaking/add'
                },
                listParam: {
                    page: 1,
                    pageSize: 10,
                    refZhccStore: '',
                },
                form: {
                    refZhccStore:'',
                    stocktakingList:[]
                },
                rules: {
                    cname: [{ required: true, message: '此字段为必填', trigger: 'blur' }],
                },
            }
        },
        created() {},
        activated(){
            this.listParam.refZhccStore=this.$route.query.refZhccStore;
            this.getTableData();
        },
        computed: {},
        methods: {
            getTableData() {
                if(this.listParam.refZhccStore==''){
                    this.listParam.refZhccStore=sessionStorage.getItem("refZhccStore")
                }else{
                    this.listParam.refZhccStore=this.$route.query.refZhccStore
                }
                this.listLoading = true;
                request({
                    url:this.Urls.tableList,
                    method: 'get',
                    params: this.listParam
                }).then(response => {
                    if(response.data.code==0){
                        this.tableData=response.data.data;
                        this.total = response.data.total;
                        this.listLoading = false
                    }
                })
            },
            CheckSubmit(){
                for(var i=0; i<this.tableData.length; i++){
                    this.form.refZhccStore=this.$route.query.refZhccStore;
                    console.log(this.tableData[i])
                    this.form.stocktakingList[i]={
                        realNum: this.tableData[i].realNum,
                        refZhccProductHouseInout: this.tableData[i].refZhccProductHouseInout,
                        productNum: this.tableData[i].productNum,
                        cdesc: this.tableData[i].cdesc
                    }
                }
                var data=this.form
                request({
                    url:this.Urls.checkAdd,
                    method: 'post',
                    data
                }).then(response => {
                    if(response.data.code==0){
                        this.$notify({
                            title: '成功',
                            message: '盘点成功',
                            type: 'success',
                            duration: 2000,
                        });
                        this.$router.push('/storeCheck');
                    }
                })
            },
            handleSum(index,row){
                if(typeof row.realNum=='undefined'){
                    return ''
                }else{
                    if(Number(row.realNum) > Number(row.productNum)){
                        return '+'+(Number(row.realNum)-Number(row.productNum))
                    }else{
                        return Number(row.realNum)-Number(row.productNum)
                    }

                }
            },
            routeTo(path){
                this.$router.push(path);
            }
        }
    }
</script>

<style scoped>
</style>
