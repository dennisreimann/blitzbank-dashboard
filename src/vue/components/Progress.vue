<template>
  <span class="container">
    <progress
      max="100"
      :value="percent"
      :class="{
        warn: (typeof warnThreshold === 'number' && percent >= warnThreshold),
        alert: (typeof alertThreshold === 'number' && percent >= alertThreshold)
      }"
    />
    {{ percent }}%
  </span>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      required: true
    },

    warnThreshold: {
      type: Number,
      default: null
    },

    alertThreshold: {
      type: Number,
      default: null
    }
  }
}
</script>

<style scoped>
.container {
  display: inline-block;
}

progress {
  --border-radius: var(--space-m);
  position: relative;
  top: var(--space-xs);
  margin-right: var(--space-s);
  display: inline-block;
  height: 1rem;
  width: 100px;
  padding: var(--space-xs);
  background: var(--color-neutral-20);
  border-radius: var(--border-radius);
}

progress::-moz-progress-bar {
  border-radius: var(--border-radius);
  background: var(--color-neutral-0);
}

progress::-webkit-progress-bar {
  background: transparent;
}

progress::-webkit-progress-value {
  border-radius: var(--border-radius);
  background: var(--color-neutral-0);
}

progress.warn::-moz-progress-bar {
  background: var(--color-progressing);
}

progress.warn::-webkit-progress-value {
  background: var(--color-progressing);
}

progress.alert::-moz-progress-bar {
  background: var(--color-failure);
}

progress.alert::-webkit-progress-value {
  background: var(--color-failure);
}
</style>
