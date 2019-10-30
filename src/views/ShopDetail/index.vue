<template>
  <div class="top">
    <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
    <Swiper :list="sdetail.goodsImgList" :config="sconfig" height="55vw"></Swiper>
    <div class="tbox" v-if="sdetail.businessName!==undefined">
      <h1>{{sdetail.businessName}}</h1>
      <h2>{{sdetail.goodsName}}</h2>
      <dl>
        <dt>¥{{sdetail.marketRetailPrice}}<span> 商品总价</span></dt>
        <dd>已销售：{{sdetail.salesVolume}}</dd>
      </dl>
      <dl>
        <dt>¥{{sdetail.platformRetailPrice}}<span> 现金金额</span></dt>
      </dl>
      <dl v-if="sdetail.youbao">
        <dt>¥{{sdetail.youbao}}<span> 红包价格</span></dt>
      </dl>
      <dl v-if="sdetail.coupons">
        <dt>¥{{sdetail.coupons}}<span> 购物券价格</span></dt>
      </dl>
    </div>
    <div class="fbox" v-if="sdetail.businessName!==undefined">
      <h1>商品详情</h1>
      <p>类型
        <span v-if="sdetail.type ===0">VIP区商品</span>
        <span v-if="sdetail.type ===1">轻奢品</span>
        <span v-if="sdetail.type===2">奥特莱斯特区商品</span>
      </p>
      <p>总库存 <span>{{sdetail.stock}}</span></p>
      <p>剩余库存 <span>{{sdetail.surplusStock}}</span></p>
      <p>是否预售 <span v-if="sdetail.isItPreSale">是</span> <span v-else>否</span></p>
      <p>QQ号码 <span>{{sdetail.qqNumber}}</span></p>
      <!--<p @click='showPic(sdetail.wxCode)'>微信二维码 <spen>点击看大图<img :src="sdetail.wxCode"/></spen></p>-->
      <p @click='showPic(sdetail.goodsLogo)'>微信二维码 <img :src="sdetail.goodsLogo"/></p> <!--demo行-->
      <p>备注 <span>{{sdetail.remark }}</span></p>
    </div>
    <div class="btmbtn" v-if="sdetail.businessName!==undefined" @click="goPay">立即购买</div>
  </div>
</template>

<script>
  import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
  import Swiper from '@c/Swiper/Swiper';
  export default {
    name: "shopdetail",
    data() {
      return {
        title: '商品详情',
        isLeft: true,
        sdetail:{
          // businessName: "国利超",
          // freeShipping: 0,
          // goodsImgList: Array(4),
          // goodsLogo: "https://yuncanting123.oss-cn-qingdao.aliyuncs.com/YsWF4F_金爵.jpg",
          // goodsName: "金爵XO",
          // goodsSkuId: "2c9f27876aca9e96016ade098ea1019e",
          // isAddSpecification: 0,
          // isItPreSale: 0,
          // marketRetailPrice: 1300,
          // platformRetailPrice: 398,
          // postage: 0,
          // qqNumber: "123456789",
          // remark: "",
          // restaurantExpensesCount: 398,
          // salesVolume: 27,
          // shoppingMallConsumptionGoldRetailPrice: 398,
          // stock: 9680,
          // surplusStock: 686,
          // type: 0,
          // wxCode: "beijing.aliyuncs.com/banner/1rlv7gmps7.jpeg"
        },
        sconfig:{
          autoplay: 5000,
          // loop: true,
          observer: true,
          observeParents: true,
          autoplayDisableOnInteraction: false,
          paginationType : 'fraction',
        }
      }
    },
    components: {
      BaseNavbar,Swiper
    },
    mounted() {
      this.getData()
      console.log(this.sdetail.businessName)
    },
    methods: {
      /**
       * @Description
       * @author 冯潇
       * @date 2019/8/30
       */
      // 获取商城banner
      getData() {
        
        let goodsSkuId = this.$route.query.goodsSkuId;
        this.$FDPost('/app/sc/details/goodsDynamicDeal/'+goodsSkuId).then(re => {
          if (re.status === 0) {
            
            this.sdetail = re.data[0]
          
            console.log('shangpin xiangqing :',re)
          } else {

            this.$my_message(re.msg);
          }
        });
      },
      /**
       * @Description
       * @author 冯潇
       * @date 2019/8/30
       */
      // 展示图片
      showPic(v) {
        localStorage.setItem('mpic',v);
        this.$store.dispatch('SetRedeemData', {mask:2});
      },
      // 去支付页面
      goPay(){
        let id = this.sdetail.goodsSkuId
        this.$router.push({path:'/mallPay',query:{goodsSkuId:id}})
      },

    },


  }
</script>

<style lang="scss" scoped>
  .top {padding-top: 4.5rem;min-height:calc(100vh - 4.5rem);
    .tbox{background:white;padding:3vw;
      h1{color:#010101;font-size:4vw;line-height:4vw}
      h2{color:#999999;font-size:3vw;line-height:3vw;padding-top:3vw;}
      dl{display: flex;justify-content: space-between;align-items: center;line-height:5vw;padding-top:3vw;
        dt{color:#FD6906;font-size:5vw;
          span{font-size:2vw;color:#333}
        }
        dd{font-size:3vw;color:#999}
      }
    }
    .fbox{margin-top:1vw;padding:3vw;background:white;margin-bottom:13vw;
      h1{line-height:4vw;font-size:4vw;color:#333333;padding-bottom:3vw}
      p{line-height:12vw;font-size:4vw;padding-left:3vw;border:1px solid #f2f2f2;margin-bottom:-1px;color:#999;position:relative;
        span{float:right;width:70vw;color:#333;line-height:4vw;padding:4vw 0;}
        img{width:auto;height:10vw;position:absolute;left:24vw;top:1vw}
      }
    }
    .btmbtn{position:fixed;bottom:-1vw;left:0;right:0;height:13vw;padding-bottom:1vw;background:#09D1D4;
      border-radius:1vw;box-shadow:0 1vw 1vw 0 rgba(0, 0, 0, 0.14);
      line-height:13vw;color:white;font-size:5vw;text-align:center}
  }
</style>