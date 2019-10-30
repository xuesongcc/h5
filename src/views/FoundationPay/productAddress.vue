/**
 * @Description 报单地址页面
 * @author 李雪松
 * @date 2019/8/31
 */
<template>
    <div>
        <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
        <div class="addressManage">
            <div class="menuTitle" v-for="(item,index) in addressList" :key="index">
                <p>{{item.address}}</p>
                <div>
                    <label :for="item.id"><input type="radio" name="payType" :id="item.id" v-model="picked" :value="item" class="a-radio"><span
                            class="b-radio"></span></label>
                    <span>设为默认地址</span>
                </div>
            </div>
        </div>
        <div @click="open" class="confirm">
            确定
        </div>
        <BaseModal message="确定设置为默认地址吗" @e_cancel="cancel" @e_confirm="go" v-if="confirmShow"></BaseModal>
    </div>

</template>

<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    import BaseModal from '@c/BaseModal/BaseModal'
    import eventBus from './event.js';
    export default {
        name: "index",
        data(){
            return {
                title:'选中地址',
                addressList:'',
                isLeft:true,
                picked:'',//选中地址
                confirmShow: false,
            }
        },
        mounted(){
            this.fetchAddress()
        },
        components:{
            BaseNavbar,
            BaseModal
            
        },
        methods:{
            fetchAddress(){
                let params ={
                    isActive:'0',
                }
                this.$FDPost('app/product/findProductAddress',params).then(res=>{
                    if(res.status === 0){
                        console.log('listAddress:',res)
                        this.addressList = res.data
                    }else{
                        this.$my_message(res.msg)
                    }
                })

            },

            /**
             * @Description 确定设置为default地址
             * @author 李雪松
             * @date 2019/8/31
             */

            open(){
                
                if(this.picked.length ===0){
                    this.$my_message('选择一项地址')
                }else{
                    this.confirmShow = true
                }
            },
            cancel(){
                this.confirmShow = false
            },
            // 返回上一页
            go(){
                // console.log('pick',this.picked)
                    localStorage.setItem('addD',this.picked.address);
                    localStorage.setItem('addressId',this.picked.id)
                    this.$router.go(-1)
               
                //传递一个map，choiceHospital是key，value 
                // eventBus.$emit('goAddress',this.picked);
                //调用router回退页面
                
            },
        },
    }
</script>
<style lang="scss" scoped>

    .addressManage {



        margin: rem(100) rem(20);

        .menuTitle{
            border-radius: rem(8);
            padding: rem(20) rem(20);
            background-color: #ffffff;
            margin:rem(20) 0;
            p{
                font-size: rem(28);
                color: #666666;
            }
            span{
                font-size: rem(26);
                color: #999999;
            }

        }

        .a-radio {
            display: none;
        }

        .b-radio {
            display: inline-block;
            border: 1px solid #ccc;


            width: rem(30);
            height: rem(30);
            border-radius: rem(15);
            background: url('./nosel.png') no-repeat;
            background-size: 100% 100%;
            vertical-align: middle;
            margin-right: rem(5);
            position: relative;
        }

        .b-radio:before {
            content: '';
            font-size: 0;
            width: rem(30);
            height: rem(30);
            border-radius: rem(15);
            /*background-color: #FFA313;*/
            background: url("./sel.png") no-repeat;
            background-size: 100% 100%;

            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: rem(-15);
            margin-top: rem(-15);

            display: none;
        }

        .a-radio:checked ~ .b-radio:before {
            display: block;
        }

    }
    .confirm{
        background-color: #05D6CC;
        margin: 0 rem(20);
        color: #ffffff;
        text-align: center;
        line-height: rem(70);
        font-size: rem(28);
        height: rem(70);
        border-radius: rem(8);
    }


</style>