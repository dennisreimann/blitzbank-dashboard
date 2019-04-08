<template>
  <dl :class="`cols-${cols}`">
    <slot />
  </dl>
</template>

<script>
export default {
  props: {
    cols: {
      type: Number,
      default: 4
    }
  }
}
</script>

<style scoped>
dl {
  display: grid;
  grid-gap: var(--space-grid-gap);
}

dl.cols-5 {
  grid-template-columns: [col-start] repeat(auto-fill, minmax(150px, 1fr)) [col-end];
}

dl.cols-4 {
  grid-template-columns: [col-start] repeat(auto-fill, minmax(180px, 1fr)) [col-end];
}

dl.cols-2 {
  grid-template-columns: [col-start] repeat(auto-fill, minmax(360px, 1fr)) [col-end];
}
</style>
