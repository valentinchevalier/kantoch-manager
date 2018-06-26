<template>
  <div class="menu">
    <h1 class="category">Formules</h1>
    <div class="formule items-container">
      <MenuItem @click.native="onClick(item)" :item="item" v-for="item in formuleItems" :key="item.id" />
    </div>
    <h1 class="category">Manger</h1>
    <div class="food items-container">
      <MenuItem @click.native="onClick(item)" :item="item" v-for="item in foodItems" :key="item.id" />
    </div>
    <h1 class="category">Boire</h1>
    <div class="drink items-container">
      <MenuItem @click.native="onClick(item)" :item="item" v-for="item in drinkItems" :key="item.id" />
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
  computed: {
    ...mapGetters('menu', ['foodItems', 'drinkItems', 'formuleItems']),
  },
  methods: {
    onClick(item) {
      this.$emit('click', item);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';

.items-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 10px;
  flex-wrap: wrap;
}

.category {
  font-size: 2rem;
  font-weight: $light-weight;
  text-align: center;
  padding: $spacing-small 0;
  font-weight: $bold-weight;
  text-transform: uppercase;
}
</style>
