<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    import buypriceicon from './buypriceicon.png'
    import buynumbericon from './buynumbericon.png'
    import sellpriceicon from './sellpriceicon.png'
    import sellnumbericon from './sellnumbericon.png'
    import {formatDate} from '@u/formatDate'
    export default {
        name: 'DealHis',
        data() {
            return {
                formatDate,
                backPath: 'tradinghall',
                title: '交易记录',
                type: '',// 买鱼列表0 卖鱼列表区分1 区分
                tabList: [
                    {
                        id: -1,
                        label: '交易记录(未完成)'
                    }, {
                        id: 0,
                        label: '交易记录(已完成)'
                    },
                ],
                buypriceicon,
                buynumbericon,
                sellpriceicon,
                sellnumbericon,
                currentId: -1,//当前状态 是未完成 还是已完成
                orderTypeText: '未完成',//订单内部文字 提示 已完成还是未完成
                OrderList: [],//挂单列表
                offset: 1,
                limit: 10,
                isNoMore: false,
            };
        },

        components: {
            BaseNavbar,
        },

        computed: {},
        watch: {
            'currentId'(v) {
                if (v === -1) {
                    this.orderTypeText = '未完成'
                } else if (v === 0) {
                    this.orderTypeText = '已完成'
                }
            }
        },

        methods: {
            /**
             * @Description: 返回买鱼 卖鱼
             * @author 焦政
             * @date 2019/3/7
             */
            pageGo() {
                this.$router.push('/tradinghall');
            },
            /**
             * @Description: 买鱼列表 卖鱼列表区分
             * @author 焦政
             * @date 2019/3/7
             */
            checkTypeList() {
                this.type = this.$route.query.type
                if (this.type == 0) {
                    this.title = '买鱼列表'
                } else if (this.type == 1) {
                    this.title = '卖鱼列表'
                }
            },
            /**
             * @Description: 选择一个订单状态
             * @author 焦政
             * @date 2019/3/7
             */
            e_changeType(v) {
                this.currentId = v
                this.offset = 1
                this.isNoMore = false
                this.OrderList = []
                this.getOrderList()
            },
            /**
             * @Description: 获取订单列表
             * @author 焦政
             * @date 2019/3/7
             */
            getOrderList() {
                let params = {
                    userId: sessionStorage.getItem('userId'),
                    // type: this.type,
                    limit: this.limit,
                    offset: (this.offset - 1) * this.limit,
                    status: this.currentId
                }
                this.$FDPost('getTradeRecordList', params).then(re => {
                    if (re.status == 0) {
                        if (re.data.length > 0) {
                            re.data.forEach(element => {
                                this.OrderList.push(element)
                            });
                        }
                        if (re.data.length != 10) {
                            this.isNoMore = true
                        }
                        if (this.offset >= 1 && re.data.length == 0) {
                            this.offset--
                        }
                    } else {

                    }
                })
            },
            // 查询更多
            e_loadeMore() {
                this.offset++
                this.getOrderList()
            },
            /**
             * @Description: 跳转取订单列表
             * @author 焦政
             * @date 2019/3/7
             */
            e_goorder(v) {
                this.$router.push({
                    name: 'MyOrder',
                    params: {
                        type: v.type,
                        orderId: v.id
                    }
                })
            },

        },

        mounted() {
            this.currentId = -1
            this.checkTypeList()
            this.getOrderList()
        },
    }

</script>

