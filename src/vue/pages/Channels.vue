<template>
  <main>
    <h1>{{ title }} <small v-if="pendingChannelsCount">{{ pendingChannelsCount }} pending</small></h1>

    <ListChannels />
    <NewChannel />
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ListChannels from '../sections/ListChannels'
import NewChannel from '../sections/NewChannel'

export default {
  components: {
    ListChannels,
    NewChannel
  },

  computed: {
    ...mapState('peers', ['peers']),
    ...mapState('channels', ['activeChannels', 'pendingChannels']),

    title () {
      const count = this.activeChannels && this.activeChannels.length
      return count
        ? `${count} Channel${count !== 1 ? 's' : ''}`
        : 'Channels'
    },

    pendingChannelsCount () {
      return this.pendingChannels && this.pendingChannels.length
    }
  },

  watch: {
    '$route': 'fetchData'
  },

  created () {
    this.fetchData()
  },

  methods: {
    ...mapActions('peers', ['loadPeers']),
    ...mapActions('channels', ['loadChannels']),

    fetchData () {
      if (this.peers === undefined) this.loadPeers()
      if (this.activeChannels === undefined) this.loadChannels()
    }
  }
}
</script>
