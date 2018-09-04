<template>
    <div class="sidebar" style="height: calc(100vh - 140px);">
        <el-scrollbar style="height: 100%">
            <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#fff" text-color="#82b11b" active-text-color="#fff" unique-opened router>
                <side-bar-item v-for="(item, n) in items" :item="item" :navIndex="String(n)" :key="n"></side-bar-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
    import bus from '../common/bus';
    import sideBarItem from '../common/sideBarItem';
    import { menuList} from '../../api/interface'
    export default {
        data() {
            return {
                collapse: false,
                param:{},
                items:[],
                autoResize:1366,
            }
        },
        beforeDestroy(){
            window.removeEventListener('resize', this.handleResize)
        },
        mounted(){
            window.addEventListener('resize',this.handleResize);
        },
        methods: {
            handleResize(){
                var clientWidth=document.body.clientWidth;
                if(clientWidth<=this.autoResize){
                    this.collapse=true;
                    bus.$emit('collapse', this.collapse);
                }else{
                    this.collapse=false;
                    bus.$emit('collapse', this.collapse);
                }
            },
            getMenu() {
                menuList(this.param).then(response => {
                    this.items = response.data.data;
                    let ids = [];
                    (function it(obj) {
                        if (obj.childList && obj.childList.length > 0) {
                            for (let i = 0; i < obj.childList.length; i++) {
                                it(obj.childList[i]);
                            }
                        }
                        else
                            ids.push({id: obj.id, bindId: obj.bindId, url: obj.url});
                    })({childList: this.items});
                    localStorage.setItem('ms_menu', JSON.stringify(ids));
                })
            },
        },
        components: { sideBarItem },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            this.getMenu();
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });
            this.handleResize();
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 15px;
        top: 125px;
        bottom:0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 186px;
    }
</style>
