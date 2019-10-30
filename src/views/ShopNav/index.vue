<template>
  <div class="top">
    <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
    <div class="navlist">
      <div v-for="(item,index) in list" :key="index"  @click="navClick(item.value)"
           class="nav" :class="{active:nindex===item.value}">
        {{item.label}}
      </div>
    </div>
    <div class="border">
      <h1>{{nlabel}}</h1>
      <img src="./bg.png" alt="">
      <div class="glist">
        <div class="good" v-for="(item,index) in items" :key="index" @click="shopType(item)">
          <img :src="item.img" alt="">
          <p>{{ item.label }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BaseNavbar from '@c/BaseNavbar/BaseNavbar';

  export default {
    name: "shopnav",
    data() {
      return {
        title: '分类',
        isLeft: true,
        nindex: '0',
        nlabel:'今日推荐',
        list:[
          {label:'今日推荐',value:'0'},
          {label:'新鲜蔬菜',value:'1'},
          {label:'新鲜水果',value:'2'},
          {label:'肉蛋水产',value:'3'},
          {label:'粮油副食',value:'4'},
          {label:'酒水饮料',value:'5'},
        ],
        items:[
          {img:'./lajiao.png',label:'辣椒',id:'0'},
          {img:'./xihongshi',label:'西红柿',id:'1'},
          {img:'./tudou',label:'土豆',id:'2'},
          {img:'./yumi',label:'玉米',id:'3'},
          {img:'./guo',label:'瓜',id:'4'},
        ]
      }
    },
    components: {
      BaseNavbar,

    },
    mounted() {
      this.nindex = localStorage.getItem('snav');
    },
    methods: {
      /**
       * @Description
       * @author 冯潇
       * @date 2019/8/30
       */
      navClick(i){
        this.nindex=i;
        this.nlabel=this.list[i].label;
      },
      /**
       * @Description
       * @author 冯潇
       * @date 2019/8/30
       */
      // 跳转产品列表页
      shopType(v){
        localStorage.setItem('stype',JSON.stringify(v));
        this.$router.push('shopType')
      },
    },


  }
</script>

<style lang="scss" scoped>
  .top {padding-top: 4.5rem;display: flex;
    .navlist{padding-top:3vw;background:#f5f5f5;width:19vw;
      .nav{transition:.3s;line-height:11vw;text-align: center;font-size:3vw;position:relative;color:#B4B4B4}
      .nav:after{position:absolute;content:'';background:#8CCF32;width:2vw;top:0;bottom:0;left:-2vw;border-radius:50%;transition:.3s}
      .active{background:white;color:#8CCF32}
      .active:after{left:-1vw;}
    }
    .border{flex:1;background:white;min-height:calc(100vh - 4.5rem);
      h1{font-size:4vw;line-height:4vw;padding:3vw 0 1vw 0;color:#686868;text-align:center;transition:.3s}
      .glist{display:flex;flex-wrap: wrap;align-items: center;
        .good{height:27vw;width:27vw;
          img{width:18vw;height:12vw;background:#ccc;display:block;margin:3vw auto}
          p{padding-top:1vw;font-size:3vw;color:#838383;text-align: center}
        }
      }
    }
  }
</style>