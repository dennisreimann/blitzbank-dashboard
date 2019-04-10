<template>
  <section>
    <h3>Add new peer</h3>
    <form
      novalidate
      @submit.prevent="addPeer"
    >
      <FormGrid class="layout">
        <FormField
          id="peerAddress"
          label="Peer address for new connection"
          :is-valid="peerAddress.isValid"
          :message="peerAddress.message"
        >
          <input
            id="peerAddress"
            ref="peerAddressInput"
            v-model="peerAddress.value"
            placeholder="pubkey@host"
            pattern=".*@.*"
            type="text"
          >
        </FormField>
        <FormButton
          type="submit"
          title="🤝 Connect"
          :disabled="buttonDisabled"
        />
      </FormGrid>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import { field } from '../../lib/form'

export default {
  data () {
    return {
      peerAddress: field()
    }
  },

  computed: {
    buttonDisabled () {
      return this.peerAddress.value.length === 0
    }
  },

  methods: {
    ...mapActions('peers', ['connectPeer']),

    async addPeer () {
      try {
        await this.connectPeer({ addr: this.peerAddress.value })
        this.peerAddress = { value: '' }
      } catch (error) {
        const { response } = error
        const msg = response ? response.data : error.message
        this.peerAddress.message = response.data
        this.peerAddress.isValid = false
        this.$refs.peerAddressInput.focus()
        console.error(msg) // eslint-disable-line no-console
      }
    }
  }
}
</script>

<style scoped>
.layout {
  grid-template-columns: repeat(2, max-content);
}

#peerAddress {
  width: 70ch;
}

.removePeer {
  margin-left: var(--space-m);
}

.peerMessage {
  color: var(--color-failure);
}
</style>
