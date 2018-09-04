<template>
    <el-submenu v-if="item.childList && item.childList.length" :index="navIndex">
        <!-- 创建父级菜单 -->
        <template slot="title">
            <i v-if="item.pid=='#'" :class="item.icon"></i><span slot="title">{{ item.title }}</span>
        </template>
        <!-- 创建子菜单 -->
        <side-bar-item v-for="(subItem,i) in item.childList" :key="navIndex+'-'+i" :navIndex="navIndex+'-'+i" :item="subItem" >{{subItem.title}}</side-bar-item>
    </el-submenu>
    <el-menu-item v-else :to="item.url" :index="String(item.url)" :route="{path: item.url}">
        <i v-if="item.pid=='#'" :class="item.icon"></i><span slot="title">{{ item.title }}</span>
    </el-menu-item>
</template>

<script>
    export default {
        name: "sideBarItem",
        props: ['item','navIndex']
    }
</script>

<style scoped>
    .el-menu-item i {
        color: #82b11b;
    }
    .el-menu-item.is-active i{
        color: #fff;
    }
</style>
