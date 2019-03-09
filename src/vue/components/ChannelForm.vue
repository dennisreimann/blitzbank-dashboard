<template>
  <form
    v-if="peers.length"
    @submit.prevent="createChannel"
  >
    <Info
      v-if="info"
      v-bind="info"
    />
    <FormRow
      v-if="!peer"
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
          v-for="p in peers"
          :key="p.publicKey"
          :value="p.publicKey"
        >
          {{ p.alias || p.publicKey }}
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

<script>
import { mapActions, mapState } from 'vuex'
import { field, reset } from '../../lib/form'
import Info, { FAILURE, SUCCESS } from './Info'

export default {
  components: {
    Info
  },

  props: {
    peer: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      peerPubKey: field(this.peer ? this.peer.publicKey : null),
      fundingAmount: field(25000),
      info: null
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

        this.info = {
          type: SUCCESS,
          message: 'Channel created – waiting for confirmation.'
        }
      } catch (error) {
        const { response } = error
        this.info = {
          type: FAILURE,
          message: response ? response.data : error.message
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
