<template>
  <div
    :class="type"
    class="box"
  >
    <slot>{{ message }}</slot>
  </div>
</template>

<script>
export const INFO = 'info'
export const SUCCESS = 'success'
export const FAILURE = 'failure'

export default {
  props: {
    type: {
      type: String,
      default: INFO,
      validator (value) {
        return [INFO, SUCCESS, FAILURE].includes(value)
      }
    },

    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.box {
  color: var(--color-vibe-60);
  border: 1px solid var(--color-vibe-30);
  border-radius: var(--space-s);
  background-color: var(--color-vibe-10);
  padding: var(--space-m);
  margin-bottom: var(--space-l);
}

.success {
  color: var(--color-success);
  border-color: var(--color-success);
  background-color: var(--color-success-background);
}

.failure {
  color: var(--color-failure);
  border-color: var(--color-failure);
  background-color: var(--color-failure-background);
}
</style>
