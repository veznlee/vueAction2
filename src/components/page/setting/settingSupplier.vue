<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <div class="search-left">
                    <el-button type="primary" icon="add" @click="handleAdd()">新增</el-button>
                </div>
                <div align="right" class="search-right">
                    <el-select v-model="listParam.ctype" placeholder="企业性质" class="handle-Sselect mr10" @change="search">
                        <el-option label="企业性质" value=""></el-option>
                        <el-option label="企业" value="0"></el-option>
                        <el-option label="个人" value="1"></el-option>
                    </el-select>
                    <el-select v-model="listParam.province" filterable placeholder="请选择省" class="handle-Melect mr10" @change="searchProvice">
                        <el-option label="请选择省" value=""></el-option>
                        <el-option v-for="item in proviceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select v-model="listParam.district" filterable placeholder="请选择市" class="handle-Melect mr10" :disabled="searchAddress" @change="search">
                        <el-option label="请选择市" value=""></el-option>
                        <el-option v-for="item in districtList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-input v-model="listParam.condition" placeholder="联系人/企业名称" @keyup.enter.native="search" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                </div>
            </div>
            <el-table :data="tableData" border stripe style="width: 100%" v-loading="listLoading" element-loading-text="给我一点时间" class="p-table-center" highlight-current-row>
                <el-table-column type="index" :index="indexMethod" fixed width="50" label="序号"></el-table-column>
                <el-table-column prop="cpName" label="企业名称" width="280">
                </el-table-column>
                <el-table-column label="企业性质" width="150">
                    <template slot-scope="scope">
                        <span>{{ scope.row.ctype==0?"企业":"个人" }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="企业地址" min-width="300">
                    <template slot-scope="scope">
                        <span>{{ scope.row.province }}—{{ scope.row.district }}—{{ scope.row.county }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="默认联系人" width="120">
                </el-table-column>
                <el-table-column prop="phone" label="默认联系人电话" width="180">
                </el-table-column>
                <el-table-column prop="count" label="联系人数量" width="100">
                </el-table-column>
                <el-table-column label="操作" align="center" width="140" fixed="right">
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
        <el-dialog :title="formTitle" :visible.sync="editVisible" width="45%" custom-class="mod-el-dialog" :close-on-click-modal="false">
            <el-row :gutter="20" class="dialogTop mgb20" :model="log">
                <el-col :span="12" align="center"><div class="grid-content bg-purple">操作员：{{log.person}}</div></el-col>
                <el-col :span="12" align="center"><div class="grid-content bg-purple">操作员电话：{{log.phone}}</div></el-col>
            </el-row>
            <el-form :rules="rules" ref="form" :model="form" label-width="80px" status-ico>
                <el-row :gutter="10">
                    <el-col :span="14">
                        <div class="grid-content bg-purple">
                            <el-form-item label="企业名称" prop="cname">
                                <el-input v-model="form.cname"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="grid-content bg-purple">
                            <el-form-item label="企业性质" prop="ctype">
                                <el-select v-model="form.ctype" placeholder="选择企业性质" style="width: 100%">
                                    <el-option label="企业" value="0"></el-option>
                                    <el-option label="个人" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-form-item label="企业地址" class="area-select" style="margin-bottom: 0" required>
                    <el-row :gutter="10" style="margin-left: 0; margin-right: 0">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item prop="cprovince">
                                    <el-select v-model="form.cprovince" filterable @change="changeProvice" placeholder="选择省份" style="width:100%;">
                                        <el-option v-for="item in proviceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item prop="cdistrict">
                                    <el-select v-model="form.cdistrict" filterable @change="changeDistrict" placeholder="选择市州" style="width:100%;" :disabled="isAddress">
                                        <el-option v-for="item in districtList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item prop="ccounty">
                                    <el-select v-model="form.ccounty" filterable placeholder="选择区县" style="width:100%;" :disabled="isAddress">
                                        <el-option v-for="item in countyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input v-model="form.detailAddress" :maxLength="50"></el-input>
                </el-form-item>
                <el-table :data="supplierData" border style="width: 100%" class="formInput p-table-center">
                    <el-table-column label="姓名" width="150">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.cname" :maxLength="6" placeholder="请输入联系人姓名"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="手机号" width="180">
                        <template slot-scope="scope">
                            <el-input v-model.number="scope.row.phone" :maxLength="11" placeholder="请输入11位手机号码"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="职位" min-width="180">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.position" placeholder="请输入职位" :maxLength="18"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column width="210" align="center" fixed="right" :render-header="renderHeader">
                        <template slot-scope="scope">
                            <el-radio v-model="radio" :label="scope.$index" size="small" class="mr10" border @change="defaultClient(scope.$index, scope.row)">设为默认联系人</el-radio>
                            <el-button size="mini" type="danger" @click="tableLineDelete(scope.$index, scope.row)" :disabled="isDisabled">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="button" @click="editVisible = false">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="addData" :disabled="isSubmit">确 定</el-button>
                <el-button v-else type="primary" @click="updateData" :disabled="isSubmit">确 定</el-button>
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
    import ElForm from "element-ui/packages/form/src/form";
    import ElFormItem from "element-ui/packages/form/src/form-item";
    export default {
        components: {
            ElFormItem,
            ElForm},
        mixins: [baseMixin],
        data() {
            return {
                Urls:{
                    tableList:'/zhccsupplier/list',
                    tableAdd:'/zhccsupplier/addOrUpdate',
                    tableUpdate:'/zhccsupplier/addOrUpdate',
                    tableDelete:'/zhccsupplier/remove',
                    supplierList:'/zhccsupplier/selectById',
                    supplierDelete:'zhccsupplier/delete',
                    isNameRepeat:'/zhccsupplier/isExist'
                },
                supplierData:[],
                listParam: {
                    page: 1,
                    pageSize: 10,
                    ctype: '',
                    province: '',
                    district: '',
                    condition:''
                },
                log:{
                    person:'',
                    phone:''
                },
                form: {
                    cname: '',
                    ctype: '',
                    cprovince: '',
                    cdistrict : '',
                    ccounty: '',
                    detailAddress: '',
                    supplierInfoList:[]
                },
                radio:'1',
                rules:{
                    cname: [
                        { required: true, message: '此字段为必填', trigger: 'blur' },
                        { validator: this.isExist, trigger: 'blur'},
                        { max: 32, message: '最多只能输入32位字符', trigger: 'blur' }
                    ],
                    ctype: [{ required: true, message: '此字段为必填', trigger: 'change' }],
                    cprovince: [{ required: true, message: '此字段为必填', trigger: 'change' }],
                    cdistrict: [{ required: true, message: '此字段为必填', trigger: 'change' }],
                    ccounty: [{ required: true, message: '此字段为必填', trigger: 'change' }],
                },
                subRules:{
                    cname: [
                        { required: true, message: '此字段为必填', trigger: 'blur' },
                        { max: 5, message: '最多只能输入5位字符', trigger: 'blur' }
                    ],
                },
                isDisabled:false,
                delData:[],
            }
        },
        created(){
            this.getProvice();
        },
        computed:{},
        methods:{
            resetForm() {
                this.form = {
                    cname: '',
                    ctype: '',
                    cprovince: '',
                    cdistrict : '',
                    ccounty: '',
                    detailAddress: '',
                    supplierInfoList:[]
                };
                this.log= {
                    person:'',
                    phone:''
                }
            },
            preAdd(){
                this.log.person=localStorage.getItem('ms_username');
                this.log.phone=localStorage.getItem('ms_userphone');
                this.radio=''
                this.supplierData=[{
                    guid:'',
                    cname:'',
                    phone:'',
                    position:'',
                    isDef:'0',
                    cstatus:''
                }]
                if(this.supplierData.length == 1){
                    this.isDisabled=true
                }else{
                    this.isDisabled=false
                }
            },
            //表单里表格验证
            validTable(){
                var ruleMsg=false;
                var aaa=true;
                const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
                for(let j=0; j<this.supplierData.length; j++){
                    if(this.radio==j){
                        this.supplierData[j].isDef='1'
                    }else{
                        this.supplierData[j].isDef='0'
                    }
                    console.log(this.supplierData[j])
                    if(this.supplierData[j].cname==''){
                        this.$message.error('请输入联系人姓名');
                        return false
                    }else if(this.supplierData[j].phone==''){
                        this.$message.error('请输入联系人手机号码');
                        return false
                    }else if(this.supplierData[j].position==''){
                        this.$message.error('请输入联系人职位');
                        return false
                    }else if(!reg.test(this.supplierData[j].phone)){
                        this.$message.error('请输入正确的11位手机号码');
                        return false
                    }else if(this.supplierData[j].isDef==1){
                        aaa=false;
                    }else{
                        ruleMsg=true;
                    }
                }
                if(aaa){
                    this.$message.error('必须有一位默认联系人');
                    return false
                }
                return true;
            },
            //表单提交
            preSubmit(){
                this.supplierAjax=this.supplierData.concat(this.delData);
                for(let i = 0; i < this.supplierAjax.length; i++){
                    this.form.supplierInfoList[i]=
                        {
                            guid:this.supplierAjax[i].guid,
                            cname:this.supplierAjax[i].cname,
                            phone:this.supplierAjax[i].phone,
                            position:this.supplierAjax[i].position,
                            isDef:'0',
                            cstatus:this.supplierAjax[i].cstatus
                        }
                    if(this.radio==i){
                        this.form.supplierInfoList[i].isDef='1'
                    }
                }
                this.delData=[]
            },
            defaultClient(index, row) {
                this.radio=index;
            },
            //表单编辑
            preEdit(index,item){
                this.historyName=item.cpName
                this.form= {
                    guid: item.guid,
                    cname: item.cpName,
                    ctype: item.ctype,
                    cprovince: item.province,
                    cdistrict: item.district,
                    ccounty: item.county,
                    detailAddress: item.detailAddress,
                    supplierInfoList:[]
                };
                this.getSupplierList(item);
            },
            getSupplierList(item){
                request({
                    url:this.Urls.supplierList,
                    method: 'get',
                    params: {guid: item.guid}
                }).then(response => {
                    this.log.person=response.data.data.operator;
                    this.log.phone=response.data.data.operatorPhone;
                    this.form.cprovince=response.data.data.cprovince;
                    this.form.cdistrict=response.data.data.cdistrict;
                    this.form.ccounty=response.data.data.ccounty;
                    this.getDistrict(response.data.data.cprovince);
                    this.getCounty(response.data.data.cdistrict);
                    this.supplierData=response.data.data.supplierInfoList;
                    for(let i = 0; i < this.supplierData.length; i++){
                        if(this.supplierData[i].isDef==1){
                            this.radio=i
                        }
                        if(this.supplierData.length == 1){
                            this.isDisabled=true
                        }else{
                            this.isDisabled=false
                        }
                    }
                })
            },
            //添加按钮
            renderHeader(h) {
                return h('el-button', {
                    domProps: {
                        innerHTML: '添加联系人'
                    },
                    attrs: {
                        type: 'success'
                    },
                    on: {
                        click: this.tableLineAdd
                    }
                })
            },
            tableLineAdd(){
                this.supplierData.push({
                    cname:'',
                    phone:'',
                    position:'',
                    isDef:'0',
                    cstatus:''
                });
                if(this.supplierData.length > 1){
                    this.isDisabled=false
                }
            },
            tableLineDelete(index, row){
                if(!row.guid){
                    this.supplierData.splice(index,1);
                }else{
                    this.supplierData[index].cstatus='0';
                    this.delData.push(this.supplierData.splice(index,1)[0]);
                }
                if(this.supplierData.length == 1){
                    this.isDisabled=true
                }
            },
            //检验客户名字是否存在
            isExist(rule, value, callback){
                if(this.historyName==value){
                    callback();
                }
                request({
                    url:this.Urls.isNameRepeat,
                    method: 'get',
                    params: {cname:this.form.cname}
                }).then(response => {
                    if(response.data.code==0){
                        callback();
                    }else if(response.data.code==100){
                        callback(new Error('企业名称已存在，请重新输入'))
                    }else{
                        callback();
                    }
                })
            },
            searchList(){
                this.getTableData()
            }
        }
    }
</script>

<style scoped>
</style>
