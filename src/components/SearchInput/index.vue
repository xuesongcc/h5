<template>
    <div class="searchInput">
        <input placeholder="价格搜索" class="input-text">
        <i class="icon"></i>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style lang="scss" scoped>
.searchInput{

    padding:0 rem(20);
}

.input-text{
    height: rem(80);
    width: 100%;
    border-radius: rem(40);
    font-size: rem(30);

}
input::-ms-input-placeholder{text-align: center;}
input::-webkit-input-placeholder{text-align: center;}

</style>

