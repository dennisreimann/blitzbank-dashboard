<template>
  <main>
    <h1>Tools</h1>

    <NewAddress />

    <NodeConnection />
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NewAddress from '../sections/NewAddress'
import NodeConnection from '../sections/NodeConnection'

export default {
  components: {
    NewAddress,
    NodeConnection
  },

  computed: {
    ...mapState('lnd', { lndInfo: 'info' })
  },

  created () {
    this.fetchData()
  },

  methods: {
    ...mapActions('lnd', { loadLndInfo: 'loadInfo' }),

    fetchData () {
      if (this.lndInfo === undefined) this.loadLndInfo()
    }
  }
}
</script>
