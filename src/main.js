import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './assets/fonts/font-icons/font-icons.font';
import './longPressDirective';

Vue.config.productionTip = false;

Vue.filter('price', (value) => {
  if (!value) {
    return '';
  }

  const formatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

  return formatter.format(value);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
