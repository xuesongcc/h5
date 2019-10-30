/**
* @desc 注册|忘记密码头
* @author WL
* @date 2019/3/4
* @version 1.0
*/
<script>
  export default {
    name: "BaseLargeTitle",
    props: {
      //标题名称
      text: {
        type: String,
        default: '标题'
      }
    },
    methods: {
      /**
       * 返回
       * @private
       */
      _goReturn() {
        this.$router.back(-1);
      }
    }
  };
</script>

<template>
    <div class="header">
        <div class="return">
            <i class="icon" @click="_goReturn"></i>
        </div>
        <h1 class="title">{{text}}</h1>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .header {
        .return {
            display: flex;
            height: rem(90);
            padding: 0 rem(38);
            align-items: center;

            .icon {
                display: inline-block;
                width: rem(43);
                height: rem(29);
                @include bgIcon('return');
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
        }

        .title {
            padding: rem(70) rem(44) rem(54);
            font-size: rem(48);
            color: $fontColor;
            font-weight: bold;
        }
    }
</style>
