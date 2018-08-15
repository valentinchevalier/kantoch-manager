import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './assets/fonts/font-icons/font-icons.font';
import './utils/longPressDirective';
import './utils/filters';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
