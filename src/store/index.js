import { createStore } from "vuex";
import axios from "axios";

const TOKEN_KEY = "jwt-token";

export default createStore({
  state: {
    token: localStorage.getItem(TOKEN_KEY),
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem(TOKEN_KEY, token);
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
    },
    initializeStore(state) {
      if (localStorage.getItem(TOKEN_KEY)) {
        state.token = localStorage.getItem(TOKEN_KEY);
      } else {
        state.token = "";
      }
    },
  },
  actions: {
    register({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            "https://trello.backend.tests.nekidaem.ru/api/v1/users/create/",
            data
          )
          .then((resp) => {
            const token = resp.data.token;
            console.log(token);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/v1/users/login/", payload)
          .then((resp) => {
            const token = resp.data.token;
            axios.defaults.headers.common["Authorization"] = "jwt " + token;
            console.log(token);
            commit("setToken", token);
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  getters: {
    token(state) {
      return state.token;
    },
    isAuthenticated(_, getters) {
      return !!getters.token;
    },
  },
});
