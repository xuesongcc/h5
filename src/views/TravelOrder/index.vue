/*
* @Author: xuesong
* @Date: 2019-09-04 10:18:18
 * @Last Modified by: 
 * @Last Modified time: 2019-10-30 19:24:24
*/
<template>
  <div class="wrap">
    <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
    <div class="top">
      <img :src="list.goodsLogo" alt />

      <div class="top-text">
        <p class="top-title">{{list.goodsName}}</p>
        <p>
          <span class="time">总耗时:9天</span>
          <span class="price">{{list.goodsPrice}}</span>
          <span class="unit">/人</span>
        </p>
      </div>
    </div>

    <div class="title">
      <p class="description-title" @click="linePopup">
        路线：
        <input type="text" v-model="selectLine" :readonly="selectLine" />
        <span class="right">
          <img src="./right.png" alt />
        </span>
      </p>
    </div>
    <div class="title">
      <p class="one">出行人数</p>
      <div class="solid"></div>
      <p class="description-title">
        人数(成人)
        <span class="fr">{{adultsNumber}}</span>
      </p>
      <p class="description-title">
        携带儿童数量
        <span class="fr">{{childrenNumber}}</span>
      </p>
      <p style="color:#FF6565">每个孩童将加收50%的费用</p>
    </div>
    <div class="title">
      <p class="description-title" @click="startDatePopup">
        出发日期：
        <input type="text" v-model="selectStartTime" :readonly="selectStartTime" />
        <span class="right">
          <img src="./right.png" alt />
        </span>
      </p>
    </div>

    <div class="title">
      <p class="description-title" @click="startCityPopup">
        出发城市：
        <input type="text" v-model="selectCity" :readonly="selectCity" />
        <span class="right">
          <img src="./right.png" alt />
        </span>
      </p>
    </div>
    <div class="title">
      <p class="one">出行联系人</p>
      <div class="solid"></div>
      <p class="description-title">
        姓名：
        <input type="text" v-model="contactName" />
      </p>
      <p class="description-title">
        联系电话：
        <input
          v-model="contactPhone"
          type="number"
          oninput="if(value.length>11)value=value.slice(0,11)"
          onkeyup="value=value.replace(/\D/g,'')"
        />
      </p>
    </div>
    <div class="becareful">
      注意:
      该路线为境外线路，清提前确认好出行旅客的护照是否过期；
      部分境外游国家需提前办理签证，无法进行落地签，请及时
      咨询客服了解；
      境外游需添加乘客信息为护照信息，婴幼儿请提供有效的出
      生证明，并在确认订单前勾选“是否含2岁以下儿童”的选项！
    </div>

    <div class="title">
      <div class="description-title">
        出行旅客
        <span class="luxian"></span>
        <span class="fr luxian" @click="popup">添加出行人+</span>
        <div class="content-list" v-for="(item,index) in addShowList" :key="index">
          <div v-if="addShowList.lenght!=0">
            <p>{{item.contactName}}</p>
            <p>{{item.contactPhone}}</p>
            <p v-if="item.identityType === 0">身份证</p>
            <p v-if="item.identityType === 1">护照</p>
            <p v-if="item.identityType === 2">出生证</p>
            <p>{{item.certificateNumber}}</p>
          </div>
          <div @click="delectTravel(index,item)" class="content-close">
            <img src="./close.png" alt />
            <!-- <div class="content-close">x</div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <span class="footer-context">
        <span class="footer-left">
          合计:
          <span>{{totalPrice}}</span>
        </span>
        <span class="footer-right">
          <div class="button" @click="confirmPay">去支付</div>
        </span>
      </span>
    </div>
    <!-- 路线 -->
    <mt-popup v-model="lineVisible" position="bottom">
      <div
        class="text"
        v-for="(item,index) in lineList"
        :key="index"
        @click="selectLineFun(item.cityName)"
      >
        <h1>{{item.cityName}}---{{item.day}}天</h1>
      </div>
    </mt-popup>
    <!-- 出发日期 -->
    <mt-popup v-model="startDateVisible" position="bottom">
      <div
        class="text"
        v-for="(item,index) in dateList"
        :key="index"
        @click="selectStartTimeFun(item.time)"
      >
        <h1>{{item.time}}</h1>
      </div>
      <!-- <p >身份证</p>
            <p >护照</p>
      <p >出生证</p>-->
    </mt-popup>
    <!-- 出发城市 -->
    <mt-popup v-model="startCityVisible" position="bottom">
      <div
        class="text"
        v-for="(item,index) in cityList"
        :key="index"
        @click="selectCityFun(item.city)"
      >
        <h1 style="font-size:5vw">{{item.city}}</h1>
      </div>
    </mt-popup>
    <!-- 添加出行人 -->
    <mt-popup v-model="popupVisible" position="bottom">
      <div class="pop-title">
        添加出行人
        <span class="cancle" @click="cancle">取消</span>
      </div>
      <div
        class="pop-list"
        v-for="(item,index) in travelerList"
        :key="index"
        @click="pushContact(item)"
      >
        <div>
          <p>{{item.contactName}}</p>
          <p>{{item.contactPhone}}</p>
          <p v-if="item.identityType === 0">身份证</p>
          <p v-if="item.identityType === 1">护照</p>
          <p v-if="item.identityType === 2">出生证</p>
          <p>{{item.certificateNumber}}</p>
        </div>
        <!-- <div @click="delectTravel(item.id)">
                    <img src="./close.png" alt="">
        </div>-->
      </div>
      <div class="pop-button" @click="addContact">新增出行人</div>
    </mt-popup>
  </div>
