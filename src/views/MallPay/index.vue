/*
 * @Author: xuesong 
 * @Date: 2019-09-09 16:01:51 
 * @Last Modified by: xuesong
 * @Last Modified time: 2019-09-12 20:35:47
 */
<template>
  <div>
    <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
    <div class="backgroundImg">
      <div class="pay_top">订单总额</div>
      <div class="moneyVal">￥{{productPrice}}</div>
    </div>

    <div class="title">选择地址</div>
    <div class="addressSelect" @click="goProductAddress">
      <span class="address-right">
        <img src="./select-right.png" alt />
      </span>
      <p class="default">地址</p>

      <span class="address-left">{{addressDetails}}</span>
    </div>
    <div class="shopping">
      <div>
        <img :src="list.goodsLogo" alt />
      </div>
      <div class="shopping-detail">
        <p class="shopping-name">{{list.goodsName}}</p>
        <p class="shopping-price" v-if="list.marketRetailPrice">商品总价：{{list.marketRetailPrice}}</p>
        <p class="shopping-price" v-if="list.platformRetailPrice">现金金额：{{list.platformRetailPrice}}</p>
        <p class="shopping-price" v-if="list.youbao">游宝：{{list.youbao}}</p>
        <p class="shopping-price" v-if="list.coupons">购物券：{{list.coupons}}</p>
      </div>
      <div class="right">
        <button class="sub" @click="subNumber">-</button>
        <input type="number" v-model="number" />
        <button class="add" @click="addNumber">+</button>
      </div>
    </div>
    <div class="footer">
      <span class="footer-context">
        <span class="footer-left">
          合计:
          <span>{{productPrice}}</span>
        </span>
        <span class="footer-right">
          <div class="button" @click="confirmPay">去支付</div>
        </span>
      </span>
    </div>

    <!--交易密码-->
    <BaseInputModal
      :isOpenPwdModal="passwordModal"
      v-on:closePwdBox="closeModal"
      v-on:econfirm="econfirmModal"
    />
  </div>
</template>

<script>
import BaseNavbar from "@c/BaseNavbar/BaseNavbar";
import { multiply } from "@u/asmd.js";
import BaseInputModal from "@c/BaseInputModal/BaseInputModal";

