/**
* @Description 联系客服页面
* @author 李雪松
* @date 2019/8/27
*/
<template>
    <div>
        <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
        <div class="top">
            <div class="context">请拨打客服电话：{{data}}</div>
        </div>
    </div>
</template>

<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    export default {
        name: "index",
        data(){
            return {
                title:'联系客服',
                isLeft: true,
                data:'',// 联系方式
            }
        },
        components:{
            BaseNavbar,
        },
        mounted(){
            this.service();
        },
        methods:{
            service(){
                this.$FDPost('app/sc/my/getCustomerPhone').then(res=>{
                    if(res.status === 0){
                        this.$my_message(res.message)
                        this.data = res.data
                    }else {
                        this.$my_message(res.message)
                    }

                })
            },
            // 复制
            onCopy() {
                this.$my_message('拷贝成功');
            },
            onError() {
                this.$my_message('无法拷贝');
            },
        }



    }
</script>

<style lang="scss" scoped>
.top{
    margin-top: rem(100);
    .context{
        text-align: center;
        font-size: rem(32);
    }
}
</style>