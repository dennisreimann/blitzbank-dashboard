<template>
  <section>
    <h2>LND</h2>
    <p
      v-if="info.isSyncedToChain"
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
      In progress
    </p>
    <p v-if="balance">
      Balance: {{ balance.chainBalance }} (Pending: {{ balance.pendingChainBalance }})
    </p>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Dot from '../components/Dot'

export default {
  components: {
    Dot
  },

  computed: {
    ...mapGetters(['info', 'balance'])
  },

  async mounted () {
    this.loadBalance()
  },

  methods: mapActions(['loadBalance'])
}
</script>
