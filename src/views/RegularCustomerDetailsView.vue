<template>
  <div class="regular-customer-edition-view">
    <router-link :to="{ name: 'regular-customers' }" class="back-button"><AppIcon icon="arrow-left"/> Revenir</router-link>
    <RegularCustomerDetails :id="$route.params.id"/>
  </div>
</template>

<script>
import RegularCustomerDetails from '@/components/regularCustomer/RegularCustomerDetails';
import AppIcon from '@/components/utils/AppIcon';

export default {
  components: {
    AppIcon,
    RegularCustomerDetails,
  },
};
</script>
<style scoped lang="scss">
</style>
