<template>
  <div class="item-group-editor" >
    <div class="column">
      <Menu @click="onMenuItemClick" @long-click="onItemLongClick" />
    </div>
    <div class="column" v-if="itemGroup">
      <p class="no-items" v-if="itemGroupArray.length <= 0">Aucuns produits</p>
      <template v-else>
        <div class="items">
          <div class="order-item" v-for="item in itemGroupArray" :key="item.id">
            <PlateLabel :plateId="item.plateId" :choiceId="item.choiceId" />
            <NumberInput class="quantity" :value="item.quantity" @input="onQuantityUpdate(item, $event)"/>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Menu from '@/components/Menu';
import AppLoader from '@/components/AppLoader';
import PlateLabel from '@/components/order/PlateLabel';
import AppIcon from '@/components/AppIcon';
import NumberInput from '@/components/NumberInput';
import OrderItemsEditor from './OrderItemsEditor';

export default {
  components: {
    OrderItemsEditor,
    Menu,
    AppLoader,
    PlateLabel,
    AppIcon,
    NumberInput,
  },
  data() {
    return {
      itemGroup: {},
    };
  },
  props: {
  },
  mounted() {
    this.resetItems();
  },
  computed: {
    ...mapState('menu', ['plates']),
    ...mapState('temporaryOrder', ['items']),
    itemGroupArray() {
      return Object.values(this.items).sort((itemA, itemB) => this.plates[itemA.plateId].order - this.plates[itemB.plateId].order);
    },
  },
  methods: {
    ...mapActions('temporaryOrder', ['addOneItem', 'setItemQuantity', 'resetItems']),
    ...mapActions('modal', ['showItemChoiceSelector', 'showMenuItemEditor']),
    onMenuItemClick(item) {
      if (!item.available) {
        return;
      }

      if (item.choices && item.choices.length > 0) {
        this.showItemChoiceSelector({
          item,
          orderId: this.id,
        });
        return;
      }

      this.addOneItem({
        plateId: item.id,
      });
    },
    onQuantityUpdate(item, value) {
      this.setItemQuantity({ item, quantity: value });
    },
    onItemLongClick(item) {
      this.showMenuItemEditor({ plate: item });
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

.item-group-editor {
  display: grid;
  grid-template-columns: auto minmax(350px, 25%);
  grid-gap: $spacing-small 0;
  padding: 0;
  height: 100vh;

  @include responsive(820px) {
    grid-template-columns: auto;
    height: auto;
  }

  .column {
    overflow: auto;
    padding: $spacing $spacing-small $spacing-small;

    @include responsive($small-breakpoint) {
      padding: 0 0 $spacing-small;
    }
  }
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
}
</style>
