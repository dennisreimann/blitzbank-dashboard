<template>
  <main>
    <h1>{{ info.alias }}</h1>
    <p>Public Key: {{ info.identityPubkey }}</p>
    <p>Version: {{ info.version }}</p>
    <p>Synced to chain: {{ info.syncedToChain }}</p>
    <p>
      Block Height: {{ info.current_block_height }}
      /
      Latest Block: {{ info.latest_block_at }}
    </p>

    <h2>Channels</h2>
    <p>Active: {{ info.active_channels_count }} / Pending: {{ info.pending_channels_count }}</p>

    <h2>{{ info.peers_count }} Peers</h2>
    <ul v-if="peers.length">
      <li
        v-for="peer in peers"
        :key="peer.pubKey"
      >
        {{ peer.pubKey }} @ {{ peer.address }}
        <button @click="removePeer(peer.pubKey)">
          🤜 Remove
        </button>
      </li>
    </ul>

    <form @submit.prevent="addPeer">
      <fieldset>
        <legend>🤝 Connect peer</legend>
        <div class="row">
          <label for="peerAddress">
            Address
          </label>
          <input
            id="peerAddress"
            v-model="peerAddress"
            type="text"
            placeholder="pubkey@host"
          >
          <button type="submit">
            🤝 Connect
          </button>
        </div>
      </fieldset>
    </form>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      peerAddress: ''
    }
  },

  computed: {
    ...mapGetters(['info']),
    ...mapGetters('peers', {
      peers: 'all'
    })
  },

  async mounted () {
    this.loadPeers()
  },

  methods: {
    ...mapActions('peers', {
      loadPeers: 'all',
      connectPeer: 'connect',
      removePeer: 'remove'
    }),

    async addPeer () {
      try {
        await this.connectPeer(this.peerAddress)
        this.peerAddress = ''
      } catch (error) {
        const { response } = error
        console.error(response ? response.data : error.message)
      }
    }
  }
}
</script>

<style scoped>
</style>
