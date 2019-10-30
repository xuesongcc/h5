/**
* @Description 所有旅游路线
* @author 李雪松
* @date 2019/8/27
*/
<template>
    <div class="top">
        <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
        <div class="card-list" >
            <div  class="card" v-for="item in travelList" :key="item.id">
                <img :src="item.goodsImage1">
                <div class="card-context">
                    <p class="card-name">{{item.goodsName}}</p>
                    <p class="card-remark">{{item.remark}}</p>
                    <p>
                        <span class="card-value">{{item.goodsPrice}}<span class="unit">/人</span></span>
                    </p>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    export default {
        name: "index",
        data(){
            return {
                title:'所有路线',
                isLeft: true,
                travelList:[],
            }
        },
        components:{
            BaseNavbar,
        },
        mounted(){
            this.fetchTravelList();
        },
        methods:{
            // 获取旅游列表
            fetchTravelList(){
                this.$FDPost('travel/tourismGoodsList').then(re => {
                    console.log('旅游商品所有列表：',re)
                    if (re.status === 0) {
                        this.travelList = re.data
                    } else {
                        this.$my_message(re.msg);
                    }
                });

            },
        }

    }
</script>

<style lang="scss" scoped>
    .top{
        margin-top: 4.5rem;
    }

    .card-list{
        padding: rem(20) rem(20);

        -moz-column-count:2; /* Firefox */
        -webkit-column-count:2; /* Safari 和 Chrome */
        column-count:2;
        -moz-column-gap: 2rem;
        -webkit-column-gap: 2rem;
        column-gap: 2rem;




        .card{
            margin: 0 auto;
            /*padding: 2rem;*/
            margin-bottom: rem(10);
            -moz-page-break-inside: avoid;
            -webkit-column-break-inside: avoid;
            break-inside: avoid;
            background-color: #ffffff;
            border-radius: rem(10);
            .card-context{
                padding: 0 rem(20);
            }
            .card-value{
                color: #FF254E;
                font-size: rem(32);
            }
        }
    }
</style>