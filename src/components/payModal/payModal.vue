<template>
    <div class="BaseModal" v-if="message != ''" @click="hide">
        <!-- 弹框 -->
        <div class="boxContainer">
            <!-- 标题区 -->
            <span class="tishi">购入方式</span>
            <!-- 按钮区 -->
            <div class="boxBtnContainer">
                <div class="left" @click="e_cancel">
                    <span>给朋友购买</span>
                </div>
                <div class="right" :class="{closeBtn:iscloseBtn}" @click="e_confirm">
                    <span>购入</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'payModal',
        data() {
            return {
                iscloseBtn:false,
            };
        },
        props: {
            message: {
                default: ''
            }
        },

        components: {},

        computed: {},

        methods: {
            hide(event){

                let dom = document.getElementById("BaseModal");// 此处应该使用为类名的。但是不知为什么需要使用getElementById。
                if (dom) {
                    if (!dom.contains(event.target)) {
                        //这句是说如果我们点击到了id为child以外的区域
                        this.message= false;
                    }
                }
                this.$emit('hide','')
            },
            e_cancel() {
                this.$emit('e_cancel', '')
            },
            e_confirm() {
                this.$emit('e_confirm', true)
            }
        },

        mounted() {},
    }
</script>

<style lang="scss" scoped type="text/scss">
    .BaseModal {
        width: 100%;
        height: 100vh;
        background-color: rgba($color: #000000, $alpha: 0.5);
        position: fixed;
        top: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .boxContainer {
            width: rem(500);
            // height: rem(290);
            background-color: white;
            border-radius: rem(8);
            box-sizing: border-box;

            .tishi {
                width: 100%;
                height: rem(80);
                display: inline-block;
                font-size: rem(32);
                font-family: ios9SC-Medium;
                font-weight: 400;
                color: #000000;
                text-align: center;
                line-height: rem(80);
            }

            .messageContainer {
                width: 100%;
                min-height: rem(100);
                text-align: center;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                padding: 0 rem(28);
                box-sizing: border-box;

                span {
                    font-size: rem(34);
                    font-family: ios9SC-Medium;
                    font-weight: 500;
                    color: rgba(126, 126, 126, 1);
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

                span {
                    font-size: rem(32);
                    font-family: ios9SC-Medium;
                    font-weight: 500;
                    color: rgba(126, 126, 126, 1);
                }

                .left {
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
</style>
