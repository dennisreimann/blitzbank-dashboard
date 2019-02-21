<template>
  <section>
    <h1>System Information</h1>

    <pre v-if="info">{{ info }}</pre>
    <Loading v-else />
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loading from './components/Loading'

export default {
  components: {
    Loading
  },

  computed: mapGetters('system', ['info']),

  async mounted () {
    this.loadInfo()
  },

  methods: mapActions('system', {
    loadInfo: 'info'
  })
}
</script>

<style scoped>
</style>
