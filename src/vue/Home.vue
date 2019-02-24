<template>
  <main>
    <h1>{{ info.alias }}</h1>

    <LndPanel />
    <BtcPanel />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import LndPanel from './components/LndPanel'
import BtcPanel from './components/BtcPanel'

export default {
  components: {
    LndPanel,
    BtcPanel
  },

  computed: {
    ...mapGetters(['info'])
  }
}
</script>
