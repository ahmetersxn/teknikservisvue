import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vSuggest from 'v-suggest';

import client from 'axios'
import toastr from '@/libs/toastr'


require('../node_modules/toastr/build/toastr.css')
require('dotenv').config()

client.defaults.baseURL = process.env.VUE_APP_API_URL

Vue.use(vSuggest);
Vue.config.productionTip = false
Vue.prototype.$http = client
Vue.prototype.$message = toastr

Vue.component('datagrid', require('@/components/DataGrid.vue').default);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
