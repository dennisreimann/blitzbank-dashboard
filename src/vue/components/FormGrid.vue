<template>
  <div class="grid">
    <slot />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  align-items: end;
  grid-gap: var(--space-m);
}
</style>
