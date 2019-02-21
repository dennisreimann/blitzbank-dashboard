<template>
  <section>
    <h2>LND</h2>
    <p>Public Key: {{ info.publicKey }}</p>
    <p>Version: {{ info.version }}</p>
    <p>Block Height: {{ info.currentBlockHeight }}</p>
    <p>Synced to chain: {{ info.isSyncedToChain }}</p>
    <p v-if="balance">
      Balance: {{ balance.chainBalance }} (Pending: {{ balance.pendingChainBalance }})
    </p>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['info', 'balance'])
  },

  async mounted () {
    this.loadBalance()
  },

  methods: mapActions(['loadBalance'])
}
</script>
