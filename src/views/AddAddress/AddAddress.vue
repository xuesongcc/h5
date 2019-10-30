/*
 * @Author: xuesong 
 * @Date: 2019-09-10 20:56:16 
 * @Last Modified by: xuesong
 * @Last Modified time: 2019-09-12 16:35:06
 */

<script>

    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    import select from './select';

    export default {
        name: "AddAddress",
        data() {
            return {

                isLeft:true,
                title: '',



                switch1: true,
                isSel: false,
                consignee: '', //收货人
                phone: '', //电话
                areas: '', //所在地区
                address: '',
                area: '', //详细地址
                addressId: '',
                saveName: '保存',
                isDelete:false,
                

            };
        },
        components: {
         
            BaseNavbar,
            'v-select': select,
        },
        computed: {
   
        },
        methods: {
            // ======================================================修改进入该页面👇=========================================================//
            getEditData() {
                let addressID = this.$route.query.id;
                console.log('youwu dizhi',this.$route.query);
                if (addressID) {
                    this.addressId = addressID;
                    this.getEditInfo(addressID);
                }
            },
            // 获取要修改的地址详情
            getEditInfo(addressID) {
                let getData = {
                    id: addressID
                };
                
                this.$FDPost('app/sc/address/findAddressOne', getData).then(re => {
                
                    if (re.status == 0) {
                        let addressData = re.data.count[0];
                        this.consignee = addressData.addressee;
                        this.phone = addressData.phone;
                        this.address = `${addressData.pName} ${
                            addressData.cName
                            } ${addressData.aName}`;
                        this.areas = `${addressData.pName},${addressData.cName},${
                            addressData.aName
                            }`;
                        this.area = addressData.detailed;
                        this.switch1 = Boolean(addressData.isDefault);
                    }
                });
            },
            // ======================================================修改进入该页面👆=========================================================//

            // ======================================================获取三级联动地址👇========================================================//
            getArea(v) {
                console.log('地区获取', v);
                this.areas = v.join(',');
                this.address = v.join(' ');
            },
            // ======================================================获取三级联动地址👆========================================================//
            // ======================================================执行保存收货地址👇========================================================//
            // 保存前的检查
            beforeCheck() {
                let saveData = {
                    consignee: this.consignee,
                    phone: this.phone,
                    userId: sessionStorage.getItem('userId'),
                    address: this.areas,
                    area: this.area,
                    isDefault: Number(this.switch1),
                    id: this.addressId,
                };
                if (saveData.consignee == '') {
                    this.$my_message('请输入收货人姓名');
                    return;
                }
                if (saveData.phone == '') {
                    this.$my_message('请输入收货人手机号');
                    return;
                }
                if (saveData.address == '') {
                    this.$my_message('请选择地区');
                    return;
                }
                if (saveData.area == '') {
                    this.$my_message('请输入详细收货地址');
                    return;
                }
                this.doSave(saveData);
            },
            // 执行保存
            doSave(saveData) {
         
                this.$FDPost('app/sc/address/addressSave', saveData).then(re => {
                    
                    if (re.status == 0) {
                        if (this.addressId) {
                            this.$my_message('修改成功');
                        }
                        this.$my_message(re.msg);
                        this.$router.back(-1);
                        this.clearForm();
                    } else {
                        this.$my_message(re.msg);
                    }
                });
            },
            clearForm() {
                this.consignee = '';
                this.phone = '';
                this.areas = '';
                this.address = '';
                this.area = '';
            },
            // 保存收货地址
            saveAddress() {
                this.beforeCheck();
            },
            // ======================================================执行保存收货地址👆========================================================//
            // =====================================================打开弹框关闭弹框骚操作👇===================================================//
            e_openselect() {
                this.isSel = true;
            },
            cancelSel(v) {
                this.isSel = v;
            },
            // =====================================================打开弹框关闭弹框骚操作👆===================================================//
            /**
             * 删除收货地址
             * @private
             */
            _deleteAddress() {
                let params = {
                    userId: sessionStorage.getItem('userId'),
                    id: this.$route.query.id
                };
                this.$FDPost('app/sc/address/deleteAddress', params).then(re => {
                    if (re.status === 0) {
                        this.$my_message('删除成功');
                        this.$router.back(-1);
                    } else {
                        this.$my_message(re.msg);
                    }
                });
            }
        },
        created() {
            if (this.$route.query.id) {
                // this.WTITLE('修改收货地址');
                // this.RBACK(true);
                this.title = '修改地址'
            } else {
                this.title = '添加地址'
                // this.WTITLE('添加收货地址');
                // this.RBACK(true);
            }

        },
        mounted() {
            // 获取修改参数
            this.getEditData();
            if(Object.keys(this.$route.query) != 0){
               
                this.isDelete = true;
            }
        },
    };
