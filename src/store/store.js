import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
    key: "vuex",
    storage: window.localStorage,
});

export const store = new Vuex.Store({
        state: {
            login: false,
            modalCreateArticle: false,
            modalCreatePromotion: false,
            token: '',
        },
        plugins: [vuexLocalStorage.plugin],
        mutations: {
            changeStatusLogin() {
                this.state.login = !this.state.login;
            },
            setToken(state, payload) {
                state.token = payload.token;
            },
            setOpenModalCreateArticle() {
                this.state.modalCreateArticle = true;
            },
            setCloseModalCreateArticle() {
                this.state.modalCreateArticle = false;
            },
            setOpenModalCreatePromotion() {
                this.state.modalCreatePromotion = true;
            },
            setCloseModalCreatePromotion() {
                this.state.modalCreatePromotion = false;
            },
        },
        getters: {
            getStatusLogin: state => {
                return state.login;
            },
            getToken: state =>{
                return state.token
            },
            getStatusModalCreateArticle: state => {
                return state.modalCreateArticle;
            },
            getStatusModalCreatePromotion: state => {
                return state.modalCreatePromotion;
            }
        },
    })
;


