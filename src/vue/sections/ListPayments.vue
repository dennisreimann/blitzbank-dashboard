<template>
  <section>
    <template v-if="isLoaded">
      <section v-if="payments.length">
        <article
          v-for="payment in payments"
          :key="payment.id"
        >
          <h4>
            <Dot
              :status="status(payment)"
            />
            {{ payment.id }} {{ payment.isPrivate ? "🔒" : "" }}
          </h4>
          <AttributeList>
            <Attribute
              label="Payee"
              class="payee"
            >
              <Dot :color="peerColorForPublicKey(payment.destination)" />{{ ' ' }}
              {{ peerNameForPublicKey(payment.destination) }}
            </Attribute>
            <Attribute
              label="Amount in sats"
              :value="payment.tokens"
            />
            <Attribute label="Fee in sats">
              {{ payment.fee }}
              <span v-if="payment.hops.length">({{ payment.hops.length }} hops)</span>
            </Attribute>
            <Attribute
              label="Sent at"
              :value="payment.createdDate"
            />
          </AttributeList>
        </article>
      </section>
      <div v-else>
        No payments, yet.
      </div>
    </template>
    <Loading v-else />
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import peers from '../../mixins/peers'
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

  mixins: [peers],

  computed: {
    ...mapState('payments', ['payments']),

    isLoaded () {
      return this.payments !== undefined
    }
  },

  methods: {
    ...mapActions('payments', ['payInvoice']),

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