</script>
<template>
    <div class="addAddress">
        <!-- <v-navbar v-on:saveAddress='_deleteAddress'/> -->
        <BaseNavbar :title="title" :isLeft="isLeft"></BaseNavbar>
        <div class="top"></div>
        <div class="addAddress_container">
            <div class="s_u_f_label addAddres_formBack">
                <div class="suf_l_title">
                    <div class="sufl_t_test">收货人</div>
                </div>
                <div class="suf_l_inputCon">
                    <input class="suf_l_input" maxlength="8" type="text" v-model="consignee">
                </div>
            </div>

            <div class="s_u_f_label">
                <div class="suf_l_title">
                    <div class="sufl_t_test">联系电话</div>
                </div>
                <div class="suf_l_inputCon">
                    <input class="suf_l_input" maxlength="11" type="text" v-model="phone">
                </div>
            </div>

            <div class="s_u_f_label">
                <div class="suf_l_title">
                    <div class="sufl_t_test">所在地区</div>
                </div>
                <div class="suf_l_inputCon">
                    <input class="suf_l_input" type="text" v-model="address" readonly>
                    <div class="suf_l_imgCodeBtn">
                        <span @click="e_openselect">请选择</span>
                    </div>
                </div>
            </div>

            <div class="s_u_f_label s_u_f_textarealabel">
                <textarea class="s_u_f_textarea" maxlength="255" rows="3" cols="20" placeholder="请填写详细地址，不少于5个字"
                          v-model="area"></textarea>
            </div>
        </div>
        <div class="addAddress_oterbtn">
            <span>设为默认</span>
            <mt-switch v-model="switch1"></mt-switch>
        </div>

        <div class="delect-address" @click="saveAddress">
            保存
        </div>
        <div class="delect-address" v-if="isDelete" @click="_deleteAddress">删除</div>
        <!-- 三级联动 -->
        <v-select v-if="isSel" v-on:cancelSel='cancelSel' v-on:getArea='getArea'/>
    </div>
</template>

<style lang='scss' scoped type="text/scss">
    .delect-address {
        font-size: 5vw;
        text-align: center;
        line-height: rem(100);
        height: rem(100);
        width: rem(300);
        margin: 0 auto;
        background-color: #05d6cc;
        color: #ffffff;
        border-radius: rem(50);
        -moz-box-shadow: 1px 1px 2px #c7d4e1;
        -webkit-box-shadow: 1px 1px 2px #c7d4e1;
        box-shadow: 1px 1px 2px #c7d4e1;
        margin-bottom: 2rem;
    }
    .top{
        margin-top: rem(60)
    }

    .addAddress {
        width: 100%;
        height: 100%;
        background: #f6f6f6;
        padding-top: rem(45);
        overflow: auto;
        position: relative;
    }

    .addAddress_container {
      
        overflow: auto;
        padding: rem(20) rem(20);
        background-color: white;
        margin: rem(20) rem(20);
    }

    // .suf_l_sel {
    //     border: none;
    // }

    .addAddress_oterbtn {
        height: rem(50);
        padding: rem(20) rem(20);
        margin: rem(20) rem(20);
        background-color: white;
        display: flex;
        font-size: rem(28);
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
       
    }

    .addAddress_otherInput {
        width: 100%;
        height: rem(50);
        margin: rem(10) 0;
        background-color: white;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 rem(10);
    }

    .otherInputTitle {
        width: rem(50);
    }

    .shop_user_form {
        width: 80%;
        margin: 0 auto;
    }

    .s_u_f_label {
        width: 100%;
        height: rem(50);
        border-bottom: 1px solid rgba(148, 147, 147, .2);
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .suf_l_title {
        width: rem(150);
        height: rem(50);
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .sufl_t_logo {
        width: rem(10);
        color: #f41721;
    }

    .sufl_t_test {
        color: #6a6969;
        font-size: rem(28);
    }

    .suf_l_inputCon {
        width: 100%;
        height: rem(50);
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .suf_l_input {
        width: 100%;
        height: rem(50);
        background: none;
        font-size: rem(28);
    }

    .suf_l_inputBtn {
        width: rem(120);
        height: rem(35);
        line-height: rem(35);
        text-align: center;
        border-radius: rem(8);
        border: 1px solid #df7800;
        color: #df7800;
    }

    .suf_l_imgCodeBtn {
        width: rem(120);
        // height: rem(35);
        // line-height: rem(35);
        font-size: rem(28);
        text-align: center;
        border-radius: rem(8);
    }

    .suf_otherbtn {
        width: 100%;
        height: 40px;
        margin: rem(10) 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: #fa2e35;
    }

    .suf_subBtn {
        width: 100%;
        height: rem(50);
    }

    .suf_subBtnImg {
        width: 100%;
        height: rem(50);
        margin-top: rem(10);
    }

    .reg_other {
        justify-content: flex-end;
    }

    .s_u_f_textarealabel {
        border-bottom: none;
        height: auto;
    }

    .s_u_f_textarea {
        width: 100%;
        height: rem(100);
        padding-top: rem(10);
        font-size: rem(32)
    }

</style>
