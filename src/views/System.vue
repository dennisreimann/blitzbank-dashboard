<template>
  <main>
    <pre>{{ info }}</pre>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
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
