import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
import store from './store'
import { Modal, FormModel, Select } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Modal)
Vue.use(FormModel)
Vue.use(Select)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
