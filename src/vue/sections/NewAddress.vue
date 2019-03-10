<template>
  <section>
    <h3>New address</h3>
    <form novalidate>
      <FormButton
        title="✨ Create address"
        class="createAddress"
        @click.native="createAddress"
      />

      <span v-if="newAddress">
        {{ newAddress }}
      </span>
    </form>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('addresses', ['newAddress'])
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
