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
  padding: var(--space-m);
  font-size: var(--font-size-m);
  border-width: 2px;
  border-style: solid;
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
  border-color: #ccc;
}

.button:hover,
.button:focus {
  background-color: #fdfdfd;
  border-color: #999;
}

.submit {
  background: var(--color-vibe-90);
  border-color: var(--color-vibe-90);
  color: #FFF;
}

.submit:hover,
.submit:focus {
  color: var(--color-vibe-90);
  background-color: yellow;
}
</style>
