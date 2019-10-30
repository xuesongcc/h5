/**
 * Created by WL on 2018/12/5.
 * Description 获得子模块数据
 */

const getters = {
    showNotice: state => state.user.showNotice,
    token: state => state.user.token,
    availableForSale: state => state.user.availableForSale,
    endProduct: state => state.user.endProduct,
  mask: state => state.user.mask,
    multiple: state => state.user.multiple,
    incubationPool: state => state.user.incubationPool,

};

export default getters;