</template>

<script>
import BaseNavbar from "@c/BaseNavbar/BaseNavbar";

export default {
  data() {
    return {
      isLeft: true,
      title: "订单确认",
      list: this.$route.query,
      totalPrice: "", // 合计总价
      adultsNumber: 1, // 成人数
      childrenNumber: 0, // 孩童数

      contactName: "", // 联系人
      contactPhone: "", // 联系人电话

      popupVisible: false, //添加出行人
      travelerList: [], //所有出行人

      addShowList: [], //添加后的所有出行人

      // popup所有变量
      lineVisible: false, // 路线
      startDateVisible: false, // 出发日期
      startCityVisible: false, // 出发城市
      lineList: [], // 路线
      dateList: [], //出发日期数组
      cityList: [], // 出发城市
      selectLine: "", // 选中的路线
      selectStartTime: "", // 选中的时间
      selectCity: "", // 选中的城市
      cc: []
    };
  },
  components: {
    BaseNavbar
  },
  computed: {},
  mounted() {
    console.log(this.addShowList);
    if (localStorage.getItem("adultsNumber")) {
      this.adultsNumber = localStorage.getItem("adultsNumber");
      this.childrenNumber = localStorage.getItem("childrenNumber");
    }

    this.countPrice();
  },
  methods: {
    // 去支付
    confirmPay() {
      //   // 路线
      //   if(this.selectLine ==''){
      //     this.$my_message('请确认路线')
      //     return

      //   }
      //   // 出发日期
      //   if(this.selectStartTime ==''){
      //     this.$my_message('请确认出发日期')
      //     return

      //   }
      //   // 出发城市
      //   if(this.selectCity ==''){
      //     this.$my_message('请确认出发城市')
      //     return
      //   }

      //   // 联系人
      //  if(this.contactName ==''){
      //     this.$my_message('请确认联系人')
      //     return
      //   }

      //   // 联系人电话
      //   if(this.contactPhone ==''){
      //     this.$my_message('请确认联系人电话')
      //     return

      //   }

      // this.payPasswordShow = true
      let ids = []
      this.addShowList.forEach(el=>{
          ids.push(el.id)
      })
     
      let params = {
        payMoney: this.totalPrice,
        // userId(必传)
        userId: sessionStorage.getItem("userId"),
        goodsId: this.list.id,
        adultsNumber: this.adultsNumber,
        childrenNumber: this.childrenNumber,
        contacts: this.contactName,
        contactPhone: this.contactPhone,
        ids: ids,
        startCity: this.selectCity, 
        startTime: this.selectStartTime
      };
      console.log('params:',params)
      this.$router.push({ path: "/travelPay", query: params });
    },

    // 合计
    countPrice() {
      let params = {
        goodsId: this.$route.query.id,
        adultsNumber: this.adultsNumber,
        childrenNumber: this.childrenNumber
      };
      this.$FDPost("calculateTotal", params).then(res => {
        if (res.status === 0) {
          this.totalPrice = res.data.totalPrice;
        } else {
          this.$my_message(res.msg);
        }
      });
    },

    // 检验添加的出行人是否合格
    checkTraveler() {
      let params = {
        ids: "",
        peopleId: "",
        adultsNumber: this.adultsNumber,
        childrenNumber: this.childrenNumber
      };
      this.$FDPost("checkTravelPeople", params).then(res => {
        if (res.status === 0) {
          this.$my_message(res.msg);
        } else {
          this.$my_message(res.msg);
        }
      });
    },

    // 路线
    linePopup() {
      this.lineVisible = !this.lineVisible;
      this.lineList = JSON.parse(this.list.lineCity);
    },
    // 出发日期
    startDatePopup() {
      this.startDateVisible = !this.startDateVisible;
      this.dateList = JSON.parse(this.list.startTime);
    },
    // 出发城市
    startCityPopup() {
      this.startCityVisible = !this.startCityVisible;
      this.cityList = JSON.parse(this.list.startCity);
    },
    // 删除出行人
    delectTravel(index,data) {
      // 此处是传入的索引值
      console.log('key:',index)
      let a = this.addShowList.splice(index,1);
      console.log('data:',data)
      
      let params = {
        id: data.id,
        userId: sessionStorage.getItem("userId")
      };
      this.$FDPost("/app/sc/travel/deleteTravelPeople", params).then(res => {
        if (res.status === 0) {
          this.$my_message("已删除");
          this.fetchAllTraveler();
        } else {
          this.$my_message(res.msg);
        }
      });
    },
    // 添加出行人
    popup() {
      this.popupVisible = true;
      this.fetchAllTraveler();
    },
    popup1() {
      this.popupVisible = true;
    },
    closePop() {
      this.popupVisible = false;
    },
    addContact() {
      this.popupVisible = false;
      this.$router.push("/addContact");
    },
    cancle() {
      this.popupVisible = false;
    },
    //  选择的路线
    selectLineFun(data) {
      this.selectLine = data;
      this.lineVisible = false;
    },
    //  选择的时间
    selectStartTimeFun(data) {
      this.selectStartTime = data;
      this.startDateVisible = false;
    },
    //  选择的时间
    selectCityFun(data) {
      this.selectCity = data;
      this.startCityVisible = false;
    },
    /**
     * @author 李雪松
     * @Description: 校验数组是否有重复数据
     */
    isRepeat(arr) {
      if (!arr || arr.length < 1) {
        return false;
      }
      var hash = {};
      for (var i in arr) {
        if (hash[arr[i].id]) {
          return true;
        }
        hash[arr[i].id] = arr[i].id;
      }
      return false;
    },

    // push 到添加出行人列表中
    pushContact(data) {
      this.cc.push(data);
      if (!this.isRepeat(this.cc)) {
        console.log("无重复");
        this.addShowList.push(data);
      } else {
        console.log("重复了");
        this.$my_message('出行人已添加')
      }
      console.log("添加后的数组", this.addShowList);
      this.popupVisible = false;
    },
    // 查询所有出行人
    fetchAllTraveler() {
      let params = {
        userId: sessionStorage.getItem("userId"),
        isActive: 0
      };
      this.$FDPost("/app/sc/travel/travelPeopleIsAll", params).then(res => {
        if (res.status === 0) {
          this.travelerList = res.data;
        } else {
          this.$my_message(res.msg);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  // overflow: hidden;   //自动滚动
//   height: 100%;
  padding-bottom: rem(100);
}

.top {
  margin-top: 4.5rem;
  background-color: #ffffff;
  height: 10rem;

  display: flex;

  img {
    padding: 1rem;
    width: rem(200);
  }

  .top-text {
  }

  .top-title {
    padding-top: rem(20);
    padding-bottom: rem(40);
    font-size: rem(28);
    color: #424e63;
    width: rem(200);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .price {
    color: #ff590a;
    font-size: rem(46);
    margin-left: rem(200);
  }

  .time {
    font-size: rem(24);
    color: #999999;
  }

  .unit {
    font-size: rem(24);
    color: #999999;
  }
}

.title {
  background-color: #ffffff;
  padding: rem(20) rem(20);
  margin: rem(20);
  border-radius: rem(8);

  .description-title {
    font-size: rem(28);
    color: #999999;
    margin: rem(20) 0;

    .luxian {
      color: #05d6cc;
    }
    .content-list {
      margin: 1rem 0;
      display: flex;
      justify-content: space-between;
      // .conetnt-close{
      //     text-align: center;
      // }
      .content-close {
        margin: auto 0;
        img {
          width: rem(30);
          height: rem(30);
        }
      }
    }
    .right {
      float: right;

      img {
        width: rem(20);
      }
    }
  }

  .one {
    font-size: rem(28);
    color: #424e63;
  }

  .solid {
    border-bottom: rem(1) solid #f2f2f2;
  }

  input {
    font-size: rem(28);
  }
}

.becareful {
  padding: rem(20) rem(20);
  margin: rem(20);
  line-height: rem(30);
  font-size: rem(24);
  color: #999999;
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

.pop-title {
  text-align: center;
  font-size: rem(32);
  color: #424e63;
  margin-top: rem(30);
}

.pop-list {
  font-size: rem(28);
  font-weight: bold;
  // margin-bottom: rem(50);
  // margin-left: rem(20);
  margin: rem(20) rem(20);
  display: flex;
  justify-content: space-between;
}

.pop-button {
  font-size: rem(32);
  color: #fff;
  line-height: rem(70);
  height: rem(70);
  width: rem(500);
  margin: 0 auto;
  text-align: center;
  border-radius: rem(8);
  margin-bottom: rem(20);
  background-color: #05d6cc;
}

.cancle {
  float: right;
  margin-right: rem(10);
  font-size: rem(28);
  color: #999999;
}

.text {
  margin: rem(20) 0;
  text-align: center;
  font-size: rem(32);
}

.text:hover {
  color: #05d6cc;
}

.lk_listarea {
  width: 100%;
  height: rem(40);
  background-color: white;
  margin-top: rem(24);
}
</style>