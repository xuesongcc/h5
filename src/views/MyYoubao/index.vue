<template>
    <div>
        <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
        <div class="top">
            <img src="./youbaobg.png">
            <span>总额:{{countGold}}</span>
        </div>
        <div class="context">
            <span class="context-title">红包明细</span>
<!--            <div>-->
<!--                <span class="context-text">每日奖励</span>-->
<!--                <span class="context-right">56464544566</span>-->
<!--                <p class="context-text">红包:</p>-->
<!--            </div>-->

            <div class="recordList" v-for="(item,index) in recordList" :key="index">
                <div  v-if="recordList.length != 0">
                <!-- <span class="context-text">每日奖励</span> -->
                <p class="context-text">
                    <span v-if="item.profitType === 1">购买报单商品</span>
                    <span v-if="item.profitType === 2">购买旅游线路</span>
                    <span v-if="item.profitType === 3">购买商城商品</span>
                    <span v-if="item.profitType === 4">直推 + 公司补贴</span>
                    <span v-if="item.profitType === 5">充值</span>
                    <span v-if="item.profitType === 6">退款</span>
                </p>
                <span class="context-right">{{item.createTime}}</span>
                <p>
                    <span class="youbao-title">红包:</span>
                    <span class="context-value" v-if="item.expenditureOnEntry === 1">-</span>
                    <span class="context-value" v-if="item.expenditureOnEntry === 0">+</span>
                    <span class="context-value">{{item.profitCount}}</span>
                </p>
                </div>
                
            </div>
            <div class="noData" v-if="recordList.length == 0">暂无数据</div>
        </div>
    </div>
</template>

<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';


    export default {
        name: "fund",
        data() {
            return {
                isLeft: true,
                title: '我的红包',
                recordList:[],
                countGold: this.$route.query.youbao,

            };
        },
        methods: {
            fetchRecordList(){
                let params = {
                    offset:0,
                    limit:10,
                    userId: sessionStorage.getItem('userId'),
                    asstesType:1
                }
                this.$FDPost('app/zc/main/AssetsTotal',params).then(res=>{
                    console.log(res)
                    if(res.status === 0){
                        this.recordList = res.data.rows
                    }else {
                        this.$my_message()
                    }
                })
            }
        },
        mounted() {
            this.fetchRecordList()
        },
        components: {
            BaseNavbar,

        },
    }
</script>

<style lang="scss" scoped>
  .top {
        position: relative;

        span {
            position: absolute;
            bottom: 17vw;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-size: 5vw;
            line-height: 5vw;
        }
    }
    .context{
        margin: 0 rem(20);
        padding: rem(20) rem(20);
        background-color: #ffffff;
        min-height: rem(100);

        position: relative;
        bottom: rem(50);
        left: 0;
        .context-title{
            font-size: rem(32);
            color: #333333;
            font-weight: bold;
        }
        .recordList{
            margin-top: rem(20);
        }
        .context-text{
            font-size: rem(28);
            color: #333333;
            font-weight: bold;
        }
        .context-right{
            float: right;
            font-size: rem(24);
            color: #999999;
        }
        .youbao-title{
            font-size: rem(28);
            color: #666666;
        }
        .context-value{
            color: #FF9600;
            font-weight: bold;
            font-size: rem(28);
        }
        .noData{
            text-align: center;
            font-size: rem(28);
        }

    }


</style>