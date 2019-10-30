/**
* @desc 评论---星
* @author WL
* @date 2018/12/19
* @version 1.0
*/
<script>
  const EMPTY = 'empty';// 没星
  const HALF = 'half';// 半星
  const FULL = 'full';// 满星
  const LENGTH = 5;//展示星长度
  export default {
    name: "BaseStars",
    props: {
      //评分
      score: {
        type: Number,
        default: 0,
      }
    },
    computed: {
      /**
       * 根据评分显示星的样式
       * @private
       */
      itemClasses() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(FULL);
        }
        if (hasDecimal) {
          result.push(HALF);
        }
        while (result.length < LENGTH) {
          result.push(EMPTY);
        }
        return result;
      }
    },
  };
</script>

<template>
    <div class="container">
        <i class="icon" v-for="(item, i) in itemClasses" :key="i" :class="item"></i>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .container {
        display: flex;
        align-items: center;
        .icon {
            display: inline-block;
            width: rem(21);
            height: rem(21);
            margin-right: rem(10);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            &:last-child {
                margin-right: 0;
            }
            &.empty {
                @include bgIcon('empty');
            }
            &.half {
                @include bgIcon('half');
            }
            &.full {
                @include bgIcon('full');
            }
        }
    }
</style>
