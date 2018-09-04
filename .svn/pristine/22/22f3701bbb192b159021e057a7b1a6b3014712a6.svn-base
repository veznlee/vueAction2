<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>模块名称</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <div class="search-left">
                    <el-button type="primary" icon="add" @click="handleAdd()">新增</el-button>
                </div>
                <div align="right" class="search-right">
                    <el-form-item label="客户/供应:"><el-input v-model="listParam.client" placeholder="请输入客户/供应" @keyup.enter.native="search" class="handle-input mr10"></el-input>
</el-form-item><
><el-form-item label="操作员:"><el-input v-model="listParam.operator" placeholder="请输入操作员" @keyup.enter.native="search" class="handle-input mr10"></el-input>
</el-form-item><
><el-form-item label="收/发货人:"><el-input v-model="listParam.consignee" placeholder="请输入收/发货人" @keyup.enter.native="search" class="handle-input mr10"></el-input>
</el-form-item><
><el-form-item label="收/发货人:"><el-input v-model="listParam.consigneephone" placeholder="请输入收/发货人" @keyup.enter.native="search" class="handle-input mr10"></el-input>
</el-form-item><
>
                    <el-input v-model="listParam.condition" placeholder="请输入编码或名称" @keyup.enter.native="search" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                </div>
            </div>
            <el-table :data="tableData" border style="width: 100%" v-loading="listLoading" element-loading-text="正在载入数据，请稍候…">
                <el-table-column type="index" :index="indexMethod" fixed align="center" width="50" label="序号"></el-table-column>
                <el-table-column prop="code" align="center" label="订单码" sortable width="150"></el-table-column>
<el-table-column prop="title" align="center" label="标题" sortable width="150"></el-table-column>
<el-table-column prop="client" align="center" label="客户/供应" sortable width="150"></el-table-column>
<el-table-column prop="consignee" align="center" label="收/发货人" sortable width="150"></el-table-column>
<el-table-column prop="consigneephone" align="center" label="收/发货人" sortable width="150"></el-table-column>
<el-table-column prop="operator" align="center" label="操作员" sortable width="150"></el-table-column>
<el-table-column prop="updatetime" align="center" label="修改时间" sortable width="150"></el-table-column>
<el-table-column prop="createtime" align="center" label="创建时间" sortable width="150"></el-table-column>
<el-table-column prop="opinion" align="center" label="审核意见" sortable width="150"></el-table-column>

                <el-table-column label="操作" align="center" width="180">
                    <template slot-scope="scope">
                        <el-button class="danger" size="small" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
                        <el-button class="wraning" size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listParam.page" :page-sizes="[10,20,30, 40]" :page-size="listParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="formTitle" :visible.sync="editVisible" width="50%" custom-class="mod-el-dialog">
            <el-row :gutter="20" class="dialogTop mgb20">
                <el-col :span="12" align="center"><div class="grid-content bg-purple">操作员：{{form.operator}}</div></el-col>
                <el-col :span="12" align="center"><div class="grid-content bg-purple">操作员电话：{{form.operatorPhone}}</div></el-col>
            </el-row>
            <el-form :rules="rules" ref="form" :model="form" status-icon label-width="100px">
               <el-form-item label="标题：" prop="title"><el-input v-model="form.title" maxlength="64"></el-input></el-form-item>
<el-form-item label="订单码：" prop="code"><el-input v-model="form.code" maxlength="20"></el-input></el-form-item>
<el-form-item label="收/发货人：" prop="consignee"><el-input v-model="form.consignee" maxlength="64"></el-input></el-form-item>
<el-form-item label="收/发货人：" prop="consigneephone"><el-input v-model="form.consigneephone" maxlength="11"></el-input></el-form-item>
<el-form-item label="客户/供应：" prop="client"><el-input v-model="form.client" maxlength="64"></el-input></el-form-item>

                <el-form-item label="区域配置">
                    <el-table :data="itemsData" border style="width: 100%">
                        <el-table-column type="index" :index="indexMethod" fixed align="center" width="50" label="序号"></el-table-column>
                        <el-table-column label="商品编码" width="130"><template slot-scope="scope"><el-input v-model="scope.row.ccode" maxlength="32"></el-input></template></el-table-column>
<el-table-column label="商品编码" width="130"><template slot-scope="scope"><el-input v-model="scope.row.ccode" maxlength="32"></el-input></template></el-table-column>
<el-table-column label="商品编码" width="130"><template slot-scope="scope"><el-input v-model="scope.row.ccode" maxlength="32"></el-input></template></el-table-column>
<el-table-column label="商品编码" width="130"><template slot-scope="scope"><el-input v-model="scope.row.ccode" maxlength="32"></el-input></template></el-table-column>
<el-table-column label="商品数量" width="130"><template slot-scope="scope"><el-input v-model="scope.row.productSum" maxlength=""></el-input></template></el-table-column>
<el-table-column label="生产日期" width="130"><template slot-scope="scope"><el-input v-model="scope.row.cdate" maxlength=""></el-input></template></el-table-column>
<el-table-column label="仓库ID" width="130"><template slot-scope="scope"><el-input v-model="scope.row.refZhccStore" maxlength="32"></el-input></template></el-table-column>

                    </el-table>
                </el-form-item>
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
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import baseMixin from '../../common/tableBase';
    //引入方法
    import {formatDate} from '../../common/date.js'
    //定义数据
    export default {
        mixins: [baseMixin],
        data() {
            return {
                //修改接口及加上接口文件
                Urls: {},
                listParam: {
                    client,
operator,
consignee,
consigneephone,
//程序生成
                },
                form: {
                    head: {title:'',
code:'',
consignee:'',
consigneephone:'',
client:'',
},//程序生成
                    items: {ccode:'',
ccode:'',
ccode:'',
ccode:'',
productSum:'',
cdate:'',
refZhccStore:'',
}//程序生成
                },
                rules: {
                    title: [{ required: true, message: '必须输入项', trigger: 'blur' }],
code: [{ required: true, message: '必须输入项', trigger: 'blur' }],
consignee: [{ required: true, message: '必须输入项', trigger: 'blur' }],
consigneephone: [{ required: true, message: '必须输入项', trigger: 'blur' }],
client: [{ required: true, message: '必须输入项', trigger: 'blur' }],

                },
                itemsParam: {
                    guid: ''
                },
                itemsData: []
            }
        },
        created() {
        },
        watch: {},
        computed: {},
        methods: {
            resetForm() {
                this.form = {
                    head: {title:'',
code:'',
consignee:'',
consigneephone:'',
client:'',
},//程序生成
                    items: {ccode:'',
ccode:'',
ccode:'',
ccode:'',
productSum:'',
cdate:'',
refZhccStore:'',
}//程序生成
                }
            }
        }
    }
</script>

<style scoped>
    .dialogTop{
        background-color: #c0df7c;
        padding: 8px 0;
        margin: -10px -20px 20px !important;
    }
    .handle-box {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
    }
    .handle-box .search-left{
        flex: 1;
    }
    .handle-select {
        width: 200px;
    }
    .handle-input {
        width: 200px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .area-select{

    }
    .el-dialog{
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background: transparent;
    }
    .el-dialog__header{background-color: white}
    .el-dialog__body{background-color: white}
    .el-dialog__footer{background-color: white;text-align: center}
</style>
