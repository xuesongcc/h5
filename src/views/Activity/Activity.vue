/**
* @desc 活动奖励
* @author WL
* @date 2019/3/8
* @version 1.0
*/
<script>
    import ActivityList from './ActivityList/ActivityList';

    export default {
        name: "Activity",
        components: {
            ActivityList
        },
        data() {
            return {
                //买鱼池
                buys: [],
                //直推奖
                upgrade: [],
                //升级奖
                recommend: [],
                //团队奖
                teamreward:[],
                //大型奖励A
                bigrewardA:[],
                //大型奖励B
                bigrewardB:[],
                //购买鱼数量
                num: 0
            };
        },
        mounted() {
            this._getActivity();
            this.$nextTick(() => {
                this._navigationTransition();
            });
        },
        methods: {
            /**
             * 返回
             * @private
             */
            _return() {
                this.$router.back(-1);
            },
            /**
             * 跳转到领取记录页面
             * @private
             */
            _goRecord() {
                this.$router.push('/record');
            },
            /**
             * 导航过渡
             * @private
             */
            _navigationTransition() {
                this.$refs.scroll.addEventListener('scroll', this._handleScroll, true);
            },
            /**
             * 滑动
             * @private
             */
            _handleScroll() {
                let top = this.$refs.scroll.scrollTop;
                let height = this.$refs.top.offsetHeight - 90;
                let nav = this.$refs.nav;
                let opacity = (top / height).toFixed(2);
                if (top >= height) {
                    nav.style.backgroundColor = 'RGBA(78, 99, 250, 1)';
                } else {
                    nav.style.backgroundColor = `RGBA(78, 99, 250, ${opacity})`;
                }
            },
            /**
             * 获得活动
             * @private
             */
            _getActivity() {
                let params = {
                    userId: sessionStorage.getItem('userId')
                };
                this.$FDPost('activity/typelist', params).then(re => {
                    this.$refs.fish.reload();
                    this.$refs.recommend.reload();
                    this.$refs.remove.reload();
                    // this.$refs.bigrewardA.reload();
                    // this.$refs.bigrewardB.reload();
                    if (re.status === 0) {
                        this.buys = [];
                        this.upgrade = [];
                        this.recommend = [];
                        this.bigrewardA = [];
                        this.bigrewardB = [];
                        this.teamreward = [];
                        this.num = re.data.count;
                        re.data.fishActivityList.forEach(item => {
                            //传递购买鱼池奖励
                            if (item.type === 1 || item.type === 2) {
                                this.buys.push(item);
                            } else if (item.type === 3) {
                                //传递直接推荐奖
                                this.upgrade.push(item);
                            }else if (item.type === 9) {
                                //传递团队奖
                                this.teamreward.push(item);
                            }else if (item.type === 14) {
                                //大型奖励A
                                this.bigrewardA.push(item);
                            }else if (item.type === 15) {
                                //大型奖励B
                                this.bigrewardB.push(item);
                            } else {
                                //传递升级奖
                                this.recommend.push(item);
                            }
                        });
                    } else {
                        this.$my_message(re.msg);
                    }
                }).catch(() => {
                    this.$refs.fish.reload();
                    this.$refs.recommend.reload();
                    this.$refs.remove.reload();
                    // this.$refs.bigrewardA.reload();
                    // this.$refs.bigrewardB.reload();
                });
            }
        }
    };
</script>

<template>
    <div class="activity">
        <div class="activity-wrapper" ref="scroll">
            <div class="head" ref="top">
                <div class="nav" ref="nav">
                    <div class="left" @click="_return">
                        <i class="icon"></i>
                    </div>
                    <span class="title">活动奖励</span>
                    <span @click="_goRecord">领取记录</span>
                </div>
            </div>
            <div class="wrapper">
                <div class="item">
                    <ActivityList ref="fish" icon="buy" title="买鱼送鱼池奖励" :list="buys"
                                  @pullDown="_getActivity" :num="num"></ActivityList>
                </div>
                <div class="item">
                    <ActivityList ref="recommend" icon="upgrade" title=" 直接推荐奖" :list="upgrade"
                                  @pullDown="_getActivity"></ActivityList>
                </div>
                <div class="item">
                    <ActivityList ref="remove" icon="recommend" title="升级奖" :list="recommend"
                                  @pullDown="_getActivity"></ActivityList>
                </div>
<!--                <div class="item">-->
<!--                    <ActivityList ref="remove" icon="teamreward" title="团队奖励" :list="teamreward"-->
<!--                                  @pullDown="_getActivity"></ActivityList>-->
<!--                </div>-->
<!--                <div class="item">-->
<!--                    <ActivityList ref="bigrewardA" icon="bigA" title="大型奖励A" :list="bigrewardA"-->
<!--                                  @pullDown="_getActivity"></ActivityList>-->
<!--                </div>-->
<!--                <div class="item">-->
<!--                    <ActivityList ref="bigrewardB" icon="bigB" title="大型奖励B" :list="bigrewardB"-->
<!--                                  @pullDown="_getActivity"></ActivityList>-->
<!--                </div>-->
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .activity {
        width: 100%;
        height: 100%;
        /*overflow: hidden;*/
        /*-webkit-overflow-scrolling: touch;*/

        .activity-wrapper {
            /*height: 100%;*/
            /*width: 100%;*/
            /*min-height: rem(1691);*/
            /*overflow: auto;*/
            /*-webkit-overflow-scrolling: touch;*/


            .head {
                width: 100%;
                height: rem(464);
                @include bgIcon('bg');
                background-size: 100% 100%;
                background-repeat: no-repeat;

                .nav {
                    position: absolute;
                    display: flex;
                    width: 100%;
                    height: rem(90);
                    top: 0;
                    left: 0;
                    padding: 0 rem(19);
                    align-items: center;
                    justify-content: space-between;
                    box-sizing: border-box;
                    z-index: 100;

                    .left {
                        width: rem(112);

                        .icon {
                            display: inline-block;
                            width: rem(43);
                            height: rem(29);
                            @include bgIcon('left');
                            background-size: 100% 100%;
                            background-repeat: no-repeat;
                        }
                    }

                    span {
                        font-size: rem(28);
                        color: #FFFFFF;
                        font-weight: bold;

                        &.title {
                            font-size: rem(34);
                        }
                    }
                }
            }

            .wrapper {
                margin-top: rem(-58);
                padding: 0 rem(26);

                .item {
                    margin-bottom: rem(17);
                }
            }
        }
    }
</style>
