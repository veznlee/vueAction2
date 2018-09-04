<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <div class="search-left">
                    <el-button type="primary" icon="add" @click="handleAdd()">新增</el-button>
                </div>
                <div align="right" class="search-right">
                    <el-select v-model="listParam.currentStep" filterable placeholder="当前步骤" class="handle-select" @change="search">
                        <el-option key="" label="所有步骤" value=""></el-option>
                        <el-option v-for="item in flowList" :key="item.currentStep" :label="item.currentStep" :value="item.currentStep"></el-option>
                    </el-select>
                    <el-select v-model="listParam.client" filterable placeholder="选择部门" class="handle-select" @change="search">
                        <el-option key="" label="所有部门" value=""></el-option>
                        <el-option v-for="item in vendorList" :key="item.guid" :label="item.cname" :value="item.guid"></el-option>
                    </el-select>
                    <el-select v-model="listParam.operator" filterable placeholder="选择操作员" class="handle-select" @change="search">
                        <el-option key="" label="所有操作员" value=""></el-option>
                        <el-option v-for="item in operatorList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-input v-model="listParam.consignee" placeholder="请输入发货人" @keyup.enter.native="search" class="handle-input"></el-input>
                    <el-input v-model="listParam.consigneePhone" placeholder="请输入联系电话" @keyup.enter.native="search" class="handle-input"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                </div>
            </div>
            <el-table :data="tableData" border stripe highlight-current-row style="width: 100%" v-loading="listLoading" element-loading-text="正在载入数据，请稍候…">
                <el-table-column type="index" :index="indexMethod" fixed align="center" width="50" label="序号"></el-table-column>
                <el-table-column prop="orderdetailInfo.code" align="center" label="单号" sortable width="150"></el-table-column>
                <el-table-column prop="orderdetailInfo.title" align="center" label="标题" sortable width="220"></el-table-column>
                <el-table-column prop="orderdetailInfo.clientName" align="center" label="部门"></el-table-column>
                <el-table-column prop="orderdetailInfo.consignee" align="center" label="发货人" sortable width="100"></el-table-column>
                <el-table-column prop="orderdetailInfo.consigneePhone" align="center" label="联系电话" width="120"></el-table-column>
                <el-table-column prop="orderdetailInfo.operator" align="center" label="操作员" sortable width="100"></el-table-column>
                <!--<el-table-column prop="updatetime" align="center" label="操作时间" sortable width="150"></el-table-column>-->
                <el-table-column align="center" label="流程" min-width="300">
                    <template slot-scope="scope">
                        <span v-for="(item,index) in scope.row.taskNodeInfo">
                            <span :class="'handle-flow-box flow-box'+item.done">{{item.name}}</span><div v-if="index<tableData[scope.$index].taskNodeInfo.length-1" class="join-line"></div>
                        </span><span v-if="scope.row.orderdetailInfo.state==3"><div class="join-line"></div><span class="handle-flow-box del-list-btn">删除</span></span>
                    </template>
                </el-table-column>
                <el-table-column prop="orderdetailInfo.opinion" align="center" label="审核意见" width="150"></el-table-column>

                <el-table-column label="操作" align="center" width="240" fixed="right">
                    <template slot-scope="scope">
                        <span v-for="(item,index) in scope.row.homepageHandleDesigning">
                            <el-button v-if="item.name=='edit'" type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button v-if="item.name=='show'" size="small" @click="handleView(scope.$index, scope.row)">查看</el-button>
                            <el-button v-if="item.name=='transaction' && item.anotherName!=''" type="success" size="small" @click="handleCheck(scope.$index, scope.row)">{{item.anotherName}}</el-button>
                            <el-button v-if="item.name=='transaction' && item.anotherName==''" type="success" size="small" @click="handleCheck(scope.$index, scope.row)">提交</el-button>
                            <el-button v-if="item.name=='record' && item.anotherName!=''" type="success" size="small" @click="handleRecordList(scope.$index, scope.row)">{{item.anotherName}}</el-button>
                            <el-button v-if="item.name=='record' && item.anotherName==''" type="success" size="small" @click="handleRecordList(scope.$index, scope.row)">记录</el-button>
                            <el-button v-if="item.name=='delete'" size="small" :type="tableData[scope.$index].orderdetailInfo.state==2?'warning':'danger'" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </span>
                        <el-button @click="handlePrint(scope.$index, scope.row)">打印</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listParam.page" :page-sizes="[10,20,30, 40]" :page-size="listParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 打印弹出框 -->
        <el-dialog title="预览" :visible.sync="printVisible" width="1085px" custom-class="mod-el-dialog">
            <div id="printArea">
                <el-form :rules="rules" ref="form" :model="form" status-icon label-width="100px">
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="标题：" prop="title">
                                <span class="print-info">{{form.title}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="单号：">
                                <span class="print-info">{{form.code}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item :label="title2+'：'" prop="client">
                                <span class="print-info">{{form.clientName}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="title0+'货人：'" prop="consignee">
                                <span class="print-info">{{form.consignee}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系电话：" prop="consigneePhone">
                                <span class="print-info">{{form.consigneePhone}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item v-if="isIn" label="产出商品：" class="">
                        <div class="">
                            <el-table :data="form.items" border style="width: 100%" class="p-table-center table-bot-border" key="oTable">
                                <el-table-column type="index" :index="indexMethod" fixed align="center" width="50" label="序号"></el-table-column>
                                <el-table-column label="商品编码" width="90" prop="ccode"></el-table-column>
                                <el-table-column label="商品名称" prop="cname"></el-table-column>
                                <el-table-column label="商品规格" width="100" prop="productUnit"></el-table-column>
                                <el-table-column label="包装规格" width="100" prop="packageUnit"></el-table-column>
                                <el-table-column label="商品数量" width="80">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.productSum}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="生产日期" width="100" prop="cdate">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.cdate | substr}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="仓库" width="120" prop="storeCname"></el-table-column>
                                <el-table-column label="区域" width="80" prop="regionCname"></el-table-column>
                                <el-table-column label="号" width="60">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.regionInfoCname}}号</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="!isIn" label="产出商品：">
                        <el-table :data="form.items" border style="width: 100%" class="p-table-center table-bot-border" key="tTable">
                            <el-table-column type="index" :index="indexMethod" fixed align="center" width="50" label="序号"></el-table-column>
                            <el-table-column label="商品编码" width="90" prop="ccode"></el-table-column>
                            <el-table-column label="商品名称"  prop="cname"></el-table-column>
                            <el-table-column label="商品规格" width="100" prop="productUnit"></el-table-column>
                            <el-table-column label="包装规格" width="100" prop="packageUnit"></el-table-column>
                            <el-table-column label="商品数量" width="80">
                                <template slot-scope="scope">
                                    <span>{{scope.row.productSum}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="仓库" width="120" prop="storeCname"></el-table-column>
                            <el-table-column label="区域" width="80" prop="regionCname"></el-table-column>
                            <el-table-column label="号" width="60" prop="regionInfoCname">
                                <template slot-scope="scope">
                                    <span>{{scope.row.regionInfoCname}}号</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="物流单号：" prop="trackingNumber">
                                <span class="print-info">{{form.trackingNumber}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="title1+'库时间：'" prop="deliveryTime">
                                <span class="print-info">{{form.deliveryTime | substr}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="司机：" prop="driver">
                                <span class="print-info">{{form.driver}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="司机电话：" prop="driverPhone">
                                <span class="print-info">{{form.driverPhone}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item :label="title3+'：'" prop="description">
                        <span class="print-info">{{form.description}}</span>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="button" @click="printVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmPrint">确定打印</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog :title="formTitle" :visible.sync="editVisible" width="70%" custom-class="mod-el-dialog">
            <el-row :gutter="20" class="dialogTop mgb20">
                <el-col :span="12" align="center"><div class="grid-content bg-purple">操作员：{{log.person}}</div></el-col>
                <el-col :span="12" align="center"><div class="grid-content bg-purple">操作员电话：{{log.phone}}</div></el-col>
            </el-row>
            <el-form :rules="rules" ref="form" :model="form" status-icon label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="标题：" prop="title"><el-input v-if="visible.title" v-model="form.title" maxlength="64" :readonly="!canEdit || readonly.title"></el-input></el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="单号："><el-input v-model="form.code" maxlength="20" readonly="readonly" placeholder="系统自动生成"></el-input></el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="部门：" prop="client"><el-input v-if="visible.client" v-model="form.clientName" maxlength="64" readonly="readonly" @click.native="addLink"></el-input></el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="发货人：" prop="consignee"><el-input v-if="visible.consignee" v-model="form.consignee" maxlength="64" readonly="readonly" @click.native="addLink"></el-input></el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系电话：" prop="consigneePhone"><el-input v-if="visible.consigneePhone" v-model="form.consigneePhone" maxlength="11" readonly="readonly" @click.native="addLink"></el-input></el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="产出商品：">
                    <el-table :data="form.items" border style="width: 100%" key="oTable">
                        <el-table-column type="index" :index="indexMethod" fixed align="center" width="50" label="序号"></el-table-column>
                        <el-table-column label="商品编码" width="90" prop="ccode"></el-table-column>
                        <el-table-column label="商品名称" prop="cname" min-width="150"></el-table-column>
                        <el-table-column label="商品规格" width="100" prop="productUnit"></el-table-column>
                        <el-table-column label="包装规格" width="100" prop="packageUnit"></el-table-column>
                        <el-table-column label="商品数量" width="100">
                            <template slot-scope="scope">
                                <el-input v-if="visible.specificationOfGoods" v-model="scope.row.productSum" maxlength="4" :readonly="!canEdit || readonly.specificationOfGoods"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="生产日期" width="170" prop="cdate">
                            <template slot-scope="scope">
                                <el-date-picker  v-if="visible.expiringDate"
                                                 v-model="scope.row.cdate"
                                                 type="date"
                                                 style="width: 140px"
                                                 :editable="false"
                                                 :picker-options="pickDateBefore"
                                                 placeholder="选择日期"
                                                 value-format="yyyy-MM-dd HH:mm:ss" :readonly="!canEdit || readonly.expiringDate">
                                </el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column label="选择仓库" width="180">
                            <template slot-scope="scope">
                                <el-select  v-if="visible.warehouseLocation" v-model="scope.row.storeGuid" filterable placeholder="选择仓库" class="handle-Melect mr10" @change="storeChanged(scope.row)" :disabled="!canEdit || readonly.warehouseLocation">
                                    <el-option v-for="item in storeList" :key="item.guid" :label="item.cname" :value="item.guid"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="选择区域" width="150">
                            <template slot-scope="scope">
                                <el-select  v-if="visible.warehouseLocation" v-model="scope.row.regionGuid" filterable placeholder="选择区域" class="handle-Melect mr10" @change="storeAreaChanged(scope.row)" :disabled="!canEdit || readonly.warehouseLocation">
                                    <el-option v-for="item in scope.row.areaList" :key="item.guid" :label="item.cname" :value="item.guid"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="选择号" width="190">
                            <template slot-scope="scope">
                                <el-select  v-if="visible.warehouseLocation" v-model="scope.row.regionInfoGuid" filterable placeholder="选择号" class="handle-Melect mr10" :disabled="!canEdit || readonly.warehouseLocation">
                                    <el-option v-for="item in scope.row.placeList" :key="item.guid" :label="item.ccode+'号-'+'已使用'+item.cused+'/'+item.capacity" :value="item.guid"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column width="80" align="center" :render-header="renderHeader" fixed="right" v-if="!readonly.specificationOfGoods">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="tableLineDelete(scope.$index, scope.row)" :disabled="!canEdit || readonly.specificationOfGoods">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>

                <fieldset>
                    <legend> 记录 </legend>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="物流单号：" prop="trackingNumber"><el-input v-if="visible.trackingNumber" v-model="form.trackingNumber" maxlength="32" :readonly="!canEdit || readonly.trackingNumber"></el-input></el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="入库时间：" prop="deliveryTime">
                                <el-date-picker v-if="visible.deliveryTime"
                                                v-model="form.deliveryTime"
                                                type="date"
                                                :picker-options="pickDateBefore"
                                                placeholder="选择日期"
                                                value-format="yyyy-MM-dd HH:mm:ss" :readonly="!canEdit || readonly.deliveryTime">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="司机：" prop="driver"><el-input v-if="visible.driver" v-model="form.driver" maxlength="64" :readonly="!canEdit || readonly.driver"></el-input></el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="司机电话：" prop="driverPhone"><el-input v-if="visible.driverPhone" v-model="form.driverPhone" maxlength="11" :readonly="!canEdit || readonly.driverPhone"></el-input></el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="入库备注：" prop="description"><el-input v-if="visible.description" type="textarea" v-model="form.description" :readonly="!canEdit || readonly.description"></el-input></el-form-item>
                </fieldset>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <span v-for="(item,index) in buttonCtrl">
                   &nbsp;<el-button v-if="item.name=='reset' && form.status==0 && canEdit" type="normal" size="small" @click="resetForm()" :disabled="!canEdit">重置</el-button>
                    <el-button v-if="item.name=='record' && item.anotherName!='' && form.status==0 && canEdit" type="success" size="small" @click="handleRecordForm" :disabled="disableButton">{{item.anotherName}}</el-button>
                    <el-button v-if="item.name=='record' && item.anotherName=='' && form.status==0 && canEdit" type="success" size="small" @click="handleRecordForm" :disabled="disableButton">记录</el-button>
                    <el-button v-if="item.name=='transaction' && item.anotherName!='' && form.status==0 && canEdit" type="success" size="small" @click="handleSubmit()" :disabled="disableButton">{{item.anotherName}}</el-button>
                    <el-button v-if="item.name=='transaction' && item.anotherName=='' && form.status==0 && canEdit" type="success" size="small" @click="handleSubmit()" :disabled="disableButton">提交</el-button>
                    <el-button v-if="item.name=='agree' && item.anotherName!='' && form.status==0 && canEdit" type="warning" size="small" @click="handleCheckIN(1,item.passwordAnotherName)">{{item.anotherName}}</el-button>
                    <el-button v-if="item.name=='agree' && item.anotherName=='' && form.status==0 && canEdit" type="warning" size="small" @click="handleCheckIN(1,item.passwordAnotherName)">审核通过</el-button>
                    <el-button v-if="item.name=='rollback' && item.anotherName!='' && form.status==0 && canEdit" type="danger" size="small" @click="handleCheckIN(0)">{{item.anotherName}}</el-button>
                    <el-button v-if="item.name=='rollback' && item.anotherName=='' && form.status==0 && canEdit" type="danger" size="small" @click="handleCheckIN(0)">审核不通过</el-button>
                    <el-button v-if="item.name=='save' && form.status==0 && canEdit" size="small" type="primary" @click="saveData" :disabled="disableButton">保存</el-button>
                </span>
                    <el-button size="small" type="normal" @click="editVisible = false">关闭</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="选择商品" :visible.sync="selectProductVisible" width="50%" custom-class="mod-el-dialog">
            <div class="handle-box">
                <div style="width: 100%" class="search-right">
                    <el-row :gutter="20">
                        <el-col :span="11">&nbsp;
                        </el-col>
                        <el-col :span="5">
                            <el-select v-model="productParam.refSysParam" filterable placeholder="选择类别" @change="searchPro">
                                <el-option key="" label="所有类别" value=""></el-option>
                                <el-option v-for="item in productTypeList" :key="item.guid" :label="item.cname" :value="item.guid"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="6">
                            <el-input v-model="productParam.condition" placeholder="商品编码或名称" @keyup.enter.native="searchPro"></el-input>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" icon="search" @click="searchPro">搜索</el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <el-table :data="productList" border style="width: 100%">
                <el-table-column type="index" :index="productIndexCal" fixed align="center" width="60" label="序号"></el-table-column>
                <el-table-column label="选择" width="60"><template slot-scope="scope"><el-checkbox v-model="scope.row.selected" :disabled="!canEdit" @change="selectOneProduct(scope.row)"></el-checkbox></template></el-table-column>
                <el-table-column label="商品编码" width="130" prop="ccode"></el-table-column>
                <el-table-column label="商品名称" prop="cname"></el-table-column>
                <el-table-column label="商品规格" width="130" prop="productUnit"></el-table-column>
                <el-table-column label="包装规格" width="130" prop="packageUnit"></el-table-column>
            </el-table>
            <div class="handle-box mt10">
                <div class="search-left"></div>
                <div class="search-right">
                    <el-button type="info" @click="goPrePageProduct">上一页</el-button>
                    {{productParam.page}}/{{parseInt((productParam.total+9)/productParam.pageSize)}}
                    <el-button type="info" @click="goNextPageProduct">下一页</el-button>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button plain @click="selectProductVisible = false;">取 消</el-button>
                <el-button type="primary" @click="selectProduct">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="选择部门" :visible.sync="selectLinkVisible" width="40%" custom-class="mod-el-dialog">
            <div class="handle-box">
                <div style="width: 100%" class="search-right">
                    <el-row :gutter="20">
                        <el-col :span="11">&nbsp;
                        </el-col>
                        <el-col :span="10">
                            <el-input v-model="linkParam.condition" placeholder="部门名称或联系人或联系人电话" @keyup.enter.native="searchCus"></el-input>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" icon="search" @click="searchCus">搜索</el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <el-table :data="linkList" border style="width: 100%">
                <el-table-column label="选择" width="60"><template slot-scope="scope"><el-checkbox v-model="scope.row.selected" :disabled="!canEdit" @change="selectOneVendor(scope.$index,scope.row)"></el-checkbox></template></el-table-column>
                <el-table-column type="index" :index="linkIndexCal" fixed align="center" width="50" label="序号"></el-table-column>
                <el-table-column label="部门名称" prop="cname"></el-table-column>
                <el-table-column label="联系人" prop="linkManName"></el-table-column>
                <el-table-column label="联系电话" prop="linkManPhone"></el-table-column>
            </el-table>
            <div class="handle-box mt10">
                <div class="search-left"></div>
                <div class="search-right">
                    <el-button type="info" @click="goPrePageLink">上一页</el-button>
                    {{linkParam.page}}/{{parseInt((linkParam.total+9)/linkParam.pageSize)}}
                    <el-button type="info" @click="goNextPageLink">下一页</el-button>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="selectLinkVisible = false;">取 消</el-button>
                <el-button type="primary" @click="selectLink">确 定</el-button>
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
        <!-- 删除需审核 -->
        <el-dialog title="单据已归档，删除需审核" :visible.sync="delCheckVisible" width="300px" center>
            <div class="del-dialog-cnt">请输入删除意见:<el-input v-model="delOpinion"></el-input></div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delCheckVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmDelCheck">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 仓库余量不足警告 -->
        <el-dialog title="警告" :visible.sync="storeWarnVisible" width="300px" center>
            <div class="del-dialog-cnt">{{this.warning}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="storeWarnVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmStoreWarn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import request from '../../../utils/request'
    import baseMixin from '../../common/tableBase';
    import checkMixin from '../../common/check';
    //引入方法
    import {formatDate} from '../../common/date.js'
    //定义数据
    export default {
        mixins: [baseMixin, checkMixin],
        data() {
            return {
                //修改接口及加上接口文件
                menuPosition: 'b870036f861449188539f8962add3028',
                processId: '04e03be92b154c19967a45d0d175d321',
                taskId: '',
                Urls: {
                    getListData: '/workFlow/userTask',
                    getItems: '/production/inquireByNo',
                    saveForm: '/production/save',
                    deleteForm: '/workFlow/delOrderdetail',
                    checkForm: '/workFlow/checkOrderdetail',
                    getVendorList: '/dept/list',
                    getLinkList: '/user/getUser',
                    getOperatorList: '/workFlow/findOperatorAll',
                    getFlowList: '/workFlow/findNodeInfoByProcessId',
                    getProductList: '/zhccproduct/chooseProduct',
                    getProductTypeList: '/zhccproduct/type',
                    getStoreList: '/zhccstore/chooseStore',
                    getStoreAreaList: '/zhccstore/chooseRegion',
                    getStorePlaceList: '/zhccstore/chooseRegionInfo',
                    getPageRights: '/workFlow/orderSaveWin',
                    getPageRights2: '/workFlow/orderCompileWin'
                },
                listParam: {
                    client: "",
                    menuPosition: 'b870036f861449188539f8962add3028',
                    operator: "",
                    consignee: "",
                    consigneePhone: "",
                    trackingNumber: '',
                    currentStep: ''
                    //程序生成
                },
                isDept:true,
                isIn:true
            }
        },
        created() {
            this.setMenuPos();
            this.init();
        },
        watch: {},
        computed: {},
        methods: {
            init(){
                request({
                    host: 0,
                    url: this.Urls.getVendorList,
                    method: 'get',
                    params: {pageSize: 100}
                }).then(response => {
                    if (response.data.code == 0) {
                        this.vendorList = response.data.data;
                    }
                });
                request({
                    host: 1,
                    url: this.Urls.getFlowList,
                    method: 'get',
                    params: {processId: this.processId, pageSize: 100}
                }).then(response => {
                    if (response.data.code == 0) {
                        this.flowList = response.data.data;
                    }
                });
                request({
                    host: 1,
                    url: this.Urls.getOperatorList,
                    method: 'get',
                    params: {processId: this.processId, pageSize: 100}
                }).then(response => {
                    if (response.data.code == 0) {
                        this.operatorList = response.data.data;
                    }
                });
                request({
                    host: 0,
                    url: this.Urls.getStoreList,
                    method: 'get',
                    params: {pageSize: 100}
                }).then(response => {
                    if (response.data.code == 0) {
                        this.storeList = response.data.data;
                    }
                });
            }
        }
    }
</script>

<style scoped>
</style>
