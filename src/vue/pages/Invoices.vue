<template>
  <main>
    <h1>{{ title }}</h1>

    <ListInvoices />

    <section>
      <h3>New Invoice</h3>
      <InvoiceForm />
    </section>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ListInvoices from '../sections/ListInvoices'
import InvoiceForm from '../components/InvoiceForm'

export default {
  components: {
    ListInvoices,
    InvoiceForm
  },

  computed: {
    ...mapState('invoices', ['invoices']),

    title () {
      const count = this.invoices && this.invoices.length
      return count
        ? `${count} Invoice${count !== 1 ? 's' : ''}`
        : 'Invoices'
    }
  },

  watch: {
    '$route': 'fetchData'
  },

  created () {
    this.fetchData()
  },

  methods: {
    ...mapActions('invoices', ['loadInvoices']),

    fetchData () {
      if (this.invoices === undefined) this.loadInvoices()
    }
  }
}
</script>
