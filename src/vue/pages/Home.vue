<template>
  <main>
    <template v-if="info">
      <h1>{{ info.alias }}</h1>

      <LndPanel />
      <BtcPanel />
    </template>
    <Loading v-else />
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BtcPanel from '../components/BtcPanel'
import LndPanel from '../components/LndPanel'
import Loading from '../components/Loading'

export default {
  components: {
    BtcPanel,
    LndPanel,
    Loading
  },

  computed: {
    ...mapState('lnd', ['info', 'balance']),
    ...mapState('btc', ['blockchainInfo'])
  },

  watch: {
    $route: 'fetchData'
  },

  created () {
    this.fetchData()
  },

  methods: {
    ...mapActions('lnd', {
      loadBalance: 'loadBalance',
      loadLndInfo: 'loadInfo'
    }),
    ...mapActions('btc', ['loadBlockchainInfo']),

    fetchData () {
      if (this.info === undefined) this.loadLndInfo()
      if (this.balance === undefined) this.loadBalance()
      if (this.blockchainInfo === undefined) this.loadBlockchainInfo()
    }
  }
}
</script>
