<template>
  <section>
    <h3>Connection</h3>

    <template v-if="info">
      <FormButton
        title="🔗 Copy connection URL"
        :data-clipboard-text="info.connectionUrl"
      />

      <br>

      <img
        :src="info.connectionQRCode"
        :alt="info.connectionUrl"
      >
    </template>
    <Loading v-else />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Loading from '../components/Loading'

export default {
  components: {
    Loading
  },

  computed: {
    ...mapState('lnd', ['info'])
  }
}
</script>
