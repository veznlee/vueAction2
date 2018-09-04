import request from '../../utils/request'
var checkMixin = {
    data() {
        return {
            pickDateBefore: {
                disabledDate(time){
                    return (time.getTime() > Date.now() || time.getTime() < new Date('2010-01-01'));
                }
            },
            productParam: {
                condition: '',
                refSysParam: '',
                page: 1,
                pageSize: 10
            },
            Urls: {
                isNameRepeat: '/workFlow/checkTrackingNumber',
            },
            historyNumber: '',
            linkParam: {
                cname: '',
                condition: '',
                type: "2",
                page: 1,
                total: 0,
                pageSize: 10
            },
            log: {
                person: '',
                phone: ''
            },
            form: {
                id: '',
                title: '',
                code: '',
                consignee: '',
                consigneePhone: '',
                driver: '',
                deliveryTime: '',
                client: '',
                trackingNumber: '',
                description: '',
                driverPhone: '',
                status: '',
                items: []//程序生成
            },
            flowList: [],
            vendorList: [],
            linkList: [],
            operatorList: [],
            productList: [],
            productTypeList: [],
            rules: {
                title: [{required: true, message: "必须输入项", trigger: "blur"}],
                consignee: [{required: true, message: "必须输入项", trigger: "blur"}],
                consigneePhone: [{required: true, message: "必须输入项", trigger: "blur"}],
                driver: [{required: true, message: "必须输入项", trigger: "blur"}],
                deliveryTime: [{required: true, message: "必须输入项", trigger: "blur"}],
                client: [{required: true, message: "必须输入项", trigger: "blur"}],
                trackingNumber: [
                    {required: true, message: "必须输入项", trigger: "blur"},

                ],
                description: [{required: true, message: "必须输入项", trigger: "blur"}],
                driverPhone: [{required: true, message: "必须输入项", trigger: "blur"}],
            },
            canEdit: true,
            selectProductVisible: false,
            selectLinkVisible: false,
            selectedLink: [],
            selectedProduct: [],
            storeList: [],
            pageRights: {},
            visible: {
                title: true,
                consignee: true,
                consigneePhone: true,
                driver: true,
                deliveryTime: true,
                client: true,
                trackingNumber: true,
                description: true,
                driverPhone: true,
                items: true,
                warehouseLocation: true,
                expiringDate: true,
                specificationOfGoods: true
            },
            readonly: {
                title: false,
                consignee: false,
                consigneePhone: false,
                driver: false,
                deliveryTime: false,
                client: false,
                trackingNumber: false,
                description: false,
                driverPhone: false,
                items: false,
                warehouseLocation: false,
                expiringDate: false,
                specificationOfGoods: false
            },
            mustInput: {
                warehouseLocation: false,
                expiringDate: false,
                specificationOfGoods: false
            },
            buttonCtrl: [],
            checkVisible: false,
            checkOpinion: "",
            direction: 0,
            outputCode: '',
            outputCodeVisible: false,
            passwordAnotherName: '',
            confirmPasswordVisible: false,
            confirmPassword: '',
            passwordTitle: '请确认',
            recordPasswordVisible: false,
            storeWarnVisible: false,
            disableButton: false,
            title0: "发",
            title1: "入",
            title2: "供应商",
            title3: "备注",
            delOpinion: '',
            delCheckVisible: false,
            opType: null,
            warning: '',
            printVisible: false
        }
    },
    created() {
        if (window.location.href.indexOf("?status=0") > 0)
            this.listParam.status = '0';
    },
    filters: {
        substr: function (value) {
            if (!value) return '';
            value = value.toString();
            return value.substring(0, 10);
        }
    },
    methods: {

        timestampToTime(timestamp) {
            if (timestamp == null || timestamp < 0 || timestamp.toString().substring(0, 2) == '19')
                return "";
            let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
            let h = ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y + M + D + h + m + s;
        },
        getNewCode(){
            let code = "";
            for (let i = 0; i < 6; i++)
                code += "" + parseInt(Math.random() * 10);
            return code;
        },
        resetForm(ifNew) {
            if (ifNew) {
                for (let key in this.form) {
                    if (key != 'items') {
                        console.log(key,this.form[key])
                        this.form[key] = ""
                    }
                }
            }
            else {
                for (let key in this.readonly) {
                    if (!this.readonly[key] && key != 'items') {
                        this.form[key] = ""
                    }
                }
            }
            for (let i = 0; i < this.form.items.length; i++) {
                let row = this.form.items[i];
                if (!this.readonly.specificationOfGoods) {
                    row.houseNum = 0;
                    row.productSum = 0;
                }
                if (this.isIn && !this.readonly.expiringDate) {
                    row.cdate = '';
                }
                if (this.isIn && !this.readonly.warehouseLocation) {
                    row.storeGuid = '';
                    row.regionGuid = '';
                    row.regionInfoGuid = '';
                    row.areaList = '';
                    row.placeList = '';
                }
            }
        },
        handleSubmit(){
            if (this.isIn)
                this.checkStoreIn('submit');
            else
                this.checkStoreOut('submit');
        },
        //表单删除
        handleDelete(index, row) {
            this.idx = index;
            this.deleteId = {id: row.orderdetailInfo.id};
            if (this.tableData[index].orderdetailInfo.state == 2) {
                this.delCheckVisible = true;
            }
            else {
                this.delVisible = true;
            }
        },
        // 确定审核删除
        confirmDelCheck(){
            if (this.delOpinion.length < 1) {
                this.$message.warning('必须输入删除意见！');
                return;
            }
            this.deleteId.processId = this.tableData[this.idx].orderdetailInfo.processId;
            this.deleteId.opinion = this.delOpinion;
            this.disableButton = true;
            request({
                host: 1,
                url: this.Urls.delCheckUrl,
                method: 'post',
                params: this.deleteId
            }).then(response => {
                this.disableButton = false;
                if (response.data.code == 0) {
                    this.getTableData();
                    this.$message.success('提交成功');
                    this.delCheckVisible = false;
                }
                else {
                    this.$message.warning(response.data.msg);
                }
            })
        },
        // 确定删除
        deleteRow(){
            request({
                host: 1,
                url: this.Urls.deleteForm,
                method: 'get',
                params: this.deleteId
            }).then(response => {
                if (response.data.code == 0) {
                    if (this.total % this.listParam.pageSize == 1 && this.listParam.page > 1) {
                        this.listParam.page--;
                    }
                    this.getTableData();
                    this.$message.success('删除成功');
                    this.delVisible = false;
                }
            })
        },
        preAdd(){
            this.form.items = [];
            this.resetForm(true);
            this.disableButton = false;
            this.log.person = localStorage.getItem('ms_username');
            this.log.phone = localStorage.getItem('ms_userphone');
            this.canEdit = true;
            request({
                host: 1,
                url: this.Urls.getPageRights,
                method: 'get',
                params: {menuPosition: this.menuPosition}
            }).then(response => {
                if (response.data.code == 0) {
                    this.pageRights = response.data.data;
                    this.processId = response.data.data.processId;
                    if (this.processId == "d7291435fed44a80b680484ac32693c3") {//采购订单
                        this.title0 = "发";
                        this.title1 = "入";
                        this.title2 = "供应商";
                        this.title3 = "入库备注";
                        this.Urls.getItems = '/purchase/inquireByNo';
                        this.Urls.saveForm = '/purchase/save';
                        this.Urls.getVendorList = '/user/getCompany';
                        this.Urls.getLinkList = '/user/getLinkMan';
                        this.Urls.getProductList = '/zhccproduct/chooseProduct';
                        this.Urls.getProductTypeList = '/zhccproduct/type';
                        this.linkParam.type = 2;
                        this.isDept = false;
                        this.isIn = true;
                    }
                    else if (this.processId == "56f5f49d367f441687bfd71058445c85") {//销售订单
                        this.title0 = "收";
                        this.title1 = "出";
                        this.title2 = "客户";
                        this.title3 = "收货地址";
                        this.Urls.getItems = '/sell/inquireByNo';
                        this.Urls.saveForm = '/sell/save';
                        this.Urls.getVendorList = '/user/getCompany';
                        this.Urls.getLinkList = '/user/getLinkMan';
                        this.Urls.getProductList = '/zhccproduct/chooseUnsold';
                        this.Urls.getProductTypeList = '/zhccproduct/type';
                        this.linkParam.type = 1;
                        this.isDept = false;
                        this.isIn = false;
                    }
                    else if (this.processId == "6f5ec356dec140d1aa5d10558b7b106a") {//领料申请
                        this.title0 = "收";
                        this.title1 = "出";
                        this.title2 = "部门";
                        this.title3 = "收货地址";
                        this.Urls.getItems = '/picking/inquireByNo';
                        this.Urls.saveForm = '/picking/save';
                        this.Urls.getVendorList = '/dept/list';
                        this.Urls.getLinkList = '/user/getUser';
                        this.Urls.getProductList = '/zhccproduct/chooseUnsold';
                        this.Urls.getProductTypeList = '/zhccproduct/type';
                        this.linkParam.type = 1;
                        this.isDept = true;
                        this.isIn = false;
                    }
                    else if (this.processId == "04e03be92b154c19967a45d0d175d321") {//生产管理
                        this.title0 = "发";
                        this.title1 = "入";
                        this.title2 = "部门";
                        this.title3 = "入库备注";
                        this.Urls.getItems = '/production/inquireByNo';
                        this.Urls.saveForm = '/production/save';
                        this.Urls.getVendorList = '/dept/list';
                        this.Urls.getLinkList = '/user/getUser';
                        this.Urls.getProductList = '/zhccproduct/chooseProduct';
                        this.Urls.getProductTypeList = '/zhccproduct/type';
                        this.linkParam.type = 1;
                        this.isDept = true;
                        this.isIn = true;
                    }
                    else {//退货入库
                        this.title0 = "发";
                        this.title1 = "入";
                        this.title2 = "公司";
                        this.title3 = "入库备注";
                        this.Urls.getItems = '/sales/inquireByNo';
                        this.Urls.saveForm = '/sales/save';
                        this.Urls.getVendorList = '/user/getCompany';
                        this.Urls.getLinkList = '/user/getLinkMan';
                        this.Urls.getProductList = '/zhccproduct/chooseProduct';
                        this.Urls.getProductTypeList = '/zhccproduct/type';
                        this.linkParam.type = 1;
                        this.isDept = false;
                        this.isIn = true;
                    }
                    this.setupPage();
                }
            });
        },
        tableLineAdd(){
            this.selectProductVisible = true;
            this.selectedProduct = [];
            this.searchProduct();
            request({
                host: 0,
                url: this.Urls.getProductTypeList,
                method: 'get',
                params: {}
            }).then(response => {
                if (response.data.code == 0) {
                    this.productTypeList = response.data.data;
                }
            });
        },
        goPrePageProduct(){
            if (this.productParam.page > 1) {
                this.productParam.page--;
                this.searchProduct();
            }
        },
        goNextPageProduct(){
            let curPage = Math.ceil(this.productParam.total / this.productParam.pageSize)
            if (this.productParam.page == curPage) {
                return
            } else {
                if (this.productList.length == 10) {
                    this.productParam.page++;
                    this.searchProduct();
                }
            }
        },
        selectOneProduct(row){
            if (row.selected)
                this.selectedProduct.push(row);
            else {
                for (let i = 0; i < this.selectedProduct.length; i++) {
                    if (this.selectedProduct[i].guid == row.guid)
                        this.selectedProduct.splice(i, 1);
                }
            }
        },
        addLink(){
            if (!this.canEdit)
                return;
            this.selectedLink = [];
            if (this.form.linkManId)
                this.selectedLink.push({
                    guid: this.form.linkManId,
                    companyGuid: this.form.client,
                    cname: this.form.clientName,
                    linkManName: this.form.consignee,
                    linkManPhone: this.form.consigneePhone
                });
            this.selectLinkVisible = true;
            this.searchLink();
        },
        goPrePageLink(){
            if (this.linkParam.page > 1) {
                this.linkParam.page--;
                this.searchLink();
            }
        },
        goNextPageLink(){
            let curPage = Math.ceil(this.linkParam.total / this.linkParam.pageSize)
            if (this.linkParam.page == curPage) {
                return
            } else {
                if (this.linkList.length == 10) {
                    this.linkParam.page++;
                    this.searchLink();
                }
            }
        },
        searchCus(){
            this.linkParam.page = 1;
            this.searchLink()
        },
        selectLink(){
            if (this.selectedLink.length == 0) {
                this.$message.warning(`尚未选择`);
                return;
            }
            this.form.client = this.selectedLink[0].companyGuid;
            this.form.clientName = this.selectedLink[0].cname;
            this.form.consignee = this.selectedLink[0].linkManName;
            this.form.consigneePhone = this.selectedLink[0].linkManPhone;
            this.form.linkManId = this.selectedLink[0].guid;
            this.selectLinkVisible = false;
            this.$refs['form'].clearValidate();
        },
        selectOneVendor(idx, row){
            this.selectedLink = [];
            this.selectedLink.push(row);
            for (let i = 0; i < this.linkList.length; i++) {
                if (this.linkList[i].selected && i != idx) {
                    this.linkList[i].selected = false;
                }
            }
        },
        tableLineDelete(index, row){
            this.form.items.splice(index, 1);
        },
        renderHeader(h) {
            return h('el-button', {
                domProps: {
                    innerHTML: '增加'
                },
                attrs: {
                    type: 'success',
                    disabled: !this.canEdit || this.readonly.specificationOfGoods
                },
                on: {
                    click: this.tableLineAdd
                }
            })
        },
        handleCheck(index, row){
            this.handleEdit(index, row);
            this.canEdit = false;
            this.formTitle = '审核';
        },
        handleRecordList(index, row){
            this.handleEdit(index, row);
            this.canEdit = true;
            this.formTitle = '办理';
        },
        handleRecordForm(){
            if (this.isIn)
                this.checkStoreIn('record');
            else
                this.checkStoreOut('record');
        },
        handleCheckIN(direction, passwordAnotherName){
            this.direction = direction;
            this.passwordAnotherName = passwordAnotherName;
            if (this.isIn)
                this.checkStoreIn('check');
            else
                this.checkStoreOut('check');
        },
        handleCheckIN2(){
            if (this.checkOpinion.length < 2 && this.direction == 0) {
                this.$message.warning("必须输入意见");
                return;
            }
            if (this.form.outputCode != "") {
                this.passwordTitle = "请确认" + this.passwordAnotherName;
                this.confirmPasswordVisible = true;
            }
            else
                this.handleCheckIN3();
        },
        checkPassword(){
            if (this.confirmPassword != this.form.outputCode) {
                this.passwordTitle = this.passwordAnotherName + "不正确哦，请重新输入";
            } else {
                this.handleCheckIN3();
            }
        },
        handleCheckIN3(){
            this.checkVisible = false;
            this.form.taskId = this.taskId;
            //this.form.processId = this.processId;
            this.form.checkType = (this.direction == 2 ? 1 : this.direction);
            this.form.opinion = this.checkOpinion;
            this.confirmPasswordVisible = false;
            this.form.outputCode = "";
            this.outputCode = "";
            if (this.direction == "1") {
                for (let i = 0; i < this.buttonCtrl.length; i++) {
                    if (this.buttonCtrl[i].name == "agree") {
                        if (this.buttonCtrl[i].isGeneratePassword == 1) {
                            this.form.outputCode = this.getNewCode();
                            this.outputCode = this.form.outputCode;
                            this.outputCodeVisible = true;
                        }
                        else
                            this.handleCheckIN4();
                    }
                }
            }
            else {
                this.handleCheckIN4();
            }
        },
        checkSuccess(){
            this.outputCodeVisible = false;
            this.editVisible = false;
            this.handleCheckIN4();
        },
        handleCheckIN4(){
            if (this.form.deliveryTime == null || this.form.deliveryTime == "")
                this.form.deliveryTime = "1900-01-01 00:00:00";
            for (let i = 0; i < this.form.items.length; i++) {
                let row = this.form.items[i];
                if (row.cdate == null || row.cdate == "")
                    row.cdate = "1900-01-01 00:00:00";
                if (row.unit == 0)
                    row.houseNum = row.productSum;
                else
                    row.houseNum = row.productSum * parseInt(row.packageUnit);
            }
            let data = this.form;
            request({
                host: 1,
                url: this.Urls.checkForm,
                method: 'post',
                data
            }).then(response => {
                this.disableButton = false;
                if (response.data.code == 0) {
                    this.$message.success(`审核成功`);
                    this.outputCodeVisible = false;
                    this.getTableData();
                    this.editVisible = false;
                }
                else {
                    this.$message.warning(response.data.msg);
                }
            })
        },
        handleView(index, row){
            this.handleEdit(index, row);
            this.canEdit = false;
            this.formTitle = '查看';
        },
        handlePrint(index, row){
            this.printVisible = true;
            this.canEdit = false;
            this.historyNumber = row.orderdetailInfo.trackingNumber
            this.disableButton = false;
            this.form = JSON.parse(JSON.stringify(row.orderdetailInfo));
            this.log.person = this.form.operator;
            this.log.phone = this.form.operatorPhone;
            if (row.orderdetailInfo.processId == "d7291435fed44a80b680484ac32693c3") {//采购入库
                this.title0 = "发";
                this.title1 = "入";
                this.title2 = "供应商";
                this.title3 = "入库备注";
                this.Urls.getItems = '/purchase/inquireByNo';
                this.Urls.saveForm = '/purchase/save';
                this.Urls.getVendorList = '/user/getCompany';
                this.Urls.getLinkList = '/user/getLinkMan';
                this.Urls.getProductList = '/zhccproduct/chooseProduct';
                this.Urls.getProductTypeList = '/zhccproduct/type';
                this.linkParam.type = 2;
                this.isIn = true;
                this.isDept = false;
            }
            else if (row.orderdetailInfo.processId == "56f5f49d367f441687bfd71058445c85") {//销售出库
                this.title0 = "收";
                this.title1 = "出";
                this.title2 = "客户";
                this.title3 = "收货地址";
                this.Urls.getItems = '/sell/inquireByNo';
                this.Urls.saveForm = '/sell/save';
                this.Urls.getVendorList = '/user/getCompany';
                this.Urls.getLinkList = '/user/getLinkMan';
                this.Urls.getProductList = '/zhccproduct/chooseUnsold';
                this.Urls.getProductTypeList = '/zhccproduct/type';
                this.linkParam.type = 1;
                this.isIn = false;
                this.isDept = false;
            }
            else if (row.orderdetailInfo.processId == "6f5ec356dec140d1aa5d10558b7b106a") {//领料出库
                this.title0 = "收";
                this.title1 = "出";
                this.title2 = "部门";
                this.title3 = "收货地址";
                this.Urls.getItems = '/picking/inquireByNo';
                this.Urls.saveForm = '/picking/save';
                this.Urls.getVendorList = '/dept/list';
                this.Urls.getLinkList = '/user/getUser';
                this.Urls.getProductList = '/zhccproduct/chooseUnsold';
                this.Urls.getProductTypeList = '/zhccproduct/type';
                this.linkParam.type = 1;
                this.isIn = false;
                this.isDept = true;
            }
            else if (row.orderdetailInfo.processId == "04e03be92b154c19967a45d0d175d321") {//生产入库
                this.title0 = "发";
                this.title1 = "入";
                this.title2 = "部门";
                this.title3 = "入库备注";
                this.Urls.getItems = '/production/inquireByNo';
                this.Urls.saveForm = '/production/save';
                this.Urls.getVendorList = '/dept/list';
                this.Urls.getLinkList = '/user/getUser';
                this.Urls.getProductList = '/zhccproduct/chooseProduct';
                this.Urls.getProductTypeList = '/zhccproduct/type';
                this.linkParam.type = 1;
                this.isIn = true;
                this.isDept = true;
            }
            else {//退货入库
                this.title0 = "发";
                this.title1 = "入";
                this.title2 = "公司";
                this.title3 = "入库备注";
                this.Urls.getItems = '/sales/inquireByNo';
                this.Urls.saveForm = '/sales/save';
                this.Urls.getVendorList = '/user/getCompany';
                this.Urls.getLinkList = '/user/getLinkMan';
                this.Urls.getProductList = '/zhccproduct/chooseProduct';
                this.Urls.getProductTypeList = '/zhccproduct/type';
                this.linkParam.type = 1;
                this.isIn = true;
                this.isDept = false;
            }
            this.canEdit = true;
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            });
            request({
                url: this.Urls.getItems,
                method: 'get',
                params: {orderNo: (this.form.orderdetailId ? this.form.orderdetailId : this.form.id)}
            }).then(response => {
                if (response.data.code == 0) {
                    for (let i = 0; i < response.data.data.length; i++) {
                        let row = response.data.data[i];
                        this.form.linkManId = row.linkManId;
                        row.unitSelect = [{id: "0", name: row.productUnit.split("/")[1]}, {
                            id: "1",
                            name: row.packageUnit.split("/")[1]
                        }];
                        if (this.isIn) {
                            row.areaList = [];
                            row.placeList = [];
                            row.cdate = this.timestampToTime(row.cdate);
                            if (!row.regionListGuid)
                                row.regionListGuid = "";
                            else {
                                let areaId = row.regionListGuid.split(",");
                                let areaName = row.regionListCname.split(",");
                                for (let j = 0; j < areaId.length; j++)
                                    row.areaList.push({guid: areaId[j], cname: areaName[j]});
                            }
                            if (!row.regionInfoListGuid)
                                row.regionInfoListGuid = "";
                            else {
                                let placeId = row.regionInfoListGuid.split(",");
                                let placeName = row.regionInfoListCname.split(",");
                                let placeUsed = row.regionInfoListUsed.split(",");
                                for (let j = 0; j < placeId.length; j++)
                                    row.placeList.push({
                                        ccode: placeName[j],
                                        guid: placeId[j],
                                        cused: parseInt(placeUsed[j]),
                                        capacity: parseInt(row.capacity)
                                    });
                            }
                        }
                    }
                    this.form.items = response.data.data;
                    request({
                        host: 1,
                        url: this.Urls.getPageRights2,
                        method: 'get',
                        params: {id: (this.form.orderdetailId ? this.form.orderdetailId : this.form.id)}
                    }).then(response => {
                        if (response.data.code == 0) {
                            this.pageRights = response.data.data;
                            this.processId = response.data.data.processId;
                            this.setupPage();
                        }
                    })
                }
            })
        },
        confirmPrint(){
            let subOutputRankPrint = document.getElementById('printArea');
            let newContent = subOutputRankPrint.innerHTML;
            let oldContent = document.body.innerHTML;
            document.body.innerHTML = newContent;
            window.print();
            window.location.reload();
            document.body.innerHTML = oldContent;
            return false;
        },
        storeChanged(row){
            request({
                url: this.Urls.getStoreAreaList,
                method: 'get',
                params: {storeGuid: row.storeGuid}
            }).then(response => {
                if (response.data.code == 0) {
                    row.regionGuid = '';
                    row.regionInfoGuid = '';
                    row.areaList = '';
                    row.placeList = '';
                    row.areaList = response.data.data;
                }
            })
        },
        storeAreaChanged(row){
            request({
                url: this.Urls.getStorePlaceList,
                method: 'get',
                params: {regionGuid: row.regionGuid}
            }).then(response => {
                if (response.data.code == 0) {
                    row.regionInfoGuid = '';
                    row.placeList = '';
                    row.placeList = response.data.data;
                }
            })
        },
        setupPage(){
            let obj = this.pageRights.orderFieldDesigning;
            this.taskId = this.pageRights.orderHandleDesigning[0].taskId;
            for (let i = 0; i < obj.length; i++) {
                if (obj[i].isRequired == 1) {
                    if (obj[i].field == 'driverPhone') {
                        this.rules[obj[i].field] = [{
                            required: true,
                            message: '必须输入项',
                            trigger: 'blur'
                        }, {validator: this.phoneRule, trigger: 'blur'}];
                    } else if (obj[i].field == 'trackingNumber') {
                        this.rules[obj[i].field] = [{
                            required: true,
                            message: '必须输入项',
                            trigger: 'blur'
                        }, {validator: this.isExist, trigger: 'blur'}];
                    } else {
                        this.rules[obj[i].field] = [{required: true, message: '必须输入项', trigger: 'blur'}];
                    }
                    this.mustInput[obj[i].field] = true;
                }
                else {
                    this.rules[obj[i].field] = [];
                    this.mustInput[obj[i].field] = false;
                }
                if (obj[i].permission == 0) {
                    this.visible[obj[i].field] = true;
                    this.readonly[obj[i].field] = false;
                } else if (obj[i].permission == 1) {
                    this.visible[obj[i].field] = true;
                    this.readonly[obj[i].field] = true;
                } else {
                    this.visible[obj[i].field] = false;
                    this.readonly[obj[i].field] = true;
                }
            }
            if (this.form.status == 1)
                this.canEdit = false;
            this.buttonCtrl = this.pageRights.orderHandleDesigning;
        },
        setMenuPos(){
            let obj = localStorage.ms_menu.substring(2).split("},{");
            let url = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
            for (let i = 0; i < obj.length; i++) {
                if (obj[i].indexOf("\"" + url + "\"") > 0) {
                    let row = obj[i].replace(/\"/g, "").split(",");
                    if (row[0].split(":")[1] != '3') {
                        this.menuPosition = row[0].split(":")[1];
                        this.listParam.menuPosition = this.menuPosition;
                    }
                }
            }
        },
        searchPro(){
            this.productParam.page = 1;
            this.searchProduct()
        },
        searchProduct(){
            request({
                host: 0,
                url: this.Urls.getProductList,
                method: 'get',
                params: this.productParam
            }).then(response => {
                if (response.data.code == 0) {
                    this.productParam.total = response.data.total;
                    for (let i = 0; i < response.data.data.length; i++) {
                        let row = response.data.data[i];
                        if (this.isIn) {
                            row.productUnit = row.pdSpecification + row.pdsSRefSysParam + '/' + row.pdsBRefSysParam;
                            row.packageUnit = row.packSpecification + row.pdsBRefSysParam + '/' + row.packsBRefSysParam;
                            row.unit = "0";
                            row.unitSelect = [{id: "0", name: row.pdsBRefSysParam}, {
                                id: "1",
                                name: row.packsBRefSysParam
                            }]
                        }
                        else {
                            row.guid = row.refZhccInStoreId;
                            row.loseDate = this.timestampToTime(row.loseDate).substring(0, 10);
                            row.inputDate = this.timestampToTime(row.inputDate).substring(0, 10);
                            row.unit = "0";
                            row.productSum = 0;
                            if (row.productUnit)
                                row.unitSelect = [{id: "0", name: row.productUnit.split("/")[1]}, {
                                    id: "1",
                                    name: row.packageUnit.split("/")[1]
                                }];
                        }
                        row.selected = false;
                        for (let j = 0; j < this.selectedProduct.length; j++) {

                            if (this.selectedProduct[j].guid == row.guid)
                                row.selected = true;
                        }
                    }
                    this.productList = response.data.data;
                }
            });
        },
        selectProduct(){
            let count = 0;
            if (!this.form.items)
                this.form.items = [];
            for (let i = 0; i < this.selectedProduct.length; i++) {
                if (this.selectedProduct[i].selected && this.isIn) {
                    count++;
                    let obj = this.selectedProduct[i];
                    this.form.items.push({
                        cname: obj.cname,
                        productUnit: obj.productUnit,
                        packageUnit: obj.packageUnit,
                        productSum: 0,
                        houseNum: 0,
                        cdate: '',
                        storeGuid: '',
                        regionGuid: '',
                        regionInfoGuid: '',
                        ccode: obj.ccode,
                        refZhccProduct: obj.guid,
                        effectiveDate: obj.effectiveDate,
                        edUnit: obj.edUnit,
                        wdUnit: obj.edUnit,
                        warningDate: obj.warningDate,
                        warningNum: obj.warningNum,
                        refZhccInStoreId: '',
                        areaList: [],
                        placeList: [],
                        unit: "0",
                        unitSelect: obj.unitSelect,
                        palletCapacity: obj.palletCapacity
                    });
                } else if (this.selectedProduct[i].selected && !this.isIn) {
                    let row = this.selectedProduct[i];
                    row.ccode = row.pcode;
                    row.guid = "";
                    this.form.items.push(row);
                    count++;
                }
            }
            if (count == 0)
                this.$message.warning("未选择任何商品");
            else
                this.selectProductVisible = false;
        },
        searchLink(){
            request({
                host: 0,
                url: this.Urls.getLinkList,
                method: 'get',
                params: this.linkParam
            }).then(response => {
                if (response.data.code == 0) {
                    this.linkParam.total = response.data.total;
                    for (let i = 0; i < response.data.data.length; i++) {
                        let row = response.data.data[i];
                        row.selected = false;
                        if (this.isDept) {
                            row.companyGuid = row.deptGuid;
                            row.clientName = row.deptName;
                            row.linkManName = row.cname;
                            row.cname = row.deptName;
                            row.linkManPhone = row.phone;
                        }
                        for (let j = 0; j < this.selectedLink.length; j++) {
                            if (this.selectedLink[j].guid == row.guid) {
                                row.selected = true;
                            }
                        }
                    }
                    this.linkList = response.data.data;
                }
            });
        },
        getTableData() {
            this.listLoading = true;
            request({
                host: 1,
                url: this.Urls.getListData,
                method: 'get',
                params: this.listParam
            }).then(response => {
                if (response.data.code == 0) {
                    for (let i = 0; i < response.data.data.length; i++) {
                        //设置当前节点之前的均流程完成，当前节点及之后的为未完成
                        let done = 1;
                        for (let j = 0; j < response.data.data[i].taskNodeInfo.length; j++) {
                            if (done == 1 && response.data.data[i].taskNodeInfo[j].name == response.data.data[i].orderdetailInfo.currentStep) {
                                done = 0;
                            }
                            response.data.data[i].taskNodeInfo[j].done = done;
                        }
                        response.data.data[i].orderdetailInfo.deliveryTime = this.timestampToTime(response.data.data[i].orderdetailInfo.deliveryTime);
                    }
                    this.tableData = response.data.data;
                    this.total = response.data.total;
                    this.listLoading = false;
                }
            });
        },
        handleEdit(index, row){
            this.historyNumber = row.orderdetailInfo.trackingNumber
            this.disableButton = false;
            this.formTitle = '编辑';
            this.form = JSON.parse(JSON.stringify(row.orderdetailInfo));
            this.log.person = this.form.operator;
            this.log.phone = this.form.operatorPhone;
            if (row.orderdetailInfo.processId == "d7291435fed44a80b680484ac32693c3") {//采购入库
                this.title0 = "发";
                this.title1 = "入";
                this.title2 = "供应商";
                this.title3 = "入库备注";
                this.Urls.getItems = '/purchase/inquireByNo';
                this.Urls.saveForm = '/purchase/save';
                this.Urls.getVendorList = '/user/getCompany';
                this.Urls.getLinkList = '/user/getLinkMan';
                this.Urls.getProductList = '/zhccproduct/chooseProduct';
                this.Urls.getProductTypeList = '/zhccproduct/type';
                this.linkParam.type = 2;
                this.isIn = true;
                this.isDept = false;
            }
            else if (row.orderdetailInfo.processId == "56f5f49d367f441687bfd71058445c85") {//销售出库
                this.title0 = "收";
                this.title1 = "出";
                this.title2 = "客户";
                this.title3 = "收货地址";
                this.Urls.getItems = '/sell/inquireByNo';
                this.Urls.saveForm = '/sell/save';
                this.Urls.getVendorList = '/user/getCompany';
                this.Urls.getLinkList = '/user/getLinkMan';
                this.Urls.getProductList = '/zhccproduct/chooseUnsold';
                this.Urls.getProductTypeList = '/zhccproduct/type';
                this.linkParam.type = 1;
                this.isIn = false;
                this.isDept = false;
            }
            else if (row.orderdetailInfo.processId == "6f5ec356dec140d1aa5d10558b7b106a") {//领料出库
                this.title0 = "收";
                this.title1 = "出";
                this.title2 = "部门";
                this.title3 = "收货地址";
                this.Urls.getItems = '/picking/inquireByNo';
                this.Urls.saveForm = '/picking/save';
                this.Urls.getVendorList = '/dept/list';
                this.Urls.getLinkList = '/user/getUser';
                this.Urls.getProductList = '/zhccproduct/chooseUnsold';
                this.Urls.getProductTypeList = '/zhccproduct/type';
                this.linkParam.type = 1;
                this.isIn = false;
                this.isDept = true;
            }
            else if (row.orderdetailInfo.processId == "04e03be92b154c19967a45d0d175d321") {//生产入库
                this.title0 = "发";
                this.title1 = "入";
                this.title2 = "部门";
                this.title3 = "入库备注";
                this.Urls.getItems = '/production/inquireByNo';
                this.Urls.saveForm = '/production/save';
                this.Urls.getVendorList = '/dept/list';
                this.Urls.getLinkList = '/user/getUser';
                this.Urls.getProductList = '/zhccproduct/chooseProduct';
                this.Urls.getProductTypeList = '/zhccproduct/type';
                this.linkParam.type = 1;
                this.isIn = true;
                this.isDept = true;
            }
            else {//退货入库
                this.title0 = "发";
                this.title1 = "入";
                this.title2 = "公司";
                this.title3 = "入库备注";
                this.Urls.getItems = '/sales/inquireByNo';
                this.Urls.saveForm = '/sales/save';
                this.Urls.getVendorList = '/user/getCompany';
                this.Urls.getLinkList = '/user/getLinkMan';
                this.Urls.getProductList = '/zhccproduct/chooseProduct';
                this.Urls.getProductTypeList = '/zhccproduct/type';
                this.linkParam.type = 1;
                this.isIn = true;
                this.isDept = false;
            }
            this.editVisible = true;
            this.dialogStatus = 'update';
            this.canEdit = true;
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            });
            request({
                url: this.Urls.getItems,
                method: 'get',
                params: {orderNo: (this.form.orderdetailId ? this.form.orderdetailId : this.form.id)}
            }).then(response => {
                if (response.data.code == 0) {
                    for (let i = 0; i < response.data.data.length; i++) {
                        let row = response.data.data[i];
                        this.form.linkManId = row.linkManId;
                        row.unitSelect = [{id: "0", name: row.productUnit.split("/")[1]}, {
                            id: "1",
                            name: row.packageUnit.split("/")[1]
                        }];
                        if (this.isIn) {
                            row.areaList = [];
                            row.placeList = [];
                            row.cdate = this.timestampToTime(row.cdate);
                            if (!row.regionListGuid)
                                row.regionListGuid = "";
                            else {
                                let areaId = row.regionListGuid.split(",");
                                let areaName = row.regionListCname.split(",");
                                for (let j = 0; j < areaId.length; j++)
                                    row.areaList.push({guid: areaId[j], cname: areaName[j]});
                            }
                            if (!row.regionInfoListGuid)
                                row.regionInfoListGuid = "";
                            else {
                                let placeId = row.regionInfoListGuid.split(",");
                                let placeName = row.regionInfoListCname.split(",");
                                let placeUsed = row.regionInfoListUsed.split(",");
                                for (let j = 0; j < placeId.length; j++)
                                    row.placeList.push({
                                        ccode: placeName[j],
                                        guid: placeId[j],
                                        cused: parseInt(placeUsed[j]),
                                        capacity: parseInt(row.capacity)
                                    });
                            }
                        }
                    }
                    this.form.items = response.data.data;
                    request({
                        host: 1,
                        url: this.Urls.getPageRights2,
                        method: 'get',
                        params: {id: (this.form.orderdetailId ? this.form.orderdetailId : this.form.id)}
                    }).then(response => {
                        if (response.data.code == 0) {
                            this.pageRights = response.data.data;
                            this.processId = response.data.data.processId;
                            this.setupPage();
                        }
                    })
                }
            })
        },
        saveData(){
            if (this.form.title == '' && this.form.items.length == 0 && this.form.client == '') {
                this.$message.warning("无任何资料需要保存！");
                return;
            }
            this.disableButton = true;
            this.form.taskId = this.taskId;
            if (!this.form.processId || this.form.processId == '')
                this.form.processId = this.processId;
            if (this.form.deliveryTime == null || this.form.deliveryTime == "") {
                this.form.deliveryTime = "1900-01-01 00:00:00";
            }
            if (this.form.submitType != 1)
                this.form.submitType = 0;
            this.form.outputCode = "";
            for (let i = 0; i < this.form.items.length; i++) {
                let row = this.form.items[i];
                if (row.unit == 0)
                    row.houseNum = row.productSum;
                else
                    row.houseNum = row.productSum * parseInt(row.packageUnit);
                row.linkManId = this.form.linkManId;
                if (row.cdate == null || row.cdate == "") {
                    row.cdate = "1900-01-01 00:00:00";
                }
            }
            let data = {items: this.form.items};
            data.head = this.form;
            request({
                host: 0,
                url: this.Urls.saveForm,
                method: 'post',
                data
            }).then(response => {
                this.disableButton = false;
                if (response.data.code == 0) {
                    this.getTableData();
                    this.editVisible = false;
                    if (this.form.submitType == 1)
                        this.$message.success(`提交成功`);
                    else if (this.idx == -1)
                        this.$message.success(`保存成功`);
                    else

                        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                }
                else {
                    this.$message.warning(response.data.msg);
                }
            })
        },
        checkStoreOut(type){
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.form.taskId = this.taskId;
                    //this.form.processId = this.processId;
                    this.form.outputCode = "";
                    if (this.form.items.length == 0) {
                        this.$message.warning("必须输入商品详情");
                        return false;
                    }
                    let warn = "";
                    for (let i = 0; i < this.form.items.length; i++) {
                        let row = this.form.items[i];
                        if (row.unit == 0)
                            row.houseNum = row.productSum;
                        else
                            row.houseNum = row.productSum * parseInt(row.packageUnit);
                        if ((parseInt(row.productSum) <= 0 || isNaN(row.productSum)) && this.mustInput.specificationOfGoods) {
                            this.$message.warning("第" + (i + 1) + "行商品数量必须是大于0的数字");
                            return false;
                        }
                        if (parseInt(row.restNum) < row.houseNum) {
                            warn += (i + 1) + "、";
                        }
                    }
                    let lastStep = false;
                    for (let i = 0; i < this.pageRights.orderHandleDesigning.length; i++) {
                        if (this.pageRights.orderHandleDesigning[i].name == "transaction" && this.pageRights.orderHandleDesigning[i].isEnable) {
                            lastStep = true;
                        }
                    }
                    if (lastStep && this.form.deliveryTime == '') {
                        this.form.deliveryTime = this.timestampToTime(Date.now());
                    }
                    this.opType = type;
                    if (warn.length > 0) {
                        warn = warn.substring(0, warn.length - 1);
                        this.warning = "第" + warn + "项商品库存余量不足，确定继续？";
                        this.storeWarnVisible = true;
                        if (this.form.deliveryTime == null || this.form.deliveryTime == "") {
                            this.form.deliveryTime = "1900-01-01 00:00:00";
                        }
                    }
                    else {
                        if (this.form.deliveryTime == null || this.form.deliveryTime == "") {
                            this.form.deliveryTime = "1900-01-01 00:00:00";
                        }
                        this.confirmStoreWarn();
                    }
                }
            })
        },
        checkStoreIn(type){
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.form.taskId = this.taskId;
                    //this.form.processId = this.processId;
                    this.form.outputCode = "";
                    if (this.form.items.length == 0) {
                        this.$message.warning("必须输入商品详情");
                        return;
                    }
                    let warn = "";
                    let lastStep = false;
                    for (let i = 0; i < this.pageRights.orderHandleDesigning.length; i++) {
                        if (this.pageRights.orderHandleDesigning[i].name == "transaction" && this.pageRights.orderHandleDesigning[i].isEnable) {
                            lastStep = true;
                        }
                    }
                    for (let i = 0; i < this.form.items.length; i++) {
                        let row = this.form.items[i];
                        if (row.unit == 0)
                            row.houseNum = row.productSum;
                        else
                            row.houseNum = row.productSum * parseInt(row.packageUnit);
                        if ((parseInt(row.productSum) <= 0 || isNaN(row.productSum)) && this.mustInput.specificationOfGoods) {
                            this.$message.warning("第" + (i + 1) + "行商品数量必须是大于0的数字");
                            return;
                        }
                        if (lastStep && row.cdate == '') {
                            row.cdate = this.timestampToTime(Date.now());
                        }
                        if (row.cdate == '' && this.mustInput.expiringDate) {
                            this.$message.warning("第" + (i + 1) + "行未选择生产日期");
                            return;
                        }
                        if (row.regionInfoGuid == '' && this.mustInput.warehouseLocation) {
                            this.$message.warning("第" + (i + 1) + "行仓库选项未完全指定");
                            return;
                        }
                        let used = 0;
                        let placeName = '';
                        if (row.guid && this.mustInput.warehouseLocation) {
                            let arr = row.regionInfoListGuid.split(",");
                            for (let j = 0; j < arr.length; j++) {
                                if (row.regionInfoGuid == arr[j]) {
                                    used = row.regionInfoListUsed.split(",")[j];
                                    placeName = row.regionInfoListCname.split(",")[j];
                                }
                            }
                        }
                        else {
                            for (let j = 0; j < row.placeList.length; j++) {
                                if (row.regionInfoGuid == row.placeList[j].guid) {
                                    used = row.placeList[j].cused;
                                    placeName = row.placeList[j].ccode;
                                    row.oneCapacity = row.placeList[j].capacity;
                                }
                            }
                        }
                        if ((row.oneCapacity - used) * row.palletCapacity < row.houseNum) {
                            warn += (i + 1) + "、";
                        }
                    }
                    if (lastStep && this.form.deliveryTime == '') {
                        this.form.deliveryTime = this.timestampToTime(Date.now());
                    }
                    this.opType = type;
                    if (warn.length > 0) {
                        warn = warn.substring(0, warn.length - 1);
                        this.warning = "第" + warn + "项商品指定的仓库容量不足，确定继续？";
                        if (this.form.deliveryTime == null || this.form.deliveryTime == "") {
                            this.form.deliveryTime = "1900-01-01 00:00:00";
                        }
                        this.storeWarnVisible = true;
                    }
                    else {
                        if (this.form.deliveryTime == null || this.form.deliveryTime == "") {
                            this.form.deliveryTime = "1900-01-01 00:00:00";
                        }
                        this.confirmStoreWarn();
                    }
                }
            });
        },
        confirmStoreWarn(){
            this.storeWarnVisible = false;
            switch (this.opType) {
                case "submit":
                    this.form.submitType = 1;
                    this.saveData();
                    break;
                case "record":
                    if (this.form.outputCode != "") {
                        this.passwordTitle = "请确认" + this.passwordAnotherName;
                        this.recordPasswordVisible = true;
                        this.direction = 2;
                    }
                    else {
                        this.disableButton = true;
                        this.direction = 2;
                        this.handleCheckIN3();
                    }
                    break;
                case "check":
                    this.checkVisible = true;
                    //this.direction = this.direction;
                    //this.passwordAnotherName = this.passwordAnotherName;
                    break;
            }
        },
        //检验物流单号是否存在
        isExist(rule, value, callback){
            if (this.historyNumber == value) {
                callback();
            }
            request({
                host: 1,
                url: this.Urls.isNameRepeat,
                method: 'get',
                params: {trackingNumber: this.form.trackingNumber}
            }).then(response => {
                if (response.data.code == 0) {
                    callback();
                } else if (response.data.code == 100) {
                    callback(new Error('物流单号已存在，请重新输入'))
                } else {
                    callback();
                }
            })
        },
    }

};
export default checkMixin;
