<template>
    <div class="myReservation">
        <BaseNavbar title="我的预定" :isLeft="isLeft"></BaseNavbar>
        <!--功能选项-->
        <div class="tradingNavArea">
            <div class="navList" :class="[currentNavId == v.id ? 'active' :'',closeTab?'closetab':'']"
                 v-for="(v,i) in navList" :key="i"
                 @click="e_selNav(v.id)">
                <span>{{v.label}}</span>
            </div>
        </div>
        <!--页面区域-->
        <div class="pageArea">
            <!--待支付-->
            <div v-if="currentNavId === -1"></div>
            <!--待确认-->
            <div v-if="currentNavId === 0"></div>
            <!--待出行-->
            <div v-if="currentNavId === 1"></div>
            <!--已完成-->
            <div v-if="currentNavId === 2"></div>



            </div>
    </div>
</template>


<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    export default {
        name: "MyReservation",
        data() {
            return {
                isLeft: true,
                navList: [
                    {
                        id: 0,
                        label: '待支付',
                    },
                    {
                        id: 1,
                        label: '待确认',
                    },
                    {
                        id: 2,
                        label: '待出行',
                    },
                    {
                        id: 3,
                        label: '已完成',
                    },
                ],
                currentNavId: 0,


                closeTab:false
            };
        },

        components: {
            BaseNavbar,

        },

        computed: {},
        mounted(){
            this.fetchList()
        },
        methods:{
            e_selNav(i) {
                this.currentNavId = i

                this.fetchList(i)
                console.log('lllid',i)

            },
            fetchList(){
                let params = {
                    offset:0,
                    limit:10,
                    userId: sessionStorage.getItem('userId'),
                    status:1
                }
                this.$FDPost('tourismOrderList',params).then(res=>{
                    if(res.status === 0 ){
                        console.log(res)
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .myReservation{
        margin-top: 4.5rem;
    }
    .tradingNavArea {
        width: 100%;
        height: rem(78);
        background-color: white;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-around;

    .navList {
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: rem(28);
    &.closetab{
         pointer-events: none;
     }
    &.active {
         color: #05D6CC;
         border-bottom: 3px solid #05D6CC;
     }
    }

    }
</style>