import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/**
 * meta: {requireAuth: true}  如果 `requireAuth: true` 则需要登录后才能访问该页面, 如果不需要登录访问页面, 则不需要添加
 * meta: {root: true}  如果 `root: true` 则需要调用Android返回方法, 否则不需要
 */

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: () => import(/* webpackChunkName: "Main" */ '@v/Main/Main'),
      meta: {requireAuth: true},
      children: [
        {
          path: '/',
          name: 'MainHome',
          component: () => import(/* webpackChunkName: "Home" */ '@v/Main/MainHome/MainHome'),//首页
          meta: {requireAuth: true}
        },
        {
          path: '/travelGold',
          name: 'TravelGold',
          component: () => import(/* webpackChunkName: "MainTeam" */ '@v/Main/TravelGold/TravelGold'),//旅游金
          meta: {requireAuth: true},
        },
          {
          path: '/mainMall',
          name: 'MainMall',
          component: () => import(/* webpackChunkName: "MainTeam" */ '@v/Main/MainMall/MainMall'),//商城
          meta: {requireAuth: true}
        }, {
          path: '/mycenter',
          name: 'MainMy',
          component: () => import(/* webpackChunkName: "MainMy" */ '@v/Main/MainMy/MainMy'),//个人中心
          meta: {requireAuth: true}
        },
        

      ]
    }, {
      path: '/',
      name: 'Login',
      component: () => import(/* webpackChunkName: "CustomerService" */ '@v/Login/index'),//登录
    }, {
      path: '/register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "register" */ '@v/Register/Register'),//注册
    }, {
      path: '/forget',
      name: 'Forget',
      component: () => import(/* webpackChunkName: "Forget" */ '@v/Forget/Forget'),//忘记密码
    }, {
      path: '/userInfo',
      name: 'UserInfo',
      component: () => import(/* webpackChunkName: "UserInfo" */ '@v/UserInfo/UserInfo'),//个人资料
      meta: {requireAuth: true}
    }, {
      path: '/modifyInfo',
      name: 'ModifyInfo',
      component: () => import(/* webpackChunkName: "ModifyInfo" */ '@v/ModifyInfo/ModifyInfo'),//修改用户信息
      meta: {requireAuth: true}
    }, {
      path: '/authentication',
      name: 'Authentication',
      component: () => import(/* webpackChunkName: "Authentication" */ '@v/Authentication/Authentication'),//实名认证
      meta: {requireAuth: true}
    }, {
      path: '/modifyLogin',
      name: 'ModifyLogin',
      component: () => import(/* webpackChunkName: "ModifyLogin" */ '@v/ModifyLogin/ModifyLogin'),//修改登录密码
      meta: {requireAuth: true}
    }, {
      path: '/modifyPay',
      name: 'ModifyPay',
      component: () => import(/* webpackChunkName: "ModifyPay" */ '@v/ModifyPay/ModifyPay'),//修改交易密码
      meta: {requireAuth: true}
    }, {
      path: '/unsealing',
      name: 'Unsealing',
      component: () => import(/* webpackChunkName: "Unsealing" */ '@v/Unsealing/Unsealing'),//账户解封
      meta: {requireAuth: true}
    }, {
      path: '/activity',
      name: 'Activity',
      component: () => import(/* webpackChunkName: "Activity" */ '@v/Activity/Activity'),//活动奖励
      meta: {requireAuth: true}
    }, 
    {
      path: '/activation',
      name: 'Activation',
      component: () => import(/* webpackChunkName: "NoticeDetail" */ '@v/Activation/Activation'),//会员激活
      meta: {requireAuth: true}
    },
    {
      path: '/fund',
      name: 'fund',
      component: () => import(/* webpackChunkName: "Found" */ '@v/Fund/fund'),//购买旅游卡
      meta: {requireAuth: true}
    },
    {
      path: '/myReservation',
      name: 'MyReservation',
      component: () => import(/* webpackChunkName: "Found" */ '@v/Main/MyReservation/MyReservation'),//购买旅游卡
      meta: {requireAuth: true}
    },
    {
      path: '/addressManage',
      name: 'AddressManage',
      component: () => import(/* webpackChunkName: "Found" */ '@v/AddressManage/index'),// 更改登陆密码
      meta: {requireAuth: true}
    },
    {
      path: '/replaceLoginPassword',
      name: 'ReplaceLoginPassword',
      component: () => import(/* webpackChunkName: "Found" */ '@v/ReplaceLoginPassword/index'),// 更改登陆密码
      meta: {requireAuth: true}
    },
    {
      path: '/replacePayPassword',
      name: 'ReplacePayPassword',
      component: () => import(/* webpackChunkName: "Found" */ '@v/ReplacePayPassword/index'),// 更改登陆密码
      meta: {requireAuth: true}
    },
    {
      path: '/replacePhone',
      name: 'ReplacePhone',
      component: () => import(/* webpackChunkName: "Found" */ '@v/ReplacePhone/index'),// 更改手机号
      meta: {requireAuth: true}
    },
    {
      path: '/expensesRecord',
      name: 'ExpensesRecord',
      component: () => import(/* webpackChunkName: "Found" */ '@v/ExpensesRecord/index'),// 消费记录
      meta: {requireAuth: true}
    },
    {
      path: '/myTreasure',
      name: 'MyTreasure',
      component: () => import(/* webpackChunkName: "Found" */ '@v/MyTreasure/index'),// 我的红包明细
      meta: {requireAuth: true}
    },
      {
          path: '/myShoppingVoucher',
          name: 'MyShoppingVoucher',
          component: () => import(/* webpackChunkName: "Found" */ '@v/MyShoppingVoucher/index'),// 我的购物券明细
          meta: {requireAuth: true}
      },
      {
          path: '/myTravelCard',
          name: 'MyTravelCard',
          component: () => import(/* webpackChunkName: "Found" */ '@v/MyTravelCard/index'),// 我的旅游卡明细
          meta: {requireAuth: true}
      },
    {
      path: '/allTravelLine',
      name: 'AllTravelLine',
      component: () => import(/* webpackChunkName: "Found" */ '@v/AllTravelLine/index'),// 所有旅游路线
      meta: {requireAuth: true}
    }, {
      path: '/foundation',
      name: 'Foundation',
      component: () => import(/* webpackChunkName: "Found" */ '@v/Foundation/Foundation'),// 购买旅游卡
      meta: {requireAuth: true}
    },{
      path: '/foundationPay',
      name: 'FoundationPay',
      component: () => import(/* webpackChunkName: "Found" */ '@v/FoundationPay/FoundationPay'),// 基金购入
      meta: {requireAuth: true}
    },
    {
          path: '/contactService',
          name: 'ContactService',
          component: () => import(/* webpackChunkName: "Found" */ '@v/ContactService/index'),// 联系客服
          meta: {requireAuth: true}
      },
    {
      path: '/myYoubao',
      name: 'MyYoubao',
      component: () => import(/* webpackChunkName: "Found" */ '@v/MyYoubao/index'),// 我的红包
      meta: {requireAuth: true}
    },
      {
          path: '/playYoubao',
          name: 'PlayYoubao',
          component: () => import(/* webpackChunkName: "Found" */ '@v/PlayYoubao/index'),// 我的红包
          meta: {requireAuth: true}
      },
    {
      path: '/shopNav',
      name: 'shopNav',
      component: () => import(/* webpackChunkName: "Found" */ '@v/ShopNav/index'),// 分类菜单
      meta: {requireAuth: true}
    },
    {
      path: '/shopType',
      name: 'shopType',
      component: () => import(/* webpackChunkName: "Found" */ '@v/ShopType/index'),// 同类列表
      meta: {requireAuth: true}
    },
    {
      path: '/shopDetail',
      name: 'shopDetail',
      component: () => import(/* webpackChunkName: "Found" */ '@v/ShopDetail/index'),// 同类列表
      meta: {requireAuth: true}
    },
    {
      path: '/eventPage',
      name: 'eventPage',
      component: () => import(/* webpackChunkName: "Found" */ '@v/EventPage/index'),// 红包活动
      meta: {requireAuth: true}
    },
    {
      path: '/productDetails',
      name: 'TravelDetail',
      component: () => import(/* webpackChunkName: "Found" */ '@v/TravelDetail/index'),// 旅游商品详情页
      meta: {requireAuth: true}
    },
    {
      path: '/productAddress',
      name: 'productAddress',
      component: () => import(/* webpackChunkName: "Found" */ '@v/FoundationPay/productAddress'),// 报单地址页面
      meta: {requireAuth: true}
    },
    {
      path: '/travelOrder',
      name: 'TravelOrder',
      component: () => import(/* webpackChunkName: "Found" */ '@v/TravelOrder/index'),// 旅游商品订单确认
      meta: {requireAuth: true}
    },  
    
    {
      path: '/addContact',
      name: '',
      component: () => import(/* webpackChunkName: "Found" */ '@v/AddContact/index'),// 添加联系人
      meta: {requireAuth: true}
    },
    {
      path: '/travelPay',
      name: 'TravelPay',
      component: () => import(/* webpackChunkName: "Found" */ '@v/TravelPay/index'),// 旅游商品订单真实 支付页面
      meta: {requireAuth: true}
    },   
    {
      path: '/mallPay',
      name: 'MallPay',
      component: () => import(/* webpackChunkName: "Found" */ '@v/MallPay/index'),// 商城商品订单真实 支付页面
      meta: {requireAuth: true}
    }, 
    {
      path: '/addAddress',
      name: 'AddAddress',
      component: () => import(/* webpackChunkName: "Found" */ '@v/AddAddress/AddAddress'),// 商城商品订单真实 支付页面
      meta: {requireAuth: true}
    }, 
    {
      path: '/*',
      name: 'Error404',
      component: () => import(/* webpackChunkName: "Error404" */ '@v/Error404/Error404')//404页面
    },

  ],
  linkActiveClass: 'active'
});
