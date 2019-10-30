/*
 * @Author: xuesong 
 * @Date: 2019-09-03 20:15:49 
 * @Last Modified by: xuesong
 * @Last Modified time: 2019-09-11 11:43:59
 */
<template>
  <div>
    <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
    <div class="top">
      <img :src="src" />
    </div>

    <div class="title-card">
      <p class="title-text">{{goodsName}}</p>
      <p class="title-detail">{{goodsNameTwo}}</p>
      <p class="title-price">
        {{goodsPrice}}
        <span class="unit">/人</span>
      </p>
    </div>
    <div class="description">
      <div class="description-title">
        人数(成人)
        <div class="right">
          <button class="sub" @click="subNumber">-</button>
          <input type="number" v-model="numberValue" />
          <button class="add" @click="addNumber">+</button>
        </div>
      </div>

      <div class="description-text">
        <label for="1">
          <input type="checkbox" name="payType" id="1" value="1" class="a-radio" v-model="picked" />
          <span class="b-radio"></span>
        </label>
        是否含2岁以下孩童
      </div>
    </div>

    <div class="description" v-if="picked ==1">
      <div class="right">
        <button class="sub" @click="subNumber1">-</button>
        <input type="number" v-model="childNumber" />
        <button class="add" @click="addNumber1">+</button>
      </div>
      <div style="font-size:4vw">携带孩童数量</div>
      <div style="color:#FF6565">每个孩童将加收50%的费用</div>
    </div>
    <div class="description">
      <p class="description-title">景点描述</p>
      <div class="description-text">{{description}}</div>
    </div>
    <!-- button -->
    <div class="footer">
      <div class="button1" @click="goService">联系客服</div>
      <div class="button2" @click="goOrderConfirm">立即预定</div>
    </div>

    <BaseModal
      :message="servicePhone"
      @e_cancel="closeService"
      @e_confirm="closeService"
      v-if="callPhone"
    ></BaseModal>
  </div>
</template>

<script>
import BaseNavbar from "@c/BaseNavbar/BaseNavbar";
 import BaseModal from '@c/BaseModal/BaseModal'
export default {
  data() {
    return {
      isLeft: true,
      title: "精品路线",
      src: "", // 商品logo
      goodsPrice: "", //价格
      goodsNameTwo: "", //第二行
      goodsName: "",
      description: "", //景点描述
      orderList: [], //传给订单页的所有值
      numberValue: 1, // 出行的人
      picked: "", // 孩童
      childNumber: 0,


      callPhone: false,// 
      servicePhone: "" ,// 客服联系电话号码
    };
  },
  methods: {
    // 
    goService(){
      this.callPhone = true
      this.service()
    },
    // 获取联系电话
    service() {
      this.$FDPost("app/sc/my/getCustomerPhone").then(res => {
        if (res.status === 0) {
          this.servicePhone = res.data;
        } else {
          this.$my_message(res.message);
        }
      });
    },

    // 关闭弹框
    closeService() {
      this.callPhone = false;
    },

    addNumber() {
      this.numberValue++;
    },
    addNumber1() {
      this.childNumber++;
    },
    subNumber1() {
      this.childNumber--;
      if (this.childNumber <= 0) {
        this.childNumber = 0;
      }
    },
    subNumber() {
      this.numberValue--;
      if (this.numberValue <= 0) {
        this.numberValue = 1;
      }
    },

    fetchShoppingDetail() {
      let params = {
        goodsId: this.$route.query.id
      };
      this.$FDPost("/travel/tourismGoodsDetail", params).then(res => {
        if (res.status === 0) {
          let d = res.data;
          this.orderList = res.data;
          this.src = d.goodsLogo;
          this.description = d.description;
          this.goodsPrice = d.goodsPrice;
          this.goodsNameTwo = d.goodsNameTwo;
          this.goodsName = d.goodsName;
        } else {
          this.$my_message(res.msg);
        }
      });
    },

    // 订单确认
    goOrderConfirm() {
      this.$router.push({ path: "/travelOrder", query: this.orderList });

      localStorage.setItem("adultsNumber", this.numberValue);
      localStorage.setItem("childrenNumber", this.childNumber);
    }
  },
  mounted() {
    this.fetchShoppingDetail();
  },
  components: {
    BaseNavbar,
    BaseModal,
  }
};
</script>

<style lang="scss" scoped>
.container {
  background: transparent;
}

.top {
  img {
    height: 60vw;
  }
  //   position: relative;
}
.title-card {
  // position: absolute;
  // left: 0;
  // top: 10%;

  background-color: #ffffff;
  padding: rem(20) rem(20);
  margin: rem(20);
  border-radius: rem(8);

  .title-text {
    font-size: rem(36);
    color: #20272e;
  }
  .title-detail {
    font-size: rem(28);
    color: #999999;
    margin: rem(10) 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .title-price {
    font-size: rem(36);
    color: #ff4f01;
    font-weight: bold;
  }
  .unit {
    font-size: rem(24);
    color: #999999;
  }
}
.description {
  background-color: #ffffff;
  padding: rem(20) rem(20);
  margin: rem(20);
  border-radius: rem(8);
  .description-title {
    font-size: rem(32);
    font-weight: bold;
  }
  .description-text {
    font-size: rem(24);
    margin-top: rem(30);
    .a-radio {
      display: none;
    }

    .b-radio {
      display: inline-block;
      border: 1px solid #ccc;
      width: rem(30);
      height: rem(30);
      border-radius: rem(15);
      background: url("./nosel.png") no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
      margin-right: rem(5);
      position: relative;
    }

    .b-radio:before {
      content: "";
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
  }
}
.footer {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  position: fixed;
  left: 0;
  top: 90%;
  .button1 {
    font-size: 5vw;
    text-align: center;
    line-height: rem(100);
    height: rem(100);
    width: rem(300);
    background: #ffffff;
    border-radius: rem(50);
    -moz-box-shadow: 1px 1px 2px #c7d4e1;
    -webkit-box-shadow: 1px 1px 2px #c7d4e1;
    box-shadow: 1px 1px 2px #c7d4e1;
  }
  .button2 {
    font-size: 5vw;
    text-align: center;
    line-height: rem(100);
    height: rem(100);
    width: rem(300);
    background-color: #05d6cc;
    color: #ffffff;
    border-radius: rem(50);
    -moz-box-shadow: 1px 1px 2px #c7d4e1;
    -webkit-box-shadow: 1px 1px 2px #c7d4e1;
    box-shadow: 1px 1px 2px #c7d4e1;
  }
}

.right {
  // display:inline-block;
  // vertical-align: super;
  float: right;
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