<template>
    <div class="tagWrap f-cb">
        <div class="tag-index" :class="{'active': isActive('/home')}" @click="routeTo('/home')">首页</div>
        <div class="tags" ref="tagsContainer">
            <div class="tag-context-menu" ref="tagsContextMenu" :style="{visibility:tagContextMenuVisible}" v-show="tagContextMenuShow" v-clickoutside="closeContextMenu">
                <ul class="context-menu-box" style="width:120px;">
                    <li class="menu-item" @click="closeAll">关闭所有</li>
                    <li class="menu-item" @click="closeOther">关闭其他</li>
                </ul>
            </div>
            <div class="left-arrow" @click="setTagPosition('right')"><img src="../../../static/img/left_arrow.png"/></div>
            <div class="right-arrow" @click="setTagPosition('left')"><img src="../../../static/img/right_arrow.png"/></div>
            <div class="tags-scroll" v-resize="resizeTagPosition" ref="tagScroll">
                <ul class="tags-scroll-inner" ref="tagBox" :style="tagWrapStyle">
                    <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index" v-oncontextmenu="openContextMenu">
                        <a href="javascript:;" @click="routeTo(item.path)" class="tags-li-title">
                            {{item.title}}
                            <span class="tags-li-icon" @click.stop="closeTags(index)"><i class="el-icon-close"></i></span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import request from '../../utils/request'
    export default {
        data() {
            return {
                Urls:{
                    tableList:'/user/userPermission',
                },
                listParam: {
                    page: 1,
                    pageSize: 10,
                    condition:''
                },
                tags:true,
                tagsList: [],
                tagScrollLeft:0,
                tagWrapStyle:{
                    'margin-left':'0px'
                },
                items:[],
                tagContextMenuShow:false,
                tagContextMenuVisible:'hidden'
            }
        },
        methods: {
            isActive(path) {
                return path === this.$route.path;
            },
            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.path && this.$router.push(item.path);
                    this.$nextTick(()=>{
                        this.setTagPosition('reduce');
                    });
                }else{
                    this.$router.push('/home');
                    this.tagScrollLeft = 0;
                };
            },
            // 关闭全部标签
            closeAll(){
                this.tagsList = [];
                this.$router.push('/home');
                this.tagScrollLeft = 0;
                this.closeContextMenu();
            },
            // 关闭其他标签
            closeOther(){
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.path;
                });
                this.closeContextMenu();
                this.tagsList = curItem;
                this.tagScrollLeft = 0;
            },
            getTagActiveIndex(route){
                var i = 0,l = this.tagsList.length;
                for(;i<l;i++){if(this.tagsList[i].path == route.path){return i;}}
                return -1;
            },
            // 设置标签
            setTags(route){
                if(route.path=="/home"){
                    return false;
                }
                const index = this.getTagActiveIndex(route);
                if(index<0){
                    this.tagsList.push({
                        title: route.meta.title,
                        path: route.path
                    });
                    /*request({
                        url:this.Urls.tableList,
                        method: 'get',
                        params: this.listParam
                    }).then(response => {
                        if(response.data.code==0){
                            this.items = response.data.data;
                            let index=this.$route.path.substring(1);
                            var title = "";
                            (function abs(arr) {
                                for(var j=0; j<arr.length; j++){
                                    if(arr[j].url == index){
                                        title = arr[j].title;
                                        break;
                                    }
                                    if(arr[j].childList){
                                        abs(arr[j].childList);
                                    }
                                }
                            })(this.items);
                            if(this.$route.path.substring(1)=='storeView_region'){
                                this.tagsList.push({
                                    title: '库存查看-区号',
                                    path: route.path
                                });
                            }else if(this.$route.path.substring(1)=='storeCheck_view'){
                                this.tagsList.push({
                                    title: '库存盘点-查看',
                                    path: route.path
                                });
                            }else if(this.$route.path.substring(1)=='storeCheck_edit'){
                                this.tagsList.push({
                                    title: '库存盘点-新增',
                                    path: route.path
                                });
                            }else{
                                this.tagsList.push({
                                    title: title,
                                    path: route.path
                                });
                            }

                        }
                    })*/
                    this.$nextTick(()=>{
                        this.setTagPosition('add');
                    });
                }else{
                    this.setTagPosition(index);
                }
            },
            setTagPosition(d){
                if(this.$refs.tagScroll && this.$refs.tagBox && this.tagsList.length>0){
                    var tagBox = this.$refs.tagBox;
                    var ml = this.tagScrollLeft;//tagBox.style.marginLeft
                    var ow = this.$refs.tagScroll.offsetWidth;
                    var pw = tagBox.childNodes[0].offsetWidth;
                    var iw = pw*this.tagsList.length;
                    if(iw<=ow){
                        this.tagScrollLeft = 0;
                    }else{
                        if('add' == d){
                            this.tagScrollLeft = ow - iw;
                        }
                        if('reduce' == d){
                            this.tagScrollLeft = Math.max(this.tagScrollLeft,ow - iw);
                        }
                        if('left' == d){//左
                            this.tagScrollLeft = Math.max(this.tagScrollLeft - pw,ow - iw);
                        }
                        if('right' == d){
                            this.tagScrollLeft = Math.min(this.tagScrollLeft + pw,0);
                        }
                        if('resize' == d){
                            if((iw-Math.abs(this.tagScrollLeft))<ow){
                                this.tagScrollLeft = ow-iw;
                            }
                        }
                        if(typeof d == 'number'){
                            //如果右边超出
                            if(pw*(d+1) > ow-ml){
                                this.tagScrollLeft = ow-pw*(d+1);
                            };
                            //如果左边超出
                            if(-1*pw*d > ml){
                                this.tagScrollLeft = -1*pw*d;
                            }
                        }
                    }
                }
            },
            resizeTagPosition(){
                this.setTagPosition('resize');
            },
            openContextMenu(e){
                var event = event || window.event;
                event.preventDefault?(event.preventDefault()):(event.returnValue = false);
                var container = this.$refs.tagsContainer,menu = this.$refs.tagsContextMenu;

                //先显示，用于获取宽度
                this.tagContextMenuShow = true;
                var pageX = event.pageX?event.pageX:(event.clientX+(document.body.scrollLeft||document.documentElement.scrollLeft)),
                    pageY = event.pageY?event.pageY:(event.clientY+(document.body.scrollTop||document.documentElement.scrollTop)),
                    mw = menu.offsetWidth,
                    ww = window.innerWidth;

                var rpx = pageX-237,rpy = pageY-60;
                if(rpx > (ww - 239 - mw)){
                    rpx = ww - 239 - mw;
                }
                menu.style.left = rpx+'px';
                menu.style.top = rpy+'px';
                this.tagContextMenuVisible = 'visible';
            },
            closeContextMenu(){
                this.tagContextMenuShow = false;
                this.tagContextMenuVisible = 'hidden';
            },
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            },
            routeTo(path){
                this.$router.push(path);
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },
        watch:{
            $route(newValue, oldValue){
                this.setTags(newValue);
            },
            tagScrollLeft(newValue, oldValue){
                this.tagWrapStyle = {
                    'margin-left':newValue+'px'
                };
            }
        },
        created(){
            this.setTags(this.$route);
        }
    }
