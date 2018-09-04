<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <div class="search-left">
                    <el-button type="primary" icon="add" @click="handleAdd()">新增</el-button>
                </div>
                <div align="right" class="search-right">
                    <el-select v-model="listParam.refSysParam" placeholder="仓库类型" class="handle-select mr10" @change="search">
                        <el-option label="选择仓库类型" value=""></el-option>
                        <el-option v-for="item in storeTypeList" :key="item.guid" :label="item.cname" :value="item.guid"></el-option>
                    </el-select>
                    <el-input v-model="listParam.condition" placeholder="仓库名称/仓库编码" @keyup.enter.native="search" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                </div>
            </div>
            <el-table :data="tableData" border stripe style="width: 100%" v-loading="listLoading" element-loading-text="给我一点时间" class="p-table-center" highlight-current-row>
                <el-table-column type="index" :index="indexMethod" fixed align="center" width="50" label="序号"></el-table-column>
                <el-table-column prop="ccode" label="仓库编码" width="120">
                </el-table-column>
                <el-table-column prop="cname" label="仓库名称" width="180" align="left">
                </el-table-column>
                <el-table-column prop="storeType" label="仓库类型" width="120">
                </el-table-column>
                <el-table-column prop="address" label="仓库所在地" width="300">
                    <template slot-scope="scope">
                        <span>{{ scope.row.cprovince }}—{{ scope.row.cdistrict }}—{{ scope.row.ccounty }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="detailAddress" label="详细地址" min-width="200">
                </el-table-column>
                <el-table-column prop="createdate" label="创建时间" :formatter="dateFormat" width="160">
                </el-table-column>
                <el-table-column label="操作" align="center" width="140" fixed="right">
                    <template slot-scope="scope">
                        <el-button class="danger" size="small" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
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
        <el-dialog :title="formTitle" :visible.sync="editVisible" width="50%" custom-class="mod-el-dialog" :close-on-click-modal="false">
            <el-row :gutter="20" class="dialogTop mgb20" :model="log">
                <el-col :span="12" align="center"><div class="grid-content bg-purple">操作员：{{log.person}}</div></el-col>
                <el-col :span="12" align="center"><div class="grid-content bg-purple">操作员电话：{{log.phone}}</div></el-col>
            </el-row>
            <el-form :rules="rules" ref="form" :model="form" status-icon label-width="100px">
                <el-form-item label="仓库编码" prop="zhccStore.ccode">
                    <el-input v-model="form.zhccStore.ccode" disabled placeholder="仓库编码自动生成"></el-input>
                </el-form-item>
                <el-row :gutter="10">
                    <el-col :span="14">
                        <div class="grid-content bg-purple">
                            <el-form-item label="仓库名称" prop="zhccStore.cname">
                                <el-input v-model="form.zhccStore.cname" clearable></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="grid-content bg-purple">
                            <el-form-item label="仓库类型" prop="zhccStore.refSysParam">
                                <el-select v-model="form.zhccStore.refSysParam" placeholder="仓库类型" style="width: 100%">
                                    <el-option v-for="item in storeTypeList" :key="item.guid" :label="item.cname" :value="item.guid"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="formInput">
                    <el-col :md="24" :lg="12" :xl="12" style="padding: 0">
                        <div class="grid-content bg-purple">
                            <el-form-item label="温度" style="margin-bottom: 0" required>
                                <el-col :span="11">
                                    <el-form-item prop="ambient.sTemperature">
                                        <el-input placeholder="最小温度" type="number" v-model.number="form.ambient.sTemperature"><template slot="append">℃</template></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col class="line" :span="2" align="center">~</el-col>
                                <el-col :span="11">
                                    <el-form-item prop="ambient.bTemperature">
                                        <el-input placeholder="最大温度" type="number" v-model.number="form.ambient.bTemperature"><template slot="append">℃</template></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :md="24" :lg="12" :xl="12" style="padding: 0">
                        <div class="grid-content bg-purple">
                            <el-form-item label="湿度" style="margin-bottom: 0" required>
                                <el-col :span="11">
                                    <el-form-item prop="ambient.sHumidity">
                                        <el-input placeholder="最小湿度" type="number" v-model.number="form.ambient.sHumidity"><template slot="append">%rh</template></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col class="line" :span="2" align="center">~</el-col>
                                <el-col :span="11">
                                    <el-form-item prop="ambient.bHumidity">
                                        <el-input placeholder="最大湿度" type="number" v-model.number="form.ambient.bHumidity"><template slot="append">%rh</template></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-form-item label="区域配置" required>
                    <el-table :data="storeData" border style="width: 100%" class="formInput p-table-center">
                        <el-table-column type="index" :index="indexMethod" fixed width="50" label="序号"></el-table-column>
                        <el-table-column label="区域名称" width="140">
                            <template slot-scope="scope">
                                <el-input v-model.number="scope.row.cname" placeholder="请输入大于0小于8位的字符" :min="0" :max="10" :maxlength="8" :readonly="scope.row.isDel" @focus="inputFocus(scope.$index, scope.row)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="号量/每区" width="220">
                            <template slot-scope="scope">
                                <el-input v-model.number="scope.row.regionCapacity" placeholder="请输入大于0小于50的正整数" :max="50" :maxlength="2" :readonly="scope.row.isDel" @focus="inputFocus(scope.$index, scope.row)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="容量/每号" min-width="210">
                            <template slot-scope="scope">
                                <el-input v-model.number="scope.row.oneCapacity" placeholder="请输入大于0小于500的正整数" :min="0" :max=500 :maxlength="3" :readonly="scope.row.isDel" @focus="inputFocus(scope.$index, scope.row)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column width="80" align="center" :render-header="renderHeader" fixed="right">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="tableLineDelete(scope.$index, scope.row)" :disabled="isDisabled">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item label="仓库所在地" class="area-select" required style="margin-bottom: 0">
                    <el-row :gutter="10" style="margin-left: 0; margin-right: 0">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item prop="zhccStore.cprovince">
                                    <el-select v-model="form.zhccStore.cprovince" filterable @change="changeProvice" placeholder="选择省份" style="width:100%;">
                                        <el-option v-for="item in proviceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item prop="zhccStore.cdistrict">
                                    <el-select v-model="form.zhccStore.cdistrict" filterable @change="changeDistrict" placeholder="选择市州" style="width:100%;" :disabled="isAddress">
                                        <el-option v-for="item in districtList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item prop="zhccStore.ccounty">
                                    <el-select v-model="form.zhccStore.ccounty" filterable placeholder="选择区县" style="width:100%;" :disabled="isAddress">
                                        <el-option v-for="item in countyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input v-model="form.zhccStore.detailAddress" :maxLength="50"></el-input>
                </el-form-item>
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
    import ElOption from "element-ui/packages/select/src/option";
    export default {
        components: {ElOption},
        mixins: [baseMixin],
        data() {
            return {
                Urls:{
                    tableList:'/zhccstore/list',
                    tableAdd:'/zhccstore/add',
                    tableUpdate:'/zhccstore/update',
                    tableDelete:'/zhccstore/remove',
                    storeList:'/zhccstore/selectById',
                    storeTypeList:'/sysparameters/list',
                    storeDelete:'/zhccstore/update',
                    storeIfDel:'/zhccstore/storeIsNull',
                    regionIfUpdate:'/zhccstore/regionIsNull',
                    isNameRepeat:'/zhccstore/isExist'
                },
                listParam: {
                    page: 1,
                    pageSize: 10,
                    refSysParam: '',
                    condition:''
                },
                log:{
                    person:'',
                    phone:''
                },
                form: {
                    ambient:{
                        sTemperature:'',
                        bTemperature:'',
                        sHumidity:'',
                        bHumidity:'',
                    },
                    zhccStore:{
                        cname: '',
                        ccode: '',
                        refSysParam: '',
                        cprovince: '',
                        cdistrict: '',
                        ccounty: '',
                        detailAddress: '',
                        humidity:'',
                        temperature:''
                    },
                    listRegionConfig:[]
                },
                rules: {
                    'zhccStore.cname': [
                        { required: true, message: '此字段为必填', trigger: 'blur' },
                        { validator: this.isExist, trigger: 'blur'},
                        { max: 32, message: '最多只能输入32位字符', trigger: 'blur' }
                    ],
                    'zhccStore.refSysParam': [{ required: true, message: '此字段为必填', trigger: 'change' }],
                    'zhccStore.cprovince':[{ required: true, message: '请选择仓库所在地-省级', trigger: 'change' }],
                    'zhccStore.cdistrict':[{ required: true, message: '请选择仓库所在地-市级', trigger: 'change' }],
                    'zhccStore.ccounty':[{ required: true, message: '请选择仓库所在地-区县级', trigger: 'change' }],
                    /*'ambient.sTemperature':[
                        { required: true, message: '此字段为必填', trigger: 'blur' },
                    ],
                    'ambient.bTemperature':[
                        { required: true, message: '此字段为必填', trigger: 'blur' },
                        { validator: this.checkBtemp, trigger: 'blur'},
                    ],
                    'ambient.sHumidity':[
                        { required: true, message: '此字段为必填', trigger: 'blur' },
                    ],
                    'ambient.bHumidity':[
                        { required: true, message: '此字段为必填', trigger: 'blur' },
                        { validator: this.checkBhum, trigger: 'blur'},
                    ],*/
                },
                delRegion:[],
                storeData:[],
                storeTypeList:[],
                isDisabled:true,
                bTempMsg:'',
                sTempMsg:'',
                bHumMsg:'',
                sHumMsg:'',
            }
        },
        created() {
            this.getStoreType()
            this.getProvice();
        },
        watch:{},
        computed: {},
        methods: {
            resetForm() {
                this.form = {
                    ambient:{
                        sTemperature:'',
                        bTemperature:'',
                        sHumidity:'',
                        bHumidity:'',
                    },
                    zhccStore:{
                        cname: '',
                        ccode: '',
                        refSysParam: '',
                        cprovince: '',
                        cdistrict: '',
                        ccounty: '',
                        detailAddress: '',
                        humidity:'',
                        temperature:''
                    },
                    listRegionConfig:[]
                }
                this.log= {
                    person:'',
                    phone:''
                }
            },
            preAdd(){
                this.sTempMsg=''
                this.bTempMsg=''
                this.sHumMsg=''
                this.bHumMsg=''
                this.log.person=localStorage.getItem('ms_username');
                this.log.phone=localStorage.getItem('ms_userphone');
                this.storeData=[
                    {
                        cname: 'A区',
                        regionCapacity: '',
                        oneCapacity: '',
                        cstatus:'2'
                    }
                ]
            },
            //表单里表格验证
            validTable(){
                var ruleMsg=false;
                const reg1 = /^([1-9]|[1-4]\d|50)$/
                const reg2 = /^(?:[1-9]\d?|[1234]\d{2}|500)$/
                for(let j=0; j<this.storeData.length; j++){
                    let p=j+1;
                    if(this.storeData[j].regionCapacity==''){
                        this.$message.error('请输入区域配置第'+p+'行仓库号量');
                        return false
                    }else if(this.storeData[j].oneCapacity==''){
                        this.$message.error('请输入区域配置第'+p+'行仓库容量');
                        return false
                    }else if(!reg1.test(this.storeData[j].regionCapacity)){
                        this.$message.error('区域配置第'+p+'行号量必须是大于0小于50的正整数');
                        return false
                    }else if(!reg2.test(this.storeData[j].oneCapacity)){
                        this.$message.error('区域配置第'+p+'行容量必须是大于0小于500的正整数');
                        return false
                    }else{
                        ruleMsg=true;
                    }
                }
                return true;
            },
            //表单提交
            preSubmit(){
                const temp1=this.form.ambient.sTemperature,temp2=this.form.ambient.bTemperature,hum1=this.form.ambient.sHumidity,hum2=this.form.ambient.bHumidity
                this.form.zhccStore.temperature=temp1+','+temp2.toString()
                this.form.zhccStore.humidity=hum1+','+hum2.toString()
                this.storeAjax=this.storeData.concat(this.delRegion)
                for(let i = 0; i < this.storeAjax.length; i++){
                    this.form.listRegionConfig[i]=
                        {
                            guid:this.storeAjax[i].guid,
                            cname:this.storeAjax[i].cname,
                            regionCapacity:this.storeAjax[i].regionCapacity,
                            oneCapacity:this.storeAjax[i].oneCapacity,
                            cstatus:this.storeAjax[i].cstatus
                        }
                }
                this.delRegion=[]
            },
            //表单编辑
            preEdit(index,row){
                this.sTempMsg=''
                this.bTempMsg=''
                this.sHumMsg=''
                this.bHumMsg=''
                this.getStore(row);
            },
            //仓库获取
            getStore(row){
                request({
                    url:this.Urls.storeList,
                    method: 'get',
                    params: {guid: row.guid}
                }).then(response => {
                    if (response.data.code == 0) {
                        this.historyName=response.data.data.zhccStore.cname
                        this.log.person = response.data.data.zhccStore.operator;
                        this.log.phone = response.data.data.zhccStore.operatorPhone;
                        this.form.zhccStore.guid = response.data.data.zhccStore.guid;
                        this.form.zhccStore.cname = response.data.data.zhccStore.cname;
                        this.form.zhccStore.ccode = response.data.data.zhccStore.ccode;
                        this.form.zhccStore.refSysParam = response.data.data.zhccStore.refSysParam;
                        this.form.zhccStore.cprovince = response.data.data.zhccStore.cprovince;
                        this.getDistrict(response.data.data.zhccStore.cprovince);
                        this.getCounty(response.data.data.zhccStore.cdistrict);
                        this.form.zhccStore.cdistrict = response.data.data.zhccStore.cdistrict;
                        this.form.zhccStore.ccounty = response.data.data.zhccStore.ccounty;
                        this.form.zhccStore.detailAddress = response.data.data.zhccStore.detailAddress;
                        var temp = response.data.data.zhccStore.temperature.split(',');
                        var hum = response.data.data.zhccStore.humidity.split(',');
                        this.form.ambient.sTemperature = temp[0];
                        this.form.ambient.bTemperature = temp[1]
                        this.form.ambient.sHumidity = hum[0];
                        this.form.ambient.bHumidity = hum[1]
                        this.storeData = response.data.data.listRegionConfig;
                        if (this.storeData.length == 1) {
                            this.isDisabled = true
                        } else {
                            this.isDisabled = false
                        }
                    }
                })
            },
            tableLineAdd(){
                var str=this.storeData[this.storeData.length-1].cname.charCodeAt();
                this.storeData.push({
                    cname: String.fromCharCode(str+1)+'区',
                    regionCapacity: '',
                    oneCapacity: '',
                    cstatus:'2',
                });
                if(this.storeData.length > 1){
                    this.isDisabled=false
                }
            },
            tableLineDelete(index, row){
                if(!row.guid){
                    this.storeData.splice(index,1);
                }else{
                    this.storeData[index].cstatus='0';
                    this.delRegion.push(this.storeData.splice(index,1)[0]);
                }
                if(this.storeData.length == 1){
                    this.isDisabled=true
                }
            },
            renderHeader(h) {
                return h('el-button', {
                    domProps: {
                        innerHTML: '增加'
                    },
                    attrs: {
                        type: 'success'
                    },
                    on: {
                        click: this.tableLineAdd
                    }
                })
            },
            getStoreType(){
                request({
                    url:this.Urls.storeTypeList,
                    method: 'get',
                    params: {ctype: '2'}
                }).then(response => {
                    this.storeTypeList=response.data.data
                })
            },
            //仓库是否能删除
            handleDelete(index, row) {
                request({
                    url:this.Urls.storeIfDel,
                    method: 'get',
                    params: {guid:row.guid}
                }).then(response => {
                    if(response.data.code==0){
                        this.idx = index;
                        this.delVisible = true;
                        const item = this.tableData[index];
                        this.delete = {guid:item.guid}
                    }else{
                        this.$message.error(response.data.msg);
                    }
                });
            },
            isExist(rule, value, callback){
                if(this.historyName==value){
                    callback();
                }
                request({
                    url:this.Urls.isNameRepeat,
                    method: 'get',
                    params: {cname:this.form.zhccStore.cname}
                }).then(response => {
                    if(response.data.code==0){
                        callback();
                    }else if(response.data.code==100){
                        callback(new Error('仓库名称已存在，请重新输入'))
                    }else{
                        callback();
                    }
                })
            },
            changeProvice(value){
                this.isAddress=false;
                this.form.zhccStore.cdistrict=''
                this.form.zhccStore.ccounty=''
                this.countyList=[]
                this.getDistrict(value)
            },
            changeDistrict(value){
                this.getCounty(value)
                this.form.zhccStore.ccounty=''
            },
            //仓库区域是否能修改
            inputFocus(index, row) {
                if(row.inputFocus || !row.guid){
                    return;
                }
                row.inputFocus=true;
                row.isDel=true;
                request({
                    url:this.Urls.regionIfUpdate,
                    method: 'get',
                    params: {guid:row.guid}
                }).then(response => {
                    if(response.data.code==0){
                        row.isDel=false
                    }else{
                        row.isFocus=true;
                        this.$message.error('该区域尚有库存，不可进行修改!');
                    }
                });
            },
            checkBtemp(rule, value, callback){
                if (value < this.form.ambient.sTemperature) {
                    callback(new Error('最大温度必须大于最小温度值'));
                } else {
                    callback();
                }
            },
            checkBhum(rule, value, callback){
                if (value < this.form.ambient.sHumidity) {
                    callback(new Error('最大湿度必须大于最小湿度值'));
                } else {
                    callback();
                }
            },
        },
    }
</script>

<style scoped>
</style>
