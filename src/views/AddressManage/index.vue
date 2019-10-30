<template>
  <div>
    <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
    <div class="top"></div>
    <div class="addressManage" v-for="(item,index) in addressList" :key="index" @click="selectItem(item)">
      <div class="ordermenu_top">
        <p class="top_left">{{item.addressee}}</p>
        <p class="top_left">{{item.phone}}</p>
      </div>
      <div class="addressManage-right" @click="changeAddress(item)">
        <img src="./edit.png" alt="">
      </div>
      <div class="menuTitle">{{item.address}}{{item.detailed}}</div>
      <div v-if="item.isDefault ==1">默认地址</div>
    </div>
    <div class="add" @click="addAddress">+添加</div>
  </div>
</template>

<script>
// import card from '@c/BaseCard/index'
import BaseNavbar from "@c/BaseNavbar/BaseNavbar";

export default {
  name: "index",
  data() {
    return {
      title: "地址管理",
      addressList: [],
      isLeft: true,
      isShowAddress: false,
    
    };
  },
  mounted() {
    this.fetchAddress();
    
  },
  components: {
    BaseNavbar,
    
    // card
  },
  methods: {



    // 选中
    selectItem(data){


      localStorage.setItem('addressId',data.id)
      localStorage.setItem('addressDetail',data.address)
      this.$router.go(-1)
    },
    // 点击后编辑还是删除
    changeAddress(data){
      this.$router.push({path:'/addAddress',query:data})
    },

    // 获取所有地址
    fetchAddress() {


     
      let params = {
        userId: sessionStorage.getItem("userId")
      };
      this.$FDPost("app/sc/address/addressAll", params).then(res => {
        if (res.status === 0) {
          console.log("获取所游的地址", res);
          this.addressList = res.data;

          let a =res.data.filter(el=> {return el.isDefault ==1})
        } else {
          this.$my_message(res.msg);
        }
      });

    
    },
    // go添加地址页面
    addAddress() {
      this.$router.push("/addAddress");
    }
  }
};
</script>
<style lang="scss" scoped>
.top {
  height: rem(100);
}
.addressManage {
  padding: rem(30) rem(20);
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  margin: rem(20) rem(20);
  /*margin-top: rem(100);*/
.addressManage-right{
  float: right;
  margin: auto 0;
  width:2rem;
  height: 2rem;
}
  .ordermenu_top {
    display: flex;

    .top_left {
      font-size: rem(32);
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }

    .top_right {
      font-size: rem(32);
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      
    }
  }
  .menuTitle {
    font-size: rem(26);
    color: #999999;
    margin: rem(20) 0;
  }
  
  .menuValue {
    font-size: rem(32);
    color: #666666;
    margin: rem(20) 0;
  }

  .solid {
    margin-top: rem(30);
    border-bottom: 1px solid #f2f2f2;
  }
}


 

.add {
  // width: 10rem;
  // height: 4.5rem;
  // line-height: 4.5rem;
  // background-color: #05D6CC;
  // font-size: rem(32);
  // color: #ffffff;
  // margin: 0 auto;
  // text-align: center;
  // border-radius: rem(8);

  font-size: 5vw;
  text-align: center;
  line-height: rem(100);
  height: rem(100);
  width: rem(300);
  margin: 0 auto;
  background-color: #05d6cc;
  color: #ffffff;
  border-radius: rem(50);
  -moz-box-shadow: 1px 1px 2px #c7d4e1;
  -webkit-box-shadow: 1px 1px 2px #c7d4e1;
  box-shadow: 1px 1px 2px #c7d4e1;
}
</style>