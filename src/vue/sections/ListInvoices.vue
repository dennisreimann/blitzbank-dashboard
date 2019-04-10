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
              label="Amount in sats"
              :value="invoice.tokens"
            />
            <Attribute
              label="Created at"
              :value="invoice.createdDate"
            />
            <Attribute
              v-if="invoice.isConfirmed"
              label="Confirmed at"
              :value="invoice.confirmedDate"
            />
            <Attribute
              v-else
              label="Expires at"
              :value="invoice.expiresDate"
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

  computed: {
    ...mapState('invoices', ['invoices']),

    isLoaded () {
      return this.invoices !== undefined
    }
  },

  methods: {
    ...mapActions('invoices', ['payInvoice']),

    status ({ isConfirmed, isOutgoing }) {
      if (isConfirmed) {
        return 'confirmed'
      } else {
        return 'unconfirmed'
      }
    }
  }
}
</script>

<style scoped>
.paymentRequest {
  grid-column-start: col-start;
  grid-column-end: col-end;
}
</style>
