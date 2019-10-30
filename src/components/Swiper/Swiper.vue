<template>
    <div class="swiper-container vue-swiper" ref="swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(x, index) in list" :key="index">
                <img :src="x" :alt="x.alt || 'img'+index" :style="{height: height}">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination" ref="pagination" v-show="list.length>1"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Swiper from './swiper-3.4.2.min';
  import _ from 'lodash';

  var myswiper = null;

  export default {
    props: {
      list: {
        type: Array,
        required: true,
        default: function () {
          return [];
        },
      },
      config: {
        type: Object,
        default: function () {
          return {
            autoplay: 5000,
            // loop: true,
            observer: true,
            observeParents: true,
            autoplayDisableOnInteraction: false,
          };
        },
      },
      height: {
        type: String,
        default: ''
      }
    },
    data() {
      return {};
    },
    mounted() {
      myswiper = new Swiper(
          this.$refs.swiper,
          _.assign(
              {
                pagination: this.$refs.pagination,
              },
              this.config,
          ),
      );
    },
    watch: {
      list(newval, oldVal) {
        setTimeout(function () {
          myswiper.update();
        }, 10);
      },
    },
  };
</script>

<style type="text/scss" lang="scss">
    @import './swiper-3.4.2.min.css';
    .zoomswiper{
      .swiper-wrapper{
        .swiper-slide{transition:.3s;transform:scale(.7);
          img{border-radius:2vw;}
        }
        .swiper-slide-prev{transform:scale(.7) translateX(25vw)}
        .swiper-slide-active{transform:scale(.9)}
        .swiper-slide-next{transform:scale(.7) translateX(-25vw)}
      }
      .swiper-pagination{bottom:-1.5vw;
        .swiper-pagination-bullet{background:#333;transform: scale(.8)}
        .swiper-pagination-bullet-active{background:#05D6CC;transform: scale(1.3)}
      }
    }
    .swiper-container img {
        width: 100%;
        height: rem(300);
    }

    .vue-swiper .swiper-pagination-bullet {
        background-color: #fff;
    }

    .vue-swiper .swiper-pagination-white .swiper-pagination-bullet-active {
        background-color: #fff;
    }
    .swiper-pagination-fraction{
      width:auto;position:absolute;right:3vw;left:unset;bottom:3vw;padding:1.5vw 2vw;
      background:rgba(0,0,0,.25);border-radius:10vw;color:#eee;font-size:3vw;line-height:2vw;letter-spacing: -.5vw;
    }
</style>
