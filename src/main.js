import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue"
import VueSweetalert2 from 'vue-sweetalert2';
import store from './store'

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "sweetalert2/dist/sweetalert2.min.css";
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueSweetalert2);

Vue.component('fa-icon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
