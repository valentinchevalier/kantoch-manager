<template>
  <div class="formule-builder">
    <h3 class="title">Création des formules</h3>
    <div class="formule-item-choice">
      <h4 class="subtitle">Entrées</h4>
      <div class="items-container" :class="{empty: !currentEntree.plateId}">
        <template v-for='item in entreeItems'>
          <div class="btn main-item" v-for="n in item.quantity" :key="`${item.plateId}${item.choiceId}${n}`" @click="selectEntree(item, n)" :class="{ selected: isCurrentEntree(item, n) }">
            <PlateLabel :plateId="item.plateId" :choiceId="item.choiceId" />
          </div>
        </template>
      </div>
    </div>
    <div class="formule-item-choice">
      <h4 class="subtitle">Plats</h4>
      <div class="items-container" :class="{empty: !currentMain.plateId}">
        <template v-for='item in mainItems'>
          <div class="btn main-item" v-for="n in item.quantity" :key="`${item.plateId}${item.choiceId}${n}`" @click="selectMain(item, n)" :class="{ selected: isCurrentMain(item, n) }">
            <PlateLabel :plateId="item.plateId" :choiceId="item.choiceId" />
          </div>
        </template>
      </div>
    </div>
    <div class="formule-item-choice">
      <h4 class="subtitle">Desserts</h4>
      <div class="items-container" :class="{empty: !currentDessert.plateId}">
        <template v-for='item in dessertItems'>
          <div class="btn main-item" v-for="n in item.quantity" :key="`${item.plateId}${item.choiceId}${n}`" @click="selectDessert(item, n)" :class="{ selected: isCurrentDessert(item, n) }">
            <PlateLabel :plateId="item.plateId" :choiceId="item.choiceId" />
          </div>
        </template>
      </div>
    </div>
    <div class="actions">
      <button type="button" class="btn" :disabled="!formuleValid" @click="validateFormule">Valider la formule</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PlateLabel from './PlateLabel';

export default {
  components: {
    PlateLabel,
  },
  props: {
    mainItems: {
      type: Array,
      required: true,
    },
    entreeItems: {
      type: Array,
      required: true,
    },
    dessertItems: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentMain: {},
      currentEntree: {},
      currentDessert: {},
    };
  },
  computed: {
    ...mapState('menu', ['plates']),
    formuleValid() {
      return this.currentMain.plateId && (this.currentEntree.plateId || this.currentDessert.plateId);
    },
  },
  methods: {
    selectEntree(item, index) {
      if (this.isCurrentEntree(item, index)) {
        this.currentEntree = {};
      } else {
        this.currentEntree = this.selectionItem(item, index);
      }
    },
    selectMain(item, index) {
      if (this.isCurrentMain(item, index)) {
        this.currentMain = {};
      } else {
        this.currentMain = this.selectionItem(item, index);
      }
    },
    selectDessert(item, index) {
      if (this.isCurrentDessert(item, index)) {
        this.currentDessert = {};
      } else {
        this.currentDessert = this.selectionItem(item, index);
      }
    },
    isCurrentEntree(item, index) {
      return this.isCurrentItem(this.currentEntree, item, index);
    },
    isCurrentMain(item, index) {
      return this.isCurrentItem(this.currentMain, item, index);
    },
    isCurrentDessert(item, index) {
      return this.isCurrentItem(this.currentDessert, item, index);
    },
    isCurrentItem(current, item, index) {
      return current.plateId === item.plateId && current.choiceId === item.choiceId && current.index === index;
    },
    selectionItem(item, index) {
      return {
        plateId: item.plateId,
        choiceId: item.choiceId,
        index,
      };
    },
    validateFormule() {
      this.$emit('validate-formule', {
        main: this.currentMain,
        entree: this.currentEntree,
        dessert: this.currentDessert,
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';

.subtitle {
  margin-bottom: $spacing-small;
  text-align: left;
}

.formule-builder {

}

.main-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.formule-item-choice {
  .items-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, auto));
    justify-items: stretch;
    grid-gap: $spacing;
    margin-bottom: $spacing-small;
  }
}

.items-container {
  .btn {
    border-radius: $box-radius;
    text-transform: none;
    padding: $spacing-small $spacing-xsmall;
  }

  &:not(.empty) {
    .btn {
      &:not(.selected) {
        opacity: 0.4;
      }

      &.selected {
        background-color: $black;
        color: $white;
      }
    }
  }
}

// .items-container {
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
//   grid-gap: $spacing-small;
//   justify-content: center;

//   &:not(.empty) {
//     .btn {
//       &:not(.selected) {
//         opacity: 0.4;
//       }

//       &.selected {
//         background-color: $black;
//         color: $white;
//       }
//     }
//   }

// }
</style>

