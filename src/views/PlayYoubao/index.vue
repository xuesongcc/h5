<template>
    <div>
        <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
        <div class="top">
            <img src="./playbg.png">
            <span>直推收益:{{playYoubaoCount}}</span>
        </div>
        <div class="context">
            <span class="context-title">我的好友</span>
            <div class="recordList" v-for="(item,index) in friendList" :key="index">
                <div class="username">{{item.username}}</div>
            </div>
            <div class="noData" v-if="friendList.length == 0">暂无数据</div>
        </div>
    </div>
</template>

<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';


    export default {
        name: "fund",
        data() {
            return {
                isLeft: true,
                title: '玩转红包',
                friendList:[],
                playYoubaoCount: '',

            };
        },
        methods: {
            /**
             * @Description 获取好友列表
             * @author 李雪松
             * @date 2019/8/29
             */
            fetchFriendList(){
                let params = {
                    id: sessionStorage.getItem('userId')
                }

                this.$FDPost('/myFriend',params).then(res=>{
                    if(res.status === 0 ){
                        this.friendList = res.data
                    }
                })
            },


            
            /**
             * @Description 获取玩转红包总额
             * @author 李雪松
             * @date 2019/8/29
             */
            fetchCountGold(){
                let parmas = {
                    userId: sessionStorage.getItem('userId')
                }
                this.$FDPost('/zhiTuiProfit',parmas).then(res=>{
                    if(res.status === 0 ){
                        this.playYoubaoCount = res.data
                    }else {
                        this.$my_message(res.msg)
                    }

                })
            },
        },
        mounted() {
            this.fetchFriendList()
            this.fetchCountGold()
        },
        components: {
            BaseNavbar,

        },
    }
</script>

<style lang="scss" scoped>

.top {
        position: relative;

        span {
            position: absolute;
            bottom: 17vw;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-size: 5vw;
            line-height: 5vw;
        }
    }
    .context{
        margin: 0 rem(20);
        padding: rem(20) rem(20);
        background-color: #ffffff;
        min-height: rem(100);

        position: relative;
        bottom: rem(50);
        left: 0;
        .username{
            font-size: rem(28);
            color: #333333;
        }
        .context-title{
            font-size: rem(32);
            color: #333333;
            font-weight: bold;
        }
        .recordList{
            margin-top: rem(20);
        }
        .context-text{
            font-size: rem(28);
            color: #333333;
            font-weight: bold;
        }
        .context-right{
            float: right;
            font-size: rem(24);
            color: #999999;
        }
        .youbao-title{
            font-size: rem(28);
            color: #666666;
        }
        .context-value{
            color: #FF9600;
            font-weight: bold;
            font-size: rem(28);
        }
        .noData{
            text-align: center;
            font-size: rem(28);
        }

    }


</style>