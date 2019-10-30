/**
* @Description 精品旅游详情
* @author 李雪松
* @date 2019/8/27
*/
<template>
    <div>
        <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
        <div class="top">
            <img :src="">
        </div>
    </div>
</template>

<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    export default {
        name: "index",
        data(){
            return {
                title:'详情',
                isLeft: true,

            }
        },
        components:{
            BaseNavbar,
        },
        mounted(){
            this.fetchTravelDetail()
        },
        methods:{
            fetchTravelDetail(){
                console.log('goodsid:', this.$route.query)
                let parmas = {
                    goodsId: this.$route.query.goodsId
                }
                this.$FDPost('travel/tourismGoodsDetail',parmas).then(res=>{

                })
            }
        }

    }
</script>

<style lang="scss" scoped>
    .top{
        margin-top: 4.5rem;
    }


</style>