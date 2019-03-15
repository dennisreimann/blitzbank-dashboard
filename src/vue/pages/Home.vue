<template>
  <main>
    <h1>{{ info.alias }}</h1>

    <LndPanel />
    <BtcPanel />
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LndPanel from '../components/LndPanel'
import BtcPanel from '../components/BtcPanel'

export default {
  components: {
    LndPanel,
    BtcPanel
  },

  computed: {
    ...mapState('lnd', ['info', 'balance']),
    ...mapState('btc', ['blockchainInfo'])
  },

  watch: {
    '$route': 'fetchData'
  },

  created () {
    this.fetchData()
  },

  methods: {
    ...mapActions('lnd', ['loadBalance']),
    ...mapActions('btc', ['loadBlockchainInfo']),

    fetchData () {
      if (this.balance === undefined) this.loadBalance()
      if (this.blockchainInfo === undefined) this.loadBlockchainInfo()
    }
  }
}
</script>
