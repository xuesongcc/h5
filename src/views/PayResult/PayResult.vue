<template>
    <div class="PayResult" :backPath="backPath" v-on:pageGo="pageGo">
        <BaseNavbar :title="title"/>
        <div class="resultCon">
            <div class="iconBgi">
                <img class="icon" :src="icon" alt="">
                <span class="iconTitle">付款成功</span>
            </div>
            <div class="orderInfo">
                <span class="infoTitle">订单信息</span>
                <div class="infoLabel">
                    <span class="label" v-show="payMoney">订单金额</span>
                    <span class="infoText">{{payMoney}}</span>
                </div>
                <div class="infoLabel">
                    <span class="label" v-show="fName">鱼池名称</span>
                    <span class="infoText">{{fName}}</span>
                </div>
                <div class="infoLabel">
                    <span class="label" v-show="payTime">交易时间</span>
                    <span class="infoText">{{payTime}}</span>
                </div>
                <div class="infoLabel">
                    <span class="label" v-show="orderId">订单编号</span>
                    <span class="infoText">{{orderId}}</span>
                </div>
                <div class="btn" @click="e_gopage">
                    <span>返回首页</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar'
    import icon from './icon.png'

    export default {
        name: 'PayResult',
        data() {
            return {
                backPath:'fispond',
                title: '付款成功',
                icon,
                orderId:'',
                currentType:'',
                fName:'',
                payMoney:'',
                payTime:'',
            };
        },

        components: {
            BaseNavbar
        },

        computed: {},

        methods: {
            //返回
            pageGo(){
                this.$router.push({
                    path: '/fishpond',
                    query: {
                        type: sessionStorage.getItem('currentType')
                    }
                });
            },
            /**
             * @Description: 查询订单详情
             * @author 焦政
             * @date 2019/3/5
            */
            getOrderInfo(){
                let params = {
                    orderId:sessionStorage.getItem('orderId')
                }
                this.$FDPost('trad/orderDetail',params).then(re=>{
                    if(re.status == 0){
                        this.orderId = re.data.orderId
                        this.fName = re.data.fName
                        this.payMoney = re.data.payMoney
                        this.payTime =this.showingExpirationDate(re.data.payTime)
                    }else{
                        this.$my_message(re.msg)
                    }

                })
            },
            showingExpirationDate(v) {
                var today = new Date(v);
                return today.toISOString().substring(0,10)+ ' '+today.toTimeString().substring(0,9);
            },
            /**
             * @Description: 返回首页
             * @author 焦政
             * @date 2019/3/5
             */
            e_gopage() {
                this.$router.push('/main')
            }

        },

        mounted() {
            this.currentType = this.$route.params.currentType
            this. getOrderInfo()
        },
    }

</script>

<style lang="scss" scoped type="text/scss">
    .PayResult {
        width: 100%;
        height: 100%;
        overflow: hidden;
        /*background-color: white;*/
        /*padding-top: rem(90);*/
        .resultCon {
            margin-top: rem(90);
            width: 100%;
            height: 100%;
            overflow: hidden;

            .iconBgi {
                width: 100%;
                height: rem(277);
                background-color: white;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: rem(7);

                .icon {
                    width: rem(102);
                    height: rem(102);
                    display: inline-block;
                    margin-top: rem(76);
                    margin-bottom: rem(27);
                }

                .iconTitle {
                    font-size: rem(32);
                    font-family: PingFang-SC-Bold;
                    font-weight: bold;
                    color: rgba(51, 51, 51, 1);
                }
            }
        }

        .orderInfo {
            width: 100%;
            height: 100%;
            background-color: white;

            .infoTitle {
                font-size: rem(30);
                font-family: PingFang-SC-Bold;
                font-weight: bold;
                color: rgba(32, 32, 32, 1);
                display: inline-block;
                margin-top: rem(38);
                margin-left: rem(27);
                margin-bottom: rem(40);
            }

            .infoLabel {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-bottom: rem(30);

                .label {
                    font-size: rem(26);
                    font-family: ios9SC-Medium;
                    font-weight: 500;
                    color: rgba(32, 32, 32, 1);
                    display: inline-block;
                    margin-left: rem(27);
                }

                .infoText {
                    font-size: rem(26);
                    font-family: ios9SC-Medium;
                    font-weight: 500;
                    color: #7E7E7E;
                    display: inline-block;
                    margin-right: rem(45);
                }

            }
        }

        .btn {
            width: rem(548);
            height: rem(82);
            background: #F6383A;
            margin: 0 auto;
            border-radius: rem(100);
            font-size: rem(32);
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            color: white;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin-top: rem(90);
        }

    }
</style>
