<template>
  <div class="order-payment" v-if="bill.totalPrice">
    <div>
      <div class="bill-item" :class="{ selected: isFormuleSelected(index), paid: isFormulePaid(index) }" v-for="(formule, index) in bill.formules" :key="index" @click="onFormuleClick(formule, index)">
        <div class="icon-container"><AppIcon :icon="!isFormuleSelected(index) ? 'check-circle' : 'cross-circle'" /></div>
        <div class="formule-label">
          <div class="main-label">{{formule.label}}</div>
          <div class="extra-label">{{formule.labelExtra}}</div>
        </div>
        <div class="total-price">{{formule.price | price}}</div>
      </div>
      <template v-for="item in bill.singleItems" v-if="item.quantity > 0">
        <div class="bill-item" v-for="index in item.quantity" :key="`${item.plateId}_${index}`" @click="onItemClick(item, index)" :class="{ selected: isItemSelected(item, index), paid: isItemPaid(item, index) }" >
          <div class="icon-container"><AppIcon :icon="!isItemSelected(item.plateId, index) ? 'check-circle' : 'cross-circle'" /></div>
          <OrderItemLabel :plateId="item.plateId" :choiceId="item.choiceId" />
          <div class="total-price">{{item.unitPrice | price}}</div>
        </div>
      </template>
    </div>
    <div class="total">
      <h3 class="title">À payer</h3>
      <DetailedPrice :amount="selectedPrice" class="total-price" />
    </div>
    <div class="actions">
      <button class="btn-link" @click="resetPaid()"><AppIcon icon="undo" /> Recommencer</button>
      <button class="btn btn-small btn-icon-left" @click="onPayClick()"><AppIcon icon="money-bill" />Payer</button>
    </div>
    <div class="total">
      <h3 class="title">Déjà payé</h3>
      <DetailedPrice :amount="alreadyPaidPrice" class="total-price" />
    </div>
    <div class="total">
      <h3 class="title">Reste à payer</h3>
      <DetailedPrice :amount="bill.totalPrice - alreadyPaidPrice"  class="total-price" />
    </div>
    <div class="price-by-guest" v-if="this.numberOfGuest">
      <span>Prix par personne : </span>
      <DetailedPrice :amount="bill.totalPrice / this.numberOfGuest"  class="price" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
// import { mapState } from 'vuex';
import AppIcon from '@/components/utils/AppIcon';
import DetailedPrice from '@/components/utils/DetailedPrice';
import OrderItemLabel from '@/components/order/utils/OrderItemLabel';

export default {
  components: {
    OrderItemLabel,
    DetailedPrice,
    AppIcon,
  },
  props: {
    bill: {
      type: Object,
      required: true,
    },
    numberOfGuest: {
      type: Number,
    },
  },
  data() {
    return {
      selectedItems: {},
      alreadyPaidItems: {},
    };
  },
  computed: {
    // ...mapState('menu', ['plates']),
    selectedPrice() {
      return Object.values(this.selectedItems).reduce((acc, price) => price + acc, 0);
    },
    alreadyPaidPrice() {
      return Object.values(this.alreadyPaidItems).reduce((acc, price) => price + acc, 0);
    },
  },
  methods: {
    onFormuleClick(formule, formuleIndex) {
      const id = `formule_${formuleIndex}`;
      if (this.selectedItems[id]) {
        Vue.delete(this.selectedItems, id);
      } else {
        Vue.set(this.selectedItems, id, formule.price);
      }
    },
    isFormuleSelected(index) {
      const id = `formule_${index}`;
      return this.selectedItems[id];
    },
    isFormulePaid(index) {
      const id = `formule_${index}`;
      return this.alreadyPaidItems[id];
    },
    onItemClick(item, index) {
      const id = `${item.plateId}_${index}`;
      if (this.selectedItems[id]) {
        Vue.delete(this.selectedItems, id);
      } else {
        Vue.set(this.selectedItems, id, item.unitPrice);
      }
    },
    isItemSelected(item, index) {
      const id = `${item.plateId}_${index}`;
      return this.selectedItems[id];
    },
    isItemPaid(item, index) {
      const id = `${item.plateId}_${index}`;
      return this.alreadyPaidItems[id];
    },
    onPayClick() {
      this.alreadyPaidItems = Object.assign({}, this.alreadyPaidItems, this.selectedItems);
      this.selectedItems = Object.assign({});
    },
    resetPaid() {
      this.alreadyPaidItems = Object.assign({});
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

.actions {
  margin: 0;
}

.formule-label {
  .main-label {
    font-weight: $bold-weight;
  }

  .extra-label {
    font-size: 1.3rem;
    line-height: 1.2;
  }
}

.bill-item {
  display: flex;
  padding: $spacing-small 0;
  align-items: center;
  cursor: pointer;
  user-select: none;
  opacity: 0.5;

  &.selected {
    opacity: 1;
  }

  &.paid {
    display: none;
  }

  &:not(.paid):not(:last-child) {
    border-bottom: 1px solid $secondary-color-alt;
  }

  .icon-container {
    margin-right: $spacing-small;
  }

  .formule-label,
  .order-item-label {
    text-align: left;
    margin-right: auto;
  }

  .unit-price,
  .total-price {
    margin-left: $spacing-small;
    flex: 0 0 10rem;
    text-align: right;

    @include responsive($small-breakpoint) {
      flex: 0 0 auto;
    }
  }

  .total-price {
    font-weight: $bold-weight;
  }
}

.total {
  display: flex;
  padding: 0 0;
  justify-content: flex-end;
  align-items: center;
  text-align: right;

  .total-price {
    font-weight: bold;
    margin-left: auto;
  }
}

.price-by-guest {
  display: flex;
  justify-content: center;
  align-items: center;

  .detailed-price {
    text-align: left;
    margin-left: $spacing-small;
    font-weight: $bold-weight;
  }
}
</style>

