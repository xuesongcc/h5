<template>
  <div class="right">
            <button class="sub" @click="sub">-</button>
            <input type="number" v-model='value'/>
            <button class="add" @click="add">+</button>
</div>
</template>

<script>
  export default{
    data(){
      return{
        value:1,
      }
    },
    methods:{
      add(){
        this.value++;
      },
      sub(){
        this.value--;
      }
    }
  }
</script>

<style lang="scss" scoped>
.right{
    display:inline-block;
    vertical-align: super;
  }
  /*清除input默认样式*/
  input{
    outline:none;   /*去掉谷歌自带的点就input框出现的边框情况*/
    /*-webkit-appearance:button;  是元素标签看起来像个按钮，意思是定义了按钮样式*/
    -webkit-appearance:none;  /*去掉按钮样式*/
    border-radius: 0;
  }
  .right button,.right input{
    background-color: #fff;
    border: 1px solid #999;
    font-size: rem(30);
    text-align: center;
    vertical-align: middle;
    -webkit-appearance : none ;  /*解决iphone safari上的圆角问题*/
    border-radius: 0;
  }
  .right button{
    width: rem(30);
    height: rem(30);
    line-height: rem(20);
    color: #666;
  }
  .right input{
    width: rem(30);
    height: rem(30);
    line-height: rem(20);
    color: #000;
  }
</style>