export default {
  name: "index",
  data() {
    return {
      modalFlag3: false,

      title: "订单确认",
      isLeft: true,
      list: [],
      addressDetails: "", // 地址详情数据
      number: 1, // 个数
      passwordModal: false, // 密码框开关
      addressId: '',// 地址id

      // 微信支付参数
      appId: "",
      timeStamp: "",
      nonceStr: "",
      package: "",
      signType: "",
      paySign: ""
    };
  },
  components: {
    BaseNavbar,
    BaseInputModal
  },
  mounted() {
    //  this.activated();
    this.fetchDetail();
    // this.fetchAddress()

    if(localStorage.getItem('addressId')){
      this.addressId = localStorage.getItem('addressId')
      this.addressDetails = localStorage.getItem('addressDetail')
      console.log('传过来的地址：',this.addressDetails,this.addressId)
    }

    
  },
  computed: {
    productPrice: function() {
      let a = parseInt(this.list.marketRetailPrice);
      return multiply(a, this.number);
    }
  },

  methods: {
    // 获取地址
    // fetchAddress() {
    //   let params = {
    //     userId: sessionStorage.getItem("userId")
    //   };
    //   this.$FDPost("app/sc/address/addressAll", params).then(res => {
    //     if (res.status === 0) {
          
          
    //       let b = []   
         
    //       let a = res.data.filter(el=> {return el.isDefault ==1})
    //       a.forEach(el=>{
    //         let obj ={} 
    //         obj.address = el.address
    //         obj.id = el.id
    //         b.push(obj)
    //       })
    //       b.forEach(el=>{
    //         this.addressId = el.id;
    //         this.addressDetails = el.address
    //       })
        

    //       console.log("获取所游的地址", this.addressDetails, );
    //       console.log("获取所游的地址id", this.addressId );

    //     } else {
    //       this.$my_message(res.message);
    //     }
    //   });

    
    // },
    // 确定下单
    econfirmModal(pwd) {
      let params = {
        userId: sessionStorage.getItem("userId"),
        goodsId: this.$route.query.goodsSkuId,
        addressId: this.addressId,
        buyNum: this.number,
        password: pwd
      };
      console.log("支付的参数：", params);
      this.$FDPost("/createShopOrder", params).then(res => {
        if (res.status === 0) {
          this.passwordModal = false;
          this.wechatPay(res.data);

        } else {
          this.$my_message(res.msg);
        }
      });
    },
    // 关闭密码框
    closeModal() {
      this.passwordModal = false;
    },

    // 增加和减去数量
    subNumber() {
      this.number--;
      if (this.number <= 0) {
        this.number = 1;
      }
    },
    addNumber() {
      this.number++;
      if (this.number <= 0) {
        this.number = 1;
      }
    },
    // 获取商品详情
    fetchDetail() {
      let goodsSkuId = this.$route.query.goodsSkuId;
      this.$FDPost("/app/sc/details/goodsDynamicDeal/" + goodsSkuId).then(
        re => {
          if (re.status === 0) {
            this.list = re.data[0];

            console.log("zhifu xuyao de shuju :", re);
          } else {
            this.$my_message(re.msg);
          }
        }
      );
    },

    // 跳到 地址管理页面
    goProductAddress() {
      this.$router.push('/addressManage')
    },
    // 去支付
    confirmPay() {
      this.passwordModal = true;
    },
    /**
     * @Description 根据订单号 从后台换取微信支付所需参数  微信外部 H5支付
     * @author Anonymous
     * @date 2019/5/17
     */
    async wechatPay(oid) {
      console.log("微信支付");
      console.log("下单开始 oId:", oid);
      let paydata = {
        orderId: oid,
        userId: sessionStorage.getItem("userId")
      };
      this.$FDPost("shop/unifiedOrder", paydata).then(pay => {
        if (pay.status == 0) {
          if (pay.data.mwebUrl) {
            window.location.replace(
              pay.data.mwebUrl +
                "&redirect_url=https%3A%2F%2Fayyht.ayy360.com%2Fapi%2FmainMall" // 此处需要重新编码的地址返回指定的页面
            );
            return;
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
      });
    },
    /**
     * @Description 进行支付
     * @author Anonymous
     * @date 2019/5/17
     */
    callpay(oid) {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            this.onBridgeReady(oid),
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", this.onBridgeReady(oid));
          document.attachEvent(
            "onWeixinJSBridgeReady",
            this.onBridgeReady(oid)
          );
        }
      } else {
        this.onBridgeReady(oid);
      }
    },
    onBridgeReady(oid) {
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: this.appId, //公众号名称，由商户传入
          timeStamp: this.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: this.nonceStr, //随机串
          package: this.package,
          signType: "MD5", //微信签名方式：
          paySign: this.paySign //微信签名
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
        function(res) {
          // this.$FDPost('test1').then(res => {
          //     this.$my_message("333333333333333333333");
          // })
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // this.$router.push('/vipzone')
            this.$router.push("/");
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
        }
        // function () {
        //     this.$FDPost('test1').then(res => {
        //         this.$my_message("44444444444444444444444444");
        //     })
        // },
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.backgroundImg {
  margin-top: 4.5rem;

  width: 100%;
  height: rem(400);
  background-color: #05d6cc;

  .pay_top {
    line-height: 10rem;
    text-align: center;
    font-size: rem(56);
    color: #ffffff;
  }

  .moneyVal {
    text-align: center;
    font-size: rem(28);
    color: #ffffff;
  }
}

.title {
  padding: rem(30) rem(20);
  font-size: rem(28);
}
.addressSelect {
  padding: rem(30) rem(20);
  margin: 0 rem(20);
  font-size: rem(28);
  background: #ffffff;
  img {
    width: 24vw;
  }
  p {
    color: #999999;
    font-size: rem(24);
  }

  .address-right {
    float: right;
    img {
      width: rem(20);
      margin-top: rem(20);
    }
  }
}
.span {
  font-size: rem(24);
  color: #888888;
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
      background-color: #05d6cc;
    }
  }
}

.shopping {
  padding: 1.5rem 1rem;
  margin: 1rem 1rem;
  font-size: 1.4rem;
  background: #ffffff;
  border-radius: rem(8);
  display: flex;
  justify-content: space-between;

  img {
    width: 24vw;
  }
  .shopping-detail {
    margin-right: 17vw;
  }
  .shopping-name {
    font-size: rem(32);
    width: 26vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;//省略号
  }
  .shopping-price {
    font-size: rem(28);
    color: #ff590a;
  }
}
.right {
  // display:inline-block;
  // vertical-align: super;
  float: right;
  margin-top: 25vw;
}
/*清除input默认样式*/
input {
  outline: none; /*去掉谷歌自带的点就input框出现的边框情况*/
  /*-webkit-appearance:button;  是元素标签看起来像个按钮，意思是定义了按钮样式*/
  -webkit-appearance: none; /*去掉按钮样式*/
  border-radius: 0;
}
.right button,
.right input {
  background-color: #fff;
  border: 1px solid #999;
  font-size: rem(28);
  text-align: center;
  vertical-align: middle;
  -webkit-appearance: none; /*解决iphone safari上的圆角问题*/
  border-radius: 0;
}
.right button {
  width: rem(30);
  height: rem(30);
  line-height: rem(20);
  color: #666;
}
.right input {
  width: rem(35);
  height: rem(30);
  line-height: rem(20);
  color: #000;
}
</style>



