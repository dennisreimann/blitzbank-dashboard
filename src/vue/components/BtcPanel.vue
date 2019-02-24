<template>
  <section>
    <h2>Bitcoin <small v-if="blockchainInfo">{{ blockchainInfo.chain }}net</small></h2>

    <template v-if="blockchainInfo">
      <p
        v-if="isSynced"
        class="sync"
      >
        <Dot status="synced" />
        Fully synced
      </p>
      <p
        v-else
        class="sync"
      >
        <Dot status="syncing" />
        Sync in progress
        <Progress
          class="progress"
          :percent="verificationPercent"
        />
      </p>
    </template>
    <Loading v-else />
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Dot from '../components/Dot'
import Loading from '../components/Loading'
import Progress from '../components/Progress'

export default {
  components: {
    Dot,
    Loading,
    Progress
  },

  computed: {
    ...mapGetters('btc', ['blockchainInfo']),

    isSynced () {
      return this.verificationPercent >= 100
    },

    verificationPercent () {
      return this.blockchainInfo.verificationprogress * 100
    }
  },

  async mounted () {
    this.loadInfo()
  },

  methods: mapActions('btc', {
    loadInfo: 'blockchainInfo'
  })
}
</script>

<style scoped>
h2 small {
  color: var(--color-neutral-40);
  font-weight: normal;
}

.progress {
  top: var(--space-xs);
  margin: 0 var(--space-s);
}
</style>
