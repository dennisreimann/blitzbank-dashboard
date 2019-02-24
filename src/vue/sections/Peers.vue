<template>
  <section>
    <h2>{{ peers.length }} Peers</h2>

    <template v-if="peers">
      <ul v-if="peers.length">
        <li
          v-for="peer in peers"
          :key="peer.publicKey"
        >
          {{ peer.publicKey }} @ {{ peer.socket }}
          <Button
            title="🤜 Remove"
            @click.native="removePeer(peer.publicKey)"
          />
        </li>
      </ul>
    </template>
    <Loading v-else />

    <h3>🤝 Connect peer</h3>
    <form @submit.prevent="addPeer">
      <FormRow
        id="peerAddress"
        label="Address"
        :is-valid="peerAddress.isValid"
        :message="peerAddress.message"
      >
        <input
          id="peerAddress"
          ref="peerAddressInput"
          v-model="peerAddress.value"
          placeholder="pubkey@host"
          type="email"
        >
        <Button
          type="submit"
          title="🤝 Connect"
        />
      </FormRow>
    </form>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { field } from '../../lib/form'
import Loading from '../components/Loading'

export default {
  components: {
    Loading
  },

  data () {
    return {
      peerAddress: field()
    }
  },

  computed: {
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
        await this.connectPeer(this.peerAddress.value)
        this.peerAddress = { value: '' }
      } catch (error) {
        const { response } = error
        this.peerAddress.message = response.data
        this.peerAddress.isValid = false
        this.$refs.peerAddressInput.focus()
        console.error(response ? response.data : error.message)
      }
    }
  }
}
</script>
