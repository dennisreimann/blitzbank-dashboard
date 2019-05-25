<template>
  <section>
    <template v-if="isLoaded">
      <section v-if="activeChannels.length">
        <h3>Active</h3>
        <article
          v-for="channel in activeChannels"
          :key="channel.id"
        >
          <h4>
            <Dot :color="peerColorForPublicKey(channel.partnerPublicKey)" />
            {{ peerNameForPublicKey(channel.partnerPublicKey) }}:
            {{ channel.id }} {{ channel.isPrivate ? "🔒" : "" }}
          </h4>
          <AttributeList>
            <Attribute label="Balance in sats">
              <Meter
                :percent="percent(channel, channel.localBalance)"
                :value="channel.localBalance"
                title="Local"
              />
              <Meter
                :flipped="true"
                :percent="percent(channel, channel.remoteBalance)"
                :value="channel.remoteBalance"
                title="Remote"
              />
            </Attribute>
            <Attribute
              label="Capacity"
              :value="channel.capacity"
            />
          </AttributeList>
          <div class="options">
            <FormButton
              title="🧾 Create Invoice"
              class="createInvoice"
              @click.native="toggleInvoiceForm(channel)"
            />
            <FormButton
              title="👋 Close"
              class="closeChannel"
              @click.native="close(channel)"
            />
          </div>
          <Info
            v-if="channelInfo[channel.id]"
            v-bind="channelInfo[channel.id]"
            class="channelInfo"
          />
          <InvoiceForm
            v-if="displayInvoiceForm(channel)"
            :channel="channel"
            class="invoiceForm"
          />
        </article>
      </section>
      <div v-else>
        No active channels, yet.
      </div>

      <hr v-if="activeChannels.length === 0 && pendingChannels.length">

      <section v-if="pendingChannels.length">
        <h3>Pending</h3>
        <div
          v-for="channel in pendingChannels"
          :key="channel.transactionId"
        >
          <strong>
            <Dot
              :color="peerColorForPublicKey(channel.partnerPublicKey)"
              :status="status(channel)"
            />
            {{ peerNameForPublicKey(channel.partnerPublicKey) }}
            {{ status(channel) }}
          </strong>
          <span>- {{ channel.localBalance }} sats</span>
        </div>
      </section>
    </template>
    <Loading v-else />
  </section>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import peers from '../mixins/peers'
import AttributeList from '../components/AttributeList'
import Attribute from '../components/Attribute'
import Dot from '../components/Dot'
import Loading from '../components/Loading'
import Meter from '../components/Meter'
import Info, { FAILURE } from '../components/Info'
import InvoiceForm from '../components/InvoiceForm'

export default {
  components: {
    AttributeList,
    Attribute,
    Dot,
    Info,
    Loading,
    Meter,
    InvoiceForm
  },

  mixins: [peers],

  data () {
    return {
      channelInfo: {},
      invoiceFormKey: null
    }
  },

  computed: {
    ...mapState('channels', ['activeChannels', 'pendingChannels', 'closedChannels']),

    isLoaded () {
      return this.activeChannels !== undefined
    }
  },

  methods: {
    ...mapActions('channels', ['closeChannel']),

    percent (channel, balance) {
      return Math.round(balance * 100 / channel.capacity)
    },

    toggleInvoiceForm (channel) {
      this.invoiceFormKey = this.displayInvoiceForm(channel)
        ? null
        : channel.id
    },

    displayInvoiceForm (channel) {
      return this.invoiceFormKey === channel.id
    },

    status ({ isActive, isClosing, isOpening }) {
      if (isActive) {
        return 'active'
      } else if (isClosing) {
        return 'closing'
      } else if (isOpening) {
        return 'opening'
      }
    },

    async close (channel) {
      try {
        const peer = this.peerForPublicKey(channel.partnerPublicKey)
        Vue.delete(this.channelInfo, channel.id)
        await this.closeChannel({
          id: channel.id,
          socket: peer.socket,
          transactionId: channel.transactionId,
          transactionVout: channel.transactionVout,
          partnerPublicKey: channel.partnerPublicKey
        })
      } catch (error) {
        const { response } = error
        const message = response ? response.data : error.message
        Vue.set(this.channelInfo, channel.id, {
          type: FAILURE,
          message
        })
      }
    }
  }
}
</script>

<style scoped>
.invoiceForm {
  margin-top: var(--space-l);
}
</style>
