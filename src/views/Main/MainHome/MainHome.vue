/**
* @desc 首页
* @author WL
* @date 2019/3/4
* @version 1.0
*/
<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    import Swiper from '@c/Swiper/Swiper';
    import Activity from '@c/Activity'
    // import SearchInput from '@c/SearchInput'


    export default {
        name: "MainHome",
        components: {
            BaseNavbar,
            Swiper,
            Activity,
            // SearchInput,// 搜索框

        },
        data() {
            return {
                //隐藏左边返回
                isLeft: false,
                //banner图
                banners: [],
                showNotice: false,
                maxValue: '',
                minValue: '',

                travelList:[],// 旅游商品列表

            };
        },
        mounted() {
            this.$store.dispatch('GetRedeemData').then(re => {
                this.showNotice = re.sn
            })
                this._getBanner();
            this.fetchTravelList();
        },
        methods: {
            // 跳转到详情页
            goDetail(id){
                console.log('id',id)
                this.$router.push({path:'/productDetails',query:{id}})
            },

            /**
             * @Description
             * @author 李雪松
             * @date 2019/8/28
             */
            // 获取旅游列表
            fetchTravelList(params){
                if(params===null || undefined){
                    params = ''
                }
                this.$FDPost('travel/tourismList',params).then(re => {
                    console.log('精品旅游商品：',re)

                    if (re.status === 0) {
                        this.travelList = re.data.rows

                    } else {
                        this.$my_message(re.msg);
                    }
                });

            },
            /**
             * 获得banner图
             * @private
             */
            _getBanner() {
                    this.$FDPost('/app/pm/main/sowingBanner').then(re => {
                    console.log('轮播图：',re)
                        if (re.status === 0) {
                            let arr = []
                            re.data.forEach(el => {
                               arr.push(el.pic)
                            });
                            this.banners = arr;
                        } else {
                            this.$my_message(re.msg);
                        }
                });
            },
            selectPrice(){
                let _that = this;
                let params= {
                    minPrice: _that.minValue,
                    maxPrice: _that.maxValue,
                    routeCategory: '1',// 精品
                }
                this.fetchTravelList(params)
            },
            more(){
                this.$router.push('/allTravelLine')
            },
        }
    };
</script>

<template>
    <div class="home">
        <BaseNavbar title="首页" :isLeft="isLeft"></BaseNavbar>
        <Swiper :list="banners"></Swiper>
        <Activity></Activity>
        <div class="hsearch">
          <span>价格区间</span>
          <input type="number" placeholder="最低价" v-model="minValue">
          <i></i>
          <input type="number" placeholder="最高价" v-model="maxValue">
          <button @click="selectPrice">确定</button>
        </div>
<!--        <SearchInput></SearchInput>-->
        <div class="router">
            <span class="left">精品路线</span>
            <span class="right" @click="more">所有路线>></span>
        </div>
        <div class="card-list" >
            <div  class="card" v-for="item in travelList" :key="item.id" @click="goDetail(item.id)">
                <!-- <div class="card-img">
                    <img :src="item.goodsLogo">
                </div> -->
                <img :src="item.goodsLogo">
                <div class="card-context">
                    <p class="card-name">{{item.goodsName}}</p>
                    <p class="card-synopsis">{{item.synopsis}}</p>
                    <p>
                        <span class="card-value">{{item.goodsPrice}}<span class="unit">/人</span></span>
                        <span class="fr card-pay">{{item.salesVolume}}<span>人购买</span></span>
                    </p>
                </div>

            </div>
        </div>

    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .home {
        padding-top: rem(90);

        .marginTop {
            margin-top: rem(15);
        }
        .left{
            float: left;
            font-size: rem(40);
            font-weight: bold;
        }
        .right{
            float: right;
            font-size: rem(30);
        }
        .hsearch{
          display:flex;padding:0 3.2vw;background:white;align-items: center;height:11vw;
          span{padding-right:9.9vw;color:#ccc;font-size:4vw}
          input::-webkit-input-placeholder {color: #ccc;}
          input{line-height:5vw;width:13vw;font-size:3vw;border-radius: 1vw;border:1px solid #ccc;background:#fafafa;text-align: center}
          i{width:7vw;height:1px;background:#ccc;margin:0 1vw}
          button{margin-left:7vw;color:#05D6CC;font-size:3vw;border:none;background:transparent;}
          /*button{margin-left:15vw;background-color:#05D6CC;font-size:3vw;width:10vw;border-radius: 1vw;outline: none;height: 6vw;color: #ffffff}*/
        }
        .router{
            text-align: center;
            height: rem(40);
            line-height: rem(40);
            padding: rem(10) rem(20);

        }
        .card-list{
            padding: rem(20) rem(20);

            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            
            .card{

                // margin: 0 auto;
                /*padding: 2rem;*/
                margin-bottom: rem(20);
            
                background-color: #ffffff;
                border-radius: rem(10);
                padding-bottom: rem(10);
                // .card-img{
                //     border-radius: rem(8);
                //     img{width:46vw;height:31vw;background:#ccc;margin-bottom:3vw;}
                // }
                img{width:46vw;height:35vw;background:#ccc;margin-bottom:2vw; border-radius: 2vw 2vw 0 0}
                .card-name{
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow:ellipsis;//省略号
                    color:#333333;
                    font-size: rem(26);
                    font-weight: bold;
                    margin-bottom: rem(10);
                }
                .card-synopsis{
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    color:#333333;
                    font-size: rem(26);
                    font-weight: bold;
                    margin-bottom: rem(10);
                    width: rem(300)

                }
                .card-context{
                    padding: 0 rem(20);

                }
                .card-value{
                    color: #FF254E;
                    font-size: rem(32);

                }
                .card-pay{
                    display: block;
                    line-height: 2rem;
                }
            }
        }
        /*网格布局*/
        /*.card-list{*/
        /*    display: grid;*/
        /*    margin: 0 rem(20);*/
        /*    grid-template-columns: 1fr 1fr;*/
        /*    !*grid-column-gap: rem(100);*!*/
        /*    !*grid-row-gap: rem(100);*!*/
        /*    .card-img img{*/

        /*        height: rem(500);*/
        /*    }*/
        /*    .card{*/
        /*        padding: 0 rem(20);*/
        /*        background-color: #ffffff;*/
        /*    }*/

        /*}*/
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
