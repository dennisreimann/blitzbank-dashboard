<template>
  <section>
    <template v-if="peers">
      <h3>Connected peers</h3>
      <article
        v-for="peer in peers"
        :key="peer.publicKey"
        class="peer"
      >
        <div class="peerInfo">
          <Dot :color="peer.color" />
          {{ peer.alias || peer.publicKey }}
          <Button
            title="🤜 Remove"
            class="removePeer"
            @click.native="removePeer(peer)"
          />
        </div>
        <div
          v-if="peer.message"
          class="peerMessage"
        >
          {{ peer.message }}
        </div>
      </article>
    </template>
    <Loading v-else />
  </section>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { field } from '../../lib/form'
import Dot from '../components/Dot'
import Loading from '../components/Loading'

export default {
  components: {
    Dot,
    Loading
  },

  data () {
    return {
      peerAddress: field()
    }
  },

  computed: {
    ...mapState('peers', ['peers'])
  },

  methods: {
    ...mapActions('peers', ['disconnectPeer']),
    ...mapMutations('peers', ['addMessageToPeer']),

    async removePeer (peer) {
      try {
        await this.disconnectPeer({ pubkey: peer.publicKey })
      } catch (error) {
        const { response } = error
        const message = response ? response.data : error.message
        this.addMessageToPeer({ peer, message })
        console.error(message)
      }
    }
  }
}
</script>

<style scoped>
.removePeer {
  margin-left: var(--space-m);
}

.peerMessage {
  color: var(--color-failure);
}
</style>
