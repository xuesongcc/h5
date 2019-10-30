/**
* @desc 个人资料---列表
* @author WL
* @date 2019/3/7
* @version 1.0
*/
<script>
  export default {
    name: "UserInfoList",
    data() {
      return {
        //列表
        lists: [
          {
            id: 0,
            class: 'info',
            name: '修改资料',
            desc: '实名认证完成后可免费修改一次~',
            path: '/modifyInfo'
          }, {
            id: 1,
            class: 'approve',
            name: '实名认证',
            desc: '实名认证仅用于必要安全环节',
            path: '/authentication'
          }, {
            id: 2,
            class: 'password',
            name: '修改登录密码',
            desc: '登录密码可在此修改',
            path: '/modifyLogin'
          }, {
            id: 3,
            class: 'pay',
            name: '修改交易密码',
            desc: '密码修改后请牢记',
            path: '/modifyPay'
          }, {
            id: 4,
            class: 'pay',
            name: '忘记交易密码',
            desc: '交易密码重置后请牢记',
            path: '/repeatPayPwd'
          },
        ],
        //用户信息
        users: {}
      };
    },
    mounted() {
      this._getUserInfo();
    },
    methods: {
      /**
       * 获得用户资料
       * @private
       */
      _getUserInfo() {
        let params = {
          userId: sessionStorage.getItem('userId')
        };
        this.$FDPost('getMyMessage', params).then(re => {
          if (re.status === 0) {
            this.users = re.data;
          } else {
            this.$my_message(re.msg);
          }
        });
      },
      /**
       * 跳转
       * @param path
       * @param id
       * @private
       */
      _goPage(path, id) {
        if (!this.users.hasCertfied) {
          return;
        }
        if (id === 0 && this.users.hasCertfied == 0) {
          this.$my_message('暂未实名，无法修改个人资料');
          return;
        }
        if (id === 1 && this.users.hasCertfied == 1) {
          this.$my_message('您已实名认证，不可重复实名认证');
          return;
        }
        this.$router.push(path);
      },
    }
  };
</script>

<template>
    <div class="list">
        <div class="item" v-for="item in lists" :key="item.id" @click="_goPage(item.path, item.id)">
            <div class="wrapper">
                <div class="content">
                    <div class="img">
                        <i class="icon" :class="item.class"></i>
                    </div>
                    <div class="info">
                        <div class="name">{{item.name}}</div>
                        <div class="desc">{{item.desc}}</div>
                    </div>
                    <i class="right" v-if="!(item.id === 1 && users.hasCertfied == 1)"></i>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="wrapper">
                <div class="content">
                    <div class="img">
                        <i class="icon time"></i>
                    </div>
                    <div class="info">
                        <div class="name">注册/签到时间</div>
                        <div class="desc">注册时间：{{users.createTime}}</div>
                        <div class="desc">签到时间：{{users.signTime === undefined?'暂未签到':users.signTime}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .list {
        .item {
            &:nth-child(2n) {
                .wrapper {
                    margin-bottom: rem(10);

                    .content {
                        border-bottom: none;
                    }
                }
            }

            &:last-child {
                .wrapper {
                    .content {
                        border-bottom: none;
                    }
                }
            }

            .wrapper {
                padding: 0 rem(22);
                background-color: #FFFFFF;

                .content {
                    display: flex;
                    padding: rem(52) rem(10) rem(45);
                    border-bottom: rem(1) solid #DDDDDD;

                    .img {
                        width: rem(47);
                        text-align: center;
                        margin-right: rem(30);

                        .icon {
                            display: inline-block;
                            background-size: 100% 100%;
                            background-repeat: no-repeat;

                            &.info {
                                width: rem(47);
                                height: rem(39);
                                @include bgIcon('info');
                            }

                            &.approve {
                                width: rem(45);
                                height: rem(39);
                                @include bgIcon('approve');
                            }

                            &.password {
                                width: rem(45);
                                height: rem(45);
                                @include bgIcon('password');
                            }

                            &.pay {
                                width: rem(43);
                                height: rem(43);
                                @include bgIcon('pay');
                            }

                            &.time {
                                width: rem(44);
                                height: rem(44);
                                @include bgIcon('time');
                            }
                        }
                    }

                    .info {
                        flex: 1;

                        .name {
                            font-size: rem(32);
                            color: $fontColor;
                            font-weight: bold;
                        }

                        .desc {
                            margin-top: rem(20);
                            font-size: rem(26);
                            color: $fontDescColor;
                        }
                    }

                    .right {
                        display: inline-block;
                        width: rem(12);
                        height: rem(22);
                        @include bgIcon('right');
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }
                }
            }
        }
    }
</style>
