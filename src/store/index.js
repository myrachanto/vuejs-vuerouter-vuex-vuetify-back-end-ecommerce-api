import Vue from "vue";
import Vuex from "vuex";
import users from './modules/users'
import ui from './modules/ui'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    users,
    ui,
  }
});