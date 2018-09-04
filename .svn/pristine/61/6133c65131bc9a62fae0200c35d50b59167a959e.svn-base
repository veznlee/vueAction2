import request from '../../utils/request'
var baseMixin = {
    data() {
        return {
            Urls:{
                tableList:'',
                tableAdd:'',
                tableUpdate:'',
                tableDelete:'',
                areaListUrl:'/sysparameters/choseArea',
                statusList:''
            },
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
            form: {},
            idx: -1,
            proviceList:[],
            districtList:[],
            countyList:[],
            rules: {},
            isDisabled:false,
            isAddress: true,
            searchAddress:true,
            isSubmit:false,
            existParam:{},
            errorMsg:'',
            historyName:'',
            historyCode:'',
        }
    },
    created() {
        this.getTableData();
    },
    watch:{},
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
            request({
                url:this.Urls.tableList,
                method: 'get',
                params: this.listParam
            }).then(response => {
                if(response.data.code==0){
                    this.tableData = response.data.data;
                    this.total = response.data.total;
                    this.listLoading = false
                }
            })
        },
        indexMethod(index){
            return index + (this.listParam.page - 1) * this.listParam.pageSize + 1;
        },
        productIndexCal(index){
            return index + (this.productParam.page - 1) * this.productParam.pageSize + 1;
        },
        linkIndexCal(index){
            return index + (this.linkParam.page - 1) * this.linkParam.pageSize + 1;
        },
        //搜索
        search() {
            this.listParam.page=1;
            this.getTableData();
        },
        resetForm() {
            this.form = {}
        },
        //表单添加
        handleAdd(){
            this.isSubmit=false;
            this.isAddress=true;
            this.formTitle='添加';
            this.resetForm(true);
            this.preAdd();
            this.dialogStatus = 'create';
            this.editVisible = true;
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            })
        },
        validTable(){
            return true
        },
        addData(){
            this.$refs['form'].validate((valid) => {
                if(valid){
                    if(this.validTable()) {
                        this.preSubmit();
                        var data = this.form
                        request({
                            url: this.Urls.tableAdd,
                            method: 'post',
                            data
                        }).then(response => {
                            this.repeatVoid();
                            if (response.data.code == 0) {
                                this.getTableData();
                                this.editVisible = false;
                                this.$notify({
                                    title: '成功',
                                    message: '创建成功',
                                    type: 'success',
                                    duration: 2000
                                });
                            }
                            this.isSubmit = false
                        })
                    }
                }
            })
        },
        preAdd(){},
        preSubmit(){},
        //表单编辑
        handleUpdate(index, row) {
            this.isSubmit=false;
            this.isAddress=false;
            this.formTitle='编辑';
            this.idx = index;
            this.preEdit(index,row);
            this.dialogStatus = 'update';
            this.editVisible = true;
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            });
        },
        // 保存编辑
        updateData() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    if (this.validTable()) {
                        this.preSubmit()
                        var data = this.form;
                        request({
                            url: this.Urls.tableUpdate,
                            method: 'post',
                            data
                        }).then(response => {
                            this.repeatVoid();
                            if (response.data.code == 0) {
                                this.getTableData();
                                this.editVisible = false;
                                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                            }
                        })
                    }
                }
            })
        },
        preEdit(){},
        //表单删除
        handleDelete(index, row) {
            this.idx = index;
            this.delVisible = true;
            const item = this.tableData[index];
            this.delete = {guid:item.guid}
        },
        // 确定删除
        deleteRow(){
            request({
                url:this.Urls.tableDelete,
                method: 'get',
                params: this.delete
            }).then(response => {
                if(response.data.code==0){
                    let delPage=(this.total-1)%this.listParam.pageSize;
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
        repeatVoid(){
            this.isSubmit=true;
            setTimeout(function () {
                this.isSubmit=false;
            },4000)
        },
        //状态修改
        statusChange(index, row){
            const item = this.tableData[index];
            this.status = {
                guid: item.guid,
                cstatus:item.cstatus
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
        searchProvice(value){
            this.searchAddress=false;
            this.listParam.district='';
            this.searchDistrict(value)
        },
        changeProvice(value){
            this.isAddress=false;
            this.form.cdistrict=''
            this.form.ccounty=''
            this.countyList=[]
            this.getDistrict(value)
        },
        changeDistrict(value){
            this.form.ccounty=''
            this.getCounty(value)
        },
        //省市区查询
        getProvice(){
            request({
                url:this.Urls.areaListUrl,
                method: 'get',
                params: {type:'0'}
            }).then(response => {
                this.proviceList=response.data.data;
            })
        },
        searchDistrict(proviceCode){
            if(proviceCode !=''){
                request({
                    url:this.Urls.areaListUrl,
                    method: 'get',
                    params: {
                        type:'1',
                        id:proviceCode
                    }
                }).then(response =>{
                    this.districtList=response.data.data;
                });
            }else{
                this.districtList=[]
            }
            this.searchList();
        },
        getDistrict(proviceCode){
            request({
                url:this.Urls.areaListUrl,
                method: 'get',
                params: {
                    type:'1',
                    id:proviceCode
                }
            }).then(response =>{
                this.districtList=response.data.data;
            });
        },
        searchList(){},
        getCounty(districtCode){
            request({
                url:this.Urls.areaListUrl,
                method: 'get',
                params: {
                    type:'2',
                    id:districtCode
                }
            }).then(response =>{
                this.countyList=response.data.data;
            });
        },
        changeValue(value){
            let obj = {};
            obj = this.countyList.find((item)=>{
                return item.id === value;
            });
        },
        //时间格式化
        dateFormat:function(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return this.moment(date).format("YYYY-MM-DD HH:mm:ss");
        },
    }
}
export default baseMixin;
