import Vue from 'vue';
import Vuex from 'vuex';

import user from './vuex/modules/user';
import getters from './vuex/getters';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
  },
  getters
});
