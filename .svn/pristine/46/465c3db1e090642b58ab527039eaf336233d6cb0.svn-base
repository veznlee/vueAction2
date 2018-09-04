<template>
    <el-submenu v-if="item.subs && item.subs.length" :index="navIndex">
        <!-- 创建父级菜单 -->
        <template slot="title">
            <i v-if="item.icon" :class="item.icon"></i><span slot="title">{{ item.title }}</span>
        </template>
        <!-- 创建子菜单 -->
        <side-bar-item v-for="(subItem,i) in item.subs" :key="navIndex+'-'+i" :navIndex="navIndex+'-'+i" :item="subItem" >{{subItem.title}}</side-bar-item>
    </el-submenu>

    <el-menu-item v-else :index="item.index" :route="{path: item.index}">
        <i v-if="item.icon" :class="item.icon"></i><span slot="title">{{ item.title }}</span>
    </el-menu-item>
</template>

<script>
    export default {
        name: "sideBarItem",
        props: ['item','navIndex']
    }
</script>

<style scoped>

</style>
