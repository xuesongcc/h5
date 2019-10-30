/**
* @desc 签到
* @author WL
* @date 2019/3/5
* @version 1.0
*/
<script>
  export default {
    name: "BaseSignIn",
    data() {
      return {
        //星期
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        //天
        days: [],
        //今天号
        today: 0,
        //累计签到
        addUp: 0,
        //是否能签到
        isCheckIn: false,
        //防止连点
        isPoint: false,
      };
    },
    mounted() {
      this._getTime();
      this._isCheckIn();
    },
    methods: {
      /**
       * 获得一周日期
       * @private
       */
      _getTime() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let week = date.getDay();
        let endOfMonth = 0;
        let arr = this._judgingTheRunningYear(year);
        let theMonth = arr[month];
        if (month === 0) {
          endOfMonth = 31;
        } else {
          endOfMonth = arr[month - 1];
        }
        this.days = this._getDay(week, day, theMonth, endOfMonth);
        this.today = day;
      },
      /**
       * 判断是否闰年
       * @param year
       * @returns {number[]}
       * @private
       */
      _judgingTheRunningYear(year) {
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
          return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        } else {
          return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        }
      },
      /**
       * 获得日期
       * @param week
       * @param day
       * @param theMonth
       * @param endOfMonth
       * @returns {Array}
       * @private
       */
      _getDay(week, day, theMonth, endOfMonth) {
        let start = week;
        let end = 6 - week;
        let arr = [];
        let num = 0;
        for (let i = start; i >= 0; i--) {
          if (day - i <= 0) {
            let str = endOfMonth + (day - i);
            arr.push(str);
          } else {
            arr.push(day - i);
          }
        }

        for (let i = 1; i <= end; i++) {
          if (day + i > theMonth) {
            num++;
            arr.push(num);
          } else {
            arr.push(day + i);
          }
        }
        return arr;
      },
      /**
       * 关闭
       * @private
       */
      _close() {
        this.$emit('close');
      },
      /**
       * 签到
       * @private
       */
      _checkIn() {
        if (!this.isCheckIn) {
          this.$my_message('签到间隔不足24小时，请稍后再试!');
          return;
        }
        if (this.isPoint) {
          return;
        }
        let params = {
          userId: sessionStorage.getItem('userId'),
          type: 1
        };
        let time = Math.floor(Math.random() * 8000);
        this.isPoint = true;
        this.$my_message('签到中~~~');
        setTimeout(() => {
          this.$FDPost('signIn', params).then(re => {
            this.isPoint = false;
            if (re.status === 0) {
              this.$my_message(re.msg);
              this._isCheckIn();
            } else {
              this.$my_message(re.msg);
            }
          }).catch(err => {
            this.isPoint = false;
          });
        }, time);
      },
      /**
       * 检查是否签到
       * @private
       */
      _isCheckIn() {
        let params = {
          userId: sessionStorage.getItem('userId')
        };
        this.$FDPost('signInformation', params).then(re => {
          if (re.status === 0) {
            this.addUp = re.data.count;
            this.isCheckIn = re.data.sign;
          } else {
            this.$my_message(re.msg);
          }
        });
      }
    }
  };
</script>

<template>
    <div class="checkIn">
        <div class="content">
            <div class="date">
                <div class="head">
                    <h1>我要签到</h1>
                </div>
                <div class="time">
                    <div class="week">
                        <div class="item" v-for="week in weeks" :key="week.id">{{week}}</div>
                    </div>
                    <div class="day">
                        <div class="item" v-for="day in days" :key="day.id">
                            <span :class="{'active': day === today}">{{day}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="today">
                <div class="today-wrapper">
                    <div class="sign">
                        <i class="icon"></i>
                        <div class="desc">
                            <p class="day">你已经累计签到<span>{{addUp}}</span>天</p>
                            <p class="member">会员才能进行签到哦~</p>
                        </div>
                        <div class="btn" :class="{'active': !isCheckIn}" @click="_checkIn">今日签到</div>
                    </div>
                </div>
            </div>
            <div class="close" @click="_close">
                <i class="icon"></i>
            </div>
        </div>
        <div class="layout"></div>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .checkIn {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;

        .content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: #F6F6F6;

            .date {
                position: relative;
                width: 100%;
                height: rem(381);
                @include bgIcon('top');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                z-index: 10;

                .head {
                    padding: rem(49) 0 rem(45);

                    h1 {
                        font-size: rem(34);
                        color: #FFFEFE;
                        font-weight: bold;
                        text-align: center;
                    }
                }

                .time {
                    padding: 0 rem(20);

                    .week {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        border-bottom: rem(1) solid #FFFDFD;

                        .item {
                            flex: 1;
                            display: flex;
                            height: rem(75);
                            align-items: center;
                            justify-content: center;
                            font-size: rem(26);
                            color: #FFFEFE;
                        }
                    }

                    .day {
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        .item {
                            flex: 1;
                            display: flex;
                            height: rem(96);
                            align-items: center;
                            justify-content: center;
                            font-size: rem(26);
                            color: #ffffff;

                            span {
                                display: flex;
                                width: rem(58);
                                height: rem(58);
                                align-items: center;
                                justify-content: center;
                                -webkit-border-radius: 50%;
                                -moz-border-radius: 50%;
                                border-radius: 50%;

                                &.active {
                                    background-color: #ffffff;
                                    color: #2E8EE6;
                                    font-weight: bold;
                                }
                            }
                        }
                    }
                }
            }

            .today {
                width: 100%;
                height: rem(583);
                margin-top: rem(-75);
                padding: rem(25);
                box-sizing: border-box;

                .today-wrapper {
                    width: 100%;
                    height: 100%;
                    @include bgIcon('bg');
                    background-size: 100% 100%;
                    background-repeat: no-repeat;

                    .sign {
                        display: flex;
                        padding: rem(94) rem(19);
                        align-items: center;

                        .icon {
                            display: inline-block;
                            width: rem(71);
                            height: rem(73);
                            margin-right: rem(40);
                            @include bgIcon('timer');
                            background-size: 100% 100%;
                            background-repeat: no-repeat;
                        }

                        .desc {
                            flex: 1;

                            .day {
                                font-size: rem(30);
                                color: $fontColor;
                                font-weight: bold;

                                span {
                                    font-size: rem(32);
                                    color: #F6383A;
                                }
                            }

                            .member {
                                font-size: rem(26);
                                color: $fontDescColor;
                            }
                        }

                        .btn {
                            display: flex;
                            width: rem(184);
                            height: rem(63);
                            align-items: center;
                            justify-content: center;
                            background-color: #F6383A;
                            -webkit-border-radius: rem(63);
                            -moz-border-radius: rem(63);
                            border-radius: rem(63);
                            font-size: rem(26);
                            color: #FFFFFF;
                            font-weight: bold;

                            &.active {
                                background-color: #F6F6F6;
                                color: $fontColor;
                            }
                        }
                    }
                }
            }

            .close {
                position: absolute;
                top: rem(-105);
                right: rem(69);

                .icon {
                    display: inline-block;
                    width: rem(71);
                    height: rem(116);
                    @include bgIcon('close');
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }
            }
        }

        .layout {
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .3);
        }
    }
</style>
