<template>
  <div class="order-edition-view">
    <router-link :to="{ name: 'orders-of-the-day' }" class="back-button"><AppIcon icon="arrow-left"/> Changer de commande</router-link>
    <OrderEditor :id="$route.params.id"/>
  </div>
</template>

<script>
import OrderEditor from '@/components/order/OrderEditor';
import AppIcon from '@/components/AppIcon';

export default {
  name: 'order',
  components: {
    AppIcon,
    OrderEditor,
  },
};
</script>
