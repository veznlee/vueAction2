<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>模块名</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <div class="search-left">
                    <el-button type="primary" icon="add" @click="handleAdd()">新增</el-button>
                </div>
                <div align="right" class="search-left">
                    "{searchHTML}"
                    <el-input v-model="listParam.condition" placeholder="请输入编码或名称" @keyup.enter.native="search" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                </div>
            </div>
            <el-table :data="tableData" border style="width: 100%" v-loading="listLoading" element-loading-text="正在载入数据，请稍候…" class="p-table-center" stripe>
                <el-table-column type="index" :index="indexMethod" fixed align="center" width="50" label="序号"></el-table-column>
                "{listHTML}"
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
        <el-dialog :title="formTitle" :visible.sync="editVisible" width="40%">
            <el-row :gutter="20" class="dialogTop mgb20">
                <el-col :span="12" align="center"><div class="grid-content bg-purple">操作员：{{form.operator}}</div></el-col>
                <el-col :span="12" align="center"><div class="grid-content bg-purple">操作员电话：{{form.operatorPhone}}</div></el-col>
            </el-row>
            <el-form :rules="rules" ref="form" :model="form" label-width="80px">
                "{headHTML}"
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
    export default {
        mixins: [baseMixin],
        data() {
            return {
                Urls: {},
                listParam: {
                    searchCode: 0
                },
                form: {
                    headCode0: 0
                },
                rules: {
                    rulesCode: 0
                },
            }
        },
        created() {
        },
        watch:{

        },
        computed: {
        },
        methods: {
            resetForm() {
                this.form = {
                    headCode0: 0
                }
            }
        }
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
    }
    .handle-box .search-left{
        flex: 1;
    }
    .handle-select {
        width: 120px;
    }
    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>
