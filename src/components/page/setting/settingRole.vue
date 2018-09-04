<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <div class="search-left">
                    <el-button type="primary" @click="handleAdd()">新增</el-button>
                </div>
                <div align="right" class="search-right">
                    <el-input v-model="listParam.condition" placeholder="角色编码/角色名称" @keyup.enter.native="search" class="handle-input"></el-input>
                    <el-button type="primary" @click="search">搜索</el-button>
                </div>
            </div>
            <el-table :data="tableData" stripe border style="width: 100%" v-loading="listLoading" element-loading-text="给我一点时间" highlight-current-row>
                <el-table-column type="index" fixed :index="indexMethod" fixed align="center" width="50" label="序号"></el-table-column>
                <el-table-column prop="ccode" label="角色编码" width="180">
                </el-table-column>
                <el-table-column prop="cname" label="角色名称" width="200">
                </el-table-column>
                <el-table-column prop="cdesc" label="职能描述" min-width="400">
                </el-table-column>
                <el-table-column label="操作" align="center" width="230" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="small" type="default" @click="handleAuth(scope.$index, scope.row)">权限配置</el-button>
                        <el-button size="small" type="success" plain @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
            <el-form :rules="rules" ref="form" :model="form" status-icon label-width="80px">
                <el-form-item label="角色编码">
                    <el-input v-model="form.ccode" disabled placeholder="角色编码自动生成"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="cname">
                    <el-input v-model="form.cname"placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item label="职能描述">
                    <el-input v-model="form.cdesc" :maxLength="50"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="button" @click="editVisible = false">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="addData">确 定</el-button>
                <el-button v-else type="primary" @click="updateData">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 权限配置弹出框 -->
        <el-dialog title="权限配置" :visible.sync="authVisible" width="20%" custom-class="mod-el-dialog" :close-on-click-modal="false">
            <el-form :rules="rules" ref="form" :model="form" status-icon label-width="80px">
                <el-tree
                    ref="tree"
                    :data="treeData"
                    show-checkbox
                    node-key="id"
                    highlight-current
                    :props="defaultProps">
                </el-tree>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="button" @click="authVisible = false">取 消</el-button>
                <el-button type="primary" @click="AuthData">确 定</el-button>
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
    import { tableList, tableAdd, tableUpdate, tableDelete, treeList, treeAdd, isNameRepeat} from '../../../api/role'
    export default {
        data() {
            return {
                tableData: [],
                total: 0,
                listParam: {
                    page: 1,
                    pageSize: 10,
                    condition:''
                },
                listLoading: false,
                dialogStatus: '',
                formTitle:'',
                editVisible: false,
                delVisible: false,
                authVisible: false,
                form: {
                    ccode:'',
                    cname: '',
                    cdesc: ''
                },
                existParam:{
                    cname:''
                },
                roleList:[],
                departList:[],
                treeList:{guid:''},
                treeSubmit:{
                    userId:'',
                    permIds:[]
                },
                idx: -1,
                rules: {
                    cname: [
                        { required: true, message: '此字段为必填', trigger: 'blur' },
                        { validator: this.isExist, trigger: 'blur'},
                        { max: 32, message: '最多只能输入32位字符', trigger: 'blur' }
                    ]
                },
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                historyName:''
            }
        },
        created() {
            this.getTableData();
        },
        computed: {
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.listParam.page = val;
                this.getTableData();
            },
            handleSizeChange(val) {
                this.listParam.pageSize = val;
                this.getTableData()
            },
            getTableData() {
                this.listLoading = true;
                tableList(this.listParam).then(response => {
                    if(response.data.code==0){
                        this.tableData = response.data.data;
                        this.total = response.data.total;
                        this.listLoading = false
                    }
                })
            },
            indexMethod(index){
                return index + (this.listParam.page - 1) * 10 + 1;
            },
            //搜索
            search() {
                this.listParam.page=1;
                this.getTableData();
            },
            //表单添加
            handleAdd(){
                this.formTitle='添加'
                this.form={
                    ccode:'',
                    cname: '',
                    cdesc: ''
                };
                this.dialogStatus = 'create';
                this.editVisible = true;
                this.$nextTick(() => {
                    this.$refs['form'].clearValidate()
                })
            },
            addData(){
                this.$refs['form'].validate((valid) => {
                    if(valid){
                        tableAdd(this.form).then(response => {
                            if(response.data.code==0){
                                this.getTableData();
                                this.editVisible = false;
                                this.$notify({
                                    title: '成功',
                                    message: '创建成功',
                                    type: 'success',
                                    duration: 2000
                                })
                            }
                        })
                    }
                })
            },
            //表单编辑
            handleUpdate(index, row) {
                this.formTitle='编辑';
                this.idx = index;
                this.historyName=row.cname;
                this.form= {
                    guid: row.guid,
                    ccode: row.ccode,
                    cname: row.cname,
                    cdesc: row.cdesc
                }
                this.dialogStatus = 'update';
                this.editVisible = true;
                this.$nextTick(() => {
                    this.$refs['form'].clearValidate()
                })
            },
            // 保存编辑
            updateData() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        tableUpdate(this.form).then(response => {
                            if (response.data.code == 0) {
                                this.getTableData();
                                this.editVisible = false;
                                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                            }
                        })
                    }
                })
            },
            //表单删除
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
                const item = this.tableData[index];
                this.delete = {
                    guid:item.guid,
                }
            },
            // 确定删除
            deleteRow(){
                tableDelete(this.delete).then(response => {
                    if(response.data.code==0){
                        let delPage=(this.total-1)%this.listParam.pageSize
                        if(delPage==0){
                            if(this.listParam.page !=1){
                                this.listParam.page=this.listParam.page-1
                            }
                        }
                        this.getTableData();
                        this.$message.success('删除成功');
                        this.delVisible = false;
                    }else if(response.data.code==56){
                        this.$message.error(response.data.msg);
                    }
                })
            },
            //权限配置
            handleAuth(index,row){
                this.authVisible=true
                this.idx = index;
                const item = this.tableData[index];
                this.treeParam={guid:item.guid}
                treeList(this.treeParam).then(response =>{
                    if(response.data.code==0){
                        this.treeData=response.data.data;
                        var resDate=response.data.data;
                        let keys = []
                        function array(data) {
                            for(let i=0; i<data.length; i++){
                                var key=data[i]
                                if(key.children){
                                    array(key.children);
                                }else{
                                    if(key.checked==true){
                                        keys.push(key.id)
                                    }
                                }
                            }
                        }
                        array(resDate);
                        this.$refs.tree.setCheckedKeys(keys)
                    }
                })
                this.treeSubmit={
                    roleId:item.guid,
                    permIds:[]
                };
            },
            AuthData(){
                this.treeSubmit.permIds=this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
                treeAdd(this.treeSubmit).then(response =>{
                    if(response.data.code==0){
                        this.getTableData();
                        this.$message.success(`权限配置第 ${this.idx+1} 行成功`);
                        this.authVisible = false;
                    }
                })
            },
            isExist(rule, value, callback){
                this.existParam.cname=this.form.cname;
                if(this.historyName==value){
                    callback();
                }
                isNameRepeat(this.existParam).then(response =>{
                    if(response.data.code==0){
                        callback();
                    }else if(response.data.code==100){
                        callback(new Error('角色名称已存在，请重新输入'))
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
