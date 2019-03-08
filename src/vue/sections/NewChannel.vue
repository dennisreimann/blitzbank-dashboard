<template>
  <section>
    <h3>New channel</h3>
    <template v-if="peers">
      <form
        v-if="peers.length"
        @submit.prevent="createChannel"
      >
        <FormRow
          id="peerPubKey"
          label="Peer for new channel"
          :is-valid="peerPubKey.isValid"
          :message="peerPubKey.message"
        >
          <select
            id="peerPubKey"
            ref="peerPubKeyInput"
            v-model="peerPubKey.value"
            type="text"
          >
            <option
              v-for="peer in peers"
              :key="peer.publicKey"
              :value="peer.publicKey"
            >
              {{ peer.alias || peer.publicKey }}
            </option>
          </select>
        </FormRow>
        <FormRow
          id="fundingAmount"
          label="Funding amount in sats"
          :is-valid="fundingAmount.isValid"
          :message="fundingAmount.message"
        >
          <input
            id="fundingAmount"
            ref="fundingAmountInput"
            v-model="fundingAmount.value"
            type="number"
          >
          <Button
            type="submit"
            class="createChannel"
            title="⚡️ Create channel"
          />
        </FormRow>
      </form>
      <p v-else>
        To create a channel you need to
        <router-link to="/peers">
          connect a peer
        </router-link>.
      </p>
    </template>
    <Loading v-else />
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { field, reset } from '../../lib/form'
import Loading from '../components/Loading'

export default {
  components: {
    Loading
  },

  data () {
    return {
      peerPubKey: field(),
      fundingAmount: field(25000)
    }
  },

  computed: {
    ...mapState('peers', ['peers'])
  },

  methods: {
    ...mapActions('channels', ['openChannel']),

    async createChannel () {
      try {
        reset(this.peerPubKey, this.fundingAmount)

        await this.openChannel({
          pubkey: this.peerPubKey.value,
          amount: this.fundingAmount.value
        })
      } catch (error) {
        const { response } = error
        const msg = response ? response.data : error.message

        if (msg.match(/(node|key|pending)/)) {
          this.peerPubKey.message = msg
          this.peerPubKey.isValid = false
          this.$refs.peerPubKeyInput.focus()
        } else {
          this.fundingAmount.message = msg
          this.fundingAmount.isValid = false
          this.$refs.fundingAmountInput.focus()
        }
      }
    }
  }
}
</script>

<style scoped>
/* .createChannel {
  margin-top: var(--space-l);
} */
</style>
