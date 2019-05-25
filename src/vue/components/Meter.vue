<template>
  <span
    class="container"
    :class="{ flipped }"
  >
    <div v-if="value !== undefined">{{ value }}</div>
    <meter
      min="0"
      max="100"
      :value="percent"
    >
      {{ percent }}%
    </meter>
    <small v-if="title">{{ title }}</small>
  </span>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      required: true
    },

    title: {
      type: String,
      default: ''
    },

    value: {
      type: Number,
      required: true
    },

    flipped: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.container {
  display: inline-block;
}

meter {
  --border-radius: var(--space-m);
  position: relative;
  top: var(--space-xs);
  display: inline-block;
  height: 1rem;
  width: 100px;
  padding: var(--space-xs);
  background: var(--color-neutral-20);
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
}

.flipped meter {
  direction: rtl;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
}

small {

  display: block;
}
.flipped div,
.flipped small {
  text-align: right;
}

meter::-moz-meter-bar,
meter::-webkit-meter-value {
  background: var(--color-neutral-0);
  border-radius: var(--border-radius);
}

meter::-webkit-meter-bar {
  background: transparent;
}
</style>
