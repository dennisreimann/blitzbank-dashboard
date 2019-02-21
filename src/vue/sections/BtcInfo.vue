<template>
  <section>
    <h2>Bitcoin <small v-if="blockchainInfo.chain">({{ blockchainInfo.chain }})</small></h2>

    <div v-if="blockchainInfo">
      <p>Verification Progress: {{ blockchainInfo.verificationprogress * 100 }}%</p>
      <p>Segwit: {{ blockchainInfo.bip9Softforks.segwit.status }}</p>
      <p v-if="blockchainInfo.pruned">
        Pruning active
        <span v-if="blockchainInfo.pruned">
          (lowest-height complete block: {{ blockchainInfo.pruneheight }})
        </span>
      </p>
    </div>
    <Loading v-else />
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('btc', ['blockchainInfo'])
  },

  async mounted () {
    this.loadInfo()
  },

  methods: mapActions('btc', {
    loadInfo: 'blockchainInfo'
  })
}
</script>
