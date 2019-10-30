<script>
    import BaseNavbar from '@c/BaseNavbar/BaseNavbar';
    import BuyOrder from './BuyOrder/BuyOrder'
    import SelOrder from './SelOrder/SelOrder'
    import close from './close.png'
    import {uploadOSS} from '@u/oss';
    import {formatDate} from '@u/formatDate'
    import BaseModal from '@c/BaseModal/BaseModal'
    import save from './save.png'
    import BaseInputModal from '@c/BaseInputModal/BaseInputModal'

    export default {
        name: 'MyOrder',
        data() {
            return {
                save,
                backPath: 'dealhis',
                title: '我的订单',
                type: '',// 0 卖给别人  1买别人的
                orderId: '',//订单ID
                isUpLoad: false,
                isShowImg: false,
                ossUrl: '',//oss上传图片后的路径
                boxImg: '',//弹框图片路径
                close,
                //上传
                Filetype: 0,
                orderInfos: {
                    realName: '',
                    phone: '',
                    orderId: '',
                    alipayNumber: '',//支付宝号
                    buyerEvidence: '',//交易凭证
                    number: '',//交易数量
                    price: '',//交易单价
                    sumPrice: '',//总金额
                    createTime: '',//时间
                    status: '',//订单状态
                    alipayCode: '',//支付宝收款码
                },
                message: '',//确定订单
                tsmessage: '',//投诉
                modal1: false,//买家上传凭证 密码弹框
                modal3: false,//卖家完成订单 密码弹框
                modal2: false,//卖家投诉假截图 密码弹框
            };
        },

        components: {
            BaseNavbar,
            BuyOrder,
            SelOrder,
            BaseModal,
            BaseInputModal,
        },

        computed: {},

        methods: {
            /**
             * @Description: 获取跳转到页面携带的参数
             * @author 李雪松
             * @date 2019/3/7
             */
            checkType() {
                let type = this.$route.params.type
                this.orderId = this.$route.params.orderId
                this.type = type
            },
            /**
             * @Description: 获取交易详情
             * @author 李雪松
             * @date 2019/3/9
             */
            getInfo() {
                let params = {
                    tradeId: this.orderId,
                    userId: sessionStorage.getItem('userId')
                }
                this.$FDPost('getTradeRecordDetails', params).then(re => {
                    console.log('详情', re);
                    if (re.status == 0) {
                        this.orderInfos.realName = re.data.realName
                        this.orderInfos.phone = re.data.phoneNo
                        this.orderInfos.orderId = re.data.id
                        this.orderInfos.alipayNumber = re.data.alipayNumber
                        this.orderInfos.wxCode = re.data.wxCode
                        this.orderInfos.buyerEvidence = re.data.buyerEvidence
                        this.orderInfos.number = re.data.number
                        this.orderInfos.price = re.data.price
                        this.orderInfos.sumPrice = re.data.sumPrice
                        // this.orderInfos.createTime = re.data.createTime
                        let t = new Date(re.data.createTime)
                        console.log('时间', t);
                        this.orderInfos.createTime = formatDate(t, 'yyyy-MM-dd hh:mm:ss')
                        console.log('时间', this.orderInfos.createTime);
                        this.orderInfos.status = re.data.status
                        this.orderInfos.alipayCode = re.data.alipayCode
                    }
                })
            },
            /**
             * @Description: 返回路径
             * @author 李雪松
             * @date 2019/3/7
             */
            pageGo() {
                // this.$router.push({
                //     path: '/dealhis'
                // });
                this.$router.push({
                    path: '/tradinghall'
                });
            },
            /**
             * @Description: 上传凭证
             * @author 李雪松
             * @date 2019/3/7
             */
            uploadFile() {
                this.isUpLoad = true
            },
            /**
             * @Description: 拍照上传
             * @author 李雪松
             * @date 2019/3/8
             */
            e_photo() {
                try {
                    Android.paizhao();
                    this.Filetype = 0;
                } catch (e) {
                    this.Filetype = 1
                    this.$refs.hiddenInput.click();
                }
            },
            /**
             * @Description: 相册上传
             * @author 李雪松
             * @date 2019/3/8
             */
            uploadByAlbum() {
                try {
                    Android.pic();
                    this.Filetype = 0;
                } catch (e) {
                    this.Filetype = 1
                    this.$refs.hiddenInput.click();
                }
            },
            /**
             * 将base64转化成文件
             * @param dataurl
             * @param filename
             * @returns {File}
             */
            dataURLtoFile(dataurl, filename) {
                //将base64转换为文件
                var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, {type: mime});
            },
            /**
             * @Description: 暴露给安卓调用方法返回页面base64图片信息
             * @author 李雪松
             * @date 2019/3/8
             */
            wave2(str, base64) {
                base64 = 'data:image/png;base64,' + base64;
                let file = this.dataURLtoFile(base64, new Date().getTime());
                this.uploadImage(file);
            },
            /**
             * @Description: 上传图片到OSS
             * @author 李雪松
             * @date 2019/3/9
             */
            async uploadImage(event) {
                this.$my_message('图片上传中,请稍后...')
                this.isUpLoad = false
                this.ossUrl = await uploadOSS(event, this.Filetype);
            },

            /**
             * @Description: 关闭密码框
             * @author 李雪松
             * @date 2019/4/8
             */
            closeModal1() {
                this.modal1 = false
            },

            /**
             * @Description: 买家上传完凭证 输入完密码 操作订单
             * @author 李雪松
             * @date 2019/4/8
             */
            econfirmModal1(pwd) {
                let params = {
                    tradeId: this.orderInfos.orderId,
                    buyerEvidence: this.ossUrl,
                    tradePassword:pwd,
                    status: 1
                }
                this.$FDPost('updateTradeRecord', params).then(re => {
                    if (re.status === 0) {
                        this.$my_message('凭证上传成功')
                        this.orderInfos.buyerEvidence = this.ossUrl
                        this.modal1 = false
                    } else {
                        this.$my_message(re.msg)
                    }
                })
            },

            /**
             * @Description: 买家上传凭证 点击确定
             * @author 李雪松
             * @date 2019/3/9
             */
            doUpload() {
                this.modal1 = true
            },
            /**
             * @Description: 取消上传
             * @author 李雪松
             * @date 2019/3/7
             */
            e_cancelUp() {
                this.isUpLoad = false
            },
            /**
             * @Description: 查看凭证
             * @author 李雪松
             * @date 2019/3/8
             */
            goshow(v) {
                this.boxImg = v
                this.isShowImg = true
            },
            /**
             * @Description: 关闭凭证查看
             * @author 李雪松
             * @date 2019/3/8
             */
            e_closeShowImg() {
                this.isShowImg = false
            },

            /**
             * @Description: 关闭假图投诉
             * @author 李雪松
             * @date 2019/4/8
            */
            closeModal2(){
              this.modal2 = false
            },
            /**
             * @Description: 假图投诉
             * @author 李雪松
             * @date 2019/3/9
             */
            jiatu() {
                this.tsmessage = '确定交易凭证无效，进行投诉？'
            },
            //取消投诉
            e_cancelTS() {
                this.tsmessage = ''
            },

            /**
             * @Description: 卖家输入完密码 投诉假截图
             * @author 李雪松
             * @date 2019/4/8
            */
            econfirmModal2(pwd){
                let params = {
                    tradeId: this.orderInfos.orderId,
                    tradePassword:pwd,
                    status: 2
                }
                this.$FDPost('updateTradeRecord', params).then(re => {
                    if (re.status == 0) {
                        this.$my_message('投诉成功')
                        this.getInfo()
                        this.tsmessage = ''
                        this.modal2 = false
                    } else {
                        this.$my_message(re.msg)
                    }

                })
            },
            //确定投诉
            e_confirmTS() {
                this.modal2 = true
                this.tsmessage = ''
            },

            /**
             * @Description: 关闭完成订单 输入交易密码
             * @author 李雪松
             * @date 2019/4/8
            */
            closeModal3(){
              this.modal3 = false
            },

            /**
             * @Description: 完成订单
             * @author 李雪松
             * @date 2019/3/9
             */
            overOrder() {
                this.message = '确定交易凭证有效，执行完成订单？'

            },
            //    取消完成订单
            e_cancelWC() {
                this.message = ''
            },

            /**
             * @Description: 卖家完成订单 输入完成交易密码
             * @author 李雪松
             * @date 2019/4/8
            */
            econfirmModal3(pwd){
                let params = {
                    tradeId: this.orderInfos.orderId,
                    tradePassword:pwd,
                    status: 3
                }
                this.$FDPost('updateTradeRecord', params).then(re => {
                    if (re.status == 0) {
                        this.$my_message('订单已完成')
                        this.getInfo()
                        this.message = ''
                        this.modal3 = false
                    } else {
                        this.$my_message(re.msg)
                    }

                })
            },
            //    执行完成订单
            e_confirmWC() {
                this.modal3 = true
                this.message = ''
            },
        },

        mounted() {
            this.checkType()
            this.getInfo()
        },
        created() {
            window.wave2 = this.wave2;
        },
    }

