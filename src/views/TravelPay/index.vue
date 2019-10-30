<template>
    <div>
        <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
        <div class="backgroundImg">
            <div class="pay_top">
                订单总额
            </div>
            <div class="moneyVal">￥{{productPrice}}</div>
        </div>
        <div class="title">选择地址</div>
        <div class="addressSelect" @click="goProductAddress">
            <span class="address-right"><img src="./select-right.png" alt=""></span>
            <p class="default">默认地址</p>
         
            <span class="address-left">{{addressDetails}}</span>

           
        </div>
        <div class="title">选择支付方式<span class="span"></span></div>
        <div class="all">
            <div class="cardList">  
                <div class="youbao">
                    <img src="./youbao.png">
                    <span class="cardList-title">红包+微信</span>
                    <p class="card-text">
                        <span>当前红包:</span>
                        <span>{{youbao}}</span>
                    </p>
                </div>
                <span class="right">
                    <label for="2"><input type="radio" name="payType" id="2" v-model="picked" value="2" class="a-radio"><span
                            class="b-radio"></span></label>
                </span>
            </div>
            <div class="solid"></div>
            <div class="cardList">
                <div class="youbao">
                    <img src="./wechat.png">
                    <span class="cardList-title">微信支付</span>
                    <p class="card-text">
                        <span>推荐微信用户使用</span>
                        <!-- <span>{{value}}</span> -->
                    </p>
                </div>
                <span class="right">
                    <label for="1"><input type="radio" name="payType" id="1" v-model="picked" value="1" class="a-radio"><span
                            class="b-radio"></span></label>
                </span>
            </div>
            <div class="solid"></div>
            <div class="cardList">
                <div class="youbao">
                    <img src="./gouwuquan.png">
                    <span class="cardList-title">购物券+微信</span>
                    <p class="card-text">
                        <span>可使用购物券:</span>
                        <span>{{vouches}}</span>
                    </p>
                </div>
                <span class="right">
                    <label for="3"><input type="radio" id="3" name="payType" v-model="picked" value="3" class="a-radio"><span
                            class="b-radio"></span></label>
                </span>
            </div>
            <div class="solid"></div>
            <div class="cardList">
                <div class="youbao">
                    <img src="./youbao.png">
                    <span class="cardList-title">旅游卡</span>
                </div>
                <span class="right">
                    <label for="4"><input type="radio" id="4" name="payType" v-model="picked" value="4" class="a-radio"><span
                            class="b-radio"></span></label>
                </span>
            </div>
        </div>

        <div class="footer">
            <span class="footer-context">
                <span class="footer-left">合计:<span>{{productPrice}}</span></span>
                <span class="footer-right"><div class="button" @click="confirmPay">去支付</div></span>
            </span>
        </div>
        <!--旅游卡-->
        <BaseInputCommModal :isOpenPwdModal="modalFlag1" v-on:closePwdBox="closeModal" v-on:econfirm="econfirmModal1"
                            :title="modleTitle" :placeholder="modlePlaceholder"/>
        <!--现金支付的金额-->
        <BaseInputCommModal :isOpenPwdModal="modalFlag2" v-on:closePwdBox="closeModal" v-on:econfirm="econfirmModal2"
                            :title="modleTitle" :placeholder="modlePlaceholder"/>
        <!--交易密码-->
        <BaseInputModal :isOpenPwdModal="modalFlag3" v-on:closePwdBox="closeModal" v-on:econfirm="econfirmModal3"/>
    </div>
</template>

