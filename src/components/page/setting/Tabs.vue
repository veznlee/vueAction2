<template>
    <div class="table">
        <div class="crumbs">
            <template>
                <el-tabs v-model="activeName" type="border-card">
                    <el-tab-pane label="商品类别" name="first">
                        <first-param></first-param>
                    </el-tab-pane>
                    <el-tab-pane label="单位规格" name="second">
                        <second-param></second-param>
                    </el-tab-pane>
                    <el-tab-pane label="仓库类型" name="third">
                        <third-param></third-param>
                    </el-tab-pane>
                </el-tabs>
            </template>
        </div>
    </div>
</template>

<script>
    import firstParam from '../../page/setting/firstParam';
    import secondParam from '../../page/setting/secondParam';
    import thirdParam from '../../page/setting/thirdParam';
    export default {
        data() {
            return {
                activeName:'first'
            }
        },
        components:{
            firstParam,secondParam,thirdParam
        },
        computed:{},
        methods:{}
    }
</script>

<style scoped>

</style>
