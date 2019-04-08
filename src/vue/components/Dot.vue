<template>
  <span
    :class="status"
    :style="style"
    :title="status"
    class="dot"
  />
</template>

<script>

export default {
  props: {
    status: {
      type: String,
      default: null
    },

    color: {
      type: String,
      default: null
    }
  },

  computed: {
    style () {
      return this.color ? { backgroundColor: this.color } : null
    }
  }
}
</script>

<style scoped>
.dot {
  display: inline-block;
  height: var(--dot-size);
  width: var(--dot-size);
  margin-right: var(--space-xs);
  border-radius: 50%;
  background-color: var(--color-neutral-40);
}

.synced,
.active,
.confirmed {
  background-color: var(--color-success);
}

.syncing,
.opening,
.unconfirmed  {
  background-color: var(--color-progressing);
  animation: syncing 2s infinite;
  animation-timing-function: ease-in-out;
}

.closing {
  background-color: var(--color-failure);
  animation: syncing 2s infinite;
  animation-timing-function: ease-in-out;
}

@keyframes syncing {
  0% {
    opacity: 1;
  }
  50% {
    opacity: .6;
  }
  100% {
    opacity: 1;
  }
}
</style>
