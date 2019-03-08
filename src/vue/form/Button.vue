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

button:hover,
button:focus {
  opacity: .8;
}

.button {
  background: transparent;
  border-radius: var(--space-l);
  border: 1px solid var(--color-neutral-20);
  padding: var(--space-s) var(--space-m);
}

.button:hover,
.button:focus {
  background-color: #fdfdfd;
  border-color: var(--color-neutral-40);
}

.submit {
  background: var(--color-vibe-90);
  border: 2px solid var(--color-vibe-90);
  padding: var(--space-m);
  color: #FFF;
}

.submit:hover,
.submit:focus {
  color: var(--color-vibe-90);
  background-color: yellow;
}
</style>