<template>
    <div class="DealHis">
        <BaseNavbar :title="title" v-on:pageGo="pageGo" :backPath="backPath"></BaseNavbar>
        <div class="dealCon">
            <div class="dealTab">
                <span class="tabText" :class="currentId == v.id ? 'active':''" v-for="(v,i) in tabList" :key="i"
                      @click="e_changeType(v.id)">{{v.label}}</span>
            </div>
            <div class="orderCon">
                <div class="orderlist" v-for="(v,i) in OrderList" :key="i+'a'">
                    <div class="listtop">
                        <span class="money">合计金额￥{{v.sumPrice}}
                            <span class="orderTypeText" v-if="v.type === 0">(出售)</span>
                            <span class="orderTypeText" v-if="v.type === 1">(收购)</span>
                            <span class="orderTypeText" v-if="v.status === 0">等待买方打款</span>
                            <span class="orderTypeText" v-if="v.status === 1">买方已打款</span>
                            <span class="orderTypeText" v-if="v.status === 2">假图投诉作废</span>
                            <span class="orderTypeText" v-if="v.status === 3">交易成功</span>
                            <span class="orderTypeText" v-if="v.status === 4">交易失败</span>
                            <span class="orderTypeText" v-if="v.status === 5">超时未付款作废</span>
                        </span>
                        <span class="orderTime">{{formatDate(new Date(v.createTime),'yyyy-MM-dd hh:mm:ss')}}</span>
                    </div>
                    <div class="listbottom">
                        <div class="priceCon">
                            <img class="priceIcon" v-if="v.type === 0" :src="sellpriceicon" alt="">
                            <img class="priceIcon" v-if="v.type === 1" :src="buypriceicon" alt="">
                            <span class="icontext">单价：<span class="val">{{v.price}}</span></span>
                        </div>
                        <div class="priceCon">
                            <img class="priceIcon" v-if="v.type === 0" :src="sellnumbericon" alt="">
                            <img class="priceIcon" v-if="v.type === 1" :src="buynumbericon" alt="">
                            <span class="icontext">数量：<span class="val">{{v.number}}</span></span>
                        </div>
                        <div class="ordetBtn" @click="e_goorder(v)">
                            <span>查看订单</span>
                        </div>
                    </div>
                </div>

            </div>
            <!-- 分页 -->
            <div class="page">
                <span class="loadeMore" @click="e_loadeMore" v-if="!isNoMore">加载更多...</span>
                <span class="noMore" v-if="isNoMore">已加载全部</span>
            </div>

        </div>
    </div>
</template>


<style lang="scss" scoped type="text/scss">
    .DealHis {
        width: 100%;
        padding-top: rem(90);

        .dealCon {
            width: 100%;

            .dealTab {
                width: 100%;
                height: rem(82);
                background-color: white;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                margin-bottom: rem(11);

                .tabText {
                    display: inline-block;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    font-size: rem(28);
                    font-family: PingFang-SC-Bold;
                    font-weight: bold;
                    color: rgba(32, 32, 32, 1);

                    &.active {
                        color: #29B9EE;
                        border-bottom: 2px solid #29B9EE;
                    }
                }
            }

            .orderCon {
                width: 100%;
                overflow: auto;

                .orderlist {
                    width: 100%;
                    background-color: white;
                    padding-top: rem(34);
                    padding-bottom: rem(13);
                    margin-bottom: rem(11);

                    .listtop {
                        margin-left: rem(26);
                        margin-right: rem(21);
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;

                        .money {
                            font-size: rem(28);
                            font-family: PingFang-SC-Bold;
                            font-weight: bold;
                            color: rgba(32, 32, 32, 1);

                            .orderTypeText {
                                font-size: rem(24);
                                font-family: ios9SC-Medium;
                                font-weight: 500;
                                color: rgba(126, 126, 126, 1);
                                display: inline-block;
                                margin-left: rem(21);
                            }
                        }

                        .orderTime {
                            font-size: rem(24);
                            font-family: ios9SC-Medium;
                            font-weight: 500;
                            color: rgba(126, 126, 126, 1);
                        }
                    }

                    .listbottom {
                        height: rem(80);
                        padding-left: rem(26);
                        padding-right: rem(25);
                        margin-top: rem(32);
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;

                        .priceCon {
                            display: flex;
                            flex-direction: row;
                            align-items: center;

                            .priceIcon {
                                width: rem(37);
                                height: rem(37);
                            }

                            .icontext {
                                font-size: rem(26);
                                font-family: ios9SC-Medium;
                                font-weight: 500;
                                color: rgba(126, 126, 126, 1);
                                display: inline-block;
                                margin-left: rem(13);

                                .val {
                                    font-size: 26px;
                                    font-family: ios9SC-Medium;
                                    font-weight: 500;
                                    color: #202020;
                                }
                            }
                        }

                        .ordetBtn {
                            width: rem(145);
                            height: rem(49);
                            border-radius: rem(100);
                            background-color: #FFD505;
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: center;
                            font-size: rem(24);
                            font-family: PingFang-SC-Bold;
                            font-weight: bold;
                            color: rgba(32, 32, 32, 1);
                        }
                    }

                }

            }

            .page {
                width: 100%;
                height: rem(80);
                line-height: rem(80);
                text-align: center;

                .loadeMore {
                    font-size: rem(24);
                    font-family: ios9SC-Medium;
                    font-weight: 500;
                    color: #29B9EE;
                    display: inline-block;
                    margin-top: rem(18);
                    margin-bottom: rem(19);
                }

                .noMore {
                    font-size: rem(24);
                    font-family: ios9SC-Medium;
                    font-weight: 500;
                    color: rgba(126, 126, 126, 1);
                    display: inline-block;
                    margin-top: rem(18);
                    margin-bottom: rem(19);
                }
            }
        }
    }
</style>