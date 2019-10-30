import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//防xss攻击
import xss from 'xss'
console.log(xss(`<a href="#" onclick="alert(xss)">click me</a>`))

import 'swiper/dist/css/swiper.css';
//引用样式
import './styles/index.scss';
//引用mintUI样式
import './styles/mint-ui.scss';
import 'mint-ui/lib/style.min.css'
//引用axios
import {FDPost, get, JSONPost} from './api/axios';
import VueQriously from 'vue-qriously';
import Message from '@c/BaseMessage/index';
import Loading from '@c/Loading/Loading'

//引入mintUI
import Mint from 'mint-ui'
Vue.use(Mint)

//定义全局axios
Vue.prototype.$get = get;
Vue.prototype.$FDPost = FDPost;
Vue.prototype.$JSONPost = JSONPost;

Vue.prototype.$my_message = Message.install;
Vue.prototype.$loading = Message.install;

Vue.use(VueQriously);
Vue.use(Loading);
Vue.config.productionTip = false;

// router.beforeEach((to, from, next) => {
//   if (getToken()) {
//     next();
//   } else {
//     if (to.meta.requireAuth) {
//       next('/');
//     } else {
//       next();
//     }
//   }
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