<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    import BaseInputCommModal from '@c/BaseInputCommModal/BaseInputCommModal';
    import BaseInputModal from '@c/BaseInputModal/BaseInputModal';



    export default {
        name: "index",
        data() {
            return {
                modalFlag1: false,
                modalFlag2: false,
                modalFlag3: false,
                modleTitle: "",
                modlePlaceholder: "",
                title: '订单确认',
                isLeft: true,
                youbao: '',//红包值
                vouches: '',// 购物券
                addressDetails:'',// 报单地址详情
                picked: '',// 选中的value
                productPrice: this.$route.query.payMoney, //订单总金额
                productId: this.$route.query.id, // 保单商品的id
       
                goodsProductId: this.$route.query.goodsProductId,// 报单产品包 仅限 vip 黑卡
               
                cashPayMoney: 0,// 现金支付的金额\
              
                // 微信支付参数
                appId: '',
                timeStamp: '',
                nonceStr: '',
                package: '',
                signType: '',
                paySign: '',
            }
        },
        components: {
            BaseNavbar,
            BaseInputCommModal,
            BaseInputModal,
        },
        mounted() {
          if(localStorage.getItem('addD')){
            this.addressDetails = localStorage.getItem('addD')
          }
            //  this.activated();
             this.fetchYoubaoAndVouches();
           
        },
        computed:{
            
        },
        methods: {

           

            // 去报单地址
            goProductAddress(){
                this.$router.push('/productAddress')
            },

            // 获取红包值和购物券值
            fetchYoubaoAndVouches(){
                let params = {
                    userId: sessionStorage.getItem('userId')
                }
                this.$FDPost('userAssets',params).then(res=>{
                    if(res.status === 0 ){
                        this.youbao = res.data.youBao
                        this.vouches = res.data.aShoppingVouchers
                    }else{
                        this.$my_message(res.msg)
                    }
                })
            },
            //去支付
            confirmPay() {
               
               
                console.log("去支付", this.picked)

                if (this.picked == 4) {
                    /*旅游卡*/
                    this.modleTitle = "旅游卡";
                    this.modlePlaceholder = "请输入旅游卡号";
                    this.modalFlag1 = true;

                 
                } else if (this.picked == 2 || this.picked == 3) {
                    this.modleTitle = "现金支付金额";
                    this.modlePlaceholder = "请输入现金支付金额";
                    this.modalFlag2 = true;
                     
                
                } else if (this.picked == 1) {
                    /*微信支付*/
                    // let params = {
                    //     productId: this.productId,// 路由传过来的商品id
                    //     userId: sessionStorage.getItem('userId'),
                    //     payType: this.picked,
                    //     // addressId: '1', // 收货地址
                    //     // address: localStorage.getItem('addressId'),
                        
                    //     goodsProductId: this.goodsProductId,
                    // };
                    let params = this.$route.query
                    params.payType = this.picked
                    console.log('微信下单前需要的参数：',params)
                    // 下单创建订单接口
                    this.$JSONPost('/createTourismOrder', params).then(re => {
                        if (re.status === 0) {
                            this.wechatPay(re.data);
                            
                        } else {
                            this.$my_message(re.msg);
                        }
                    });
                }else{
                    this.$my_message("请选择支付方式");
                }
            },
            // 关闭弹框
            closeModal() {
                this.modalFlag1 = false;
                this.modalFlag2 = false;
                this.modalFlag3 = false;
            },
            // 旅游卡
            econfirmModal1(code) {
                this.modalFlag1 = false;
                // let params = {
                //     productId: this.productId,// 路由传过来的商品id
                //     userId: sessionStorage.getItem('userId'),
                //     payType: this.picked,
                //     // addressId: '1', // 收货地址
                //     addressId: localStorage.get('addressId'),
                //     code: code,
                   
                //     goodsProductId: this.goodsProductId,
                // };
                let params = this.$route.query
                console.log('旅游卡下单前需要的参数：',params)

                this.$FDPost('/createTourismOrder', params).then(re => {
                    if (re.status === 0) {
                        this.$my_message(re.msg);
                    } else {
                        this.$my_message(re.msg);
                    }
                });
            },
            // 现金支付的金额
            econfirmModal2(money) {
                this.modalFlag2 = false;
                if (money == '' || money == undefined || isNaN(Number(money))) {
                    this.$my_message("请输入正确的金额");
                } else {
                    this.cashPayMoney = money
                    this.modalFlag3 = true
                }
            },
            // 交易密码
            econfirmModal3(pwd) {
                this.modalFlag3 = false;
                // let params = {
                //     productId: this.productId,// 路由传过来的商品id
                //     userId: sessionStorage.getItem('userId'),
                //     payType: this.picked,
                //     // addressId: '1', // 收货地址
                //     addressId: localStorage.getItem('addressId'),
                //     password: pwd,
                //     cashPayMoney: this.cashPayMoney,
                    
                //     goodsProductId: this.goodsProductId,
                // };
                 let params = this.$route.query
                 params.id = '402882176d041a43016d047d59f30007'
                console.log('输入交易密码后的参数：',params)
                this.$FDPost('/createTourismOrder', params).then(re => {
                    if (re.status === 0) {
                        console.log("创建订单data",re)
                        this.wechatPay(re.data);
                    } else {
                        this.$my_message(re.msg);
                    }
                });
            },


            /**
             * @Description 根据订单号 从后台换取微信支付所需参数  微信外部 H5支付
             * @author Anonymous
             * @date 2019/5/17
             */
            async wechatPay(oid) {
                console.log('微信支付')
                console.log('下单开始 oId:',oid)
                let tourismOrderId = oid.tourismOrderId;
                let paydata = {
                    orderId: tourismOrderId,
                    userId: sessionStorage.getItem('userId'),
                }
                this.$FDPost('/tourism/unifiedOrder', paydata).then(pay => {
                    if (pay.status == 0) {
                        if (pay.data.mwebUrl) {
                            window.location.replace(pay.data.mwebUrl + '&redirect_url=http%3a%2f%2fwww.ayy360.com%2f%23%2ftravelOrder')
                            return
                        }
                        this.appId = pay.data.result.appId;
                        this.timeStamp = pay.data.result.timeStamp;
                        this.nonceStr = pay.data.result.nonceStr;
                        this.package = pay.data.result.packageValue;
                        this.signType = pay.data.result.signType;
                        this.paySign = pay.data.result.paySign;
                        //唤起支付
                        this.callpay(oid);
                    }
                })
            },
            /**
             * @Description 进行支付
             * @author Anonymous
             * @date 2019/5/17
             */
            callpay(oid) {
                if (typeof WeixinJSBridge == 'undefined') {
                    if (document.addEventListener) {
                        document.addEventListener(
                            'WeixinJSBridgeReady',
                            this.onBridgeReady(oid),
                            false,
                        )
                    } else if (document.attachEvent) {
                        document.attachEvent(
                            'WeixinJSBridgeReady',
                            this.onBridgeReady(oid),
                        )
                        document.attachEvent(
                            'onWeixinJSBridgeReady',
                            this.onBridgeReady(oid),
                        )
                    }
                } else {
                    this.onBridgeReady(oid)
                }
            },
            onBridgeReady(oid) {
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    {
                        appId: this.appId, //公众号名称，由商户传入
                        timeStamp: this.timeStamp, //时间戳，自1970年以来的秒数
                        nonceStr: this.nonceStr, //随机串
                        package: this.package,
                        signType: 'MD5', //微信签名方式：
                        paySign: this.paySign, //微信签名
                        // fail:function () {
                        //     this.$my_message("微信支付失败::"+oid);
                        //     this.$FDPost('test1').then(res => {
                        //         this.$my_message("111111111111111111111111");
                        //     })
                        // },
                        // success:function () {
                        //     this.$my_message("微信支付成功::"+oid);
                        //     this.$FDPost('test1').then(res => {
                        //         this.$my_message("2222222222222222222222");
                        //     })
                        // }
                    },
                    function (res) {
                        // this.$FDPost('test1').then(res => {
                        //     this.$my_message("333333333333333333333");
                        // })
                        if (res.err_msg == 'get_brand_wcpay_request:ok') {
                            // this.$router.push('/vipzone')
                            this.$router.push('/')
                            // fadetip('支付成功')
                            // window.location.href = "../../pages/order.html"
                            //alert("zhifu chengg ")
                        } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                        // 如果支付失败，退回账户
                        // if(res.err_msg == 'get_brand_wcpay_request:fail'){
                        //     this.$FDPost('/bdPaymentFailure',{orderId: oid}).then(res=>{
                        //         if(res.status ===0){
                        //             this.$my_message('支付失败')
                        //         }else{
                        //             this.$my_message(res.msg)
                        //         }
                        //     })
                        // }
                    },
                    // function () {
                    //     this.$FDPost('test1').then(res => {
                    //         this.$my_message("44444444444444444444444444");
                    //     })
                    // },
                )
            },

        },


    }
