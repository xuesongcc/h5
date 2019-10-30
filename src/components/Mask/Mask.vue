<template>
    <div>
      <div class="mask" @click="$store.dispatch('SetRedeemData', {mask:0})" :class="{active:mask}"></div>
      <redpack class="flex" v-if="$store.state.user.mask===1"/>
      <img :src="mpic" alt="" :class="{active:active}">
    </div>
</template>

<script>
  import redpack from '@c/Mask/RedPack';

    export default {
      name: "activity",
      components: {
        redpack,
        // SearchInput,// 搜索框
      },
      data() {
        return {
          mask:false,
          mpic:'',
          active:false,
        };
      },
      methods:{

      },
      mounted(){
        this.$nextTick(()=>{this.mask=true});
        this.mpic = localStorage.getItem('mpic');
        if(this.mpic!==null){
          this.$nextTick(()=>{this.active=true})
        }

      },
      beforeDestroy(){
        localStorage.setItem('mpic',null)
      }
    }
</script>

<style lang='scss' scoped>
  .mask{background:rgba(0,0,0,.56);position:fixed;top:0;bottom:0;left:0;right:0;z-index:1001;transition:.3s;opacity: 0}
  .mask.active{opacity:1}
  .flex{position:relative;z-index:1001;display:flex;flex-direction:column;justify-content: center;align-items: center;height:100%;bottom:60vw}
  img{position:fixed;z-index:1001;left:50%;top:50%;transform: translate(-50%,-50%);transition:.3s;width:0;height:0;}
  img.active{width:94vw;height:auto}
</style>