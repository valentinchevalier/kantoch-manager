<template>
  <div class="command-history">
    <datepicker v-model="date" inline format="D d MMMM yyyy" monday-first :disabledDates="disabledDates" :language="datepickerLang" @selected="onDateChange"></datepicker>
    <AppLoader :loading="loading" :inline="true" />
    <div v-if="!loading">
      <h2 class="small-title">{{date | moment('dddd Do MMMM YYYY')}}</h2>
      <div class="no-result" v-if="commands.length === 0">Aucune commande</div>
      <div class="results" v-else>
        <CommandHistoryList :commands="commands" @command-click="showBill"/>
      </div>
    </div>

  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex';
import Datepicker from 'vuejs-datepicker';
import { fr } from 'vuejs-datepicker/dist/locale';

import db from '@/utils/db';
import AppIcon from '@/components/AppIcon';
import AppLoader from '@/components/AppLoader';
import CommandHistoryList from '@/components/command/CommandHistoryList';
import { ON_SITE } from '@/utils/command-utils';
import { mapActions } from 'vuex';

export default {
  components: {
    AppIcon,
    AppLoader,
    Datepicker,
    CommandHistoryList,
  },
  data() {
    const from = new Date();
    from.setHours(0, 0, 0, 0);
    return {
      date: undefined,
      commands: [],
      datepickerLang: fr,
      disabledDates: {
        from,
      },
      loading: false,
    };
  },
  methods: {
    ...mapActions('modal', ['showCommandBillModal']),
    onDateChange(date) {
      this.loading = true;
      this.commands = [];
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      db.collection('commands')
        .where('addedAt', '>', start)
        .where('addedAt', '<', end)
        .where('isEnded', '==', true)
        .get()
        .then((querySnapshot) => {
          this.loading = false;
          querySnapshot.forEach((doc) => {
            this.commands.push({
              id: doc.id,
              ...doc.data(),
            });
          });
        });
    },
    isOnSite(command) {
      return command.type === ON_SITE;
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

.command-history {
  padding: $spacing;
  display: grid;
  grid-template-columns: 30rem auto;
  grid-column-gap: $spacing-medium;
}

.small-title {
  margin-bottom: $spacing;
}

</style>
