<template>
  <section>
    <template v-if="isLoaded">
      <section v-if="invoices.length">
        <article
          v-for="invoice in invoices"
          :key="invoice.id"
        >
          <h4>
            <Dot
              :status="status(invoice)"
            />
            {{ invoice.id }} {{ invoice.isPrivate ? "🔒" : "" }}
          </h4>
          <AttributeList>
            <Attribute
              label="Description"
              :value="invoice.description"
            />
            <Attribute
              label="Amount"
              :value="invoice.tokens"
            />
            <Attribute
              label="Created at"
              :value="invoice.createdAt"
            />
            <Attribute
              label="Expires at"
              :value="invoice.expiresAt"
            />
            <Attribute
              label="Payment Request"
              class="paymentRequest"
              :value="invoice.request"
            />
          </AttributeList>
          <div class="options">
            <FormButton
              title="🧾 Copy Payment Request"
              class="copyPaymentRequest"
              :data-clipboard-text="invoice.request"
              @click.prevent.native
            />
          </div>
        </article>
      </section>
      <div v-else>
        No invoices, yet.
      </div>
    </template>
    <Loading v-else />
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AttributeList from '../components/AttributeList'
import Attribute from '../components/Attribute'
import Dot from '../components/Dot'
import Loading from '../components/Loading'

export default {
  components: {
    AttributeList,
    Attribute,
    Dot,
    Loading
  },

  data () {
    return {
      channelInfo: {},
      invoiceFormKey: null
    }
  },

  computed: {
    ...mapState('invoices', ['invoices']),

    isLoaded () {
      return this.invoices !== undefined
    }
  },

  methods: {
    ...mapActions('invoices', ['payInvoice']),

    toggleInvoiceForm (channel) {
      this.invoiceFormKey = this.displayInvoiceForm(channel)
        ? null
        : channel.id
    },

    displayInvoiceForm (channel) {
      return this.invoiceFormKey === channel.id
    },

    status ({ isConfirmed, isOutgoing }) {
      if (isConfirmed) {
        return 'confirmed'
      } else {
        return 'unconfirmed'
      }
    },

    closeType ({ isBreachClose, isCooperativeClose, isFundingCancel, isLocalForceClose, isRemoteForceClose }) {
      if (isBreachClose) {
        return 'breached'
      } else if (isCooperativeClose) {
        return 'cooperatively'
      } else if (isFundingCancel) {
        return 'cancelled funding'
      } else if (isLocalForceClose) {
        return 'forced locally'
      } else if (isRemoteForceClose) {
        return 'forced remotely'
      }
    },

    async pay (invoice) {
    //   try {
    //     const peer = this.peerForPublicKey(channel.partnerPublicKey)
    //     await this.closeChannel({
    //       id: channel.id,
    //       socket: peer.socket,
    //       transactionId: channel.transactionId,
    //       transactionVout: channel.transactionVout,
    //       partnerPublicKey: channel.partnerPublicKey
    //     })
    //   } catch (error) {
    //     const { response } = error
    //     const message = response ? response.data : error.message
    //     Vue.set(this.channelInfo, channel.id, {
    //       type: FAILURE,
    //       message
    //     })
    //     console.error(message)
    //   }
    }
  }
}
</script>

<style scoped>
.invoiceForm {
  margin-top: var(--space-l);
}

.paymentRequest {
  grid-column-start: col-start;
  grid-column-end: col-end;
}
</style>
