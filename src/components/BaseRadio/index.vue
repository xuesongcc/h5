/**
* @desc 单选
* @author WL
* @date 2019/3/6
* @version 1.0
*/
<script>
  export default {
    name: "BaseRadio",
    props: {
      //传达已选择的参数
      select: {
        type: Number | String,
      },
      //选择类型
      radios: {
        type: Array
      }
    },
    methods: {
      /**
       * 选择
       * @param id
       * @private
       */
      _target(id) {
        this.$emit('select', id);
      }
    }
  };
</script>

<template>
    <div class="radio">
        <div class="item" v-for="item in radios" :key="item.label" @click="_target(item.label)">
            <i class="icon" :class="{'active': item.label == select}"></i>
            <span>{{item.value}}</span>
        </div>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .radio {
        display: flex;
        align-items: center;

        .item {
            display: flex;
            align-items: center;
            margin-left: rem(50);

            &:first-child {
                margin-left: 0;
            }

            .icon {
                display: inline-block;
                width: rem(37);
                height: rem(37);
                @include bgIcon('unselected');
                background-repeat: no-repeat;
                background-size: 100% 100%;

                &.active {
                    @include bgIcon('select');
                }
            }

            span {
                margin-left: rem(15);
                font-size: rem(26);
                color: $fontColor;
            }
        }
    }
</style>
