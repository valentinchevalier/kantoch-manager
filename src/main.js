import Vue from 'vue';
import VueSelect from 'vue-select';

import App from './App';
import router from './router';
import store from './store';
import './assets/fonts/font-icons/font-icons.font';
import './utils/longPressDirective';
import './utils/filters';

Vue.component('v-select', VueSelect);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
