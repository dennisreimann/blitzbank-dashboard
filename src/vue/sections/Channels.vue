<template>
  <section>
    <h2>Channels</h2>
    <p>Active: {{ info.activeChannelsCount }}</p>
    <p>Pending: {{ info.pendingChannelsCount }}</p>

    <form>
      <Fieldset title="🚅 New channel">
        <Button
          title="✨ Create address"
          @click.native="createAddress"
        />

        <span v-if="newAddress">
          {{ newAddress }}
        </span>
      </Fieldset>
    </form>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['info']),
    ...mapGetters('channels', ['newAddress'])
  },

  methods: {
    ...mapActions('channels', {
      createAddress: 'createAddress'
    })
  }
}
</script>

<style scoped>
</style>
