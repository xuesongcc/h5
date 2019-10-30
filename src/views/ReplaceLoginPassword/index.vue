<template>
    <div class="top">
        <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
        <div class="cardList" v-for="(item,id) in list" :key="id">
            <span class="cardList-label">{{item.label}}</span>

            <div class="solid"></div>
        </div>
    </div>
</template>

<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    export default {
        name: "ChangePassword",
        data(){
            return {
                title:'修改登录密码',
                list:[
                    {label:'旧密码',id:0},
                    {label:'新密码',id:1},
                    {label:'确认密码',id:2},
                    {label:'验证码',id:3},
                    {label:'联系客服',id:4},
                ],

            }
        },
        components:{
            BaseNavbar,
        }
    }
</script>

<style lang="scss" scoped>
    .top{
        margin-top: 4.5rem;
    }
    .cardList{
        margin: 0 rem(20);
        background-color: #ffffff;
    }
    .cardList-label{
        font-size: rem(32);
        height: rem(100);
        line-height: rem(100);

    }
    .cardList-right{
        float: right;
        font-size: rem(32);
        line-height: rem(100);
    }
    .solid{
        border-bottom: 1px solid #F2F2F2;
    }
</style>