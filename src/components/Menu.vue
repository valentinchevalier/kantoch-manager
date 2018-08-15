<template>
  <div class="menu">
    <h1 class="medium-title category">Manger</h1>
    <div class="food items-container">
      <MenuItem @click="onClick(item)" @long-click="onLongClick(item)" :item="item" :showChoices="showChoices" v-for="item in foodItems" :key="item.id" />
    </div>
    <h1 class="medium-title category">Boire</h1>
    <div class="drink items-container">
      <MenuItem @click="onClick(item)" @long-click="onLongClick(item)" :item="item" :showChoices="showChoices" v-for="item in drinkItems" :key="item.id" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MenuItem from './MenuItem';

export default {
  components: {
    MenuItem,
  },
  props: {
    showChoices: {
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters('menu', ['foodItems', 'drinkItems']),
  },
  methods: {
    onClick(item) {
      this.$emit('click', item);
    },
    onLongClick(item) {
      this.$emit('long-click', item);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

.items-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 10px;
  flex-wrap: wrap;

  @include responsive($small-breakpoint) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
}

.category {
  text-align: center;
  margin-top: $spacing;
  font-weight: $bold-weight;
  text-transform: uppercase;

  @include responsive($small-breakpoint) {
    margin-top: $spacing-small;
  }
}
</style>
