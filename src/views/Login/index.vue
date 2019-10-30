<template>
  <div class="Login">
    <div class="kongbai">
      <img src="./aiyayouLogo.png">
    </div>
    <div class="main">
      
        <!--输入框-->
        <div class="input-content">
          <!--autoFocus-->
          <div class="username">
            <i class="username-icon"></i>
            <input
              class="input"
              type="number"
              oninput="if(value.length>11)value=value.slice(0,11)"
              v-model="loginForm.accountName"
              onkeyup="value=value.replace(/\D/g,'')"
              placeholder="输入手机号"
            />
          </div>
          <div class="password">
            <i class="password-icon"></i>
            <input type="password" class="input" v-model="loginForm.accountPwd" placeholder="输入密码" />
          </div>
        </div>
        <!--登入按钮-->
        <div class="submit" @click="e_login">登录</div>
  
    </div>
    <div class="foor">
      <span class="foor1" @click="e_goPage('/register')">注册</span>
      <span class="foor2" @click="e_goPage('/forget')">忘记密码?</span>
    </div>
  </div>
</template>

<script>
import { Check } from "@u/formCheck";
import { setToken } from "@u/token";
export default {
  data() {
    return {
      Check, // 校验手机号
      setToken,

      loginForm: {
        accountName: "",
        accountPwd: "",
      }
    };
  },
  watch: {
    "loginForm.accountPwd"(v) {
      if (Check.checkZW(v)) {
        this.loginForm.accountPwd = "";
      }
    }
  },
  methods: {
    // 跳转注册，和忘记密码
    e_goPage(p) {
      this.$router.push(p);
    },
    // 登录按钮
    e_login() {
      this.pwdLogin();
    },
    // 密码登录
    //    密码登录
    pwdLogin() {
      let params = {
        username: this.loginForm.accountName, //登录手机号
        password: this.loginForm.accountPwd //登录密码
      };

      if (params.username == "") {
        this.$my_message("请输入手机号");
        return;
      }
      if (params.password == "") {
        this.$my_message("请输入登录密码");
        return;
      }
      this.$JSONPost("app/oauth/token", params).then(response => {
        console.log("密码登录结果", response);
        // 这块是登录成功
        if (response.status == 0) {
          // 登录成功 存储用户基础数据
          this.saveLocal(response);
          // 登录成功且已经实名了 就直接进入首页
          this.$my_message("登录成功");
          this.$router.push("/main");
          this.$store.dispatch("SetRedeemData", { showNotice: true });
        } else {
          // 没有登录成功 也就是 response.status 不等于0的情况
          this.checkBlock(response);
        }
      });
    },
    checkBlock(response) {
      // 登录不成功 并且返回了 isBlock 说明是冻结导致的不成功
      if (response.data) {
        this.$my_message("登录失败");
      } else {
        // 其他原因的不成功
        this.$my_message(response.msg);
      }
    },
    // 登录成功存储用户数据
    saveLocal(re) {
      sessionStorage.setItem("accessToken", re.data.accessToken);
      sessionStorage.setItem("accountName", re.data.accountName);
      sessionStorage.setItem("accountType", re.data.accountType);
      sessionStorage.setItem("givenTheAmountOf", re.data.givenTheAmountOf);
      sessionStorage.setItem("phoneNo", re.data.phoneNo);
      sessionStorage.setItem("userId", re.data.userId);
      this.setToken(re.data.accessToken);

      //取用户的手机号，旧密码，推荐码
      sessionStorage.setItem("username", re.data.username); //手机号
      sessionStorage.setItem("oldPassword", re.data.password); //密码
      sessionStorage.setItem("popCode", re.data.selfRecommend); //推荐码
    },
  }
};
</script>

<style lang="scss" scoped type="text/scss">
.Login {
  background: url("./loginBackground.png") no-repeat;
  background-size: 100% 100%;
  height: 100%;
  overflow: hidden;
  .kongbai {
    height: 55%;
    width: 50%;
    margin: 0 auto;
    margin-top: 1rem;
  }
  .foor {
    margin-top: rem(40);
    font-size: rem(32);
    .foor1 {
      color: #0595ce;
      margin-left: 3.5rem;
    }
    .foor2 {
      float: right;
      color: #ffffff;
      margin-right: 3.5rem;
    }
  }
}

.main {
  img {
    width: rem(30);
    height: rem(30);
  }

  padding: 0 rem(20);
  margin-top: rem(40);

  text-align: center;
  .title {
    margin-bottom: rem(50);
    line-height: rem(42);
  }
  .login-text {
    color: #ffffff;
    font-size: rem(42);
  }
  .regist-text {
    color: #ffffff;
    font-size: rem(32);
  }
  .input-content {
    position: relative;
    .password {
      font-size: rem(32);
    }
    .username-icon {
      background: url("./usernameIco.png") no-repeat;
      width: rem(40);
      height: rem(40);
      position: absolute;
      left: 8%;
      bottom: 63%;
    }
    .password-icon {
      background: url("./passwordIco.png") no-repeat;
      width: rem(40);
      height: rem(40);
      position: absolute;
      left: 8%;
      bottom: 15%;
    }
    input {
      height: rem(70);
      width: 80%;
      padding-left: rem(60);
      border-radius: rem(8);
      outline: none;
      margin: rem(20) 0;
      font-size: rem(32);
    }
  }

  .submit {
    margin: 0 auto;
    margin-top: rem(20);
    border-radius: rem(35);
    height: rem(70);
    line-height: rem(70);
    width: 88%;
    font-size: rem(32);
    background: #3ebbf9;
    color: #ffffff;
  }
}
</style>