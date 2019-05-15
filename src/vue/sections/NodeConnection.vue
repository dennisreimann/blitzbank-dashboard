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
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('lnd', ['info'])
  }
}
</script>
