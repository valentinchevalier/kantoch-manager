<template>
  <div class="order-cooking-editor">
    <OrderTitle :order="order"/>
    <p class="no-items" v-if="orderItems.length <= 0">Aucuns produits</p>
    <template v-else>
      <div class="items">
        <div class="order-item" v-for="orderItem in orderItems" :key="orderItem.id">
          <PlateLabel :plateId="orderItem.plateId" :choiceId="orderItem.choiceId" />
          <div class="quantity">
            <span class="number">{{orderItem.quantity}}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppIcon from '@/components/AppIcon';
import OrderTitle from './OrderTitle';
import PlateLabel from './PlateLabel';

export default {
  components: {
    AppIcon,
    PlateLabel,
    OrderTitle,
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('menu', ['plates']),
    orderItems() {
      return Object.values(this.order.items).sort((itemA, itemB) => this.plates[itemA.plateId].order - this.plates[itemB.plateId].order);
    },
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';

.order-title {
  margin: 0;
  margin-bottom: $spacing-small;
}

.no-items {
  margin-top: $spacing-medium;
  margin-bottom: $spacing;
}

.order-cooking-editor {
  padding: $spacing-small $spacing;
  border: 2px solid $black;
  border-radius: $radius;
}

.actions {
  margin-top: $spacing;
}

.order-item {
  display: flex;
  padding: $spacing-xsmall 0;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid $black;
  }

  .plate-label {
    text-align: left;
    margin-right: auto;
  }

  .quantity {
    margin-right: $spacing-small;
    display: flex;
    align-items: center;
    margin-left: -$spacing-small;
    padding: $spacing-xsmall;
  }
}
</style>

