<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <div class="search-left">
                    <el-button type="primary" icon="add" @click="handleAdd()">新增</el-button>
                </div>
                <div align="right" class="search-right">
                    <el-select v-model="listParam.flag" placeholder="选择状态" class="handle-Mselect mr10">
                        <el-option label="选择状态" value=""></el-option>
                        <el-option label="启用" value="2"></el-option>
                        <el-option label="禁用" value="1"></el-option>
                    </el-select>
                    <el-input v-model="listParam.condition" placeholder="车牌号/GPS编号" @keyup.enter.native="search" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                </div>
            </div>
            <el-table :data="tableData" stripe border style="width: 100%" element-loading-text="给我一点时间" class="p-table-center" highlight-current-row>
                <el-table-column type="index" :index="indexMethod" fixed align="center" width="50" label="序号"></el-table-column>
                <el-table-column prop="number" label="车牌号" width="200">
                </el-table-column>
                <el-table-column prop="ccode" label="车辆识别代号（VIN）"  min-width="200">
                </el-table-column>
                <el-table-column prop="brand" label="车辆品牌" min-width="120">
                </el-table-column>
                <el-table-column prop="loadWeight" label="载重量（吨）" min-width="120">
                </el-table-column>
                <el-table-column prop="GPSCode" label="GPS编号" min-width="120">
                </el-table-column>
                <el-table-column prop="name" label="司机姓名">
                </el-table-column>
                <el-table-column prop="phone" label="司机联系电话" min-width="120">
                </el-table-column>
                <el-table-column align="center" label="状态" width="80" fixed="right">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.cstatus" @change="statusChange(scope.$index, scope.row)" active-color="#90c31f" inactive-color="#dcdfe6" active-value="2" inactive-value="1"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="140" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="small" type="success" plain @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listParam.page" :page-sizes="[10,20,30,40]" :page-size="listParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>

            <!-- 编辑弹出框 -->
            <el-dialog :title="formTitle" :visible.sync="editVisible" width="40%" custom-class="mod-el-dialog">
                <el-form :rules="rules" ref="form" :model="form" status-icon label-width="120px">
                    <el-row :gutter="10">
                        <el-col :span="10">
                            <div class="grid-content bg-purple">
                                <el-form-item label="车牌号" prop="number">
                                    <el-input v-model="form.number" placeholder="车牌号"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="14">
                            <div class="grid-content bg-purple">
                                <el-form-item label="车辆识别代码" prop="ccode">
                                    <el-input v-model="form.ccode" placeholder="车辆识别代码"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="车辆品牌" prop="brand">
                                    <el-input v-model="form.brand" placeholder="车辆品牌"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="载重量（吨）" prop="loadWeight">
                                    <el-input v-model="form.loadWeight" placeholder="载重量"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="司机姓名" prop="name">
                                    <el-input v-model="form.name" placeholder="司机姓名"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="司机联系电话" prop="phone">
                                    <el-input v-model="form.phone" maxLength="11" placeholder="司机联系电话"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="24">
                            <div class="grid-content bg-purple">
                                <el-form-item label="GPS编号" prop="GPSCode">
                                    <el-input v-model="form.GPSCode" placeholder="GPS编号"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button type="button" @click="editVisible = false">关 闭</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="addData">保 存</el-button>
                <el-button v-else type="primary" @click="updateData">保 存</el-button>
            </span>
            </el-dialog>

            <!-- 删除提示框 -->
            <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
                <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">关 闭</el-button>
                <el-button type="primary" @click="deleteRow">保 存</el-button>
            </span>
            </el-dialog>
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
                    tableList:'',
                },
                listParam: {
                    page: 1,
                    pageSize: 10,
                    flag: '',
                },
                form:{
                    number: '',
                    ccode: '',
                    brand: '',
                    loadWeight: '',
                    GPSCode:'',
                    name:'',
                    phone:'',
                    cstatus: '2',
                },
                tableData: [{
                    number: '贵AVT205',
                    ccode: 'LIUYHJKIUJHG12345',
                    brand: '东风',
                    loadWeight: '20',
                    GPSCode:'KLGH123',
                    name:'张三',
                    phone:'18785632365',
                    cstatus: '2',
                },{
                    number: '贵AVT205',
                    ccode: 'LIUYHJKIUJHG12345',
                    brand: '东风',
                    loadWeight: '20',
                    GPSCode:'KLGH123',
                    name:'张三',
                    phone:'18785632365',
                    cstatus: '2',
                },{
                    number: '贵AVT205',
                    ccode: 'LIUYHJKIUJHG12345',
                    brand: '东风',
                    loadWeight: '20',
                    GPSCode:'KLGH123',
                    name:'张三',
                    phone:'18785632365',
                    cstatus: '1',
                }],
                rules: {
                    number: [
                        { required: true, message: '此字段为必填', trigger: 'blur' },
                        { validator: this.isExist, trigger: 'blur'},
                        { max: 7, message: '最多只能输入7位字符', trigger: 'blur' }
                    ],
                    ccode: [{ required: true, trigger: 'blur' }],
                    brand: [{ required: true, trigger: 'blur' }],
                    loadWeight: [{ required: true, trigger: 'blur' }],
                    GPSCode: [{ required: true, trigger: 'blur' }],
                    name: [{ required: true, trigger: 'blur' }],
                    phone: [{ required: true, validator:this.phoneRule, trigger: 'blur' }],
                },
            }
        },
        created() {
        },
        watch:{},
        computed: {},
        methods: {
            getTableData() {
                this.listLoading = true;
                /*request({
                    url:this.Urls.tableList,
                    method: 'get',
                    params: this.listParam
                }).then(response => {
                    if(response.data.code==0){
                        this.tableData = response.data.data.result;
                        this.total = response.data.total;
                        this.listLoading = false
                    }
                })*/
            },
            addData(){
                this.$refs['form'].validate((valid) => {
                    if(valid){
                        if(this.validTable()) {
                            this.preSubmit();
                            this.tableData.unshift(this.form);
                            this.editVisible = false;
                            this.$notify({
                                title: '成功',
                                message: '创建成功',
                                type: 'success',
                                duration: 2000
                            });
                        }
                    }
                })
            },
            handleUpdate(index, row) {
                this.isSubmit=false;
                this.isAddress=false;
                this.formTitle='编辑';
                this.idx = index;
                this.preEdit(index,row);
                this.dialogStatus = 'update';
                this.form=Object.assign({},row);
                this.editVisible = true;
                this.$nextTick(() => {
                    this.$refs['form'].clearValidate()
                });
            },
            updateData() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        if (this.validTable()) {
                            this.preSubmit();
                            this.$set(this.tableData, this.idx, this.form);
                            this.editVisible = false;
                            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                        }
                    }
                })
            },
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            },
        }
    }
</script>

<style scoped>
</style>
