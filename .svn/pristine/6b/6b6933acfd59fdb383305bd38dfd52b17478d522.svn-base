<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <div class="search-left">
                    <el-button type="primary" icon="add" @click="handleAdd()">新增一级菜单</el-button>
                </div>
            </div>
            <tree-table :data="tableData" :evalFunc="func" :expandAll="expandAll" border stripe highlight-current-row>
                <el-table-column label="菜单编号" prop="ccode" align="center" width="300">
                </el-table-column>
                <!--<el-table-column align="center" label="状态" width="80">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.cstatus" @change="statusChange(scope.$index, scope.row)" active-color="#90c31f" inactive-color="#dcdfe6" active-value="2" inactive-value="1"></el-switch>
                    </template>
                </el-table-column>-->
                <el-table-column label="备注" prop="description" min-width="300">
                </el-table-column>
                <el-table-column label="操作" width="200" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="small" type="success" plain @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" v-if="scope.row.canDel==1" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <span class="tree-subAdd" @click="handleSubMenu(scope.$index, scope.row)"><i class="el-icon-circle-plus"></i></span>
                    </template>
                </el-table-column>
            </tree-table>
        </div>

        <!-- 一级菜单编辑弹出框 -->
        <el-dialog :title="formTitle" :visible.sync="editVisible" width="30%" custom-class="mod-el-dialog" :close-on-click-modal="false">
            <el-form :rules="rules" ref="form" :model="form" label-width="100px">
                <el-form-item label="菜单编码" prop="ccode">
                    <el-input v-model="form.ccode" disabled placeholder="菜单编码自动生成"></el-input>
                </el-form-item>
                <el-form-item label="一级菜单" prop="cname">
                    <el-input v-model="form.cname" :maxLength="20" placeholder="请输入一级菜单名称"></el-input>
                </el-form-item>
                <el-form-item label="图标class" prop="icon">
                    <el-input v-model="form.icon"></el-input>
                </el-form-item>
                <el-row :gutter="10" v-show="menuShow">
                    <el-col :md="24" :xl="6">
                        <div class="grid-content bg-purple">
                            <el-form-item label="菜单" prop="isMenu">
                                <el-switch v-model="form.isMenu" @change="menuChange" active-color="#409eff" inactive-color="#dcdfe6" active-value="0" inactive-value="1"></el-switch>
                            </el-form-item>
                        </div>
                    </el-col>
                    <!--<el-col :md="24" :xl="18" v-show="directSelect">
                        <div class="grid-content bg-purple">
                            <el-form-item label="指向页面">
                                <el-select v-model="form.targetMenuGuid" placeholder="选择指向" style="width: 100%">
                                    <el-option v-for="item in directPageList" :key="item.guid" :label="item.cname" :value="item.guid"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>-->
                </el-row>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.description"></el-input>
                </el-form-item>
                <!--<el-form-item label="状态">
                    <el-switch v-model="form.cstatus" active-color="#90c31f" inactive-color="#dcdfe6" active-value="2" inactive-value="1"></el-switch>
                </el-form-item>-->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="button" @click="editVisible = false">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="addData">确 定</el-button>
                <el-button v-else="dialogStatus=='update'" type="primary" @click="updateData">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 二级菜单编辑弹出框 -->
        <el-dialog :title="formTitle" :visible.sync="editSubVisible" width="30%" custom-class="mod-el-dialog" :close-on-click-modal="false">
            <el-form :rules="subRules" ref="subForm" :model="subForm" label-width="100px">
                <el-form-item label="菜单编码" prop="ccode">
                    <el-input v-model="subForm.ccode" disabled placeholder="菜单编码自动生成"></el-input>
                </el-form-item>
                <el-form-item label="菜单名称" prop="cname">
                    <el-input v-model="subForm.cname" :maxLength="20" placeholder="请输入菜单名称"></el-input>
                </el-form-item>
                <el-row :gutter="10" v-show="subMenuShow">
                    <el-col :md="24" :xl="6">
                        <div class="grid-content bg-purple">
                            <el-form-item label="菜单" prop="isMenu">
                                <el-switch v-model="subForm.isMenu" @change="catalogChange" active-color="#409eff" inactive-color="#dcdfe6" active-value="0" inactive-value="1"></el-switch>
                            </el-form-item>
                        </div>
                    </el-col>
                    <!--<el-col :md="24" :xl="18" v-show="pageSelect">
                        <div class="grid-content bg-purple">
                            <el-form-item label="指向页面" prop="guid">
                                <el-select v-model="subForm.targetMenuGuid" placeholder="选择指向" style="width: 100%">
                                    <el-option v-for="item in directPageList" :key="item.guid" :label="item.cname" :value="item.guid"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>-->
                </el-row>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="subForm.description"></el-input>
                </el-form-item>
                <!--<el-form-item label="状态">
                    <el-switch v-model="subForm.cstatus" active-color="#90c31f" inactive-color="#dcdfe6" active-value="2" inactive-value="1"></el-switch>
                </el-form-item>-->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="button" @click="editSubVisible = false">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="addSubData">确 认</el-button>
                <el-button v-else="dialogStatus=='subUpdate'" type="primary" @click="updateSubData">确 定</el-button>
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
    import treeTable from '../../TreeTable'
    import treeToArray from './customEval'
    export default {
        mixins: [baseMixin],
        name: 'customTreeTableDemo',
        components: { treeTable },
        data() {
            return {
                func: treeToArray,
                expandAll: false,
                Urls:{
                    tableList:'/menu/list',
                    tableAdd:'/menu/saveOrUpdate',
                    tableUpdate:'/menu/saveOrUpdate',
                    tableDelete:'/menu/remove',
                    subMenuAdd:'/menu/saveOrUpdate',
                    statusList:'/menu/cstatus',
                    directList:'/menu/getTargetMenu',
                    isNameRepeat:'/menu/isExist'
                },
                listParam: {
                    page: 1,
                    pageSize: 10,
                    condition:''
                },
                history1Name:'',
                history1Code:'',
                form: {
                    guid: '',
                    ccode:'',
                    cname: '',
                    icon:'el-icon-menu',
                    isMenu:'0',
                    parentId:'#',
                    cstatus: '2',
                    description: '',
                    targetMenuGuid:''
                },
                subForm: {
                    guid: '',
                    ccode:'',
                    cname: '',
                    parentId:'#',
                    cstatus: '2',
                    description: '',
                    isMenu: '0',
                    targetMenuGuid:''
                },
                isSubMenu:true,
                editSubVisible:false,
                directPageList:[],
                directSelect:true,
                pageSelect:true,
                menuShow:true,
                subMenuShow:true,
                rules: {
                    cname: [
                        { required: true, message: '此字段为必填', trigger: 'blur' },
                        { validator: this.isNameExist, trigger: 'blur'},
                        { max: 20, message: '长度在20个字符', trigger: 'blur' }
                    ]
                },
                subRules: {
                    cname: [
                        { required: true, message: '此字段为必填', trigger: 'blur' },
                        { validator: this.isName1Exist, trigger: 'blur'},
                        { max: 20, message: '长度在20个字符', trigger: 'blur' }
                    ]
                },
            }
        },
        created(){
            this.getDirectPage()
        },
        computed:{},
        methods:{
            resetForm() {
                this.form = {
                    guid: '',
                    ccode:'',
                    cname: '',
                    icon:'el-icon-menu',
                    parentId:'#',
                    cstatus: '2',
                    description: '',
                    isMenu:'0',
                    targetMenuGuid:''
                };
            },
            //表单添加
            preAdd(){
                this.menuShow=true
                this.directSelect=true;
            },
            menuChange(){
                this.directSelect=!this.directSelect
            },
            catalogChange(){
                this.pageSelect=!this.pageSelect
            },
            //表单编辑
            handleUpdate(index, row) {
                this.isDisabled=false;
                this.idx = index;
                if(row.pid !='#'){
                    this.formTitle='子菜单编辑';
                    this.editSubVisible = true;
                    this.dialogStatus = 'subUpdate';
                    this.preSubEdit(index,row);
                    this.$nextTick(() => {
                        this.$refs['subForm'].clearValidate()
                    });
                }else{
                    this.formTitle='编辑';
                    this.dialogStatus = 'update';
                    this.editVisible = true;
                    this.preEdit(index,row);
                    this.$nextTick(() => {
                        this.$refs['form'].clearValidate()
                    });
                }
            },
            preEdit(index,row){
                this.historyName=row.name
                this.form={
                    guid: row.id,
                    ccode: row.ccode,
                    cname: row.name,
                    icon: row.icon,
                    isMenu: row.isMenu.toString(),
                    cstatus: row.cstatus,
                    description: row.description,
                    parentId: row.pid,
                    targetMenuGuid: row.targetMenuGuid
                }
                if(row.canDel==0){
                    this.menuShow=false
                }else{
                    this.menuShow=true
                }
                if(this.form.isMenu==0){
                    this.directSelect=true
                }else{
                    this.directSelect=false
                }
            },
            preSubEdit(index,row){
                this.history1Name=row.name
                this.history1Code=row.ccode
                this.subForm={
                    guid:row.id,
                    ccode:row.ccode,
                    cname: row.name,
                    parentId:'',
                    cstatus: '2',
                    description: row.description,
                    isMenu: row.isMenu.toString(),
                    targetMenuGuid: row.targetMenuGuid
                };
                if(row.canDel==0){
                    this.subMenuShow=false
                }else{
                    this.subMenuShow=true
                }
                if(this.subForm.isMenu==0){
                    this.pageSelect=true
                }else{
                    this.pageSelect=false
                }
            },
            handleSubMenu(index, row){
                if(row.isMenu==0){
                    this.editSubVisible = false;
                    this.$message.error('该菜单下不能添加子菜单');
                }else{
                    this.subMenuShow=true;
                    this.pageSelect=true;
                    this.formTitle='子菜单添加';
                    this.editSubVisible = true;
                    this.dialogStatus = 'create';
                    this.subForm={
                        guid: '',
                        ccode:row.ccode,
                        cname: '',
                        parentId:row.id,
                        cstatus: '2',
                        description: '',
                        isMenu: '0'
                    };
                    this.$nextTick(() => {
                        this.$refs['subForm'].clearValidate()
                    })
                }
            },
            addSubData(){
                this.$refs['subForm'].validate((valid) => {
                    if(valid){
                        this.preSubmit();
                        var data=this.subForm;
                        request({
                            url:this.Urls.subMenuAdd,
                            method: 'post',
                            data
                        }).then(response => {
                            if(response.data.code==0){
                                this.getTableData();
                                this.editSubVisible = false;
                                this.$notify({
                                    title: '成功',
                                    message: '创建子菜单成功',
                                    type: 'success',
                                    duration: 2000
                                })
                            }
                        })
                    }
                })
            },
            updateSubData(){
                var data=this.subForm;
                request({
                    url:this.Urls.subMenuAdd,
                    method: 'post',
                    data
                }).then(response => {
                    if(response.data.code==0){
                        this.getTableData();
                        this.editSubVisible = false;
                        this.$message.success(`修改成功`);
                    }
                })
            },
            handleDelete(index, row) {
                if(row.canDel==0){
                    this.delVisible = false;
                    this.$message.error('该菜单正在使用，不能删除');
                }else{
                    this.idx = index;
                    this.delVisible = true;
                    this.delete = {guid:row.id}
                }
            },
            //状态修改
            statusChange(index, row){
                this.status = {
                    guid: row.id,
                    cstatus:row.cstatus
                };
                request({
                    url:this.Urls.statusList,
                    method: 'get',
                    params: this.status
                }).then(response => {
                    if(response.data.code==0){
                        this.getTableData();
                        this.$message.success('修改成功');
                    }
                })
            },
            getDirectPage(){
                request({
                    url:this.Urls.directList,
                    method: 'get',
                    params: {}
                }).then(response => {
                    if(response.data.code==0){
                        this.directPageList = response.data.data;
                    }
                })
            },
            isNameExist(rule, value, callback){
                if(this.historyName==value){
                    callback();
                }
                request({
                    url:this.Urls.isNameRepeat,
                    method: 'get',
                    params: {cname:this.form.cname}
                }).then(response =>{
                    if(response.data.code==0){
                        callback();
                    }else if(response.data.code==100){
                        callback(new Error('菜单名称已存在，请重新输入'))
                    }
                })
            },
            isName1Exist(rule, value, callback){
                if(this.history1Name==value){
                    callback();
                }
                request({
                    url:this.Urls.isNameRepeat,
                    method: 'get',
                    params: {cname:this.subForm.cname}
                }).then(response =>{
                    if(response.data.code==0){
                        callback();
                    }else if(response.data.code==100){
                        callback(new Error('菜单名称已存在，请重新输入'))
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .tree-subAdd i{
        font-size: 24px;
        margin-left: 10px;
        vertical-align: middle;
        color: #409EFF;
        cursor: pointer;
    }
</style>
