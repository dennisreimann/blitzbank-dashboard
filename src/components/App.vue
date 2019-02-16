<template>
  <div id="app">
    <header>
      <router-link to="/">
        ⚡️ {{ info.alias }}
      </router-link>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['info'])
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  vertical-align: baseline;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

fieldset {
  border: 5px solid #00172e;
  padding: 10px;
}

fieldset legend {
  font-weight: bold;
  padding: 10px;
}

label {
  display: block;
}

input {
  border: 1px solid #999;
  padding: 10px;
}

input[type="text"] {
  width: 100%;
}
</style>

<style scoped>
header {
  background: #00172e;
  color: #fff;
  padding: 1rem;
}

header a {
  color: inherit;
  text-decoration: none;
}

main {
  background: #fff;
  color: #00172e;
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
}

main a {
  color: #F39E39;
}
</style>
