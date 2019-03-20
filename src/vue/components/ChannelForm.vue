<template>
  <Loading v-if="peers === undefined" />
  <form
    v-else-if="peers.length"
    novalidate
    @submit.prevent="createChannel"
  >
    <Info
      v-if="info"
      v-bind="info"
    />

    <FormGrid class="layout">
      <FormField
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
            disabled
            value=""
          >
            Select peer
          </option>
          <option
            v-for="p in peers"
            :key="p.publicKey"
            :value="p.publicKey"
          >
            {{ p.alias || p.publicKey }}
          </option>
        </select>
      </FormField>
      <FormField
        id="isPrivate"
        label="Private"
        :is-valid="isPrivate.isValid"
        :message="isPrivate.message"
      >
        <FormSwitch
          id="isPrivate"
          ref="isPrivateInput"
          v-model="isPrivate.value"
          type="checkbox"
          icon="🔒"
        />
      </FormField>
      <FormField
        id="fundingSats"
        label="Funding amount in sats"
        :is-valid="fundingSats.isValid"
        :message="fundingSats.message"
      >
        <input
          id="fundingSats"
          ref="fundingAmountInput"
          v-model="fundingSats.value"
          type="number"
          :step="10000"
        >
      </FormField>
      <FormField
        id="pushingSats"
        label="Initially push sats"
        :is-valid="pushingSats.isValid"
        :message="pushingSats.message"
      >
        <input
          id="pushingSats"
          ref="pushingAmountInput"
          v-model="pushingSats.value"
          type="number"
          :step="10000"
        >
      </FormField>
      <FormButton
        type="submit"
        class="createChannel"
        title="⚡️ Create channel"
        :disabled="buttonDisabled"
      />
    </FormGrid>
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
import { field } from '../../lib/form'
import Info, { FAILURE, SUCCESS } from './Info'
import Loading from './Loading'

export default {
  components: {
    Info,
    Loading
  },

  props: {
    peer: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      peerPubKey: field(this.peer ? this.peer.publicKey : ''),
      fundingSats: field(250000),
      pushingSats: field(0),
      isPrivate: field(true),
      info: null
    }
  },

  computed: {
    ...mapState('peers', ['peers']),

    buttonDisabled () {
      return this.peerPubKey.value.length === 0 ||
        this.fundingSats.value < 20000
    }
  },

  methods: {
    ...mapActions('channels', ['openChannel']),

    async createChannel () {
      try {
        await this.openChannel({
          pubkey: this.peerPubKey.value,
          isPrivate: this.isPrivate.value,
          funding: this.fundingSats.value,
          pushing: this.pushingSats.value
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
.layout {
  grid-template-columns: repeat(5, max-content);
}

#peerPubKey {
  min-width: 18ch;
}

#fundingSats,
#pushingSats {
  width: 18ch;
}
</style>