</script>

<template>
    <div class="MyOrder">
        <BaseNavbar :title="title" v-on:pageGo="pageGo" :backPath="backPath"></BaseNavbar>
        <!--买家角色-->
        <BuyOrder v-if="type == 1" v-on:uploadFile="uploadFile" v-on:goshow="goshow" :imgUrl="ossUrl"
                  :orderInfos="orderInfos" v-on:doUpload="doUpload"/>
        <!--卖家角色-->
        <SelOrder v-if="type == 0" :orderInfos="orderInfos" v-on:jiatu="jiatu" v-on:goshow="goshow"
                  v-on:overOrder="overOrder"/>
        <!--上传遮罩-->
        <div class="boxCon" v-if="isUpLoad">
            <div class="upBox">
                <span class="paizhao" @click="e_photo">拍照</span>
                <div class="line"></div>
                <span class="paizhao" @click="uploadByAlbum">从相册上传</span>
                <input type="file" id="file" accept="image/*" @change="uploadImage" ref="hiddenInput"
                       class="hiddenInput"/>
            </div>
            <div class="cancelBtn" @click="e_cancelUp">
                <span>取消</span>
            </div>
        </div>
        <!--图片显示遮罩-->
        <div class="imgCon" v-if="isShowImg">
            <img class="boxImg" :src="boxImg" alt="" @click="e_closeShowImg">
            <!--<img class="boxCloseIcon" :src="close" alt="" @click="e_closeShowImg">-->
        </div>
        <!--假图投诉-->
        <BaseModal :message="tsmessage" v-on:e_cancel="e_cancelTS" v-on:e_confirm="e_confirmTS"/>
        <!--完成订单-->
        <BaseModal :message="message" v-on:e_cancel="e_cancelWC" v-on:e_confirm="e_confirmWC"/>

        <!--买家上传交易凭证  输入密码-->
        <BaseInputModal :isOpenPwdModal="modal1" v-on:closePwdBox="closeModal1" v-on:econfirm="econfirmModal1"/>

        <!--卖家投诉假截图  输入密码-->
        <BaseInputModal :isOpenPwdModal="modal2" v-on:closePwdBox="closeModal2" v-on:econfirm="econfirmModal2"/>

        <!--卖家完成订单  输入密码-->
        <BaseInputModal :isOpenPwdModal="modal3" v-on:closePwdBox="closeModal3" v-on:econfirm="econfirmModal3"/>
    </div>
