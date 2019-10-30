/**
* @desc 输入框
* @author WL
* @date 2019/3/7
* @version 1.0
*/
<script>
  export default {
    name: "BaseInput",
    props: {
      //父元素绑定参数
      value: {
        type: String
      },
      //提示名称
      name: {
        type: String,
        default: '提示'
      },
      //类型
      type: {
        type: String,
        default: 'text'
      },
      //输入长度
      maxlength: {
        type: Number | String,
        default: 255,
      },
      //描述
      placeholder: {
        type: String
      },
      //关联id
      id: {
        type: String
      },
      // 是否开启数字验证
      isNumber: {
        type: Boolean,
        default: false
      },
      //是否开启数字和字母组合验证
      isEN: {
        type: Boolean,
        default: false
      },
      //是否开启中文验证
      isChinese: {
        type: Boolean,
        default: false
      },
    //    只读
        isReadonly:{
            type: Boolean,
            default: false
        }
    },
    data() {
      return {
        myValue: this.value,
      };
    },
    watch: {
      value(val) {
        this.myValue = val;
      },
      myValue(val) {
        this.$emit('input', val);
      }
    },
    methods: {
      /**
       * 密码进行验证
       * @param val
       * @private
       */
      _handlePassword(val) {
        if (this.isNumber) {
          this.myValue = val.target.value.replace(/[^\d]/g, '');
        }

        if (this.isEN) {
          this.myValue = val.target.value.replace(/[\W]/g, '');
        }
        if (this.isChinese) {
          this.myValue = val.target.value.replace(/[^\u4e00-\u9fa5]/g, '');
        }
      }
    }
  };
</script>

<template>
    <div class="input">
        <label :for="id">{{name}}</label>
        <input :type="type" v-model="myValue" :maxlength="maxlength" @input="_handlePassword" :placeholder="placeholder"
               :id="id" :readonly="isReadonly">
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .input {
        display: flex;
        height: rem(97);
        align-items: center;
        justify-content: space-between;

        label {
            font-size: rem(36);
            color: $fontColor;
        }

        input {
            flex: 1;
            width: rem(235);
            font-size: rem(36);
            text-align: right;
        }
    }
</style>
