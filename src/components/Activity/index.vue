<template>
    <div class="activity">
      <div @click="hello">
       <img src="./redPack.png">
      </div>
    </div>
</template>

<script>

  export default {
    name: "activity",
    methods:{
      hello(){
        this.$router.push('/eventPage')
      }
    },
  }
</script>

<style lang='scss' scoped>
.activity{
    width: 100%;
    margin: 0 auto;
    padding: rem(10) 0;
    img{
        width: 100%;
        height: 100%;
    }
}
</style>