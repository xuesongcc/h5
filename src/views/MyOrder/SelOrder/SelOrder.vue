<script>
    import paying from './paying.png'
    import payed from './payed.png'

    var urlencode = require('urlencode');
    export default {
        name: 'SelOrder',
        data() {
            return {
                urlencode,
                payingInfo: {
                    icon: paying,
                    label: '等待买家付款...'
                },
                payedInfo: {
                    icon: payed,
                    label: '买家已付款'
                },
                payInfo: {
                    icon: paying,
                    label: '等待买家付款...'
                },

            };
        },

        components: {},

        computed: {},
        props: {
            orderInfos:{
                type: Object,
                default: ()=>{}
            }

        },

        methods: {
            /**
             * @Description: 假图投诉
             * @author 焦政
             * @date 2019/3/7
             */
            e_jiatu() {
                this.$emit('jiatu')
            },
            /**
             * @Description: 完成订单
             * @author 焦政
             * @date 2019/3/9
            */
            e_overOrder(){
                this.$emit('overOrder')
            },
            /**
             * 查看凭证放大
             */
            e_showEvidence(){
                this.$emit('goshow',this.orderInfos.buyerEvidence)
            }

        },

        mounted() {
        },
    }

</script>

<template>
    <div class="SelOrder">
        <!--付款状态-->
        <div class="payStatus">
            <img class="payicon" v-if="orderInfos.status ===0 " :src="payingInfo.icon" alt="">
            <img class="payicon" v-if="orderInfos.status ===1 " :src="payedInfo.icon" alt="">
            <span class="payLabel" v-if="orderInfos.status ===0 ">{{payingInfo.label}}</span>
            <span class="payLabel" v-if="orderInfos.status ===1">{{payedInfo.label}}</span>
        </div>
        <!--交易凭证-->
        <div class="sellinfoCon">
            <span class="sellTile">交易信息</span>
            <div class="sellinfo" v-if="orderInfos.number">
                <span class="infoTitle">交易数量</span>
                <span class="infoVal">{{orderInfos.number}}条</span>
            </div>
            <div class="sellinfo" v-if="orderInfos.price">
                <span class="infoTitle">交易单价</span>
                <span class="infoVal">{{orderInfos.price}}元</span>
            </div>
            <div class="sellinfo" v-if="orderInfos.sumPrice">
                <span class="infoTitle">总金额</span>
                <span class="infoVal">{{orderInfos.sumPrice}}元</span>
            </div>
            <div class="sellinfo" v-if="orderInfos.createTime">
                <span class="infoTitle">匹配时间</span>
                <span class="infoVal">{{orderInfos.createTime}}</span>
            </div>
            <div class="lookCertificate"  v-if="orderInfos.buyerEvidence">
                <span class="certificateTitle">交易凭证</span>
                <div class="certificateCon">
                    <div class="certificate">
                        <img class="certificate" :src="orderInfos.buyerEvidence" alt="" @click="e_showEvidence">
                    </div>
                </div>
            </div>

        </div>
        <!--买家信息 假图上传 完成交易-->
        <div class="sellinfoCon">
            <span class="sellTile">买家信息</span>
            <div class="sellinfo">
                <span class="infoTitle">联系人手机</span>
                <span class="infoVal">{{orderInfos.phone}}</span>
            </div>
            <div class="sellinfo" v-if="orderInfos.alipayNumber">
                <span class="infoTitle">支付宝账号</span>
                <span class="infoVal">{{orderInfos.alipayNumber}}</span>
            </div>
            <div class="sellinfo" v-if="orderInfos.realName">
                <span class="infoTitle">姓名</span>
                <span class="infoVal">{{urlencode.decode(orderInfos.realName)}}</span>
            </div>
            <div class="sellinfo" v-if="orderInfos.orderId">
                <span class="infoTitle">订单编号</span>
                <span class="infoVal">{{orderInfos.orderId}}</span>
            </div>

            <div class="jiatuBtn" v-if="orderInfos.status !== 2 && orderInfos.status !== 3 && orderInfos.buyerEvidence" @click="e_overOrder">
                <span>完成订单</span>
            </div>
            <div class="doneorder" @click="e_jiatu" v-if="orderInfos.buyerEvidence && orderInfos.status !== 2 && orderInfos.status !== 3">
                <span>假图投诉</span>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped type="text/scss">
    .SelOrder {
        width: 100%;

        .payStatus {
            width: 100%;
            background-color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: rem(7);

            .payicon {
                width: rem(102);
                height: rem(102);
                display: inline-block;
                margin-top: rem(58);
                margin-bottom: rem(27);
            }

            .payLabel {
                font-size: rem(32);
                font-family: PingFang-SC-Bold;
                font-weight: bold;
                display: inline-block;
                margin-bottom: rem(59);
            }

        }

        .sellinfoCon {
            padding-left: rem(29);
            padding-right: rem(34);
            background-color: white;
            padding-bottom: rem(15);
            margin-bottom: rem(8);

            .sellTile {
                font-size: rem(30);
                font-family: PingFang-SC-Bold;
                font-weight: bold;
                color: rgba(32, 32, 32, 1);
                display: inline-block;
                margin-top: rem(38);
            }

            .sellinfo {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin: rem(30) rem(0);

                .infoTitle {
                    font-size: rem(26);
                    font-family: ios9SC-Medium;
                    font-weight: 500;
                    color: rgba(32, 32, 32, 1);
                }

                .infoVal {
                    font-size: rem(26);
                    font-family: ios9SC-Medium;
                    font-weight: 500;
                    color: #7E7E7E;
                }
            }

            .lookCertificate {
                .certificateTitle {
                    font-size: rem(26);
                    font-family: ios9SC-Medium;
                    font-weight: 500;
                    color: rgba(32, 32, 32, 1);
                    display: inline-block;
                }

                .certificateCon {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;

                    .certificate {
                        width: rem(218);
                        height: rem(218);
                        background-color: wheat;
                    }
                }
            }

            .jiatuBtn {
                width: rem(635);
                height: rem(100);
                border-radius: rem(100);
                background-color: #DC143C;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                font-size: rem(34);
                font-family: PingFang-SC-Bold;
                font-weight: bold;
                color: white;
                margin: 0 auto;
                margin-top: rem(62);
            }

            .doneorder {
                width: rem(635);
                height: rem(100);
                border-radius: rem(100);
                /*border: 3px solid rgba(227, 227, 227, 1);*/
                background-color: #159efe;
                margin: 0 auto;
                margin-top: rem(21);
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                font-size: rem(34);
                font-family: PingFang-SC-Bold;
                font-weight: bold;
                color: white;
                margin-bottom: rem(20);
            }
        }
    }
</style>
