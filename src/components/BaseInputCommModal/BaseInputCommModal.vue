<template>
    <div class="BaseInputCommModal" v-if="isOpenPwdModal">
        <!-- 弹框 -->
        <div class="boxContainer">
            <!-- 标题区 -->
            <span class="tishi">{{title}}</span>
            <!-- 提示语区域 -->
            <div class="messageContainer">
                <input class="containerinput"
                       v-model="pwd"
                       :maxlength="maxlength"
                       :placeholder="placeholder"
                       >
            </div>
            <!-- 按钮区 -->
            <div class="boxBtnContainer">
                <div class="left" @click="e_cancel">
                    <span>取消</span>
                </div>
                <div class="right" :class="{closeBtn:iscloseBtn}" @click="e_confirm">
                    <span>确定</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BaseInputCommModal',
        data() {
            return {
                iscloseBtn:false,
                isNumber: true,
                pwd:''
            };
        },
        props: {
            isOpenPwdModal:{
                type:Boolean,
                default:false
            },
            title:{
                type:String,
                default:""
            },
            placeholder:{
                type:String,
                default:""
            },
            maxlength:{
                type:Number,
                default:32
            },
        },

        components: {
        },

        computed: {},

        methods: {
            e_cancel() {
                // this.iscloseBtn = false
                this.$emit('closePwdBox', '')
                this.pwd = ''
            },
            e_confirm() {
                // this.iscloseBtn = true
                if(this.pwd == ''){
                    this.$my_message('请输入'+this.title)
                    return false
                }
                this.$emit('econfirm', this.pwd)
                this.pwd = ''
            }
        },

        mounted() {},
    }
</script>

<style lang="scss" scoped type="text/scss">
    .BaseInputCommModal {
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
                font-size: rem(40);
                font-family: ios9SC-Medium;
                font-weight: 500;
                color: #05D6CC;
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
                .containerinput{
                    width: 100%;
                    height: rem(78);
                    font-size: rem(34);
                    padding-left: rem(8);
                    border:1px solid #05D6CC;
                    border-radius: rem(6);
                }


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
                    font-size: rem(34);
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
                        font-size: rem(34);
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
