<template>
  <div class="commands-of-the-day">
    <p class="no-items" v-if="commands.length <= 0">Aucunes commandes</p>
    <h2 class="small-title" v-if="commandsOnSite.length > 0">Sur place</h2>
    <div class="command-list">
      <CommandLink v-for="command in commandsOnSite" :command="command" :key="command.id" @long-click="editCommandInfos(command)"/>
    </div>
    <h2 class="small-title" v-if="commandsTakeAway.length > 0">À emporter</h2>
    <div class="command-list" v-if="commandsTakeAway.length > 0">
      <CommandLink v-for="command in commandsTakeAway" :command="command" :key="command.id" @long-click="editCommandInfos(command)"/>
    </div>
    <h2 class="small-title" v-if="commandsEnded.length > 0">Commandes terminées</h2>
    <CommandHistoryList :commands="commandsEnded" @command-click="showBill" @command-long-click="editCommandInfos"/>
    <button type="button" class="btn btn-icon-left add-btn" @click="openCommandCreatorModal"><AppIcon icon="plus" />Nouvelle commande</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AppIcon from '@/components/AppIcon';
import CommandLink from '@/components/command/CommandLink';
import CommandHistoryList from '@/components/command/CommandHistoryList';
import { ON_SITE, TAKE_AWAY } from '@/utils/command-utils';

export default {
  components: {
    AppIcon,
    CommandLink,
    CommandHistoryList,
  },
  computed: {
    ...mapState('commands', ['commands']),
    commandsTakeAway() {
      return this.commands.filter(command => !command.isEnded && command.type === TAKE_AWAY);
    },
    commandsOnSite() {
      return this.commands.filter(command => !command.isEnded && command.type === ON_SITE);
    },
    commandsEnded() {
      return this.commands.filter(command => command.isEnded);
    },
    commandsEndedTotalPrice() {
      return this.commandsEnded.reduce((acc, command) => acc + command.bill.totalPrice, 0);
    },
  },
  methods: {
    ...mapActions('modal', ['showCommandCreatorModal', 'showCommandEditorModal', 'showCommandBillModal']),
    openCommandCreatorModal() {
      this.showCommandCreatorModal();
    },
    isOnSite(command) {
      return command.type === ON_SITE;
    },
    editCommandInfos(command) {
      console.log(command);
      this.showCommandEditorModal({ commandId: command.id });
    },
    showBill(command) {
      this.showCommandBillModal({ command });
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

.commands-of-the-day {
  @include responsive($small-breakpoint) {
    margin-bottom: $spacing-large;
  }
}

.small-title {
  margin-bottom: $spacing-small;
}

.command-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 15rem);
  grid-auto-rows: 1fr;
  flex-direction: row;
  justify-content: center;
  grid-gap: $spacing-small;
  margin-bottom: $spacing-small;

  @include responsive($small-breakpoint) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.command-history-list {
  max-width: 40rem;
}

.add-btn {
  position: fixed;
  bottom: $spacing;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  @include responsive($small-breakpoint) {
    right: -50%;
  }
}
</style>
