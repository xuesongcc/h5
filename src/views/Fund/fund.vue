<!--基金-->
<template>
    <div>
        <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
        <div class="top">
            <img src="./fundBackground.png">
            <span>总额:{{countGold}}</span>
        </div>
        <!-- 报单商品 -->
        <div class="bettween">
            <div v-for="(item,index) in formProductList" :key="index">
                <img :src="item.aProductImage" @click="goPayFund(item)"/>
            </div>
        </div>


        <!-- 订单card -->
        <div class="order">
            <div class="order-button">
                <button v-for="(item,index) in betweenButton" :key="index"
                        :class="{colorChange:index === dynamic ,currentColor: index !== dynamic}"
                        @click="getMoney(index)">{{item.label}}
                </button>
            </div>

            <div class="box" v-for="(item,index) in list" :key="index">
                <dl>订单编号:
                    <dt>{{item.id}}</dt>
                    <dd>{{item.createTime}}</dd>
                </dl>
                <h1 v-if="item.paymentType === 1">朋友账号：{{item.friendName}}</h1>
                <h1 v-else>{{item.acct}}</h1>
                <h2><span>订单总额：<span>{{item.payMoney}}</span></span>
                    <button v-show="item.status===2">交易失败</button>
                    <button v-show="item.status===1">已完成</button>
                    <button v-show="item.status===0">未支付</button>
                </h2>

            </div>
            <div class="noData" v-if="list.length === 0">暂无数据</div>

            <!--            <p v-if="list.length === 0">暂无数据</p>-->
        </div>

        <modal :message="message" @e_cancel="payFriend" @e_confirm="payMy" @hide="closeModal"></modal>
        <!--报单产品包 列表-->
        <div v-if="goodsProductShowFlag" class="listModal" @click="closeProduct">
            <div id="listModalCentre" >
                <p class="title">请选择产品包</p>
                <div v-for="(item,index) in goodsProductList" :key="index">
                    <div class="itemName">{{item.name}}
                        <div class="selectRadio">
                             <label :for="item.id"><input type="radio" name="payType" ref="payType" v-model="formProductInfo.goodsProductId" :id="item.id" :value="item.id" class="a-radio">
                                 <span class="b-radio"></span>
                             </label>
                        </div>
                    </div>

                </div>

                <div class="boxBtnContainer">
                    <div class="left" @click="payFriend()">
                        <span>给朋友购买</span>
                    </div>
                    <div class="right" @click="payMy()">
                        <span>购入</span>
                    </div>
                </div>

            </div>

        </div>
    </div>

</template>

<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    import modal from "@c/payModal/payModal";

    export default {
        name: "fund",
        data() {
            return {
                isLeft: true,
                title: '购买旅游卡',
                countGold: '',
                betweenButton: [{label: '朋友代购'}, {label: '我的购买'}],
                dynamic: 0,
                isPay: false,
                list: [],
                formProductList: [],
                message: '',
                formProductInfo: {
                    id: "",
                    price: "",
                    goodsProductId:"",
                    productType:0,
                },
                goodsProductList: [],// 报单产品包
                goodsProductShowFlag: false,


            };
        },
        methods: {
            /**
             * @Description 关闭朋友和我的购入支付弹框
             * @author 李雪松
             * @date 2019/8/31
             */
            closeModal(){
                this.message = false
            },
            /**
             * @Description 关闭选择产品包弹框
             * @author 李雪松
             * @date 2019/8/31
             */
            closeProduct(event){
                let dom = document.getElementById('listModalCentre');
                if(dom){
                    if(! dom.contains(event.target)){
                        this.goodsProductShowFlag = false
                    }
                }
                return this.goodsProductShowFlag
            },
            // selectGoodsProduct(id){
            //     this.formProductInfo.goodsProductId = id;
            //     this.goodsProductShowFlag = false;
            //     // 打开弹窗
            //
            //     this.message = "true";
            // },

            // 给朋友购买
            payFriend() {
                // this.formProductInfo.goodsProductId = id;
                let data = this.formProductInfo;
                data.paymentType = 1;
                console.log("给朋友购买 参数",data);
                this.$router.push({path: '/foundationPay', query: data})
            },
            // 自己购买
            payMy() {

                // this.formProductInfo.goodsProductId = id;
                let data = this.formProductInfo;
                data.paymentType = 0;

                console.log("this.$refs.payType.value",this.$refs.payType);

                console.log("自己购买 参数",data);
                this.$router.push({path: '/foundationPay', query: data})
            },

            /**
             * @Description 获取购买记录
             * @author 李雪松
             * @date 2019/8/30
             */

            fetchPayRecord() {
                let parmas = {
                    userId: sessionStorage.getItem('userId'),
                    status: this.dynamic,
                    offset: '',
                    limit: '',
                }
                this.$FDPost('/productOderList', parmas).then(res => {
                    if (res.status === 0) {
                        this.list = res.data.rows
                    } else {
                        this.$my_message(res.msg)
                    }

                })
            },
            getMoney(index) {
                this.dynamic = index
                this.fetchPayRecord()
            },

            // 去购买基金页面
            goPayFund(formProduc) {
                /*aProductImage: "https://lanhu.oss-cn-beijing.aliyuncs.com/psda649abaa78b7f5a-14e0-4b11-bfde-c64a6a4c4d87"
                aProductName: "艾亚游Vip银卡"    // 报单产品名
                aProductPrice: 0.02             // 报单金额
                aProductType: 1                 // 报单产品类型1.vip银卡2vip金卡
                id: "402882f96ccdc85c016ccdc981ca0000" // 报单商品的id
                */
                this.formProductInfo.productType = formProduc.aProductType;
                this.formProductInfo.id = formProduc.id;
                this.formProductInfo.price = formProduc.aProductPrice;
                // 银卡
                if (formProduc.aProductType == 1) {
                    // 打开弹窗
                    this.message = "true";
                } else {
                    // 获取 包含产品包数据
                    this.$FDPost('/app/pm/main/findAllProduct',).then(res => {
                        console.log(res);
                        if (res.status === 0) {
                            this.goodsProductList = res.data;
                            this.goodsProductShowFlag = true;
                        } else {
                            this.$my_message(res.msg)
                        }

                    })
                }


            },

            /**
             * @Description 获取总额
             * @author 李雪松
             * @date 2019/8/29
             */
            fetchCountGold() {
                let parmas = {
                    userId: sessionStorage.getItem('userId')
                }
                this.$FDPost('/totalConsumptionMoney', parmas).then(res => {
                    if (res.status === 0) {
                        this.countGold = res.data
                    } else {
                        this.$my_message(res.msg)
                    }

                })
            },

            /**
             * @Description 获取报单 商品
             */
            getFormProduct() {
                this.$FDPost('findFormProductlist').then(re => {
                    this.formProductList = re.data;
                })
            },
        },
        mounted() {
            // 获取保单商品
            this.getFormProduct();
            // 获取购买记录
            this.fetchPayRecord();
            // 获取总额
            this.fetchCountGold();
        },
        components: {
            modal,
            BaseNavbar,
        },
    }
