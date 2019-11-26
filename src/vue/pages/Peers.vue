<template>
  <main>
    <h1>{{ title }}</h1>

    <ListPeers />
    <NewPeer />
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ListPeers from '../sections/ListPeers'
import NewPeer from '../sections/NewPeer'

export default {
  components: {
    ListPeers,
    NewPeer
  },

  computed: {
    ...mapState('peers', ['peers']),

    title () {
      return this.peers && this.peers.length
        ? `${this.peers.length} Peer${this.peers.length !== 1 ? 's' : ''}`
        : 'Peers'
    }
  },

  watch: {
    $route: 'fetchData'
  },

  created () {
    this.fetchData()
  },

  methods: {
    ...mapActions('peers', ['loadPeers']),

    fetchData () {
      if (this.peers === undefined) this.loadPeers()
    }
  }
}
</script>
