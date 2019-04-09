<template>
  <section>
    <template v-if="peers">
      <h3>Connected peers</h3>
      <article
        v-for="peer in peers"
        :key="peer.publicKey"
        class="peer"
      >
        <h4 class="peerInfo">
          <Dot :color="peer.color" />{{ ' ' }}
          <abbr
            v-if="peer.alias"
            :title="peer.publicKey"
            :data-clipboard-text="peer.publicKey"
          >{{ peer.alias }}</abbr>
          <span v-else>{{ peer.publicKey }}</span>
        </h4>
        <div class="options">
          <FormButton
            title="🧬 Create channel"
            class="createChannel"
            @click.native="toggleChannelForm(peer)"
          />
          <FormButton
            title="🤜 Remove"
            class="removePeer"
            @click.native="removePeer(peer)"
          />
        </div>
        <Info
          v-if="peerInfo[peer.publicKey]"
          v-bind="peerInfo[peer.publicKey]"
          class="peerInfo"
        />
        <ChannelForm
          v-if="displayChannelForm(peer)"
          :peer="peer"
          class="channelForm"
        />
      </article>
    </template>
    <Loading v-else />
  </section>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import Dot from '../components/Dot'
import Info, { FAILURE } from '../components/Info'
import Loading from '../components/Loading'
import ChannelForm from '../components/ChannelForm'

export default {
  components: {
    Dot,
    Info,
    Loading,
    ChannelForm
  },

  data () {
    return {
      peerInfo: {},
      channelFormKey: null
    }
  },

  computed: {
    ...mapState('peers', ['peers'])
  },

  methods: {
    ...mapActions('peers', ['disconnectPeer']),

    toggleChannelForm (peer) {
      this.channelFormKey = this.displayChannelForm(peer)
        ? null
        : peer.publicKey
    },

    displayChannelForm (peer) {
      return this.channelFormKey === peer.publicKey
    },

    async removePeer (peer) {
      try {
        await this.disconnectPeer({ pubkey: peer.publicKey })
      } catch (error) {
        const { response } = error
        const message = response ? response.data : error.message
        Vue.set(this.peerInfo, peer.publicKey, {
          type: FAILURE,
          message
        })
        console.error(message)
      }
    }
  }
}
</script>

<style scoped>
.channelForm {
  margin-top: var(--space-l);
}

.peerMessage {
  color: var(--color-failure);
}
</style>
