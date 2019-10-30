<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    import card from '@c/BaseCard/index'
    import fund from './fund.png'
    import myyoubao from './myyoubao.png'
    import play from './play.png'
    export default {
        name: 'TravelGold',
        data() {
            return {
                isLeft: false,
                goodsList:[],
                fund:fund,
                myyoubao:myyoubao,
                play:play,
                playYoubaoCount:'', // 获得玩转红包直推收益
                friendList:[],// 好友列表
                fundCount:'',// 购买旅游卡总额

                infos:[],// 会员数组
            };
        },
        components: {
            BaseNavbar,
            card,
        },
        watch: {},
        computed: {},
        methods: {
            /**
             * @Description go 购买旅游卡页面
             * @author 李雪松
             * @date 2019/8/29
             */
            goFund(){
                this.$router.push('/fund')
            },


            /**
             * @Description go 我的红包
             * @author 李雪松
             * @date 2019/8/29
             */
            goMyyoubao(){
                this.$router.push({path:'/myYoubao',query:this.infos})

            },
            /**
             * @Description go 玩转红包
             * @author 李雪松
             * @date 2019/8/29
             */
            goPlayyoubao(){
                // this.$router.push({path:'/playYoubao',query:this.playYoubaoCount}) // 此处传参数无法实现，是格式问题，这个不是符合key-value结构
                this.$router.push('/playYoubao')
                

            },


            // 获取会员所有信息信息
                fetchMember(){
                    let params = {
                        userId : sessionStorage.getItem('userId'),
                        // userGrade: '0'
                    }
                    this.$FDPost('app/sc/my/getUserInf',params).then(res=>{
                    console.log('member:',res)
                    if(res.status === 0){
                        this.infos = res.data
                     
                        console.log('infos:',this.infos)

                    }
                })
            },


            /**
             * @Description 获取购买旅游卡总额
             * @author 李雪松
             * @date 2019/8/29
             */
            fetchFundList(){
                let parmas = {
                    userId: sessionStorage.getItem('userId')
                }
                this.$FDPost('/totalConsumptionMoney',parmas).then(res=>{
                    if(res.status === 0 ){
                        this.fundCount = res.data
                    }else {
                        this.$my_message(res.msg)
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
            /**
             * @author Anonymous
             * @date 2019/8/23
             * @Description: 前台旅游商品列表
             */
            getTourismGoodsList() {
                this.$FDPost('travel/tourismGoodsList').then(re => {
                    console.log(re);
                    if(re.status == 0){
                        this.goodsList = re.data
                    }
                })
            },
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
        },
        mounted() {
            this.getTourismGoodsList()
            this.fetchCountGold()
            this.fetchFriendList()
            this.fetchFundList()
            this.fetchMember()
        },
    }
</script>

<template>
    <div class="travelGoldContainer">
        <div class="header">
            <BaseNavbar title="旅游卡" :isLeft="isLeft"></BaseNavbar>
        </div>
        <div class="context">

            <div  @click="goFund">
                <card menuTitle="购买旅游卡" :src="fund">
                    <div slot="text" class="text">累计消费金额</div>
                    <div slot="footer" class="text">{{fundCount}}</div>
                </card>
            </div>
            <div @click="goMyyoubao">
                <card menuTitle="我的红包" :src="myyoubao">
                    <div slot="text" class="text">红包余额</div>
                    <div slot="footer" class="text">{{infos.youbao}}</div>
                </card>
            </div>
            <div class="play-context">
                <span class="playyoubao">玩转红包 </span><span class="play-1"> | 邀请好友赚红包</span>
            </div>
            <div @click="goPlayyoubao">
                <card menuTitle="玩转红包" :src="play" @click="goPlayyoubao">
                    <div slot="text" class="text">已邀好友<p class="text">{{friendList.length}}</p></div>
                    <div slot="footer" class="number">
                        <img src="./count.png">
                        <span class="count-value">当前已获得直推收益 {{playYoubaoCount}}</span>
                    </div>
                </card>
            </div>


        </div>

    </div>
</template>


<style lang="scss" scoped type="text/scss">
    .header {
        margin-bottom: rem(100);
    }
    .text{
        margin-top: rem(20);
        font-size: rem(26);
        color: #999999;
        font-weight: bold;
    }
    .number{
        margin-top: rem(20);
        font-size: rem(32);
        display: flex;
        align-items: center; /*垂直居中*/

    }
    .play-context{
        margin: rem(20) rem(20);
        .playyoubao{
            font-size: rem(32);
            color:#666666;
        }
        .play{
            font-size: rem(26);
            color:#666666;

        }
    }
    .count-value{
        font-size: rem(26);
        color: #999999;
        margin-left: rem(20);
    }

</style>
