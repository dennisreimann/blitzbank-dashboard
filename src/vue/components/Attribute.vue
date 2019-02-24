<template>
  <div>
    <dt>{{ label }}</dt>
    <dd><slot>{{ value }}</slot></dd>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },

    value: {
      type: [String, Number],
      default: null
    }
  }
}
</script>

<style scoped>
dt {
  color: var(--color-neutral-60);
  font-size: var(--font-size-xs);
  margin-bottom: var(--space-s);
  text-transform: uppercase;
}

dd {
  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}
</style>