</script>

<style>
    .tagWrap{
        position: relative;
        background: #313131;
        border-bottom: 4px solid #90c31f;
        box-shadow: 0 1px 1px #999;
    }
    .tags {
        position: absolute;
        height: 44px;
        left: 202px;
        top: 0;
        right: 0;
    }
    .tags-scroll{
        position:absolute;
        left:50px;
        right:50px;
        height: 100%;
        overflow: hidden;
    }
    .tags .tags-scroll-inner {
        white-space: nowrap;
        font-size:0;
        transition: margin-left .3s linear;
    }
    .tags .tag-context-menu .el-menu-item{
        height:30px;
        line-height: 30px;
    }
    .tags .tag-context-menu{
        position:absolute;
        z-index: 100;
        visibility: hidden;
    }
    .tags .context-menu-box{
        margin: 0;
        background: #fff;
        z-index: 100;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        -webkit-box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    }
    .tags .context-menu-box li{
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
    }
    .tags .context-menu-box li:hover{
        background: #eee;
    }
    .tag-index{
        text-align: center;
        border-right: 1px solid #101010;
        border-left: 1px solid #101010;
        margin-left: 15px;
        float: left;
        font-size: 17px;
        overflow: hidden;
        cursor: pointer;
        width: 185px;
        height: 44px;
        line-height: 47px;
        background: #313131;
        vertical-align: middle;
        color: #fff;
    }
    .tag-index.active{
        background: #90c31f;
    }
    .left-arrow,.right-arrow{
        position: absolute;
        z-index: 2;
        width: 50px;
        height:44px;
        line-height: 50px;
        text-align: center;
        border-right: 1px solid #101010;
        cursor: pointer;
        background: #313131;
        vertical-align: middle;
        overflow: hidden;
    }
    .left-arrow{
        left: -2px;
    }
    .right-arrow{
        right: -2px;
        border-left: 1px solid #101010;
    }
    .tags-li {
        display:inline-block;
        text-align: center;
        border-right: 1px solid #101010;
        font-size: 16px;
        overflow: hidden;
        cursor: pointer;
        width: 140px;
        height: 44px;
        line-height: 47px;
        background: #313131;
        vertical-align: middle;
        color: #fff;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
        overflow: hidden;
    }
    .tags-li a{
        display:block;
        width:100%;
    }

    .tags-li:not(.active):hover {

    }

    .tags-li.active {
        color: #fff;
        background-color: #90c31f;
    }
    .tags-li.active .tags-li-icon i{
        background-color: #fff;
        color: #90c31f;
    }
    .tags-li-title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #fff;
    }
    .tags-li.active .tags-li-title {
        color: #fff;
    }
    .tags-li .tags-li-icon i{
        background-color: #fff;
        border-radius: 50%;
        color: #313131;
    }
    .tags-li:not(.active) .tags-li-icon i{
        background-color: #90c31f;
        color: #fff;
    }
    .tags-close-box {
        position: absolute;
        right: 50px;
        top: 0;
        box-sizing: border-box;
        text-align: center;
        height: 50px;
        z-index: 10;
    }
    .el-dropdown button{
        height: 44px;
        border: none;
        border-radius: 0;
        background-color: #313131;
        border-right: 1px solid #101010;
        border-left: 1px solid #101010;
    }
    .el-dropdown button:hover{
        background-color: #90c31f;
        border: none;
    }
</style>
