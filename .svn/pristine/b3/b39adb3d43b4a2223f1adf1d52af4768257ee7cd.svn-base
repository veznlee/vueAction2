<template>
    <div class="user-info-cont">
        <i class="el-icon-menu"></i>
        <div class="user-info-name">你好，{{name}}</div>
        <h1 style="font-size: 16px; margin-top: 10px">欢迎使用深加工管理系统！</h1>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: localStorage.getItem('ms_username'),

            }
        },
    }

</script>


<style scoped>

    .user-info-cont {
        font-size: 14px;
        text-align: center;
        color: #999;
        position:absolute;
        top:50%;
        left:50%;
        -webkit-transform:translate(-50%, -50%);
        -moz-transform:translate(-50%, -50%);
        transform:translate( -50%, -50%);
    }

    .user-info-cont i{
        font-size: 40px;
        text-align: center;
        margin-bottom: 10px;
    }

    .user-info-cont .user-info-name {
        font-size: 22px;
        color: #666;
        text-align: center;
    }

    .user-info-list span {
        margin-left: 70px;
    }

</style>
