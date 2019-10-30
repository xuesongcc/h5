<template>
    <div>
        <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
    </div>
</template>

<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    export default {
        name: "ChangePassword",
        data(){
            return {
                title:'消费记录',
                isLeft: true,
            }
        },
        components:{
            BaseNavbar,
        },
        mounted() {
            this.fetchExpensesRecord()
        },
        methods:{
            fetchExpensesRecord(){
               console.log('消费记录')
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>