<template>
  <fieldset>
    <legend>{{ title }}</legend>
    <slot />
  </fieldset>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
fieldset {
  border: 5px solid var(--color-dark);
  padding: var(--space-l);
}

legend {
  font-weight: bold;
  font-size: var(--font-size-l);
  padding: 0 var(--space-m);
}
</style>
