/**
 * Created by WL on 2018/12/5.
 * Description 用户模块
 */


import {getToken, removeToken} from "@u/token";

const user = {
    state: {
      showNotice: false,//显示公告
      user: '',
      token: getToken(),
      //可售鱼
      availableForSale: 0,
      //成品鱼
      endProduct: 0,
      //倍数
      multiple: 0,
      //遮罩层弹出框
      mask:0,
      //孵化池条数
      incubationPool: 0,
      //可售额度
      availableCredit: 0,
      //额度银行
      availableBank: 0,
      //可租额度
      rentableQuota: 0,

      // 添加的出行人持久
      travelPeople:[],


    },
    mutations: {
        SHOWNOTICE(state, Boolean) {
            state.showNotice = Boolean
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_AVAILABLEFORSALE: (state, availableForSale) => {
            state.availableForSale = availableForSale;
        },
        SET_ENDPRODUCT: (state, endProduct) => {
            state.endProduct = endProduct;
        },
        SET_MULTIPLE: (state, multiple) => {
            state.multiple = multiple;
        },
        SET_MASK: (state, mask) => {
            state.mask = mask;
        },
        SET_INCUBATIONPOOLE: (state, incubationPool) => {
            state.incubationPool = incubationPool;
        },
        SET_availableCredit: (state, availableCredit) => {
            state.availableCredit = availableCredit;
        },
        SET_availableBank: (state, availableBank) => {
            state.availableBank = availableBank;
        },
        SET_rentableQuota:(state,rentableQuota)=>{
            state.rentableQuota = rentableQuota
        },
        SET_travelPeople:(state,travelPeople)=>{
            state.travelPeople = travelPeople
        }
    },
    actions: {
        // UserLogin({commit}, userInfo) {
        //   return new Promise((resolve, reject) => {
        //
        //   })
        // }
        SetRedeemData({commit}, exchange) {
            commit('SHOWNOTICE', exchange.showNotice)
            commit('SET_AVAILABLEFORSALE', exchange.availableForSale);
            commit('SET_ENDPRODUCT', exchange.endProduct);
            commit('SET_MULTIPLE', exchange.multiple);
            commit('SET_MASK', exchange.mask);
            commit('SET_INCUBATIONPOOLE', exchange.incubationPool);
            commit('SET_availableCredit', exchange.availableCredit);
            commit('SET_availableBank', exchange.availableBank);
            commit('SET_rentableQuota', exchange.rentableQuota);
            commit('SET_travelPeople',exchange.travelPeople)
        },
        GetRedeemData({state}) {
            return new Promise((resolve) => {
                let obj = {
                    sn: state.showNotice,
                    af: state.availableForSale,
                    ep: state.endProduct,
                    m: state.multiple,
                    mk: state.mask,
                    ip: state.incubationPool,
                    ava: state.availableCredit,
                    avaBank: state.availableBank,
                    rq:state.rentableQuota,
                    tp:state.travelPeople,
                };
                resolve(obj);
            });
        },
        RetreatSafely() {
            removeToken();
            sessionStorage.clear();
            localStorage.clear();
        }
    }
};

export default user;
