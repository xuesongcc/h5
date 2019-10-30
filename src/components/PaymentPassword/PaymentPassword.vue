/**
* @desc 输入支付密码
* @author WL
* @date 2018/12/7
* @version 1.0
*/
<script>
    // import {fpost, gpost, sonpost, vlink, vpost} from '@api/axios';
    // import {gtpost, jtget, jtpost, tokenLink, tokenPost} from '@api/axiosByToken';
    import sha256 from 'js-sha256';

    export default {
        name: "PaymentPassword",
        data() {
            return {
                password: '',//密码
                keys: [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, undefined],//键盘按键
                isKeyboard: true,//键盘是否显示
            };
        },
        props: {
            carryData: {
                type: String,
                default: '',
            }
        },
        watch: {
            password() {
                if (this.password.length >= 6) {
                    this.$emit('InputPwd', this.password);
                    this.password = '';
                }
            }
        },

        mounted() {
            this.$nextTick(() => {
                this.getTheFocus();
            });
        },

        methods: {
            // 关闭密码框
            _closePwdBox() {
                this.password = '';

            },
            /**
             * 获得焦点
             * @private
             */
            getTheFocus() {
                this.isKeyboard = true;
            },
            /**
             * 点击键盘按键
             * @param key [Number] 按键值
             * @private
             */
            _clickButton(key) {
                if (key === null) {
                    return;
                }
                if (key === undefined) {
                    this.password = this.password.substr(0, this.password.length - 1);
                    return;
                }
                this.password += key + '';
            },
            /**
             * 关闭键盘
             * @private
             */
            _close() {
                // this.isKeyboard = false;
                this.$emit('closePwdBox');
            }
        },
    };
</script>

<template>
    <div class="password-box">
        <div class="wrapper">
            <div class="container">
                <h3>请输入支付密码</h3>
                <ul class="input-list" @click.prevent.stop="getTheFocus">
                    <li class="il-item" v-for="item in 6" :key="item" :class="{'active': password.length >= item}"></li>
                </ul>
            </div>
        </div>
        <transition name="">
            <div class="keyboard" v-show="isKeyboard">
                <div class="come-back" @click="_close">
                    <i class="icon"></i>
                </div>
                <ul class="key-list">
                    <li class="key-button" v-for="(item,i) in keys" :key="i+100" @click="_clickButton(item)">
                        <span>
                            {{item}}
                            <i v-if="i === 11" class="icon"></i>
                        </span>
                    </li>
                </ul>
            </div>
        </transition>
        <div class="layer" @click="_closePwdBox"></div>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .password-box {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1000;

        .wrapper {
            position: absolute;
            top: rem(200);
            left: 0;
            width: 100%;

            .container {
                width: 80%;
                margin: 0 auto;
                padding-bottom: rem(20);
                background: #ffffff;

                h3 {
                    line-height: rem(50);
                    font-size: rem(20);
                    text-align: center;
                    color: #202020;
                }

                .input-list {
                    display: flex;
                    width: 90%;
                    margin: 10px auto 0;
                    border: 1px solid rgba(148, 147, 147, .5);

                    .il-item {
                        flex: 1;
                        height: rem(80);
                        border-right: rem(1) solid rgba(169,169,169,0.8);

                        &.active {
                            position: relative;

                            &:before {
                                position: absolute;
                                display: block;
                                width: rem(5);
                                height: rem(5);
                                top: 50%;
                                left: 50%;
                                margin: rem(-2.5) 0 0 rem(-2.5);
                                -webkit-border-radius: 50%;
                                -moz-border-radius: 50%;
                                border-radius: 50%;
                                background: #000000;
                                content: '';
                            }
                        }

                        &:last-child {
                            border-right: none;
                        }
                    }
                }
            }
        }

        .keyboard {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;

            .come-back {
                display: flex;
                height: rem(65);
                align-items: center;
                justify-content: center;
                border-bottom: rem(1) solid rgba(148, 147, 147, .2);
                background: #ffffff;

                .icon {
                    display: inline-block;
                    width: rem(25);
                    height: rem(25);
                    background: url("bottom.png") center no-repeat;
                    background-size: 100% 100%;
                }
            }

            .key-list {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                box-sizing: border-box;

                .key-button {
                    width: 33.15%;
                    height: rem(100);
                    background: #ffffff;
                    border-width: rem(0) rem(1) rem(1) rem(0);
                    border-style: solid;
                    border-color: rgba(148, 147, 147, .2);

                    &:nth-child(3n) {
                        border-right: none;
                    }

                    &:nth-child(10), &:nth-child(12) {
                        background: #eeeeee;
                    }

                    span {
                        display: flex;
                        width: 100%;
                        height: 100%;
                        align-items: center;
                        justify-content: center;
                        font-size: rem(32);
                        font-weight: bold;
                        color: #202020;

                        .icon {
                            display: inline-block;
                            width: rem(35);
                            height: rem(35);
                            background: url("delete.png") center no-repeat;
                            background-size: 100% 100%;
                        }
                    }
                }
            }
        }

        .layer {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .5);
        }
    }
</style>
