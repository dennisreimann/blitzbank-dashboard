<template>
  <section>
    <h2>Channels</h2>

    <template v-if="info">
      <AttributeList>
        <Attribute
          label="Active"
          :value="info.activeChannelsCount"
        />
        <Attribute
          label="Pending"
          :value="info.pendingChannelsCount"
        />
      </AttributeList>
    </template>
    <Loading v-else />

    <h3>🚅 New channel</h3>
    <form>
      <Button
        title="✨ Create address"
        @click.native="createAddress"
      />

      <span v-if="newAddress">
        {{ newAddress }}
      </span>
    </form>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AttributeList from '../components/AttributeList'
import Attribute from '../components/Attribute'
import Loading from '../components/Loading'

export default {
  components: {
    AttributeList,
    Attribute,
    Loading
  },

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
