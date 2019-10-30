/**
* @Description 我的旅游卡明细
* @author 李雪松
* @date 2019/8/27
*/
<template>
    <div>
        <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
        <div class="top">
            <div class="currentCard">
                <span class="left">{{tourismCard}}</span>
                <span class="right">
                    <img src="../MyTreasure/current.png">
                    当前旅游卡
                </span>
            </div>
            <div class="record">
                <img src="../MyTreasure/record.png">
                <span class="record-text">记录</span>
            </div>
            <div class="noData" v-if="recordList.length === 0">暂无数据</div>
        </div>
        <div class="record-list" v-for="(item,index) in recordList" :key="index">
            <div class="list" v-if="recordList.length !== 0">
                <p>
                    <span v-if="item.profitType === 1">购买报单商品</span>
                    <span v-if="item.profitType === 2">购买旅游线路</span>
                    <span v-if="item.profitType === 3">购买商城商品</span>
                    <span v-if="item.profitType === 4">直推 + 公司补贴</span>
                    <span v-if="item.profitType === 5">充值</span>
                    <span v-if="item.profitType === 6">退款</span>
                </p>
                <span>{{item.createTime}}</span>
                <span class="record-right">
                    <span v-if="item.expenditureOnEntry === 1">-</span>
                    <span v-if="item.expenditureOnEntry === 0">+</span>
                    {{item.profitCount}}</span>
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
                title:'旅游卡明细',
                isLeft:true,
                recordList:[],
                tourismCard: this.$route.query.tourismCard
            }
        },
        components:{
            BaseNavbar,
        },
        mounted(){
            this.fetchRecordList()
        },
        methods:{
            // offset 分页参数
            // limit 分页行数
            // userId 用户Id
            // asstesType资产类别1.红包2.购物券.3 旅游券 4. 微信现金
            //         profitCount  收益金额
            //         profitType 消费类型  1.购买报单商品，2.购买旅游线路，3.购买商城商品，4直推奖励,  5公司补贴，6退款
            // createTime 创建时间

            fetchRecordList(){
                let params = {
                    offset:0,
                    limit:10,
                    userId: sessionStorage.getItem('userId'),
                    asstesType:3
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
        }


    }
</script>

<style lang="scss" scoped>
    .top {
        margin: rem(100) rem(20) 0 rem(20);

        .currentCard {
            height: rem(150);
            line-height: rem(150);
            background-color: #ffffff;
            margin-bottom: rem(20);
            padding: rem(20) rem(20);
            border-radius: rem(8);

            .left {
                color: #FF4040;
                font-size: rem(32);
            }

            .right {
                float: right;
                font-size: rem(28);
                color: #818181;

                img {
                    vertical-align: middle;
                    width: rem(28);
                    height: rem(30);
                    margin-right: rem(20);
                }
            }
        }

        .record {
            background-color: #ffffff;
            margin-bottom: rem(20);
            padding: rem(20) rem(20);
            color: #222222;
            border-radius: rem(8);
            font-size: rem(30);

            img {

                vertical-align: middle;
                width: rem(40);
                height: rem(40);
                margin-right: rem(20);
            }


        }

            .noData {
                text-align: center;
                font-size: rem(28);
                color: #999999;
            }
    }

    .record-list {
        margin: rem(20) rem(20);
        background-color: #ffffff;
        border-radius: rem(8);
        padding: rem(20) rem(20);
        align-items: center;
        font-size: rem(24);
        font-weight: bold;

        .record-right {
            float: right;
            font-size: rem(24);
            color: #FF4040;
            line-height: 0;

        }

    }
</style>