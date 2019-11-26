<template>
  <main>
    <h1>Node Information</h1>

    <LndInfo />
    <BtcInfo />
    <SysInfo />
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BtcInfo from '../sections/BtcInfo'
import LndInfo from '../sections/LndInfo'
import SysInfo from '../sections/SysInfo'

export default {
  components: {
    BtcInfo,
    LndInfo,
    SysInfo
  },

  computed: {
    ...mapState('btc', ['blockchainInfo']),
    ...mapState('lnd', { lndInfo: 'info' }),
    ...mapState('system', { systemInfo: 'info' })
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
    ...mapActions('system', ['loadSystemInfo']),

    fetchData () {
      if (this.blockchainInfo === undefined) this.loadBlockchainInfo()
      if (this.systemInfo === undefined) this.loadSystemInfo()
      if (this.lndInfo === undefined) this.loadLndInfo()
    }
  }
}
</script>
