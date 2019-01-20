<template>
  <div class="home">
    <HelloWorld msg="Welcome to the Blitzbank"/>

    <pre>{{ info }}</pre>
    <pre>{{ sys }}</pre>
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
      info: null,
      sys: null
    }
  },

  async mounted () {
    this.info = await API.get('info')
    this.sys = await API.get('sys')
  }
}
</script>
