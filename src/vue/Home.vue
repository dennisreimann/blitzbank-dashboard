<template>
  <section>
    <h1>{{ info.alias }}</h1>

    <LndInfo />
    <BtcInfo />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import LndInfo from './sections/LndInfo'
import BtcInfo from './sections/BtcInfo'

export default {
  components: {
    LndInfo,
    BtcInfo
  },

  computed: {
    ...mapGetters(['info'])
  }
}
</script>
