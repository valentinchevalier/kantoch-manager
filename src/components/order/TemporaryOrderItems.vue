<template>
  <div class="temporary-items">
    <div class="order-item" v-for="item in itemGroupArray" :key="item.id">
      <OrderItemLabel :plateId="item.plateId" :choiceId="item.choiceId" />
      <NumberInput class="quantity" :value="item.quantity" @input="onQuantityUpdate(item, $event)"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import OrderItemLabel from '@/components/order/utils/OrderItemLabel';
import AppIcon from '@/components/utils/AppIcon';
import NumberInput from '@/components/utils/NumberInput';

export default {
  components: {
    OrderItemLabel,
    AppIcon,
    NumberInput,
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('menu', ['plates']),
    ...mapState('temporaryOrder', ['items']),
    itemGroupArray() {
      return Object.values(this.items).sort((itemA, itemB) => this.plates[itemA.plateId].order - this.plates[itemB.plateId].order);
    },
  },
  methods: {
    ...mapActions('temporaryOrder', ['setItemQuantity']),
    onQuantityUpdate(item, value) {
      this.setItemQuantity({ item, quantity: value });
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

.no-items {
  margin: $spacing 0;
}

.order-item {
  display: flex;
  padding: $spacing-small 0;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid $secondary-color;
  }

  .quantity {
    margin-left: auto;
  }

  .order-item-label {
    text-align: left;
  }
}
</style>
