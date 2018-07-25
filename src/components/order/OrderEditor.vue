<template>
  <div class="order-editor" >
    <div class="column">
      <Menu @click="onItemClick" @long-click="onItemLongClick" />
    </div>
    <div class="column" v-if="order">
      <OrderItemsEditor :order="order" />
    </div>
    <AppLoader :loading="!order" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Menu from '@/components/Menu';
import AppLoader from '@/components/AppLoader';
import OrderItemsEditor from './OrderItemsEditor';

export default {
  components: {
    OrderItemsEditor,
    Menu,
    AppLoader,
  },
  props: {
    id: {
      type: String,
    },
  },
  computed: {
    ...mapState('orders', ['orders']),
    order() {
      return this.orders.find(order => order.id === this.id);
    },
  },
  methods: {
    ...mapActions('orders', ['addItemToOrder']),
    ...mapActions('modal', ['showComplexItemEditor', 'showMenuItemEditor']),
    onItemClick(item) {
      if (!item.available) {
        return;
      }
      if (item.choices && item.choices.length > 0) {
        this.showComplexItemEditor({
          item,
          orderId: this.id,
        });
        return;
      }
      this.addItemToOrder({
        orderId: this.id,
        item: {
          plateId: item.id,
        },
      });
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

.order-editor {
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

  .order-title {
    .table-number {
      font-size: 2rem;
      margin-bottom: $spacing-xsmall;

      .number {
        font-weight: $bold-weight;
      }
    }

    .infos {
      display: flex;
      justify-content: center;
      line-height: 1;

      > * {
        &:not(:last-child) {
          margin-right: $spacing;
          padding-right: $spacing;
          border-right: 1px solid $black;
        }
      }
    }
  }
}
</style>
