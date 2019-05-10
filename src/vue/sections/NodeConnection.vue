<template>
  <section>
    <h3>Connection</h3>
    <pre>{{ info.connectionUrl }}</pre>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('addresses', ['newAddress']),
    ...mapState('lnd', ['info'])
  },

  methods: {
    ...mapActions('addresses', ['createAddress'])
  }
}
</script>

<style scoped>
.createAddress {
  margin-right: var(--space-m);
}
</style>
