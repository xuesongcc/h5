/**
* @desc 标题
* @author WL
* @date 2018/12/18
* @version 1.0
*/
<script>
    export default {
        name: "BaseNavbar",
        props: {
            //标题名称
            title: {
                type: String,
                default: '',
            },
            //右部文字
            text: {
                type: String,
                default: '',
            },
            //类名
            className: {
                type: String,
                default: ''
            },
            //是否显示返回按钮
            isLeft: {
                type: Boolean,
                default: true
            },
            //返回键路径
            backPath: {
                type: String,
                default: ''
            }
        },
        methods: {
            /**
             * 返回上一页
             * @private
             */
            _returnBack() {
                try {
                    Android.back();
                }catch (e) {
                    if (this.backPath) {
                        this.$emit('pageGo');
                    } else {
                        this.$router.back(-1);
                    }
                }
            },
            /**
             * 调用父组件方法
             * @private
             */
            _sendFather() {
                this.$emit('callMethod');
            }
        }
    };
</script>

<template>
    <div class="container">
        <div class="left">
            <i class="icon" @click="_returnBack" v-if="isLeft"></i>
        </div>
        <span class="title">{{title}}</span>
        <div class="right" @click="_sendFather">
            <i :class="className"></i>
            <span class="text">{{text}}</span>
        </div>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .container {
        position: fixed;
        display: flex;
        width: 100%;
        height: rem(90);
        padding: 0 rem(15);
        top: 0;
        left: 0;
        align-items: center;
        justify-content: space-between;
        z-index: 1000;
        background: $theamColor;
        border-bottom: rem(1) solid #E1E0E0;
        box-sizing: border-box;
        /*background: -webkit-linear-gradient(left, #030000, #191919); !* Safari 5.1 - 6.0 *!*/
        /*background: -o-linear-gradient(right, #030000, #191919); !* Opera 11.1 - 12.0 *!*/
        /*background: -moz-linear-gradient(right, #030000, #191919); !* Firefox 3.6 - 15 *!*/
        /*background: linear-gradient(to right, #030000, #191919); !* 标准的语法 *!*/
        .left {
            min-width: rem(43);
        }

        .icon {
            display: inline-block;
            width: rem(43);
            height: rem(29);
            @include bgIcon('return1');
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }

        .title {
            font-family: PingFangSC-Semibold, sans-serif;
            font-size: rem(34);
            color: #FFFFFF;
            font-weight: bold;
        }

        .left {
            display: flex;
            font-size: 0;
        }

        .right {
            display: flex;
            min-width: rem(43);
            font-size: 0;

            .forward {
                display: inline-block;
                width: rem(40);
                height: rem(37);
                @include bgIcon('forward');
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }

            .text {
                font-size: rem(28);
                color: #020000;
            }
        }
    }
</style>
