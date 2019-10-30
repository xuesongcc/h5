/**
* @desc 自定义提示框
* @author WL
* @date 2019/1/12
* @version 1.0
*/
<script>
    export default {
        name: "Message",
        data() {
            return {
                message: '',//提示内容
                isVisible: false,//显示|隐藏
                time: 2500,//停留时间
            };
        },
        mounted() {
            this.close();
        },
        methods: {
            /**
             * 定时隐藏提示框
             */
            close() {
                setTimeout(() => {
                    this.isVisible = false;
                }, this.time);
            }
        }
    };
</script>

<template>
    <transition name="fade">
        <div class="message" v-if="isVisible">
            <div class="content">
                <span>{{message}}</span>
            </div>
        </div>
    </transition>
</template>

<style lang='scss' scoped type="text/scss">
    .message {
        position: fixed;
        width: 100%;
        height: 0 !important;
        left: 0;
        bottom: rem(200);
        z-index: 10000;
        pointer-events: none;

        &.fade-enter-active, &.fade-leave-active {
            transition: all .5s ease;
        }

        &.fade-enter, &.fade-leave-active {
            opacity: 0;
        }

        .content {
            position: absolute;
            width: 100%;
            left: 0;
            top: 0;
            text-align: center;

            span {
                position: relative;
                display: inline-block;
                padding: rem(6) rem(30);
                border-radius: rem(60);
                font-size: rem(38);
                color: #202020;
                background: RGBA(237, 237, 237, .8);
            }
        }
    }
</style>
