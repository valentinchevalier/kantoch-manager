import Vue from 'vue';
import moment from 'moment';

import { ON_SITE, TAKE_AWAY } from '@/utils/order-utils';

Vue.filter('price', (value, showSign = false) => {
  if (!value) {
    value = 0;
  }

  const formatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
  let sign = '';
  if (showSign) {
    sign = value > 0 ? '+' : '';
  }

  return sign + formatter.format(value);
});

moment.locale('fr');
Vue.filter('moment', (value, format = 'LL') => {
  if (!value) {
    return '';
  }

  return moment(value).format(format);
});

Vue.filter('orderType', (value) => {
  let res;
  switch (value) {
    case ON_SITE:
      res = 'Sur place';
      break;
    case TAKE_AWAY:
      res = 'À emporter';
      break;
    default:
      res = 'Type de commande inconnu';
      break;
  }

  return res;
});
