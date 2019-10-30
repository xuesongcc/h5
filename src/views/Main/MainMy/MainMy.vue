/**
* @desc 首页--个人中心
* @author WL
* @date 2019/3/6
* @version 1.0
*/
<script xmlns:v-clipboard="http://www.w3.org/1999/xhtml">

    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    import BaseQRCode from '@c/BaseQRCode/index';
    import BaseModal from '@c/BaseModal/BaseModal'
  import befor from './befor.png'
  import doing from './doing.png'
  import after from './doing.png'
  import success from './success.png'
  export default {
    name: "MainMy",
    components: {
        BaseQRCode,
        BaseNavbar,
        BaseModal,

    },
    data() {
      return {
        //用户信息
        users: {},
          isLeft:false,
          title:'个人中心',
          infos:[],
          isPrompt:false,// 提示框隐藏
          isQRcodeShow:false,// 二维码展示
          aiyayouFund:'',
          popCode:sessionStorage.getItem('popCode'),//推广码
          callPhone: false, // 联系电话
          servicePhone: '',// 联系电话号码

          navList: [
              {
                  id: -1,
                  label: '待支付',
                  src:befor
              },
              {
                  id: 0,
                  label: '待确认',
                  src:doing

              },
              {
                  id: 1,
                  label: '待出行',
                  src:after

              },
              {
                  id: 2,
                  label: '已完成',
                  src: success
              },
          ],
          userinfoList:[
              // {label:'消费记录',id:0},
            //   {label:'我的红包',id:1},
              {label:'购物券',id:2},
              {label:'旅游卡',id:3},
              {label:'地址管理',id:4},
              {label:'修改支付密码',id:5},
              {label:'修改手机号',id:6},
              {label:'推广邀请',id:7},
              {label:'联系客服',id:8},
             /* {label:'购买旅游卡',id:9},*/
          ],
          currentNavId:-1,
          closeTab: false
      };
    },
    mounted() {
      this._getUserInfo();
      this.fetchFund();

    },
      created(){
        this.fetchMember()
      },
    methods: {
        // 跳转到我的预定
        goMyReservation(id){
            this.$router.push('/myReservation',id)
        },

        goDetail(data){

            switch (data) {
                case 0: this.$router.push('/expensesRecord');console.log('跳转到',data);
                    break;
                case 1: this.$router.push({path:'/myTreasure',query:this.infos});console.log('跳转到',data)
                    break;
                case 2: this.$router.push({path:'/myShoppingVoucher',query:this.infos});console.log('跳转到',data);
                    break;
                case 3: this.$router.push({path:'/myTravelCard',query:this.infos});console.log('跳转到',data);
                    break;
                case 4: this.$router.push('/addressManage');console.log('跳转到',data);
                    break;
                case 5: this.$router.push('/replacePayPassword');console.log('跳转到',data);
                    break;
                case 6: this.$router.push('/replacePhone');console.log('跳转到',data);
                    break;
                case 7: this.isQRcodeShow = true;
                    break;
                case 8:  this.callPhone = true;this.service();console.log('跳转到',data);
                    break;
                case 9: this.$router.push('/foundation');console.log('跳转到',data);
                    break;

            }

        },


      /**
       * 获得用户资料
       * @private
       */
      _getUserInfo() {
        // let params = {
        //   userId: sessionStorage.getItem('userId')
        // };
        //
        //
        //
        // this.$FDPost('getMyMessage', params).then(re => {
        //
        //   if (re.status === 0) {
        //     this.users = re.data;
        //   } else {
        //     this.$my_message(re.msg);
        //   }
        // });
      },


      /**
       * @Description
       * @author 李雪松
       * @date 2019/8/26
       */
      // 获取会员信息
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
         * 安全退出
         * @private
         */
        _retreatSafely() {
            this.$store.dispatch('RetreatSafely');
            this.$router.push('/');
        },

        /**
         * 关闭提示框
         * @private
         */

        closeQrcode(){
            this.isQRcodeShow = false
        },
        /**
         * @Description 获取废弃基金
         * @author 李雪松
         * @date 2019/8/30
         */
        fetchFund(){
            let params = {
                userId : sessionStorage.getItem('userId'),
            }
            this.$FDPost('/noReceive',params).then(res=>{
                console.log('member:',res)
                if(res.status === 0){
                    this.aiyayouFund = res.data


                }
            })
        },



        // 获取联系电话
         service(){
            this.$FDPost('app/sc/my/getCustomerPhone').then(res=>{
                if(res.status === 0){
                   
                    this.servicePhone = res.data
                }else {
                    this.$my_message(res.message)
                }

            })
        },
        // 关闭弹框
        closeService(){
            this.callPhone = false
        },

    }
  };
</script>

