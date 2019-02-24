<template>
  <router-link
    :to="to"
    :title="title"
    :exact="exact"
  >
    <span class="icon">
      {{ icon }}
    </span>
    <span class="title">
      {{ title }}
    </span>
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    exact: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
a {
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  text-decoration: none;
  width: var(--nav-size);
  height: var(--nav-size);
  line-height: 100%;
  border-left: var(--space-s) solid transparent;
  border-right: var(--space-s) solid transparent;
}

a:hover,
a:focus {
  background-color: var(--color-vibe-80);
}

.router-link-active {
  background-color: var(--color-vibe-80);
  border-left-color: var(--color-vibe-30);
}

.icon {
  position: relative;
  top: 3px;
}

.title {
  display: none;
}
</style>
