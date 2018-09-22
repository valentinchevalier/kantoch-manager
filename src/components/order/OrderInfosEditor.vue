<template>
  <div class="order-editor">
    <div class="order-type-container">
      <input type="radio" id="type-on-site" v-model="value.type" :value="ON_SITE">
      <input type="radio" id="type-take-away" v-model="value.type" :value="TAKE_AWAY">
      <label
        for="type-on-site"
        class="order-type btn"
        :class="{ selected: value.type === ON_SITE }">Sur place</label>
      <label
        for="type-take-away"
        class="order-type btn"
        :class="{ selected: value.type === TAKE_AWAY }">à emporter</label>
    </div>
    <div class="checkbox-wrapper">
      <input type="checkbox" id="isRegular" v-model="value.isRegular" @change="onIsRegularChange">
      <label for="isRegular">Est un habitué ?</label>
    </div>
    <div class="input-wrapper" v-if="!value.isRegular">
      <label for="name">Nom</label>
      <input type="text" ref="name" id="name" name="name" v-model="value.name" placeholder="Comptoir, terrasse, devant le mur, prénom...">
    </div>
    <div v-if="value.isRegular">
      <p class="selected-regular-customer" v-if="selectedRegularCustomer">{{selectedRegularCustomer.name}} <small>({{balanceAmount(selectedRegularCustomer) | price(true)}})</small></p>

      <div class="autocomplete-wrapper">
        <input type="text" v-model="filterValue" placeholder="Rechercher un habitué">
        <div class="choices" v-if="isFiltered">
          <template
            v-for="regularCustomer of customerSearchResult">
            <input
              type="radio"
              :key="regularCustomer.id + '_radio'"
              :id="regularCustomer.id"
              v-model="value.regularCustomerId"
              :value="regularCustomer.id"
              @change="onRegularCustomerSelect">
            <label
              class="choice"
              :class="{ selected: value.regularCustomerId === regularCustomer.id }"
              :key="regularCustomer.id + '_label'"
              :for="regularCustomer.id">
              {{regularCustomer.name}} <small>({{balanceAmount(regularCustomer) | price(true)}})</small>
            </label>
          </template>
          <p class="no-results choice" v-if="customerSearchResult.length === 0">Aucun habitué ne correspond à la recherche "{{filterValue}}"</p>
        </div>
      </div>
    </div>
    <div class="input-wrapper" v-if="!value.isRegular && value.numberOfGuest">
      <label for="numberOfGuest">Nombre de personnes</label>
      <NumberInput v-model="value.numberOfGuest" :min="1"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NumberInput from '@/components/utils/NumberInput';
import { TAKE_AWAY, ON_SITE } from '@/utils/order-utils';
import RegularCustomerUtils from '@/utils/regular-customer-utils';

export default {
  components: {
    NumberInput,
  },
  props: ['value'],
  data() {
    return {
      TAKE_AWAY,
      ON_SITE,
      filterValue: '',
    };
  },
  computed: {
    ...mapState('regularCustomers', ['regularCustomers']),
    filteredRegularCustomers() {
      if (!this.isFiltered) {
        return [];
      }
      const regexp = new RegExp(`.*${this.filterValue}.*`, 'i');
      return this.regularCustomers.filter(el => el.name.search(regexp) !== -1);
    },
    isFiltered() {
      return this.filterValue.length > 0;
    },
    customerSearchResult() {
      return this.filteredRegularCustomers.concat().sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    },
    selectedRegularCustomer() {
      return this.regularCustomers.find(regularCustomer => regularCustomer.id === this.value.regularCustomerId);
    },
  },
  methods: {
    balanceAmount(regularCustomer) {
      return RegularCustomerUtils.balanceAmount(regularCustomer);
    },
    onIsRegularChange() {
      if (this.value.isRegular) {
        this.value.numberOfGuest = 1;
      }
    },
    onRegularCustomerSelect() {
      this.filterValue = '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
@import '~@/styles/mixins';


.order-editor {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;

  > * {
    &:not(:last-child) {
      margin-bottom: $spacing;
    }
  }

  .regular-customer-choice {
    input {
      display: none;
    }
  }

  .selected-regular-customer {
    font-size: 1.6rem;
    margin-bottom: $spacing-small;
  }

  .order-type-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: $spacing-small;
    justify-content: center;

    input[type='radio'] {
      display: none;
    }

    .btn {
      border-radius: $box-radius;
      padding: 1rem;

      &:not(.selected) {
        opacity: 0.4;
      }

      &.selected {
        background-color: $secondary-color;
        color: $primary-color;
      }
    }
  }
}
</style>
