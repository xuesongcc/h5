/**
* @desc 修改登录密码
* @author WL
* @date 2019/3/8
* @version 1.0
*/
<script>
  import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
  import BaseButton from '@c/BaseButton/index';
  import BaseInput from '@c/BaseInput/index';

  export default {
    name: "ModifyLogin",
    components: {
      BaseNavbar,
      BaseButton,
      BaseInput
    },
    data() {
      return {
        //密码
        password: {
          //原密码
          raw: '',
          //新密码
          new: '',
          //确认密码
          confirm: ''
        },
        //开启字母和数字验证
        isEN: true,
        //防止连点
        isPoint: false
      };
    },
    methods: {
      /**
       * 提交前验证
       * @private
       */
      _submitCheck() {
        if (this.password.raw === '') {
          this.$my_message('请输入原登录密码');
          return;
        }
        if (this.password.new === '') {
          this.$my_message('请输入新登录密码');
          return;
        }
        if (this.password.confirm !== this.password.new) {
          this.$my_message('新登录密码和确认新登录密码不一致');
          return;
        }
        let params = {
          fid: sessionStorage.getItem('userId'),
          originPwd: this.password.raw,
          newPwd: this.password.new,
          reNewPwd: this.password.confirm,
          pwdType: 0
        };
        this._confirmTheChanges(params);
      },
      /**
       * 确认修改
       * @param params
       * @private
       */
      _confirmTheChanges(params) {
        if (this.isPoint) {
          return;
        }
        this.isPoint = true;
        this.$FDPost('user/resetPasswd', params).then(re => {
          this.isPoint = false;
          if (re.status === 0) {
            this.$my_message('修改成功');
            this.$store.dispatch('RetreatSafely');
            this.$router.push('/');
          } else {
            this.$my_message(re.msg);
          }
        }).catch(() => {
          this.isPoint = false;
        });
      }
    }
  };
</script>

<template>
    <div class="login">
        <BaseNavbar title="修改登录密码"></BaseNavbar>
        <div class="wrapper">
            <div class="item">
                <BaseInput id="raw" name="原登录密码" type="password" v-model="password.raw"
                           maxlength="25"
                           :isEN="isEN"
                           placeholder="请输入原登录密码"></BaseInput>
            </div>
            <div class="item">
                <BaseInput id="new" name="新登录密码" type="password" v-model="password.new"
                           maxlength="25"
                           :isEN="isEN"
                           placeholder="请输入新登录密码"></BaseInput>
            </div>
            <div class="item">
                <BaseInput id="confirm" name="确认新登录密码" type="password" v-model="password.confirm"
                           maxlength="25"
                           :isEN="isEN"
                           placeholder="确认新登录密码"></BaseInput>
            </div>
            <div class="button">
                <BaseButton text="提交" @btn="_submitCheck"></BaseButton>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .login {
        padding-top: rem(90);

        .wrapper {
            .item {
                padding: 0 rem(42);
                margin-bottom: rem(2);
                background-color: #FFFFFF;
            }

            .button {
                margin: rem(193) rem(74);
            }
        }
    }
</style>
