/*
 * @Author: xuesong 
 * @Date: 2019-09-04 21:07:33 
 * @Last Modified by: xuesong
 * @Last Modified time: 2019-09-04 21:38:05
 */

<style lang="scss" scoped>
.mask {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  opacity: 0;
  will-change: opacity;
  transition: all 0.5s;
  visibility: hidden;
}
// .content {
//   position: absolute;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   top: 60%;
//   border-radius: 5vm;
//   background-color: #fff;
//   -webkit-transform: translate3d(0, 100%, 0);
//   transform: translate3d(0, 100%, 0);
//   will-change: transform;
//   box-shadow: 0 -1px 40px rgba(0, 0, 0, 0.3);
//   -webkit-transition: -webkit-transform 0.3s cubic-bezier(0, 0, 0.25, 1) 80ms;
//   transition: transform 0.3s cubic-bezier(0, 0, 0.25, 1) 80ms;
// }

// .trans {
//   -webkit-transform: translate3d(0, 0, 0);
//   transform: translate3d(0, 0, 0);
// }

.content {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: rem(30) rem(30) 0 0;
  background: #fff;
  box-shadow: 0 -1px 40px rgba(0, 0, 0, 0.3);
  transform: translateY(100%);
  transition: 0.3s;
  padding: rem(40) rem(40);
}
.trans {
  transform: translateY(0);
}

.maskpop {
  pointer-events: auto;
  opacity: 1;
  visibility: visible;
  /*background-color: rgba(0,0,0,.5);*/
}
</style>

<template>
  <div>
    <!-- <div @click="popup"></div> -->
    <div class="mask" :class="{'maskpop':isShow}" @click="pophide"></div>
    <div class="content" :class="{'trans':isShow}" >
      <slot></slot>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
    //   isShow: false,

    };
  },
  props: {  
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // popup() {
    // //   this.isShow = true;
    //   this.$emit("popup",true);
    // },
    pophide() {

    //   this.isShow = false;
      
      this.$emit("pophide");
    }
  }
};
</script>

