<template>
  <section>
    <h3>Connection</h3>

    <FormButton
      title="🔗 Copy connection URL"
      :data-clipboard-text="info.connectionUrl"
    />

    <br>

    <img
      :src="info.connectionQRCode"
      :alt="info.connectionUrl"
    >
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
