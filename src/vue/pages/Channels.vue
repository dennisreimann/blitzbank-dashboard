<template>
  <main>
    <h1>{{ title }} <small v-if="pendingChannelsCount">{{ pendingChannelsCount }} pending</small></h1>

    <ListChannels />

    <section>
      <h3>New channel</h3>
      <ChannelForm />
    </section>

    <ClosedChannels />
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ClosedChannels from '../sections/ClosedChannels'
import ListChannels from '../sections/ListChannels'
import ChannelForm from '../components/ChannelForm'

export default {
  components: {
    ListChannels,
    ChannelForm,
    ClosedChannels
  },

  computed: {
    ...mapState('peers', ['peers']),
    ...mapState('channels', ['activeChannels', 'pendingChannels', 'closedChannels']),

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
    $route: 'fetchData'
  },

  created () {
    this.fetchData()
  },

  methods: {
    ...mapActions('peers', ['loadPeers']),
    ...mapActions('channels', ['loadChannels', 'loadClosedChannels']),

    fetchData () {
      if (this.peers === undefined) this.loadPeers()
      if (this.activeChannels === undefined) this.loadChannels()
      if (this.closedChannels === undefined) this.loadClosedChannels()
    }
  }
}
</script>
