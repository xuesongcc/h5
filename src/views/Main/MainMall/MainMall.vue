/*
 * @Author: xuesong 
 * @Date: 2019-09-07 16:02:39 
 * @Last Modified by: xuesong
 * @Last Modified time: 2019-09-09 15:18:12
 */
/**
* @Description
* @author 李雪松--商城
* @date 2019/8/23
*/
<template>
    <div>
      <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
      <Swiper class="zoomswiper" :list="banners"></Swiper>
      <div class="sbox">
        <div class="sbtn" v-for="(item,index) in shoppingList" :key="index" :style="'order:'+item.displayOrder"
             @click="shopNav(index)">
          <img :src="item.icon" alt="">
          <dl>
            <dt>{{item.label}}</dt>
            <dd>{{item.ename}}</dd>
          </dl>
        </div>
      </div>
      <div class="hbox">
        <div class="hbtn" v-for="(item,index) in mallList" :key="index" :style="'order:'+item.displayOrder" @click="goDetail(item)">
          <img :src="item.goodsLogo" alt="">
          <p>{{item.businessName}}</p>
          <dl>
            <dt>¥ <span>{{item.platformRetailPrice}}</span></dt>
            <dd>立即抢购</dd>
          </dl>
        </div>
      </div>


<!--        <div v-for="item in mallList" :key="item.goodsSkuId" class="classification">-->
<!--            <div @click="fetchShoppingDetail(item.goodsSkuId)">热卖商品</div>-->
<!--        </div>-->
<!--        <div v-for="item in detailList" :key="item.goodsSkuId" class="classification" >-->
<!--            <div>单个商品详情</div>-->
<!--        </div>-->

    </div>
</template>

<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    import Swiper from '@c/Swiper/Swiper';

    export default {
        name: "MainMall",
        components: {
            BaseNavbar,
            Swiper

        },
        data() {
            return {
                isLeft: false,
                title: '商城',
                banners: [],
                sortList: [],
                shoppingList:[],// 商品分类的商品列表数组
                mallList:[
                ],// 商品列表
                detailList:[],// 单个商品的详情
            }
        },
        created() {
            this.init();


        },
        mounted() {

            // this._getBanner();
            // this.fetchClassfication();
        },
        methods: {
            init(){
                this._getBanner();
                this.fetchClassfication();
                this.fetchHotShopping()
                this.fetchShoppingDetail()
            },
            /**
             * @Description 
             * @author 李雪松
             * @date 2019/8/24
             */
            // 获取商城banner
            _getBanner() {
                this.$FDPost('/app/sc/main/sowingBanner').then(re => {

                    console.log('轮播图：', re)
                    if (re.status === 0) {


                        let arr = [];
                        re.data.forEach(item => {
                            arr.push(item.pic);
                        });

                        this.banners = arr

                    } else {

                        this.$my_message(re.msg);
                    }
                });
            },
            /**
             * @Description 
             * @author 李雪松
             * @date 2019/8/24
             */
            //  获取商品分类
            fetchClassfication() {
                let params = {
                    type: '1',
                    id: '0',
                }
                this.$get(`app/sc/classification/getJsonTree/${params.id}/${params.type}`).then(res => {
                        if (res.status === 0) {
                            console.log('分类', res)
                            this.sortList = res.data
                            this.shoppingList = res.data
                        }
                    }
                )
            },

            /**
             * @Description
             * @author 李雪松
             * @date 2019/8/24
             */
            // 获取分类商品的商品列表
            // fetchMallShoppingList(id){
            //    let params={
            //        id: id,
            //        type: 1
            //    }
            //     console.log("id:",id)
            //     this.$FDPost('/app/sc/classification/itemCats/goods',params).then(res=>{
            //         console.log("getMallShopping:",res)
            //     })
            // },

            /**
             * @Description
             * @author 李雪松
             * @date 2019/8/24
             */
            // 获取展示的热卖商品
            fetchHotShopping(){
                this.$FDPost('app/sc/main/hotSelling').then(res=>{
                    if (res.status === 0) {
                        this.mallList = res.data
                        console.log('热卖商品：',res)
                    } else {
                        this.$my_message(res.msg);
                    }
                })
            },

            /**
             * @Description
             * @author 李雪松
             * @date 2019/8/24
             */
            // 获取单个商品详情
            fetchShoppingDetail(){
                // console.log('单个商品的goodSkuId',id)
                // let params = {
                //     goodsSkuId: id
                // }
                //
                // this.$FDPost(`app/sc/details/goodsDynamicDeal/${params.goodsSkuId}`).then(res=>{
                //     if (res.status === 0) {
                //         this.detailList = res.data
                //         console.log('单个商品列表：',res)
                //     } else {
                //         this.$my_message(res.msg);
                //     }
                // })
            },

            /**
             * @Description
             * @author 冯潇
             * @date 2019/8/30
             */
            // 跳转二级菜单页面
            shopNav(i){
              localStorage.setItem('snav',i);
              this.$router.push('shopNav')

              
            },

            // go详情页 ----lxs
            goDetail(data){
              console.log('商品所有的数据',data.goodsSkuId)
              // this.$router.push({path:'/shopDetail',query:data})
           
              this.$router.push({path:'/shopDetail',query:{goodsSkuId:data.goodsSkuId}})

            },

        }

    }
</script>

<style lang="scss" scoped>
  .zoomswiper{padding-top:4.5rem;overflow-y: visible}
  .sbox{display: flex;flex-wrap: wrap;justify-content: space-between;padding:3vw 3vw 0 3vw;
    .sbtn{background:white;width:45vw;height:20vw;display:flex;align-items: center;margin-bottom:3vw;border-radius:1vw;
      img{width:11vw;height:11vw;background:#ccc;margin:0 2vw 0 5vw}
      dl{color:#333;
        dt{line-height:3.75vw;font-size:3.75vw;padding-bottom:1.5vw;}
        dd{font-size:3vw;line-height:3vw;}
      }
    }
  }
  .hbox{display: flex;flex-wrap: wrap;justify-content: space-between;padding:0 3vw;
    .hbtn{background:white;width:39vw;height:45vw;display:flex;flex-direction:column;align-items: center;
      padding:0 3vw;margin-bottom:3vw;border-radius:1vw;
      img{width:45vw;height:31vw;background:#ccc;margin-bottom:3vw;}
      p{font-size:3vw;color:#333;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;line-height:3vw;width:100%}
      dl{color:#333;margin-top:3vw;display: flex;justify-content: space-between;align-items: center;width:100%;
        dt{line-height:5vw;font-size:2vw;color:#FD6906;
          span{font-size:4vw;}
        }
        dd{font-size:3vw;line-height:3vw;padding:1vw 2vw;background:#FD9306;color:white;border-radius:1vw;}
      }
    }
  }
</style>