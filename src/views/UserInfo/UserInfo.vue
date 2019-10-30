/**
* @desc 个人资料
* @author WL
* @date 2019/3/7
* @version 1.0
*/
<script>
  import BaseButton from '@c/BaseButton/index';
  import UserInfoList from './UserInfoList/UserInfoList';

  export default {
    name: "UserInfo",
    components: {
      UserInfoList,
      BaseButton
    },
    data() {
      return {
        //会员账号
        member: sessionStorage.getItem('accountName')
      };
    },
    mounted() {
      this.$nextTick(() => {
        this._listeningScroll();
      });
    },
    methods: {
      /**
       * 返回
       * @private
       */
      _comeBack() {
        this.$router.back(-1);
      },
      /**
       * 安全退出
       * @private
       */
      _retreatSafely() {
        this.$store.dispatch('RetreatSafely');
        this.$router.push('/');
      },
      /**
       * 监听滑动时间
       * @private
       */
      _listeningScroll() {
        this.$refs.scroll.addEventListener('scroll', this._handleScroll, true);
      },
      /**
       * 滑动方法
       * @private
       */
      _handleScroll() {
        let height = this.$refs.top.offsetHeight - 90;
        let top = this.$refs.scroll.scrollTop;
        let nav = this.$refs.nav;
        let opacity = (top / height).toFixed(2);
        let bottom = 1 * 750 / 750 / 20;
        if (top >= height) {
          nav.style.backgroundColor = 'RGBA(255, 255, 255, 1)';
          nav.style.borderBottom = `${bottom}rem solid rgba(225, 224, 224, 1)`;
        } else {
          nav.style.backgroundColor = `RGBA(255, 255, 255, ${opacity})`;
          nav.style.borderBottom = `${bottom}rem solid rgba(225, 224, 224, ${opacity})`;
        }
      }
    }
  };
</script>

<template>
    <div class="user-info">
        <div class="user-wrapper" ref="scroll">
            <div class="head" ref="top">
                <div class="nav" ref="nav">
                    <i class="icon" @click="_comeBack"></i>
                    <span>个人资料</span>
                    <span></span>
                </div>
                <div class="member">
                    <i class="logo"></i>
                    <span>会员账号：{{member}}</span>
                </div>
            </div>
            <div class="wrapper">
                <UserInfoList></UserInfoList>
            </div>
            <div class="button">
                <BaseButton text="安全退出" @btn="_retreatSafely"></BaseButton>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .user-info {
        width: 100%;
        height: 100%;
        overflow: auto;

        .user-wrapper {
            width: 100%;
            height: 100%;
            overflow: auto;

            .head {
                padding-top: rem(90);
                @include bgIcon('bg');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-color: #FFFFFF;

                .nav {
                    position: fixed;
                    display: flex;
                    width: 100%;
                    height: rem(90);
                    left: 0;
                    top: 0;
                    padding: 0 rem(43) 0 rem(19);
                    align-items: center;
                    justify-content: space-between;
                    box-sizing: border-box;

                    .icon {
                        display: inline-block;
                        width: rem(43);
                        height: rem(29);
                        @include bgIcon('right');
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }

                    span {
                        font-size: rem(34);
                        color: $fontColor;
                        font-weight: bold;
                    }
                }

                .member {
                    display: flex;
                    padding: rem(45) 0 rem(25);
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;

                    .logo {
                        display: inline-block;
                        width: rem(155);
                        height: rem(148);
                        @include bgIcon('logo');
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }

                    span {
                        margin-top: rem(35);
                        font-size: rem(28);
                        color: $fontColor;
                        font-weight: bold;
                    }
                }
            }

            .wrapper {
                margin-top: rem(10);
            }

            .button {
                padding: rem(48) rem(74);
            }
        }
    }
</style>
