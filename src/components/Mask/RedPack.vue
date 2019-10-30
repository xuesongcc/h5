<template>
    <div>
        <img src="./close.png" alt="" class="close" @click="$store.dispatch('SetRedeemData', {mask:0})">
        <div class="jbbg">
          <h3>{{num}}元红包</h3>
          <h1>送给您</h1>
          <!-- <p>活动时间：{{startDate}}－{{endDate}}</p> -->
        </div>
        <img src="./getbtn.png" alt="" class="getbtn" @click="submit">
    </div>
</template>

<script>
    export default {
        name: "redpack",
        data() {
          return {
            num:0,
            startDate:'2019/08/28',
            endDate:'2022/08/28'
          };
        },
        mounted(){
            this.fetchRedMoney()
        },
        methods:{
            /**
             * @Description 获取红包金额
             * @author 李雪松
             * @date 2019/8/31
             */
            fetchRedMoney(){
                let params = {
                    userId : sessionStorage.getItem('userId')
                }
                this.$FDPost('/drawRedpacketMoney',params).then(re => {
                    console.log('red money：',re);

                    if (re.status === 0) {
                       this.num = re.data

                    } else {
                        this.$my_message(re.msg);
                    }
                });
            },
          submit(){
           
            let params = {
              // userId: '402882fd6cc36ac3016cc36e919c0000',
              userId:sessionStorage.getItem('userId')
            };
            this.$FDPost('receiveReward', params).then(re => {
              if (re.status === 0) {
                this.$my_message('领取成功');
                this.$router.push('/eventPage');
              } else {
                this.$my_message(re.msg);
                this.$store.dispatch('SetRedeemData', {mask:0});
              }
            });
          }


        },
    }
</script>

<style lang='scss' scoped>
  .close{width:7vw;height:7vw;margin-left:60vw;}
  .jbbg{display:flex;flex-direction: column;align-items: center;width:75vw;height:73vw;margin:22px 0;
    background:url("./jbbg.png") no-repeat center;background-size:100% auto;
    h1,h3{background-image:-webkit-linear-gradient(bottom,#FF3D48,#FF747B);-webkit-background-clip:text;-webkit-text-fill-color:transparent; }
    h3{font-size:7vw;text-align: center;margin-top:26vw;line-height:7vw;}
    h1{margin:4vw 0 23vw 0;font-size:5vw;line-height:5vw;}
    p{color:#F5E770;line-height:3vw;font-size:3vw;}
  }
  .getbtn{width:45vw;height:12vw;}
</style>