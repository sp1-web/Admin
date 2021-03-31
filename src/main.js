import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './master.css'
import Vuex from 'vuex'
import {store} from "./store/store";
import Notifications from 'vue-notification'


Vue.config.productionTip = false
Vue.use(Notifications)
Vue.use(Vuex);


new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
