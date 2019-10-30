<template>
  <div class="top">
    <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
    <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="getData" @click="clickFn">
      <div class="box" slot-scope="props">
        <h1>{{props.value.info.goodsName}}</h1>
        <dl>
          <dt>¥{{props.value.info.marketRetailPrice}}</dt>
          <dd v-if="props.value.info.isItPreSale">限时优惠</dd>
        </dl>
      </div>
    </vue-waterfall-easy>

  </div>
</template>

<script>
  import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
  import vueWaterfallEasy from 'vue-waterfall-easy'
  export default {
    name: "shoptype",
    data() {
      return {
        title: '',
        isLeft: true,
        stype:{},
        imgsArr: [
          {src:'./test.png',info:{goodsName:'aasfasdfsdf',marketRetailPrice:'1213',isItPreSale:true}},
          {src:'./test.png',info:{goodsName:'vasfasdfsdf',marketRetailPrice:'2213',isItPreSale:false}},
          {src:'./test.png',info:{goodsName:'casfasdfsdf',marketRetailPrice:'3213',isItPreSale:false}},
          {src:'./test.png',info:{goodsName:'dasfasdfsdf',marketRetailPrice:'4213',isItPreSale:false}},
        ],
        group: 0, // request param 分页计数器
      }
    },
    components: {
      BaseNavbar,vueWaterfallEasy
    },
    mounted() {
      this.stype = JSON.parse(localStorage.getItem('stype'));
      this.title='分类-'+this.stype.label;
      this.getData();
    },
    methods: {
      /**
       * @Description
       * @author 冯潇
       * @date 2019/8/30
       */
      // 获取数据
      getData() {
        // let parmas = {
        //   stype:this.stype.id,
        //   group: this.group,
        // };
        // this.$FDPost('/app/sc/classification/itemCats/goods',parmas).then(res=>{
        //   if(res.status === 0 ){
        //     if (this.group === 10) { // 模拟已经无新数据，显示 slot="waterfall-over"
        //       this.$refs.waterfall.waterfallOver()
        //       return
        //      }
        //     this.imgsArr = this.imgsArr.concat(res.data)
        //     this.group++
        //   }else {
        //     this.$my_message(res.msg)
        //   }
        //
        // })
      },
      /**
       * @Description
       * @author 冯潇
       * @date 2019/8/30
       */
      // 跳转详情
      clickFn(event, { index, value }) {
        console.log('img clicked',index, value)
        this.$router.push('/shopDetail')
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
    .vue-waterfall-easy-container{height:calc(100vh - 4.5rem);padding:0 1.5vw}
  }
</style>