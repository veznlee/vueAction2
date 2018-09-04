<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <div class="search-left">
                    <el-button type="primary" icon="add" @click="handleAdd()">新增</el-button>
                </div>
                <div align="right" class="search-right">
                    <el-input v-model="listParam.condition" placeholder="类型编码/类型名称" @keyup.enter.native="search" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                </div>
            </div>
            <el-table :data="tableData" border style="width: 100%" v-loading="listLoading" element-loading-text="给我一点时间" class="p-table-center" stripe highlight-current-row>
                <el-table-column type="index" :index="indexMethod" fixed align="center" width="50" label="序号"></el-table-column>
                <el-table-column prop="ccode" align="center" label="类型编码" sortable width="150">
                </el-table-column>
                <el-table-column prop="cname" label="类型名称" width="200">
                </el-table-column>
                <el-table-column prop="cdesc" label="类型描述" min-width="200">
                </el-table-column>
                <el-table-column align="center" label="状态" width="80">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.cstatus" @change="statusChange(scope.$index, scope.row)" active-color="#90c31f" inactive-color="#dcdfe6" active-value="2" inactive-value="1"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="140">
                    <template slot-scope="scope">
                        <el-button type="success" plain size="small" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
                        <el-button class="wraning" size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listParam.page" :page-sizes="[10,20,30, 40]" :page-size="listParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog :title="formTitle" :visible.sync="editVisible" width="30%" custom-class="mod-el-dialog" :close-on-click-modal="false">
            <el-form :rules="rules" ref="form" :model="form" label-width="80px">
                <el-form-item label="类型编码">
                    <el-input v-model="form.ccode" disabled placeholder="编码自动生成"></el-input>
                </el-form-item>
                <el-form-item label="类型名称" prop="cname">
                    <el-input v-model="form.cname" maxLength="32"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch v-model="form.cstatus" active-color="#90c31f" inactive-color="#dcdfe6" active-value="2" inactive-value="1"></el-switch>
                </el-form-item>
                <el-form-item label="类型描述" prop="cdesc">
                    <el-input v-model="form.cdesc" :maxLength="100"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="button" @click="editVisible = false">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="addData">确 定</el-button>
                <el-button v-else type="primary" @click="updateData">确 定</el-button>

            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
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
                    tableList:'/sysparameters/list',
                    tableAdd:'/sysparameters/addOrUpdate',
                    tableUpdate:'/sysparameters/addOrUpdate',
                    tableDelete:'/sysparameters/remove',
                    statusList:'/sysparameters/cstatus',
                    isNameRepeat:'/sysparameters/isExist'
                },
                listParam: {
                    ctype: '2',
                    isList:'1'
                },
                form: {
                    ccode:'',
                    cname: '',
                    ctype: '2',
                    cdesc: '',
                    cstatus: 2
                },
                rules:{
                    cname: [
                        { required: true, message: '此字段为必填', trigger: 'blur' },
                        { validator: this.isExist, trigger: 'blur'},
                        { max: 32, message: '最多只能输入32位字符', trigger: 'blur' }
                    ]
                }
            }
        },
        computed:{
        },
        methods:{
            resetForm() {
                this.form = {
                    ccode:'',
                    cname: '',
                    ctype: '2',
                    cdesc: '',
                    cstatus: '2',
                }
            },
            preEdit(guid,item){
                this.historyName=item.cname;
                this.form= {
                    ccode: item.ccode,
                    guid: item.guid,
                    cname: item.cname,
                    cdesc: item.cdesc,
                    cstatus: item.cstatus,
                };
            },
            isExist(rule, value, callback){
                if(this.historyName==value){
                    callback();
                }
                request({
                    url:this.Urls.isNameRepeat,
                    method: 'get',
                    params: {cname:this.form.cname,ctype:'2'}
                }).then(response => {
                    if(response.data.code==0){
                        callback();
                    }else if(response.data.code==100){
                        callback(new Error('类型名称已存在，请重新输入'))
                    }
                })
            }
        }
    }
</script>

<style scoped>
</style>