</template>


<style lang="scss" scoped type="text/scss">
    .MyOrder {
        width: 100%;
        padding-top: rem(90);

        .boxCon {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            background: rgba(0, 1, 1, 0.6);
            z-index: 1001;

            .upBox {
                width: rem(703);
                background-color: white;
                border-radius: rem(6);
                position: absolute;
                left: 0;
                right: 0;
                bottom: rem(151);
                margin: auto;
                display: flex;
                flex-direction: column;
                align-items: center;

                .paizhao {
                    width: 100%;
                    height: rem(116);
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    font-size: rem(32);
                    font-family: ios9SC-Medium;
                    font-weight: 500;
                    color: rgba(29, 156, 203, 1);
                }

                .hiddenInput {
                    display: none;
                }

                .line {
                    width: 634px;
                    height: 1px;
                    border: 1px solid rgba(230, 229, 229, 1);
                }
            }

            .cancelBtn {
                width: rem(705);
                height: rem(117);
                background-color: white;
                border-radius: rem(6);
                position: absolute;
                bottom: rem(20);
                left: 0;
                right: 0;
                margin: auto;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                font-size: rem(32);
                font-family: ios9SC-Medium;
                font-weight: 500;
                color: rgba(190, 189, 189, 1);
            }
        }

        .imgCon {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            background: rgba(0, 1, 1, 0.6);
            z-index: 1001;
            display: flex;
            flex-direction: row;
            align-content: center;

            .boxImg {
                /*width: rem(665);*/
                /*height: rem(650);*/
                position: absolute;
                left: 0;
                right: 0;
                /*top: rem(125);*/
                margin: auto;
            }

            .saveIcon {
                width: rem(78);
                height: rem(78);
                position: absolute;
                left: 0;
                right: 0;
                bottom: rem(390);
                margin: auto;
            }


            .boxCloseIcon {
                width: rem(78);
                height: rem(78);
                position: absolute;
                left: 0;
                right: 0;
                bottom: rem(130);
                margin: auto;
            }
        }
    }
</style>
