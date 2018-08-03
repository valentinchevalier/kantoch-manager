<template>
  <div class="order-edition-view">
    <router-link :to="{ name: 'orders-manager' }" class="back-button"><AppIcon icon="arrow-left"/> Changer de commande</router-link>
    <ItemGroupEditor :id="$route.params.id"/>
  </div>
</template>

<script>
import ItemGroupEditor from '@/components/order/ItemGroupEditor';
import AppIcon from '@/components/AppIcon';

export default {
  name: 'order',
  components: {
    AppIcon,
    ItemGroupEditor,
  },
};
</script>
<style scoped lang="scss">
.order-edition-view {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
