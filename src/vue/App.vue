<template>
  <div id="app">
    <Nav />
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Nav from './components/Nav'

export default {
  components: {
    Nav
  },

  computed: mapState(['info'])
}
</script>

<style>
:root {
  --color-vibe-90: #0B2545;
  --color-vibe-80: #13315C;
  --color-vibe-60: #134074;
  --color-vibe-30: #8DA9C4;
  --color-vibe-10: #E3F2FD;

  --color-neutral-100: #000000;
  --color-neutral-80: #333333;
  --color-neutral-60: #666666;
  --color-neutral-40: #999999;
  --color-neutral-20: #CCCCCC;
  --color-neutral-0: #FFFFFF;

  --color-success: green;
  --color-progressing: orange;
  --color-failure: red;

  --space-xxl: 4rem;
  --space-xl: 2.5rem;
  --space-l: 1.5rem;
  --space-m: .75rem;
  --space-s: .25rem;
  --space-xs: .125rem;
  --space-grid-gap: var(--space-l);

  --line-height-base: 1.6;
  --line-height-heading: 1.2;

  --font-size-base: 16px;
  --font-size-xxl: 2.5rem;
  --font-size-xl: 2rem;
  --font-size-l: 1.5rem;
  --font-size-m: 1rem;
  --font-size-s: .9rem;
  --font-size-xs: .75rem;

  --font-family-base: Avenir, Helvetica, Arial, sans-serif;
  --font-family-code: 'Fira Code', Hasklig, 'Source Code Pro', 'DejaVu Sans Mono', Hack, Meslo, Menlo, Inconsolata, Consolas, 'Liberation Mono', Courier, monospace;

  --nav-size: 60px;
  --dot-size: var(--space-m);
}

* {
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  box-sizing: border-box;
  vertical-align: baseline;
}

html {
  min-height: 100%;
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
}

body {
  min-height: 100%;
  font-family: var(--font-family-base);
  padding-left: var(--nav-size);
  background-color: var(--color-vibe-10);
  background-image:
    radial-gradient(ellipse at 55% 90%, #fbfcdb, transparent),
    radial-gradient(circle at right top, var(--color-vibe-10), transparent),
    radial-gradient(circle at 40% 60%, rgba(60, 213, 0, .3), transparent);
}

h1 {
  font-size: var(--font-size-xxl);
  line-height: var(--line-height-heading);
}

h2 {
  font-size: var(--font-size-xl);
  line-height: var(--line-height-heading);
  margin-bottom: var(--space-l);
}

h3 {
  font-size: var(--font-size-l);
  line-height: var(--line-height-heading);
  margin-bottom: var(--space-m);
}

h4 {
  font-size: var(--font-size-m);
  margin-bottom: var(--space-m);
  line-height: 1.2;
}

p + h2,
p + h3,
p + h4,
dl + h2,
dl + h3,
dl + h4,
ul + h2,
ul + h3,
ul + h4,
ol + h2,
ol + h3,
ol + h4,
pre + h2,
pre + h3,
pre + h4,
table + h2,
table + h3,
table + h4,
figure + h2,
figure + h2,
figure + h3,
figure + h4,
article + h2,
article + h2,
article + h3,
article + h4,
h2 + article,
h3 + article ,
h4 + article {
  margin-top: var(--space-l);
}

main {
  flex: 1;
  color: var(--color-vibe-90);
  margin: var(--space-m) var(--space-grid-gap) var(--space-xl);
}

main h1 {
  padding: var(--space-grid-gap);
}

main a {
  color: var(--color-vibe-60);
  text-decoration: underline;
}

main > section {
  background: var(--color-neutral-0);
  padding: var(--space-grid-gap) var(--space-grid-gap);
  border-radius: var(--space-s);
}

main > section + section {
  margin-top: var(--space-grid-gap);
}

section + section {
  margin-top: var(--space-xxl);
}

article + article {
  margin-top: var(--space-xl);
}

p {
  margin-bottom: var(--space-m);
}

dl,
ol,
ul {
  margin-bottom: var(--space-l);
}

ol,
ul {
  margin-left: 1rem;
}

small {
  color: var(--color-neutral-40);
  font-size: var(--font-size-s);
  font-weight: normal !important;
}

code {
  font-family: var(--font-family-code);
  font-size: .95rem;
}

.visually-hidden {
  border: 0 !important;
  clip: rect(0 0 0 0) !important;
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
}
</style>

<style scoped>
#app {
  display: flex;
  height: 100%;
  max-width: 1000px;
}
</style>
