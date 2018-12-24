import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import './element-variables.scss'
import './assets/reset.css';

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
