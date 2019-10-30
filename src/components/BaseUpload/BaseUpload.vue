/**
* @desc 上传提示
* @author WL
* @date 2019/1/25
* @version 1.0
*/
<script>
  export default {
    name: "BaseUpload",
    methods: {
      /**
       * 上传
       * @private
       */
      _upload() {
        this.$emit('upload');
      },
      /**
       * 关闭
       * @private
       */
      _close() {
        this.$emit('close');
      },
      /**
       * 拍照上传
       * @private
       */
      _photograph() {
        this.$emit('photograph')
      }
    }
  };
</script>

<template>
    <div class="upload">
        <div class="wrapper">
            <div class="list">
                <div class="item" @click="_photograph">拍照</div>
                <div class="item" @click="_upload">从相册上传</div>
            </div>
            <div class="close" @click="_close">取消</div>
        </div>
        <div class="layer" @click="_close"></div>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .upload {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1000;
        box-sizing: border-box;

        .wrapper {
            position: absolute;
            width: 100%;
            padding: 0 rem(24) rem(20);
            bottom: 0;
            left: 0;
            box-sizing: border-box;

            .list {
                padding: 0 rem(35);
                -webkit-border-radius: rem(20);
                -moz-border-radius: rem(20);
                border-radius: rem(20);
                background: #ffffff;

                .item {
                    display: flex;
                    height: rem(110);
                    align-items: center;
                    justify-content: center;
                    font-size: rem(32);
                    color: #1D9CCB;
                    border-bottom: rem(1) solid #E6E5E5;

                    &:last-child {
                        border-bottom: none;
                    }
                }
            }

            .close {
                display: flex;
                height: rem(110);
                margin-top: rem(15);
                align-items: center;
                justify-content: center;
                background: #ffffff;
                -webkit-border-radius: rem(20);
                -moz-border-radius: rem(20);
                border-radius: rem(20);
                font-size: rem(32);
                color: #BEBDBD;
            }
        }

        .layer {
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .3);
        }
    }
</style>
