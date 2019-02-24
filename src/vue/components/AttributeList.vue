<template>
  <dl><slot /></dl>
</template>

<style scoped>
dl {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-gap: var(--space-grid-gap);
}
</style>
