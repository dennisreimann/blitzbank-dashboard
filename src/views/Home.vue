<template>
  <div class="home">
    <HelloWorld msg="Welcome to the Blitzbank"/>

    <pre>{{ info }}</pre>
  </div>
</template>

<script>
import API from '../api'
import HelloWorld from '../components/HelloWorld.vue'

export default {
  components: {
    HelloWorld
  },

  data () {
    return {
      info: null
    }
  },

  async mounted () {
    const result = await API.get('info')

    this.info = result
  }
}
</script>
