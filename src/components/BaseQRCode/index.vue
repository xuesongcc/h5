/**
* @desc 二维码
* @author WL
* @date 2019/3/5
* @version 1.0
*/
<script>
  import {Connect} from '@api/apiURL';

  export default {
    name: "BaseQRCode",
    data() {
      return {
        initQCode: '你自定定义的值'
      };
    },
    mounted() {
      this._QRCodeInfo();
    },
    methods: {
      /**
       * 关闭
       * @private
       */
      _close() {
        this.$emit('close');
      },
      _QRCodeInfo() {
        // this.initQCode = Connect.shareURL + sessionStorage.getItem('accountName');
        this.initQCode = Connect.shareURL + sessionStorage.getItem('popCode');
      }
    }
  };
</script>

<template>
    <div class="code">
        <div class="wrapper">
<!--            <div class="head">-->
<!--                <h1>推广二维码</h1>-->
<!--                <p class="desc">您的推广支持，是我们前进的动力</p>-->
<!--            </div>-->
            <div class="qr">
                <qriously :value="initQCode" :size="138"/>
            </div>
            <div class="close" @click="_close">
                <i class="icon"></i>
            </div>
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .code {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .3);
        z-index: 1000;

        .wrapper {
            position: absolute;
            width: rem(675);
            /*height: rem(980);*/
            height: rem(1000);
            top: 40%;
            left: 46%;
            transform: translateX(-50%) translateY(-50%);

            background: url("./aiyayoubg.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;

            .head {
                padding: rem(128) 0 0;

                h1 {
                    text-align: center;
                    font-size: rem(34);
                    color: $fontColor;
                    font-weight: bold;
                }

                .desc {
                    margin-top: rem(5);
                    text-align: center;
                    font-size: rem(24);
                    color: $fontDescColor;
                }
            }

            .qr {
                margin-top: rem(500);
                /*text-align: center;*/
                margin-left: 24%;
            }

            .close {
                position: absolute;
                /*left: 50%;*/
                /*bottom: 20%;*/
                /*lxs*/
                left: 54%;
                top:102%;
                transform: translateX(-50%);
                font-size: 0;

                .icon {
                    display: inline-block;
                    width: rem(71);
                    height: rem(71);

                    background: url("./close@2x.png");
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }
            }
        }
    }
</style>
