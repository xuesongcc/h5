<!--<script>-->
<!--    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';-->
<!--    import back from './back.png'-->
<!--    import card1 from './card1.png'-->
<!--    import card2 from './card2.png'-->

<!--    export default {-->
<!--        data() {-->
<!--            return {-->
<!--                title: '购买旅游卡',-->
<!--                goodsList: [],-->
<!--                back,-->
<!--                card1,-->
<!--                card2,-->
<!--                cardList: [-->
<!--                    {-->
<!--                        img: card1-->
<!--                    }, {-->
<!--                        img: card2-->
<!--                    },-->
<!--                ],-->
<!--                typeList: [-->
<!--                    {-->
<!--                        id: 0,-->
<!--                        title: '给朋友购买'-->
<!--                    }, {-->
<!--                        id: 1,-->
<!--                        title: '我的购买'-->
<!--                    },-->
<!--                ],-->
<!--                currentTypeId: 0,-->
<!--            }-->
<!--        },-->
<!--        components: {-->
<!--            BaseNavbar,-->
<!--        },-->
<!--        methods: {-->
<!--            /**-->
<!--             * @author Anonymous-->
<!--             * @date 2019/8/30-->
<!--             * @Description: 选择type-->
<!--             */-->
<!--            e_selectType(typeid) {-->
<!--                this.currentTypeId = typeid-->
<!--            },-->
<!--            /**-->
<!--             * @author Anonymous-->
<!--             * @date 2019/8/28-->
<!--             * @Description: 报单商品查询-->
<!--             */-->
<!--            getProductlist() {-->
<!--                this.$FDPost('findFormProductlist').then(re => {-->
<!--                    if (re.status == 0) {-->
<!--                        this.goodsList = re.data-->
<!--                    }-->

<!--                })-->
<!--            },-->
<!--            /**-->
<!--             * @author Anonymous-->
<!--             * @date 2019/8/28-->
<!--             * @Description: 选择一个并去支付-->
<!--             */-->
<!--            e_goPay(v) {-->
<!--                this.$router.push({-->
<!--                    name: 'FoundationPay',-->
<!--                    path: '/foundationPay',-->
<!--                    query: {-->
<!--                        id: v.id,-->
<!--                        aProductPrice: v.aProductPrice-->
<!--                    }-->
<!--                })-->
<!--            },-->
<!--        },-->
<!--        mounted() {-->
<!--            this.getProductlist()-->
<!--        },-->
<!--        created() {-->
<!--        }-->
<!--    }-->
<!--</script>-->
<!--<template>-->
<!--    <div class="foundation">-->
<!--        &lt;!&ndash;基金顶部&ndash;&gt;-->
<!--        <div class="found_top">-->
<!--            &lt;!&ndash;顶部区域&ndash;&gt;-->
<!--            <div class="top_tile">-->
<!--                <img class="backicon" :src="back" alt="">-->
<!--                <span class="backTile">购买旅游卡</span>-->
<!--            </div>-->
<!--            &lt;!&ndash;基金数量&ndash;&gt;-->
<!--            <span class="jijinVal">4852</span>-->
<!--            &lt;!&ndash;卡片区域&ndash;&gt;-->
<!--            <div class="cardArea">-->
<!--                <img class="cardBgi" :src="v.img" alt="" v-for="(v,i) in cardList" :key="i">-->
<!--            </div>-->
<!--        </div>-->
<!--        &lt;!&ndash;列表区域&ndash;&gt;-->
<!--        <div class="found_listarea">-->
<!--            <div class="list_container">-->
<!--                <div class="container_top">-->
<!--                    <div class="typeList" :class="currentTypeId == v.id ? 'activeType':''" v-for="(v,i) in typeList"-->
<!--                         :key="i" @click.stop="e_selectType(v.id)">-->
<!--                        <span>{{v.title}}</span>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="list" v-for="(v,i) in 5">-->
<!--                    <div class="list_top">-->
<!--                        <span class="orderNo">订单编号:FR201908132315841...</span>-->
<!--                        <span class="ordetTime">2019-08-13 18:32:36</span>-->
<!--                    </div>-->
<!--                    <div class="list_bottom">-->
<!--                        <span class="ordetMoney">订单总额：<span class="moneynumber">2000</span></span>-->
<!--                        <div class="typeBtn">-->
<!--                            <span>已完成</span>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->
<!--<style lang='scss' scoped>-->
<!--    @import "Foundation";-->
<!--</style>-->