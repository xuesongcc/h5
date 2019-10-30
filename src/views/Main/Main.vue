/**
* @desc 导航
* @author WL
* @date 2019/3/4
* @version 1.0
*/
<script>
  import titles from './index.js';

  export default {
    name: "Main",
    data() {
      return {
        titles,
      };
    },
    methods: {
      /**
       * 跳转页面
       * @param page 页面路径
       * @private
       */
      _goPage(page) {
        this.$router.push(page);
        console.log('yanse:',this.$route.path)
      }
    }
  };
</script>

<template>
    <div class="main">
        <div class="container">
            <router-view></router-view>
        </div>
        <div class="nav">
            <div class="item" v-for="item in titles" :key="item.id" @click="_goPage(item.path)">
<!--                <img :src="$route.path == item.path?item.select:item.icon" alt="">-->
<!--                <span>{{item.name}}</span>-->
                <img :src="$route.path == item.path?item.select:item.icon" alt="">
                <span :style="($route.path == item.path)?{color:'#05D6CC'}:{color:'#CCCCCC'}">{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .main {
        width: 100%;
        height: 100%;
        
        .container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: rem(100);
            overflow: auto;

        }

        .nav {
            position: fixed;
            display: flex;
            width: 100%;
            height: rem(100);
            bottom: 0;
            left: 0;
            align-items: center;
            justify-content: space-between;
                background-color: #ffffff;
            border-top: rem(1) solid #D4D4D4;
            z-index: 100;

            .item {
                position: relative;
                flex: 1;
                display: flex;
                height: 100%;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 1000;


                img {
                    width: auto;
                    height: rem(41);
                }

                span {
                    margin-top: rem(5);
                    font-size: rem(22);
                }
            }

            .circle {
                position: absolute;
                width: rem(118);
                height: rem(118);
                bottom: 0;
                left: 50%;
                margin-left: rem(-59);
                border: rem(1) solid #D4D4D4;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                background-color: #F6383A;
                z-index: 100;
            }
        }

    }
</style>
