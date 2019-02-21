<template>
  <section>
    <h2>{{ peers.length }} Peers</h2>
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

    <form @submit.prevent="addPeer">
      <Fieldset title="🤝 Connect peer">
        <FormRow
          id="peerAddress"
          label="Address"
          :is-valid="peerAddress.isValid"
          :message="peerAddress.message"
        >
          <input
            id="peerAddress"
            v-model="peerAddress.value"
            placeholder="pubkey@host"
            type="text"
          >
          <Button
            type="submit"
            title="🤝 Connect"
          />
        </FormRow>
      </Fieldset>
    </form>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { field } from '../../lib/form'

export default {
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
        console.error(response ? response.data : error.message)
      }
    }
  }
}
</script>
