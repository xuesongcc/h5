<template>
    <div class="address_selectthree">
        <div class="address_selectthreeCon">
            <div class="address_selectthreeTitle">
                <span @click="e_cancelSel">取消</span>
                <span @click="e_overarea">完成</span>
            </div>
            <div class="address_selectui">
                <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
            </div>
        </div>
    </div>
</template>

<script>
    
    import myaddress from './city.json';

    export default {
        name: 'address_select',
        data() {
            return {
                myAddressSlots: [
                    {
                        flex: 1,
                        values: Object.keys(myaddress),
                        className: 'slot1',
                        textAlign: 'left',
                    },
                    {
                        divider: true,
                        content: '-',
                        className: 'slot2',
                    },
                    {
                        flex: 1,
                        values: [],
                        className: 'slot3',
                        textAlign: 'right',
                    },
                    {
                        divider: true,
                        content: '-',
                        className: 'slot4',
                    },
                    {
                        flex: 1,
                        values: [],
                        className: 'slot4',
                        textAlign: 'right',
                    },
                ],
                area: [],
            };
        },

        components: {},

        computed: {},

        methods: {
            // 取消选择
            e_cancelSel() {
                this.$emit('cancelSel', false);
            },
            onMyAddressChange(picker, values) {
                if (myaddress[values[0]]) {
                    //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
                    picker.setSlotValues(1, Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
                    picker.setSlotValues(2, myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
                    this.area = values;
                }
            },
            e_overarea(v) {
                for (let i = 0; i < this.area.length; i++) {
                    if (this.area[i] === '请选择') {
                        this.$my_message('请选择完整的地区');
                        return;
                    }
                }
                if (this.area[2] == undefined) {
                    this.area.pop();
                }
                this.$emit('getArea', this.area);
                this.$emit('cancelSel', false);
            },
        },

        mounted() {
            this.$nextTick(() => {
                //vue里面全部加载好了再执行的函数  （类似于setTimeout）
                // this.myAddressSlots[0].defaultIndex = 0
                // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
                //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）

                setTimeout(() => {
                    //这个是一个初始化默认值的一个技巧
                    this.myAddressSlots[0].defaultIndex = 0;
                }, 100);
            });
        },
    };
</script>
<style lang="scss">
    /* 三级联动选择 */
    .address_selectthree {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background-color: rgba(128, 128, 128, 0.5);
        z-index: 2000;
    }

    .address_selectthreeCon {
        width: 100%;
        height: rem(230);
        background-color: #f6f6f6;
        position: absolute;
        bottom: 0;
    }

    /* 标题 */
    .address_selectthreeTitle {
        height: rem(50);
        background-color: white;
        font-size: rem(28);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 rem(10);
        border-top: 1px solid #ccc;
    }

    .address_selectui {
        width: 100%;
        height: 180px;
        overflow: auto;
    }

</style>
