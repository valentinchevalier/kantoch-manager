<template>
  <div class="temporary-items">
    <div class="order-item" v-for="item in itemGroupArray" :key="item.id">
      <PlateLabel :plateId="item.plateId" :choiceId="item.choiceId" />
      <NumberInput class="quantity" :value="item.quantity" @input="onQuantityUpdate(item, $event)"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PlateLabel from '@/components/order/PlateLabel';
import AppIcon from '@/components/AppIcon';
import NumberInput from '@/components/NumberInput';

export default {
  components: {
    PlateLabel,
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
    border-bottom: 1px solid $black;
  }

  .quantity {
    margin-left: auto;
  }

  .plate-label {
    text-align: left;
  }
}
</style>
