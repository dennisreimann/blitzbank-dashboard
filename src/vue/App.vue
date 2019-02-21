<template>
  <div id="app">
    <Nav />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Nav from './components/Nav'

export default {
  components: {
    Nav
  },

  computed: mapGetters(['info'])
}
</script>

<style>
:root {
  --color-dark: #00172e;
  --color-valid: rgb(0, 100, 0);
  --color-invalid: rgb(200, 0, 0);

  --nav-size: 60px;

  --space-xl: 2.5rem;
  --space-l: 1.5rem;
  --space-m: .75rem;
  --space-s: .25rem;
  --space-xs: .125rem;

  --font-size-xxl: 2.5rem;
  --font-size-xl: 2rem;
  --font-size-l: 1.5rem;
  --font-size-m: 18px;
  --font-size-s: .9rem;
}

* {
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  box-sizing: border-box;
  vertical-align: baseline;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: var(--font-size-m);
  padding-left: var(--nav-size);
}

h1 {
  font-size: var(--font-size-xxl);
  margin-bottom: var(--space-m);
}

h2 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-m);
  margin-top: var(--space-xl);
}

h3 {
  font-size: var(--font-size-l);
  margin-bottom: var(--space-m);
  margin-top: var(--space-xl);
}

p {
  margin-bottom: var(--space-m);
}

ol,
ul {
  margin-bottom: var(--space-l);
  margin-left: var(--space-l);
}
</style>

<style scoped>
#app {
  display: flex;
  height: 100%;
}

main {
  background: #fff;
  color: var(--color-dark);
  max-width: 960px;
  padding: 2rem;
}

main a {
  color: #F39E39;
}
</style>
