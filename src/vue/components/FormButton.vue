<template>
  <button
    :type="type"
    :class="type"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },

    type: {
      type: String,
      default: 'button'
    }
  }
}
</script>

<style scoped>
button {
  font-size: var(--font-size-m);
  cursor: pointer;
  transition: all .2s;
}

button[disabled] {
  pointer-events: none;
  opacity: .4;
}

.grid + button {
  margin-top: var(--space-m);
}

.button {
  background: var(--color-neutral-0);
  border-radius: var(--space-l);
  border: 1px solid var(--color-neutral-20);
  padding: var(--space-s) var(--space-m);
  white-space: nowrap;
}

.button:hover,
.button:focus {
  background-color: var(--color-neutral-10);
  border-color: var(--color-neutral-40);
}

.submit {
  background: var(--color-vibe-90);
  border: 2px solid var(--color-vibe-90);
  padding: var(--space-m);
  height: var(--input-size);
  color: var(--color-neutral-0);
}

.submit:hover,
.submit:focus {
  color: yellow;
  border-color: var(--color-neutral-100);
  background-color: var(--color-neutral-100);
}
</style>