<template>
    <div>
        <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>

        <div class="top">
            <img src="./my-background.png">
            <div class="avatar">
                <div class="avatar-img">
                    <p>
                        <img src="./avatar.png">
                    </p>
                    <span class="avatar-name">{{infos.phone}}
                       <div class="memberGrade" v-if="infos.userGrade === 0">(普通会员)</div>
                       <div class="memberGrade" v-if="infos.userGrade === 1">(银卡会员)</div>
                       <div class="memberGrade" v-if="infos.userGrade === 2">(金卡会员)</div>
                    </span>
                </div>

            </div>
            <div  class="top-voucher">

                <div class="top-voucherText">
                    <span>{{infos.youbao}}</span>
                    <p>红&nbsp;包</p>
                </div>
                <div class="top-voucherText">
                    <span>{{infos.aShoppingVouchers}}</span>
                    <p>购物券</p>
                </div>
                <div class="top-voucherText">
                    <span>{{infos.tourismCard}}</span>
                    <p>旅游券</p>
                </div>
                <div class="top-voucherText">
                    <span>{{aiyayouFund}}</span>
                    <p>乐捐池</p>
                </div>

            </div>

            <div class="card">
                <div class="titleAndRight" @click="goMyReservation">
                    <span class="card-title">我的预定</span>
                    <span class="card-right" ><img src="./cardList-right.png"></span>
                </div>

                <div class="card-solid"></div>
                <div class="my-reservation">
                    <div class="navList" v-for="(v,id) in navList" :key="id" @click="goMyReservation(id)">
                        
                        <img :src="v.src">
                        
                        <p>
                            <span>{{v.label}}</span>

                        </p>
                    </div>

                </div>
            </div>

        </div>
        <div class="cardList" v-for="(item,id) in userinfoList" :key="id" >
            <div @click="goDetail(item.id)">
                <span class="cardList-label">{{item.label}}</span>
                <span class="cardList-right" ><img src="./cardList-right.png"></span>
                <div class="solid"></div>
            </div>

        </div>
        <div @click="_retreatSafely" class="singout">
            <span>退出登录</span>
        </div>
        <!-- 联系客服 -->
        
            <BaseModal :message="servicePhone" @e_cancel="closeService" @e_confirm="closeService" v-if="callPhone"></BaseModal>        
       
        <!--推广邀请码-->   
        <div>
            <BaseQRCode v-if="isQRcodeShow" @close="closeQrcode">
                <div slot="footer" class="promotionCode">邀请码：{{popCode}}</div>
            </BaseQRCode>
        </div>

    </div>
</template>

<style lang='scss' scoped type="text/scss">

        .top{
            height: 100%;
            width: 100%;
            margin-top: 4.5rem;
            position:relative;
            .avatar{
                position: absolute;
                left:rem(80);
                top: rem(50);

                .avatar-img{
                    height: rem(100);
                    width: rem(100);
                    /*line-height: rem(100);*/
                    border-radius: rem(50);
                    /*background-color: #ffffff;*/
                    .avatar-name{
                        margin-left: rem(20);
                        position: absolute;
                        left:rem(100);
                        top: rem(30);
                        color: #FFFFFF;
                        font-size: rem(28);
                        width: 100%;
                    }
                    .memberGrade{
                        position: absolute;
                        left:rem(200);
                        top: 0;
                        width: rem(200);
                        /*position: relative;*/
                        /*left: 16rem;*/
                        /*bottom: rem(40);*/
                    }
                }

            }
            .top-voucher{
                width: 100%;
                display: flex;
                justify-content: space-evenly;

                /*space-evenly: 均匀排列每个元素,每个元素之间的间隔相等space-between: 均匀排列每个元素,首个元素放置于起点末尾元素放置于终点*/
                position: relative;
                left: 0;
                bottom: rem(200);
                border: none;
                .top-voucherText{
                    font-size: rem(28);
                    color: #ffffff;
                    text-align: center;
                }

            }



        }
        .card{
            margin: rem(20) rem(20);
            background-color: #ffffff;
            position: relative;//不使别的div位置改变
            bottom: rem(150);
            height: 12rem;
            left: 0;
            border-radius: rem(10);
            .titleAndRight{
                height: rem(60);
                line-height: rem(60);
                padding: rem(20) rem(30);
            }
            .card-title{
                font-size: rem(28);
                color: #666666;
            }
            .card-right{
                float: right;

                img{
                    height: rem(30);
                    width: rem(20);
                }
            }
            // .card-solid{
            //     border-bottom: 1px solid #F2F2F2;
            // }
            .my-reservation {
                width: 100%;
                height: rem(78);
                background-color: white;
                display: flex;
                flex-direction: row;
                align-content: center;
                justify-content: space-around;

                .navList {
                    width: 25%;
                    font-size: rem(28);
                    img{
                        width: 10vw;
                        height: 10vw;
                        margin: 0 auto;
                        position: relative;
                        /* overflow: hidden; */
                        left: 29%;
                    }
                    p{
                        overflow: hidden;
                        text-align: center;
                    }

                }

            }
        }

        .cardList{
            margin: 0 rem(20);
            background-color: #ffffff;
            padding: 0 rem(30);
            position: relative;
            bottom: rem(150);
            left: 0;
            border-radius: rem(10);
            align-items: center;

        }
        .cardList-label{
            font-size: rem(32);
            height: rem(100);
            line-height: rem(100);

        }
        .cardList-right{
            float: right;
            line-height: rem(100);
            height: rem(100);

            img{
                height: rem(30);
                width: rem(20);

            }
        }
        .solid{
            border-bottom: 1px solid #D9D9D9;
        }
        .singout{
            text-align: center;
            color: #ffffff;
            margin: 0 rem(20);
            background-color: #09D1D4;
            height: rem(100);
            line-height: rem(100);
            border-radius: rem(50);

            position: relative;
            left: 0;
            bottom: 6rem;
            span{
                font-size: rem(32);
            }

        }


        .promotionCode{
            text-align: center;
            font-size: rem(28);
            color: #604498;
            font-weight: bold;
        }



</style>
