import Vue from 'vue';
import Vuex from 'vuex';
import jwtDecode from 'jwt-decode';
import { isAdmin, getAllCategories, createCategory } from '../API';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    user: null,
    categories: [],
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    pushCategory(state, category) {
      state.categories.push(category);
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user;
    },
  },
  actions: {
    async addCategory({ commit }, newCategory) {
      const category = await createCategory(newCategory);
      commit('pushCategory', category);
    },
    async getAllCategories({ commit }) {
      const categories = await getAllCategories();
      commit('setCategories', categories);
    },
    login({ commit }, token) {
      if (token) {
        commit('setToken', token);
        localStorage.token = token;
        const user = jwtDecode(token);
        commit('setUser', user);
      } else {
        commit('setToken', '');
        commit('setUser', null);
      }
    },
    async isAdmin() {
      const result = await isAdmin();
      return result.isAdmin;
    },
  },
  modules: {},
});
