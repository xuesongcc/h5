/**
* @desc 实名认证
* @author WL
* @date 2019/3/7
* @version 1.0
*/
<script>
  import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
  import BaseButton from '@c/BaseButton/index';
  import BaseInput from '@c/BaseInput/index';

  export default {
    name: "Authentication",
    components: {
      BaseNavbar,
      BaseInput,
      BaseButton
    },
    data() {
      return {
        //用户信息
        user: {
          //真实姓名
          name: '',
          //身份证
          id: '',
          //二级密码
          password: ''
        },
        //用户名
        userName: sessionStorage.getItem('accountName'),
        //开启数字验证
        isNumber: true,
        //开启数字和字母组合验证
        isEN: true,
        //开启中文验证
        isChinese: true,
        //防止连点
        isPoint: false
      };
    },
    methods: {
      /**
       * 提交之前验证
       * @private
       */
      _submitCheck() {
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (this.user.name === '') {
          this.$my_message('请输入真实姓名');
          return;
        }
        if (this.user.id === '') {
          this.$my_message('请输入身份证号码');
          return;
        }
        if (!reg.test(this.user.id)) {
          this.$my_message('身份证号码不合法，请重新输入');
          return;
        }
        // if (!this.IdentityCodeValid(this.user.id)) {
        //   return;
        // }
        if (this.user.password === '') {
          this.$my_message('请输入二级密码');
          return;
        }
        if (this.user.password.length < 6) {
          this.$my_message('二级密码为6位数字');
          return;
        }
        let params = {
          userId: sessionStorage.getItem('userId'),
          realName: this.user.name,
          idCard: this.user.id,
          password: this.user.password
        };
        this._submitInfo(params);
      },
      /**
       * 提交资料
       * @param params
       * @private
       */
      _submitInfo(params) {
        if (this.isPoint) {
          return;
        }
        this.isPoint = true;
        this.$FDPost('saveRealName', params).then(re => {
          this.isPoint = false;
          if (re.status === 0) {
            this.$my_message(re.msg);
            this.$router.push('/main');
          } else {
            this.$my_message(re.msg);
          }
        }).catch(() => {
          this.isPoint = false;
        });
      },
      /**
       * 身份证号验证
       * @param code
       * @returns {boolean}
       * @constructor
       */
      IdentityCodeValid(code) {
        let city = {
          11: "北京",
          12: "天津",
          13: "河北",
          14: "山西",
          15: "内蒙古",
          21: "辽宁",
          22: "吉林",
          23: "黑龙江 ",
          31: "上海",
          32: "江苏",
          33: "浙江",
          34: "安徽",
          35: "福建",
          36: "江西",
          37: "山东",
          41: "河南",
          42: "湖北 ",
          43: "湖南",
          44: "广东",
          45: "广西",
          46: "海南",
          50: "重庆",
          51: "四川",
          52: "贵州",
          53: "云南",
          54: "西藏 ",
          61: "陕西",
          62: "甘肃",
          63: "青海",
          64: "宁夏",
          65: "新疆",
          71: "台湾",
          81: "香港",
          82: "澳门",
          91: "国外 "
        };
        let tip = "";
        let pass = true;
        //验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
        if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
          tip = "身份证号格式错误";
          pass = false;
        } else if (!city[code.substr(0, 2)]) {
          tip = "地址编码错误";
          pass = false;
        } else {
          //18位身份证需要验证最后一位校验位
          if (code.length == 18) {
            // code = code.toLocaleUpperCase();
            code = code.toLocaleUpperCase().split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            let sum = 0;
            let ai = 0;
            let wi = 0;
            for (let i = 0; i < 17; i++) {
              ai = code[i];
              wi = factor[i];
              sum += ai * wi;
            }
            let last = parity[sum % 11];
            if (parity[sum % 11] != code[17]) {
              tip = "校验位错误";
              pass = false;
            }
          }
        }
        if (!pass) this.$my_message(tip);
        return pass;
      }
    }
  };
</script>

<template>
    <div class="authentication">
        <BaseNavbar title="实名认证"></BaseNavbar>
        <div class="wrapper">
            <div class="item distinguish">
                <span>用户名</span>
                <span>{{userName}}</span>
            </div>
            <div class="item">
                <BaseInput id="name" name="真实姓名" :isChinese="isChinese" v-model="user.name" maxlength="25"
                           placeholder="请输入真实姓名"></BaseInput>
            </div>
            <div class="item">
                <BaseInput id="id" name="身份证号码" v-model="user.id" maxlength="18" :isEN="isEN"
                           placeholder="请输入身份证号码"></BaseInput>
            </div>
            <div class="item">
                <BaseInput id="password" name="设置二级密码" :isNumber="isNumber" type="password" v-model="user.password"
                           maxlength="6"
                           placeholder="请输入二级密码"></BaseInput>
            </div>
            <div class="item distinguish">
                <span>认证状态</span>
                <span>资料暂未认证...</span>
            </div>
            <div class="button">
                <BaseButton text="提交审核" @btn="_submitCheck"></BaseButton>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .authentication {
        padding-top: rem(90);

        .wrapper {
            .item {
                height: rem(97);
                padding: 0 rem(42);
                margin-bottom: rem(2);
                background-color: #FFFFFF;

                &.distinguish {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                &:nth-child(3) {
                    margin-bottom: rem(10);
                }

                span {
                    font-size: rem(26);
                    color: $fontColor;
                }
            }

            .button {
                margin: rem(85) rem(74);
            }
        }
    }
</style>