</script>

<style lang="scss" scoped>


    .backgroundImg {
        margin-top: 4.5rem;

        width: 100%;
        height: rem(400);
        background-color: #05D6CC;

        .pay_top {
            line-height: 10rem;
            text-align: center;
            font-size: rem(56);
            color: #ffffff
        }

        .moneyVal {
            text-align: center;
            font-size: rem(28);
            color: #ffffff
        }
    }

    .title {
        padding: rem(30) rem(20);
        font-size: rem(28);

    }
    .addressSelect{
         padding: rem(30) rem(20);
         margin: 0 rem(20);
        font-size: rem(28);
        background: #ffffff;
        p{
            color: #999999;
            font-size: rem(24)
        }
      
        .address-right{
            float: right;     
            img{
                width: rem(20);
                margin-top: rem(20)
            }
        }
    }
    .span {
        font-size: rem(24);
        color: #888888;
    }

    .all {
        padding: rem(30) rem(20);
        /*width: 90%;*/
        background: rgba(255, 255, 255, 1);
        border-radius: 8px;
        margin: 0 rem(20);
        /*img{*/
        /*    width: rem(60);*/
        /*    height: rem(60);*/
        /*    border-radius: rem(30);*/
        /*}*/
        .cardList {
            height: rem(100);
            display: flex;
            justify-content: space-between;

            .youbao {

                img {
                    width: rem(30);
                    height: rem(30);
                    margin-right: rem(30);
                }

                .cardList-title {
                    color: #333333;
                    font-weight: bold;
                    font-size: rem(28);
                }

                .card-text {
                    font-size: rem(22);
                    color: #888888;
                    margin-left: rem(60);
                }
            }
        }

        .left {
            width: rem(100);

        }

        .solid {
            border-bottom: 1px solid #D9D9D9;
            margin-bottom: rem(30);
        }
    }


    .a-radio {
        display: none;
    }

    .b-radio {
        display: inline-block;
        border: 1px solid #ccc;


        width: rem(30);
        height: rem(30);
        border-radius: rem(15);
        background: url('./nosel.png') no-repeat;
        background-size: 100% 100%;
        vertical-align: middle;
        margin-right: rem(5);
        position: relative;
    }

    .b-radio:before {
        content: '';
        font-size: 0;
        width: rem(30);
        height: rem(30);
        border-radius: rem(15);
        /*background-color: #FFA313;*/
        background: url("./sel.png") no-repeat;
        background-size: 100% 100%;

        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: rem(-15);
        margin-top: rem(-15);

        display: none;
    }

    .a-radio:checked ~ .b-radio:before {
        display: block;
    }

    .footer {
        height: 4.5rem;
        line-height: 4.5rem;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background: #ffffff;

        .footer-context {
            justify-content: space-between;

        }

        .footer-left {
            font-size: rem(32);
            margin-left: rem(200);
        }

        .footer-right {
            float: right;

            font-size: rem(32);
            color: #ffffff;

            .button {
                text-align: center;
                width: rem(300);
                background-color: #05D6CC;
            }

        }
    ;

    }


    #friendNo::-webkit-input-placeholder {
        color: rgba(153, 153, 153, 1);
    }

    #friendNo::-moz-placeholder { //不知道为何火狐的placeholder的颜色是粉红色，怎么改都不行，希望有大牛路过帮忙指点
        color: rgba(153, 153, 153, 1);
    }

    #friendNo:-ms-input-placeholder { //由于我的IE刚好是IE9，支持不了placeholder，所以也测试不了(⊙﹏⊙)，有IE10以上的娃可以帮我试试
        color: rgba(153, 153, 153, 1);
    }

</style>



