<template>
  <div class="order-bill" v-if="plates && bill.totalPrice">
    <div>
      <div class="bill-item" v-for="(formule, index) in bill.formules" :key="index">
        <div class="formule-label">
          <div class="main-label">{{formule.label}}</div>
          <div class="extra-label">{{formule.labelExtra}}</div>
        </div>
        <div class="total-price">{{formule.price | price}}</div>
      </div>
      <div class="bill-item" v-for="item in bill.singleItems" :key="item.id" v-if="item.quantity > 0">
        <PlateLabel :plateId="item.plateId" :choiceId="item.choiceId" />
        <div class="unit-price">{{item.quantity}} x {{item.unitPrice | price}}</div>
        <div class="total-price">{{item.totalPrice | price}}</div>
      </div>
    </div>
    <div class="total">
      <h3 class="title">Total</h3>
      <DetailedPrice :amount="bill.totalPrice"  class="total-price" />
    </div>
    <div class="price-by-guest" v-if="this.numberOfGuest">
      <span>Prix par personne : </span>
      <DetailedPrice :amount="bill.totalPrice / this.numberOfGuest"  class="price" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DetailedPrice from '@/components/utils/DetailedPrice';
import PlateLabel from '@/components/order/utils/OrderItemLabel';

export default {
  components: {
    PlateLabel,
    DetailedPrice,
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
  computed: {
    ...mapState('menu', ['plates']),
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

.formule-label {
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

  &:not(:last-child) {
    border-bottom: 1px solid $dark-gray;
  }

  .formule-label,
  .plate-label {
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
  padding: $spacing-small 0;
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

