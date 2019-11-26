<template>
  <main>
    <h1>{{ title }}</h1>

    <ListPayments />

    <section>
      <h3>New Payment</h3>
      <PaymentForm />
    </section>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ListPayments from '../sections/ListPayments'
import PaymentForm from '../components/PaymentForm'

export default {
  components: {
    ListPayments,
    PaymentForm
  },

  computed: {
    ...mapState('peers', ['peers']),
    ...mapState('payments', ['payments']),

    title () {
      const count = this.payments && this.payments.length
      return count
        ? `${count} Payment${count !== 1 ? 's' : ''}`
        : 'Payments'
    }
  },

  watch: {
    $route: 'fetchData'
  },

  created () {
    this.fetchData()
  },

  methods: {
    ...mapActions('peers', ['loadPeers']),
    ...mapActions('payments', ['loadPayments']),

    fetchData () {
      if (this.peers === undefined) this.loadPeers()
      if (this.payments === undefined) this.loadPayments()
    }
  }
}
</script>