</script>

<style lang="scss" scoped>
    .listModal{
        width: 100%;
        height: 100vh;
        background-color: rgba($color: #000000, $alpha: 0.5);
        position: fixed;
        top: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        #listModalCentre{
            width: 75%;
            padding: 5vw 5vw 0 5vw;
            height: auto;
            background-color: #fff;
            border-radius:2vw 2vw 2vw 2vw;
            .title{
                font-size: 5vw;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(102,102,102,1);
                margin-bottom: 4vw;
            }
            .itemName{
                font-size: 3.5vw;
                margin: rem(30) 0;
                display: flex;
                justify-content: space-between;
                .selectRadio{
                    .a-radio {
                        display: none;
                    }
                    .b-radio {
                        display: inline-block;
                        border: 1px solid #ccc;
                        width: rem(30);
                        height: rem(30);
                        border-radius: rem(15);
                        background: url('./nosel.png') no-repeat;
                        background-size: 100% 100%;
                        vertical-align: middle;
                        margin-right: rem(5);
                        position: relative;
                    }
                    .b-radio:before {
                        content: '';
                        font-size: 0;
                        width: rem(30);
                        height: rem(30);
                        border-radius: rem(15);
                        /*background-color: #FFA313;*/
                        background: url("./sel.png") no-repeat;
                        background-size: 100% 100%;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        margin-left: rem(-15);
                        margin-top: rem(-15);

                        display: none;
                    }

                    .a-radio:checked ~ .b-radio:before {
                        display: block;
                    }

                }
            }

            .boxBtnContainer {
                width: 100%;
                height: rem(80);
                border-top: 1px solid rgba($color: #ccc, $alpha: 1);
                display: flex;
                flex-direction: row;
                text-align: center;
                line-height: rem(80);
                .left {
                    font-size: rem(32);
                    font-family: ios9SC-Medium;
                    font-weight: 500;
                    width: 50%;
                    height: 100%;
                    border-right: 1px solid rgba($color: #ccc, $alpha: 1);
                }

                .right {
                    width: 50%;
                    height: 100%;

                    span {
                        font-size: rem(32);
                        font-family: ios9SC-Medium;
                        font-weight: 500;
                        color: #05D6CC;
                    }
                    &.closeBtn{
                        pointer-events: none;
                    }
                }
            }
        }
    }
    .container {
        background: transparent;
        border: none;
    }

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

    .bettween {
        position: relative;
        margin: -10vw 3vw 3vw 3vw;
        display: flex;
        justify-content: space-between;
        height: 33vw;

        img {
            width: 45.5vw;
            height: auto;
        }
    }

    .order {
        margin: 0 3vw;
        padding: 4vw 3vw 0 3vw;
        background: white;
        border-radius: 1vw;

        .order-button {
            width: 48vw;
            margin: 0 auto;
            border-radius: 1vw;
            border: 1px solid #05D6CC;
            overflow: hidden;

            button {
                width: 24vw;
                line-height: 6vw;
                font-size: 3vw;
                text-align: center;
                padding: 0;
                border: none;
            }

            .currentColor {
                background-color: #ffffff;
                color: #05D6CC;
            }

            .colorChange {
                background-color: #05D6CC;
                color: #ffffff;
            }
        }
        .noData {
            text-align: center;
            font-size: rem(28);
            color: #999999;
            height: rem(100);
            line-height: rem(100);
        }
    }

    .box {
        border-bottom: 1px solid #f2f2f2;
        margin-bottom: -1px;
        padding-bottom: 4vw;

        dl {
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 3vw;
            padding-top: 5vw;

            dt {
                width: 40vw;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #999;
                font-size: 3vw;
            }

            dd {
                font-size: 2.8vw;
                color: #ccc;
            }
        }

        h1 {
            font-size: 4vw;
            line-height: 4vw;
            color: #545E70;
            padding-top: 3vw;
        }

        h2 {
            line-height: 5vw;
            justify-content: space-between;
            align-items: center;
            display: flex;
            padding-top: 3vw;

            span {
                font-size: 4vw;
                color: #545E70;

                span {
                    color: #FF4200
                }
            }

            button {
                font-size: 3vw;
                padding: 1vw 2vw;
                line-height: 3vw;
                background: transparent;
                border: 1px solid #FF4200;
                color: #FF4200;
                border-radius: 2.5vw
            }

            button + button {
                border-color: #999;
                color: #999;
            }
        }

    }


</style>