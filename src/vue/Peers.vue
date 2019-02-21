<template>
  <section>
    <h1>Peers &amp; Channels</h1>
    <Channels />
    <Peers />
  </section>
</template>

<script>
import Peers from './sections/Peers'
import Channels from './sections/Channels'

export default {
  components: {
    Channels,
    Peers
  }
}
</script>
