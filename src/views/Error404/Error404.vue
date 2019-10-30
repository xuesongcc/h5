/**
* @desc 404页面
* @author WL
* @date 2018/12/4
* @version 1.0
*/
<script>
  export default {
    name: "Error404"
  };
</script>

<template>
    <div class="container">
        <div class="img">
            <img src="./404.png" alt="">
        </div>
        <div class="tips">
            <span>很抱歉您访问的页面不存在.....</span>
            <div class="return" @click="$router.push('/')">返回首页</div>
        </div>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .container {
        width: 100%;
        height: 100%;
        padding-top: rem(150);
        .img {
            width: 80%;
            margin: 0 auto;
        }
        .tips {
            margin-top: rem(50);
            text-align: center;
            font-size: rem(24);
            .return {
                width: rem(180);
                line-height: rem(50);
                margin: rem(30) auto 0;
                -webkit-border-radius: rem(10);
                -moz-border-radius: rem(10);
                border-radius: rem(10);
                background-color: #4394ff;
                font-size: rem(28);
                color: #ffffff;
            }
        }
    }
</style>
