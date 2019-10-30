/**
* @desc 忘记密码
* @author WL
* @date 2019/3/4
* @version 1.0
*/
<script>
  import BaseLargeTitle from '@c/BaseLargeTitle/index';
  import {Check} from '@u/formCheck';

  export default {
    name: "Forget",
    components: {
      BaseLargeTitle,
    },
    data() {
      return {
        Check,
        //用户名
        name: '',
        //密码
        password: '',
        //验证码
        code: '',
          //旧密码
          oldPassword:'',
        //推荐人
        confirm: '',
        //防止连点
        isPoint: false,
        //验证码提示
        text: '获得验证码',
        //定时器
        timer: ''
      };
    },
    watch: {
      'password'(v) {
        if (Check.checkZW(v)) {
          this.password = '';
        }
      }
    },
    methods: {
      /**
       * 跳转页面
       * @param page
       * @private
       */
      _go(page) {
        this.$router.push(page);
      },
      /**
       * 提交之前验证
       * @private
       */
      _sendBeforeCheck() {
        if (this.name === '') {
          this.$my_message('请输入手机号码');
          return;
        }
        if (this.code === '') {
          this.$my_message('请输入验证码');
          return;
        }
        if (this.password === '') {
          this.$my_message('请输入新密码');
          return;
        }

        if (this.password.length < 6) {
          this.$my_message('密码不能少于6位');
          return;
        }

        if (this.password !== this.confirm) {
          this.$my_message('两次密码不一致');
          return;
        }
          // primaryPassword--旧密码
          // userId--用户id
          // msgCode--验证码
          // newPassword--新密码
          // againPassword--再新密码
        let data = {
            username: this.name,
            newPasswd : this.password,
            confirmPassword : this.confirm,
            validateCode: this.code,

        };

        this._send(data);
      },
      /**
       * 发送验证码验证
       * @private
       */
      _verificationCode() {
        let phoneCheck = /^1[3456789]\d{9}$/;
        if (this.name === '') {
          this.$my_message('请输入手机号');
          return;
        }
        if (!phoneCheck.test(this.name)) {
          this.$my_message('请输入合法手机号码');
          return;

        }
        this._sendSMS();
      },
      /**
       * 发送验证码
       * @private
       */
      _sendSMS() {
        if (this.isPoint) {
          return;
        }
        let params = {
            code: 'CN',
          username: this.name
        };
        this.isPoint = true;
        this.$FDPost('app/sendFindPassWordCode', params).then(re => {
            console.log('sendSMS',re)
          if (re.status === 0) {
            this.$my_message(re.msg);
            this._countdown();
          } else {
            this.$my_message(re.msg);
            this.isPoint = false;
          }
        })
      },
      /**
       * 倒计时
       * @private
       */
      _countdown() {
        let num = 60;
        this.text = num + 's';
        this.timer = setInterval(() => {
          if (num <= 0) {
            this.isPoint = false;
            this.text = '获得验证码';
            clearInterval(this.timer);
            return;
          }
          num--;
          this.text = num + "s";
        }, 1000);
      },
      /**
       * 发送
       * @param data
       * @private
       */
      _send(data) {
        // this.$FDPost('user/forgetPasswd', data).then(re => {
        //   if (re.status === 0) {
        //     this.$my_message("修改成功");
        //     this.$router.push('/');
        //   } else {
        //     this.$my_message(re.msg);
        //   }
        // });

          this.$FDPost('/app/user/forgetPassword',data).then(res=>{
              if (res.status === 0) {
                  console.log('修改密码返回结果',res)
                  this.$my_message('修改成功')
                  this.$router.push('/');
              } else {
                  this.$my_message(res.msg);
              }
          })
      },




    }
  };
</script>

<template>
    <div class="forget">
        <BaseLargeTitle text="修改密码"></BaseLargeTitle>
        <div class="form">
            <form>
                <div class="item">
                    <label for="phone">手机号码</label>
                    <div class="input">
                        <div class="left">+86</div>
                        <input type="number" oninput="if(value.length>11)value=value.slice(0,11)" v-model="name"
                               id="phone" onkeyup="value=value.replace(/\D/g,'')"/>
                    </div>
                </div>
                <div class="item">
                    <label for="code">验证码</label>
                    <div class="input">
                        <input type="number" oninput="if(value.length>4)value=value.slice(0,6)" class="code"
                               v-model="code" id="code" onkeyup="value=value.replace(/\D/g,'')"/>
                        <div class="right" @click="_verificationCode">{{text}}</div>
                    </div>
                </div>

                <div class="item">
                    <label for="password">设置新密码</label>
                    <div class="input">
                        <input type="password" maxlength="25" v-model="password" id="password"/>
                    </div>
                </div>
                <div class="item">
                    <label for="confirm">确认密码</label>
                    <div class="input">
                        <input type="password" maxlength="25" v-model="confirm" id="confirm"/>
                    </div>
                </div>
                <div class="submit" @click="_sendBeforeCheck">确定</div>
            </form>
        </div>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .forget {
        width: 100%;
        min-height: 100%;
        background: #ffffff;
        background: url("../Login/loginBackground.png");
        background-size: 100% 100%;
        .form {
            padding: 0 rem(39);

            .item {
                border-bottom: rem(1) solid #C6C5C5;

                label {
                    display: block;
                    padding-top: rem(35);
                    font-size: rem(28);
                    font-weight: bold;
                    color: $fontColor;
                }

                .input {
                    display: flex;
                    height: rem(90);
                    align-items: center;

                    .left {
                        display: flex;
                        flex: 0 0 rem(80);
                        width: rem(80);
                        height: rem(48);
                        margin-right: rem(20);
                        font-size: rem(26);
                        color: $fontColor;
                        font-weight: bold;
                        align-items: center;
                        justify-content: center;
                        -webkit-border-radius: rem(5);
                        -moz-border-radius: rem(5);
                        border-radius: rem(5);
                        background: #F2F2F2;
                    }

                    input {
                        flex: 1;
                        height: rem(48);
                        padding-left: rem(10);
                        font-size: rem(26);
                        background-color: transparent;
                        &.code {
                            width: rem(235);
                        }
                    }

                    .right {
                        flex: 0 0 rem(235);
                        display: flex;
                        width: rem(235);
                        height: rem(60);
                        align-items: center;
                        justify-content: center;
                        background-color: #05D6CC;
                        font-size: rem(26);
                        color: #FFFFFF;
                        -webkit-border-radius: rem(5);
                        -moz-border-radius: rem(5);
                        border-radius: rem(5);
                    }
                }
            }



            .submit {
                display: flex;
                width: 100%;
                height: rem(100);
                margin: 0 auto;
                align-items: center;
                justify-content: center;
                -webkit-border-radius: rem(10);
                -moz-border-radius: rem(10);
                border-radius: rem(10);
                background-color: #05D6CC;
                font-size: rem(34);
                color: #FFFFFF;
            }
        }
    }
</style>



