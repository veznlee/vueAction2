<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <div class="search-left">
                    <el-button type="primary" icon="add" @click="handleAdd()">新增商品盘点</el-button>
                </div>
                <div align="right" class="search-right">
                    <el-select v-model="listParam.refZhccStore" placeholder="仓库" class="handle-select mr10" @change="search">
                        <el-option label="选择仓库" value=""></el-option>
                        <el-option v-for="item in storeSelectList" :key="item.guid" :label="item.cname" :value="item.guid"></el-option>
                    </el-select>
                    <el-date-picker v-model="listParam.date" type="date" placeholder="盘点时间" value-format="yyyy-MM-dd" @change="search"></el-date-picker>
                    <el-input v-model="listParam.realName" placeholder="盘点人" @keyup.enter.native="search" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                </div>
            </div>
            <div class="layout-content content-green" style="padding: 0">
                <el-row :gutter="20">
                    <el-col :span="12" v-for="(item,index) in storeCheckList" :key="index" style="margin-bottom: 20px" v-loading="listLoading" element-loading-text="给我一点时间">
                        <div class="grid-content bg-purple">
                            <div class="box-title">
                                <h4>{{item.storeName}}</h4>
                                <div class="more"><span class="mr10">{{item.realName}}</span>{{moment(item.createtime).format('YYYY-MM-DD')}}</div>
                            </div>
                            <div class="box-content">
                                <div class="box-content-wrap">
                                    <div class="box-content-l">
                                        <p><i class="iconfont icon-chengpinku"></i></p>
                                        <el-button type="info" @click="viewCheck(index)">查看</el-button>
                                    </div>
                                    <div class="box-content-r box-common">
                                        <h4>损益商品</h4>
                                        <div class="m-box">
                                            <p>{{item.spoiledNum}}</p>
                                        </div>
                                    </div>
                                    <div class="box-content-r box-common">
                                        <h4>全部商品</h4>
                                        <div class="m-box">
                                            <p>{{item.productNum}}</p>
                                        </div>
                                    </div>
                                    <div class="box-content-r box-common">
                                        <h4>盘点商品</h4>
                                        <div class="m-box">
                                            <p>{{Number(item.productNum)-Number(item.uncheckNum)}}</p>
                                        </div>
                                    </div>
                                    <div class="box-content-r box-common">
                                        <h4>未盘点商品</h4>
                                        <div class="m-box">
                                            <p>{{item.uncheckNum}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listParam.page" :page-sizes="[10,20,30, 40]" :page-size="listParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="选择盘点范围" :visible.sync="editVisible" width="30%" custom-class="mod-el-dialog" :close-on-click-modal="false">
            <el-form :rules="rules" ref="form" :model="form" status-icon label-width="100px">
                <el-form-item label="全部仓库" prop="refZhccStore">
                    <el-select v-model="form.refZhccStore" placeholder="仓库名称" style="width: 100%">
                        <el-option v-for="item in storeSelectList" :key="item.guid" :label="item.cname" :value="item.guid"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="button" @click="editVisible = false">返 回</el-button>
                <el-button type="primary" @click="editCheck">盘点商品</el-button>
            </span>
        </el-dialog>
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
                    tableList:'/zhccStocktaking/getAll',
                    storeSelect:'/zhccstore/chooseStore',
                    storeCheckAdd:'/zhccStocktaking/getInitDataByStore'
                },
                listParam: {
                    page: 1,
                    pageSize: 10,
                    refZhccStore: '',
                    refZhccRegionConfig:'',
                    realName:'',
                    date:'',
                },
                storeCheckList:[],
                storeSelectList:[],
                form: {
                    refZhccStore:''
                },
                rules: {
                    refZhccStore: [{ required: true, message: '请选择你需要盘点的仓库', trigger: 'change' }],
                },
            }
        },
        created() {
            this.getStoreSelect()
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
                        this.storeCheckList=response.data.data;
                        this.total = response.data.total;
                        this.listLoading = false;
                    }
                })
            },
            getStoreSelect(){
                request({
                    url:this.Urls.storeSelect,
                    method: 'get',
                    params: {}
                }).then(response => {
                    if(response.data.code==0){
                        this.storeSelectList=response.data.data
                    }
                })
            },
            editCheck(){
                this.$refs['form'].validate((valid) => {
                    if(valid){
                        request({
                            url:this.Urls.storeCheckAdd,
                            method: 'get',
                            params: this.form
                        }).then(response => {
                            if(response.data.code==0){
                                sessionStorage.setItem("refZhccStore", this.form.refZhccStore);
                                this.$router.push({path:'/storeCheck_edit',query:{refZhccStore:this.form.refZhccStore}});
                                this.editVisible=false;
                            }
                        })
                    }
                })
            },
            viewCheck(index){
                this.$router.push(
                    {
                        path:'/storeCheck_view',
                        query:{
                            guid:this.storeCheckList[index].guid,
                            productNum:this.storeCheckList[index].productNum,
                            spoiledNum:this.storeCheckList[index].spoiledNum,
                            storeName:this.storeCheckList[index].storeName,
                            createtime:this.storeCheckList[index].createtime,
                            realName:this.storeCheckList[index].realName,
                        }
                    }
                );
                sessionStorage.setItem("guid", this.storeCheckList[index].guid);
                sessionStorage.setItem("productNum", this.storeCheckList[index].productNum);
                sessionStorage.setItem("spoiledNum", this.storeCheckList[index].spoiledNum);
                sessionStorage.setItem("storeName", this.storeCheckList[index].storeName);
                sessionStorage.setItem("createtime", this.storeCheckList[index].createtime);
                sessionStorage.setItem("realName", this.storeCheckList[index].realName);
            },
        }
    }
</script>

<style scoped>
</style>
