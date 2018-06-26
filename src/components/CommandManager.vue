<template>
  <div class="command-manager">
    <h1 class="main-title">Commandes sur place</h1>
    <div class="command-list">
      <p class="no-items" v-if="commandsOnSite.length <= 0">Aucunes commandes</p>
      <router-link :to="{ name: 'command', params: { id: command.id }}" class="command" v-for="command in commandsOnSite" :key="command.id">
        <div class="table-number">Table <span class="number">{{command.tableNumber}}</span></div>
        <div class="number-of-guests">{{command.numberOfGuest}} personnes</div>
        <div class="name" v-if="command.name">{{command.name}}</div>
      </router-link>
    </div>
    <h1 class="main-title" v-if="commandsTakeAway.length > 0">Commandes à emporter</h1>
    <div class="command-list" v-if="commandsTakeAway.length > 0">
      <router-link :to="{ name: 'command', params: { id: command.id }}" class="command take-away" v-for="command in commandsTakeAway" :key="command.id">
        <div class="name" v-if="command.name">{{command.name}}</div>
        <div class="number-of-guests">{{command.numberOfGuest}} personnes</div>
      </router-link>
    </div>
    <button type="button" class="btn btn-icon-left add-btn" @click="openCommandCreator"><AppIcon icon="plus" />Nouvelle commande</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AppIcon from '@/components/AppIcon';
import { ON_SITE, TAKE_AWAY } from '@/utils/command-utils';

export default {
  components: {
    AppIcon,
  },
  computed: {
    ...mapState('commands', ['commands']),
    commandsTakeAway() {
      return this.commands.filter(command => command.type === TAKE_AWAY);
    },
    commandsOnSite() {
      return this.commands.filter(command => command.type === ON_SITE);
    },
  },
  methods: {
    ...mapActions('modal', ['showCommandCreator']),
    openCommandCreator() {
      this.showCommandCreator();
    },
    onCommandClick(command) {
      console.log(command);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';

.command-manager {
  padding: $spacing;
}

.command-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 15rem);
  grid-auto-rows: 1fr;
  flex-direction: row;
  justify-content: center;
  grid-gap: $spacing-small;
  margin-bottom: $spacing-small;

  .command {
    border-radius: $radius;
    text-decoration: none;
    border: 2px solid $black;
    padding: $spacing $spacing-small;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    cursor: pointer;
    color: $black;
    transition: background-color $transition-duration ease, color $transition-duration ease;

    .table-number {
      font-size: 1.9rem;
      line-height: 1;

      .number {
        font-weight: $bold-weight;
      }
    }

    .number-of-guests {
      font-style: italic;
      font-size: 1.4rem;
    }

    .name {
      margin-top: $spacing-small;
    }

    &:hover,
    &:focus {
      background-color: $black;
      color: $white;
    }

    &.take-away {
      .name {
        margin: 0;
      }
    }
  }
}

.add-btn {
  position: fixed;
  bottom: $spacing;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}
</style>
