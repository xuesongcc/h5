<script>
    import close from './close.png'

    export default {
        data() {
            return {
                close,
            }
        },
        props: {
            noticeInfo: {
                type: Object,
                default: () => {
                }
            }
        },
        components: {},
        methods: {
            /**
             * @author Anonymous
             * @date 2019/7/16
             * @Description: 关闭公告弹框
             */
            e_closeNotice() {
                this.$emit('closeNotice', false)
                this.$store.dispatch('SetRedeemData', {showNotice: false});
            },
        },
        mounted() {

        },
        created() {
        }
    }
</script>
<template>
    <div class="BaseNotice">
        <div class="noticeArea">
            <div class="header">
                <h1>{{noticeInfo.title}}</h1>
            </div>
            <div ref="content" class="content" v-html="noticeInfo.content"></div>
        </div>
        <img class="closeicon" :src="close" alt="" @click.stop="e_closeNotice">
    </div>
</template>
<style lang='scss' scoped>
    @import "BaseNotice";
</style>