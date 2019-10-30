<template>
    <div>
        <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
        <div class="top" @click="hello">
            <img src="./eventBg.jpg">
        </div>
        <div class="context">
          <h1>红包记录</h1>
          <div class="box" v-for="(item,index) in list" :key="index">
            <dl>
              <dt>红包</dt>
              <dd>领取时间:{{item.createTime}}</dd>
            </dl>
            <p>+ <span>{{item.profitCount}}</span></p>
          </div>
          <h2 v-if="list.length ===0">暂无数据</h2>
        </div>
    </div>
</template>

<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    // import {setToken} from "../../until/token";
    export default {
        name: "fund",
        data() {
            return {
              isLeft: true,
              title: '天天开红包',
              empty:false,
              list:[],

            };
        },
        methods: {
          hello(){
            // setToken('Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNTA1MzEyMDczOSIsImF1dGgiOiJST0xFX1VTRVIiLCJ1c2VySWQiOiI0MDI4ODJmZDZjYzM2YWMzMDE2Y2MzNmU5MTljMDAwMCIsInVzZXJOYW1lIjoiMTUwNTMxMjA3MzkiLCJleHAiOjE1Njc4NTAwODR9.CWjieq_t9Qbc0UVon-c3CXhF3IGgolHzVZqf0XXK1tfYHU9OWMKd9orIXZU9590_CYjt-UuUw3pPy-glNQQhzg')
            // let params = {
            //   // userId: '402882fd6cc36ac3016cc36e919c0000',
            //   userId:sessionStorage.getItem('userId')
            // };
            // this.$FDPost('receiveReward', params).then(re => {
            //   if (re.status === 0) {
            //     this.$store.dispatch('SetRedeemData', {mask:1});
            //   } else {
            //     this.$my_message(re.msg);
            //   }
            // });
            this.$store.dispatch('SetRedeemData', {mask:1});
          },

          /**
           * @Description
           * @author 李雪松
           * @date 2019/8/31
           */
            fetchRedPackRecord(){
                let params = {
                    userId: sessionStorage.getItem('userId')
                }
              this.$FDPost('/redPackReceiving', params).then(re => {
                  if (re.status === 0) {
                      this.list = re.data
                  } else {
                      this.$my_message(re.msg);
                  }
              });

          }
        },
        mounted() {
            this.fetchRedPackRecord()
        },
        components: {
            BaseNavbar,

        },
    }
</script>

<style lang="scss" scoped>
  .top{padding-top:4.5rem}
.context{
  margin:-3vw 3vw 0 3vw;padding:0 3vw;background:white;border-radius: 1vw;position:relative;
  h1{line-height:10vw;font-size:4vw;color:#FFBC10;border-bottom:1px solid #f2f2f2}
  h2{text-align: center;color:#999999;font-size:4vw;line-height:4vw;padding:3vw 0 5vw 0}
  .box{border-bottom:1px solid #f2f2f2;margin-bottom:-1px;
    dl{display:flex;flex-direction: row;align-items: center;justify-content: space-between;height:9vw;
      dt{font-size:4vw;color:#333333}
      dd{font-size:3vw;color:#999999}
    }
    p{font-size:4vw;color:#FF9600;line-height:3vw;padding-bottom:6vw;}
  }
}


</style>