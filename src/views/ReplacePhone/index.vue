<template>
    <div class="top">
        <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
        <div class="form">
            <div class="currentPhone">当前手机号:{{currentPhone}}</div>
            <form>
                <div class="item">
                    <label for="phone">更改手机号:</label>

                    <div class="input">
                        <div class="left">
                            <CountryCode ref="countryCode"></CountryCode>
                        </div>
                        <input type="number" oninput="if(value.length>11)value=value.slice(0,11)" v-model="phone"
                               id="phone" onkeyup="value=value.replace(/\D/g,'')" placeholder="请输入新的手机号"/>
                    </div>
                </div>

                <div class="item">
                    <label for="code">验证码</label>
                    <div class="input">
                        <input type="number" oninput="if(value.length>4)value=value.slice(0,6)" class="code"
                               v-model="code" id="code" onkeyup="value=value.replace(/\D/g,'')" placeholder="请输入验证码"/>
                        <div class="right" @click="_verificationCode">{{text}}</div>
                    </div>
                </div>
                <!--            确定按钮-->
                <div class="submit" @click="confirmBeforeCheck">确认</div>
            </form>
        </div>
    </div>
</template>

<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    import CountryCode from '@c/CountryCode/index';
    export default {
        name: "ChangePassword",
        data(){
            return {
                title:'修改手机号',
                isLeft: true,
                currentPhone:'',
                //验证码提示
                text: '获得验证码',
                phone: '',// 手机号
                isPoint: false, //防止连点
            }
        },
        components:{
            BaseNavbar,
            CountryCode,
        },
        created(){


        },
        mounted(){
            this.fetchCurrentPhone()
        },
        methods:{
            // 获取当前手机号
            fetchCurrentPhone(){
                let params= {
                    userName: sessionStorage.getItem('username')
                };
                this.$FDPost('app/sc/my/getPhone',params).then(res=>{
                    if(res.status === 0){

                        this.currentPhone= res.data.phone
                    }else {
                        this.$my_message(res.message)
                    }
                })
            },
            /**
             * 发送验证码验证
             * @private
             */
            _verificationCode() {



                // let phoneCheck = /^1[3456789]\d{9}$/;
                let phone = this.currentPhone
                if( phone.length < 0 ) {
                    this.$my_message('用户未登录')
                    return
                }
                this._sendSMS();
            },
            /**
             * 发送验证码
             * @private
             */
            _sendSMS() {
                if (this.isPoint) {
                    return;
                }
                let params = {
                    // code: 'CN',
                    areaCode: this.$refs.countryCode.currentData.dialCode,
                    phone: this.phone
                };
                this.isPoint = true;
                this.$FDPost('app/sc/my/sendReplacePhoneCode', params).then(res => {
                    console.log('sendSMS',res)
                    if (res.status === 0) {
                        this.$my_message(res.msg);
                        this._countdown();
                    } else {
                        this.$my_message(res.msg);
                        this.isPoint = false;
                    }
                })
            },
            /**
             * 倒计时
             * @private
             */
            _countdown() {
                let num = 60;
                this.text = num + 's';
                this.timer = setInterval(() => {
                    if (num <= 0) {
                        this.isPoint = false;
                        this.text = '获得验证码';
                        clearInterval(this.timer);
                        return;
                    }
                    num--;
                    this.text = num + "s";
                }, 1000);
            },
            /**
             * 提交之前验证
             * @private
             */
            confirmBeforeCheck() {

                if (this.code === '') {
                    this.$my_message('请输入验证码');
                    return;
                }


                // phone  手机号
                // userId
                // phoneCode  验证码
                // type
                let data = {

                    userId: sessionStorage.getItem('userId'),
                    phone: this.phone,
                    phoneCode: this.code,
                    // type:''

                };

                this.confirm(data);
            },
            confirm(params){
                console.log('确认后的结果 ',params)
                this.$FDPost('app/sc/my/replacePhone',params).then(res=>{
                    console.log(res)
                    if(res.status ===0){
                        this.$router.push('/')
                        this.$my_message('修改成功')
                    }else{
                        this.$my_message(res.msg)
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .top{
        margin-top: 4.5rem;
        .currentPhone{
            font-size: rem(28);
            font-weight: bold;
        }
    }

    .form {
        padding: 0 rem(39);

        .item {
            border-bottom: rem(1) solid #C6C5C5;

            label {
                display: block;
                padding-top: rem(35);
                font-size: rem(28);
                font-weight: bold;

            }

            .input {
                display: flex;
                height: rem(90);
                align-items: center;
                input {
                    flex: 1;
                    height: rem(48);
                    padding-left: rem(10);
                    font-size: rem(26);
                    background-color: transparent;
                    &.code {
                        width: rem(235);
                    }
                }


                .right {
                    flex: 0 0 rem(235);
                    display: flex;
                    width: rem(235);
                    height: rem(60);
                    align-items: center;
                    justify-content: center;
                    background-color: #05D6CC;
                    font-size: rem(26);
                    color: #FFFFFF;
                    -webkit-border-radius: rem(5);
                    -moz-border-radius: rem(5);
                    border-radius: rem(5);
                }
            }
        }

        .submit {
            display: flex;
            width: 100%;
            height: rem(100);
            margin: 0 auto;
            align-items: center;
            justify-content: center;
            -webkit-border-radius: rem(10);
            -moz-border-radius: rem(10);
            border-radius: rem(10);
            background-color: #05D6CC;
            font-size: rem(34);
            color: #FFFFFF;
        }
    }
</style>