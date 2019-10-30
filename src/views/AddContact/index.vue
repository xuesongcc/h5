/*
 * @Author: xuesong 
 * @Date: 2019-09-04 21:42:33 
 * @Last Modified by: xuesong
 * @Last Modified time: 2019-09-12 20:22:59
 */
<template>
  <div class="all">
    <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
    <div class="form">
      <p>
        联系人姓名：
        <input type="text" v-model="form.contactName" onkeyup="value=value.replace(/[^a-zA-Z\u4e00-\u9fa5]+/g,'')"/>
      </p>
      <div class="solid"></div>
      <p>
        联系电话：
        <input
          v-model="form.contactPhone"
          type="number"
          oninput="if(value.length>11)value=value.slice(0,11)"
          onkeyup="value=value.replace(/\D/g,'')"
        />
      </p>
      <div class="solid"></div>

      <p @click="openPicker">
        生日：
        <input type="text" v-model="form.birthday" :readonly="form.birthday" />
        <img src="./right.png" alt />
      </p>
      <div class="solid"></div>

      <p @click="ID">
        证件类型：
        <input
          type="text"
          v-model="selectLabel"
          id="form.identityType"
          :readonly="form.identityType"

        />
        <img src="./right.png" alt />
      </p>
      <div class="solid"></div>

      <p>
        证件号码
        <input type="text" v-model="form.certificateNumber"/>
      </p>
      <div class="solid"></div>
    </div>
    <div class="button" @click="save">保存</div>

    <!-- 身份类型弹框 -->
    <mt-popup v-model="popupVisible" position="bottom">
      <div
        class="text"
        v-for="(item,index) in IDTypes"
        :key="index"
        @click="selectID(item)"
      >{{item.label}}</div>
    </mt-popup>
    <!-- 生日弹框 -->

    <mt-datetime-picker
      v-model="dateVisible"
      :startDate="startDate"
      :endDate="endDate"
      type="date"
      ref="picker"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm"
    ></mt-datetime-picker>
    <!-- <mt-popup v-model="birthdayVisible" position="bottom">
      <div class="date">
        <p class="cancelAndConfirm">
          <span @click="cancelBirthday()" class="cancle">取消</span>
          <span class="confirm" @click="confirmBirthday()">确定</span>
        </p>
      </div>
    </mt-popup> -->
  </div>
</template>
 

<script>
import BaseNavbar from "@c/BaseNavbar/BaseNavbar";
import {dateFormat} from '@u/formatDate.js'


export default {
  data() {
    return {
      isLeft: true,
      title: "添加联系人",
      popupVisible: false, //身份类型
      birthdayVisible: false, // 生日
      dateVisible: "", // 默认的时间
      startDate: new Date("1968-01-01"),
      endDate: new Date('2100-01-01'),
      form: {
        contactName: "",
        contactPhone: "",
        birthday: "",
        // identityType: "",
        certificateNumber: ""
      },
      selectLabel:'',// 选中的id label
      selectIDType:'',// 选中的id

      IDTypes: [
        { label: "身份证", value: 0 },
        { label: "护照", value: 1 },
        { label: "出生证明", value: 2 }
      ]
    };
  },
  components: {
    BaseNavbar,

  },
  computed: {},
  mounted() {
    console.log("订单所有值", this.$route.query);
    
  },
  methods: {
    // 身份
    ID() {
      this.popupVisible = !this.popupVisible;
    },
    // 点击生日
    birthday() {
      this.dateVisible = new Date();
      this.birthdayVisible = true;
    },
    // 点击打开时间选择器
    openPicker() {
      this.$refs.picker.open();
    },
    // 确定日期
    handleConfirm() {
      // this.dateVisible = formDate(this.dateVisible,'yyyy-MM-dd')
      this.form.birthday = dateFormat('yyyy-mm-dd',this.dateVisible)
      // this.form.birthday = this.dateVisible;
      
      console.log("选中的出生日期", this.form.birthday);
    },
    // 取消生日
    cancelBirthday() {
      this.birthdayVisible = false;
    },
    // 确定选中生日
    confirmBirthday() {},
    // 选中ID
    selectID(item) {
      console.log(item);
   
      this.selectLabel = item.label
      this.selectID = item.value
      this.popupVisible = false;
    },
    // 生日

    // 保存
    save() {
      let params = this.form;
      this.form.identityType = this.selectID
      this.form.userId = sessionStorage.getItem('userId')
      if (params.contactName == "") {
        this.$my_message("请输入联系姓名");
        return;
      }
      if (params.contactPhone.lenght == 0) {
        this.$my_message("请输入联系电话");
        return;
      }
      if (params.birthday.lenght == 0) {
        this.$my_message("请输入生日");
        return;
      }
      if (params.certificateNumber.lenght == 0) {
        this.$my_message("请输入证件号码");
        return;
      }
      // if(params.identityType == '身份证') return this.form.identityType = 0
      // if(params.identityType == '护照') return this.form.identityType = 1
      // if(params.identityType == '出生证') return this.form.identityType = 2


      this.$JSONPost("/app/sc/travel/travelPeopleSave", params).then(res => {
        if(res.status ===0){
          this.$my_message(res.msg)
          this.$router.go(-1);
        }else{
          this.$my_message(res.msg)          
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.all {
  padding-top: rem(110);
}
.form {
  background-color: #ffffff;
  margin: 0 rem(20);
  padding: rem(20) rem(20);

  p {
    font-size: rem(28);
    color: #373f51;
    margin: rem(20) 0;
  }
  input {
    font-size: rem(28);
  }
  .solid {
    border-bottom: rem(1) solid #cccccc;
  }
  img {
    float: right;
    width: rem(20);
  }
}

.button {
  font-size: rem(32);
  color: #fff;
  line-height: rem(70);
  height: rem(70);
  width: rem(500);
  margin: 0 auto;
  text-align: center;
  border-radius: rem(8);
  background-color: #05d6cc;
  margin-top: rem(40);
}
.text {
  width: 100vw;
  margin: rem(20) 0;
  text-align: center;
  font-size: rem(32);
}
.text:hover {
  color: #05d6cc;
}
.date {
  margin: rem(20) 0;
}
.cancelAndConfirm {
  padding: 0 rem(20);
  display: flex;
  justify-content: space-between;
  .cancle {
    font-size: rem(28);
    color: #cccccc;
  }
  .confirm {
    font-size: rem(28);
    color: #05d6cc;
  }
}
</style>