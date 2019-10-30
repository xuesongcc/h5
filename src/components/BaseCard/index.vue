<template>
    <div class="ordermenu">
        <div class="ordermenu_top">
            <span class="logo"><img :src="src" alt=""></span>
            <span class="top_left">{{menuTitle}}</span>
            <span class="top_right"><img src="./right.png"></span>

        </div>
        <div class="solid"></div>
<!--        中间插槽-->
        <slot name="text"></slot>
<!--        底部插槽-->
        <slot name="footer"></slot>
    </div>
</template>

<script>
    export default {
        name: "index",
        props: {
            menuTitle: {
                type: String,
                default: ''
            },

            menuId:{
                type:String,
                default:'',
            },
            src:{
                type:String,
                default:''
            }
        },
        methods: {
            // /**
            //  * 进入详情
            //  * @private
            //  */
            // _goDetail() {
            //     console.log('详情：');
            //     this.$router.push({
            //         name:'fund',
            //         path:'/fund',
            //         query:{
            //             goodsId:this.menuId
            //         }
            //     })
            //     // this.$emit('')
            //
            // }
        },

    }
</script>

<style lang="scss" scoped>


    .ordermenu {
        padding: rem(30) rem(20);
        /*width: 90%;*/
        background:rgba(255,255,255,1);
        border-radius: 8px;
        margin: rem(10) rem(20);

        img{
            width: rem(40);
            height: rem(40);
            border-radius: rem(20);
        }

        .ordermenu_top {
            /*display: flex;*/
            /*flex-direction: row;*/
            align-content: center;


            .logo{
                margin-right: rem(20);
            }
            .top_left {
                font-size: rem(32);
                line-height: rem(40);
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
            }
            .top_right {
                font-size: rem(32);
                float: right;
                img{
                    width:rem(20);
                    height: rem(40);
                }

            }


        }
        .menuTitle{
            font-size: rem(26);
            color: #999999;
            margin: rem(20) 0;
        }



        .solid{
            margin:rem(30) 0;
            border-bottom: 1px solid #D9D9D9;
        }
    }

</style>