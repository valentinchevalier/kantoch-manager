<template>
  <div class="command-billing" v-if="plates && bill.totalPrice">
    <CommandTitle :command="command"/>
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
    <div class="actions">
      <button type="button" class="btn btn-small" @click="close">Retour</button>
      <button type="button" class="btn btn-small" @click="onFinishCommand">Terminer la commande</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CommandUtils from '@/utils/command-utils';
import AppIcon from '@/components/AppIcon';
import DetailedPrice from '@/components/DetailedPrice';
import FormuleBuilder from './FormuleBuilder';
import CommandTitle from './CommandTitle';
import PlateLabel from './PlateLabel';

export default {
  components: {
    AppIcon,
    CommandTitle,
    FormuleBuilder,
    PlateLabel,
    DetailedPrice,
  },
  props: {
    command: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      bill: {},
    };
  },
  mounted() {
    this.bill = CommandUtils.generateBill(this.command.items, this.plates);
  },
  computed: {
    ...mapState('menu', ['plates']),
    formuleMainItems() {
      return Object.values(this.bill.singleItems).filter(commandItem => this.plates[commandItem.plateId] && this.plates[commandItem.plateId].isFormuleMain);
    },
    formuleEntreeItems() {
      return Object.values(this.bill.singleItems).filter(commandItem => this.plates[commandItem.plateId] && this.plates[commandItem.plateId].isFormuleEntree);
    },
    formuleDessertItems() {
      return Object.values(this.bill.singleItems).filter(commandItem => this.plates[commandItem.plateId] && this.plates[commandItem.plateId].isFormuleDessert);
    },
    commandItems() {
      return Object.values(this.command.items);
    },
  },
  methods: {
    ...mapActions('commands', ['finishCommand']),
    onFinishCommand() {
      this.finishCommand({
        commandId: this.command.id,
        bill: this.bill,
      });
      this.close();
      this.$router.push({ name: 'home' });
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

.has-items {
  display: grid;
  grid-template-columns: 2fr 1fr;
}

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
</style>

