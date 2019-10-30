/**
* @desc 活动列表
* @author WL
* @date 2019/3/8
* @version 1.0
*/
<script>
    export default {
        name: "ActivityList",
        props: {
            //图标类名
            icon: {
                type: String,
                default: 'buy'
            },
            //标题名
            title: {
                type: String,
                default: '标题'
            },
            //列表
            list: {
                type: Array,
            },
            //数量
            num: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
                //连点
                isPoint: false
            };
        },
        methods: {
            /**
             * 领取奖励
             * @param data
             * @private
             */
            _receive(data) {
                // this.$my_message('系统维护中')
                // return
                if (data.userType !== 1) {
                    return;
                }
                if (this.isPoint) {
                    return;
                }
                let params = {
                    userId: sessionStorage.getItem('userId'),
                    markId: data.mark,
                    xiauserId: data.userId,
                    levelMarkId: data.levelMarkId,
                    xiamarkId: data.markId,
                };
                this.isPoint = true;
                this.$FDPost('activity/receiveAwards', params).then(re => {
                    if (re.status === 0) {
                        this.$my_message('领取成功');
                        this.$emit('pullDown');
                    } else {
                        this.$my_message(re.msg);
                    }
                });
            },
            /**
             * 是否加载完成
             */
            reload() {
                this.isPoint = false;
            }
        }
    };
</script>

<template>
    <div class="list">
        <div class="title">
            <div class="content">
                <div class="left">
                    <i class="icon" :class="icon"></i>
                </div>
                <h1>{{title}}</h1>
            </div>
            <div class="num" v-if="num !== null">{{num}}条</div>
        </div>
        <div class="wrapper">
            <div class="item" v-for="item in list" :key="item.id">
                <div class="left">
                    <h3>{{item.name}}</h3>
                    <div class="desc">{{item.message}}</div>
                </div>
                <div class="right" :class="{'active': item.userType === 1}" @click="_receive(item)">
                    <span>{{item.userType === 1?'领取': '不可领取'}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .list {
        padding: 0 rem(35);
        background-color: #FFFFFF;
        -webkit-border-radius: rem(20);
        -moz-border-radius: rem(20);
        border-radius: rem(20);

        .title {
            display: flex;
            height: rem(132);
            padding-left: rem(14);
            align-items: center;
            justify-content: space-between;
            border-bottom: rem(1) solid #F6F6F6;

            .content {
                display: flex;
                align-items: center;

                .left {
                    flex: 0 0 rem(59);
                    width: rem(59);
                    margin-right: rem(18);

                    .icon {
                        display: inline-block;
                        background-repeat: no-repeat;
                        background-size: 100% 100%;

                        &.buy {
                            width: rem(54);
                            height: rem(65);
                            @include bgIcon('buy');
                        }

                        &.upgrade {
                            width: rem(59);
                            height: rem(53);
                            @include bgIcon('upgrade');
                        }

                        &.recommend {
                            width: rem(56);
                            height: rem(56);
                            @include bgIcon('recommend');
                        }
                        &.teamreward {
                            width: rem(56);
                            height: rem(56);
                            @include bgIcon('teamreward');
                        }
                        &.bigA{
                            width: rem(56);
                            height: rem(56);
                            @include bgIcon('bigA');
                        }
                        &.bigB{
                            width: rem(56);
                            height: rem(56);
                            @include bgIcon('bigB');
                        }
                    }
                }

                h1 {
                    font-size: rem(32);
                    color: $fontColor;
                    font-weight: bold;
                }
            }

            .num {
                font-size: rem(24);
                color: #F6383A;
            }
        }

        .wrapper {
            .item {
                display: flex;
                padding: rem(38) rem(8) rem(45);
                justify-content: space-between;
                border-bottom: rem(1) solid #F6F6F6;

                &:last-child {
                    border-bottom: none;
                }

                .left {
                    flex: 1;

                    h3 {
                        font-size: rem(30);
                        color: #232323;
                        font-weight: bold;
                    }

                    .desc {
                        margin-top: rem(10);
                        font-size: rem(24);
                        color: $fontDescColor;
                    }
                }

                .right {
                    flex: 0 0 rem(145);
                    display: flex;
                    width: rem(145);
                    height: rem(60);
                    margin: rem(9) 0 0 rem(35);
                    align-items: center;
                    justify-content: center;
                    border: rem(1) solid #E3E3E3;
                    -webkit-border-radius: rem(60);
                    -moz-border-radius: rem(60);
                    border-radius: rem(60);
                    font-size: rem(24);
                    color: #BABABA;
                    font-weight: bold;

                    &.active {
                        background-color: #F6383A;
                        color: #FFFFFF;
                        border-color: #F6383A;
                    }
                }
            }
        }
    }
</style>
