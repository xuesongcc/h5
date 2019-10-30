/**
* @desc  按钮
* @author WL
* @date 2019/3/6
* @version 1.0
*/
<script>
  export default {
    name: "BaseButton",
    props: {
      //按钮文字
      text: {
        type: String,
        default: '按钮'
      }
    },
    methods: {
      /**
       * 点击
       * @private
       */
      _btn() {
        this.$emit('btn')
      }
    }
  };
</script>

<template>
    <div class="btn" @click="_btn">{{text}}</div>
</template>

<style lang='scss' scoped type="text/scss">
    .btn {
        display: flex;
        width: 100%;
        height: rem(87);
        align-items: center;
        justify-content: center;
        -webkit-border-radius: rem(87);
        -moz-border-radius: rem(87);
        border-radius: rem(87);
        background-color: #F6383A;
        font-size: rem(32);
        color: #FFFFFF;
        font-weight: bold;
    }
</style>
