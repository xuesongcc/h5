<script>
    import bgi from './bgi.png'
    var urlencode = require('urlencode');
    export default {
        name: 'BuyOrder',
        data() {
            return {
                bgi,
                urlencode,
            };
        },
        props:{
            imgUrl:{
                type:String,
                default:''
            },
            orderInfos:{
                type: Object,
                default: ()=>{}
            }
        },

        components: {},

        computed: {},

        methods: {
            /**
             * @Description: 上传凭证
             * @author 焦政
             * @date 2019/3/7
             */
            e_upload() {
                console.log('ccc')
                this.$emit('uploadFile')
            },
            /**
             * @Description: 放大查看img
             * @author 焦政
             * @date 2019/3/8
            */
            e_goShow(){
                this.$emit('goshow',this.orderInfos.buyerEvidence)
            },
            /**
             * @Description: 查看支付宝收款码
             * @author 焦政
             * @date 2019/3/12
            */
            e_showAli(){
                this.$emit('goshow',this.orderInfos.alipayCode)
            },
            e_showWX(){
                this.$emit('goshow',this.orderInfos.wxCode)
            },
            /**
             * @Description: 提交上传
             * @author 焦政
             * @date 2019/3/9
            */
            e_doUpload(){
                if(!this.imgUrl){
                    this.$my_message('请上传交易凭证')
                    return
                }
                this.$emit('doUpload')
            }
        },

        mounted() {
        },
    }

</script>

<template>
    <div class="BuyOrder">
        <!--sellinfo-->
        <div class="sellinfoCon">
            <span class="sellTile">卖家信息</span>
            <div class="sellinfo" v-if="orderInfos.phone">
                <span class="infoTitle">卖家手机号</span>
                <span class="infoVal">{{orderInfos.phone}}</span>
            </div>
            <div class="sellinfo" v-if="orderInfos.realName">
                <span class="infoTitle">收款方姓名</span>
                <span class="infoVal">{{urlencode.decode(orderInfos.realName)}}</span>
            </div>
            <div class="sellinfo" v-if="orderInfos.alipayNumber">
                <span class="infoTitle">收款方支付宝</span>
                <span class="infoVal">{{orderInfos.alipayNumber}}</span>
            </div>
            <div class="sellinfo" v-if="orderInfos.orderId">
                <span class="infoTitle">订单编号</span>
                <span class="infoVal">{{orderInfos.orderId}}</span>
            </div>
        </div>
        <!--收款码-->
        <div class="collectionCon" v-if="orderInfos.alipayCode">
            <span class="collectionTitle">支付宝收款码</span>
            <div class="codeCon">
                <div class="code" @click="e_showAli">
                    <img class="code" :src="orderInfos.alipayCode" alt="">
                </div>
            </div>
        </div>
        <div class="collectionCon" v-if="orderInfos.wxCode">
            <span class="collectionTitle">微信收款码</span>
            <div class="codeCon">
                <div class="code" @click="e_showWX">
                    <img class="code" :src="orderInfos.wxCode" alt="">
                </div>
            </div>
        </div>
        <!--查看交易凭证-->
        <div class="lookCertificate" v-if="orderInfos.buyerEvidence">
            <span class="certificateTitle">交易凭证</span>
            <div class="certificateCon">
                <div class="certificate" @click="e_goShow">
                    <img class="certificate" :src="orderInfos.buyerEvidence" alt="">
                </div>
            </div>
        </div>
        <!--上传凭证-->
        <div class="uploadCertificate" v-if="!orderInfos.buyerEvidence && orderInfos.status !== 4 && orderInfos.status !== 5">
            <span class="uploadeTitle">上传交易凭证</span>
            <div class="uploadeCon" @click="e_upload">
                <img class="uploadIcon" :src="bgi" alt="" v-if="!imgUrl">
                <img class="uploadIcon" v-if="imgUrl" :src="imgUrl" alt="">
            </div>
        </div>
        <div class="uploadBtn" @click="e_doUpload" v-if="!orderInfos.buyerEvidence && orderInfos.status !== 4 && orderInfos.status !== 5">
            <span>确定</span>
        </div>
    </div>
</template>


<style lang="scss" scoped type="text/scss">
    .BuyOrder {
        width: 100%;

        .sellinfoCon {
            padding-left: rem(29);
            padding-right: rem(34);
            background-color: white;
            padding-bottom: rem(15);

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
        }

        .collectionCon {
            padding-left: rem(29);
            padding-right: rem(34);
            background-color: white;
            padding-bottom: rem(15);
            margin-top: rem(8);

            .collectionTitle {
                font-size: rem(26);
                font-family: ios9SC-Medium;
                font-weight: 500;
                color: rgba(32, 32, 32, 1);
                display: inline-block;
                margin-top: rem(31);
            }

            .codeCon {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;

                .code {
                    width: rem(218);
                    height: rem(218);
                    background-color: wheat;
                }
            }
        }

        .lookCertificate {
            padding-left: rem(29);
            padding-right: rem(34);
            background-color: white;
            padding-bottom: rem(15);
            margin-top: rem(8);

            .certificateTitle {
                font-size: rem(26);
                font-family: ios9SC-Medium;
                font-weight: 500;
                color: rgba(32, 32, 32, 1);
                display: inline-block;
                margin-top: rem(31);
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

        .uploadCertificate {
            padding-left: rem(29);
            padding-right: rem(34);
            background-color: white;
            padding-bottom: rem(15);
            margin-top: rem(8);

            .uploadeTitle {
                font-size: rem(26);
                font-family: ios9SC-Medium;
                font-weight: 500;
                color: rgba(32, 32, 32, 1);
                display: inline-block;
                margin-top: rem(31);
            }

            .uploadeCon {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;

                .uploadIcon {
                    width: rem(146);
                    height: rem(146);
                }
            }

        }

        .uploadBtn {
            width: rem(635);
            height: rem(100);
            border-radius: rem(100);
            background-color: #DC143C;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            font-size: rem(34);
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            color: white;
            margin: 0 auto;
            margin-top: rem(83);
            margin-bottom: rem(83);

        }

    }
</style>
