<template>
  <nav>
    <NavItem
      to="/"
      icon="⚡️"
      title="Home"
      class="item home"
      exact
    />
    <NavItem
      to="/peers"
      icon="🦸‍♂️"
      title="Peers"
      class="item peers"
    />
    <NavItem
      to="/system"
      icon="⚙️"
      title="System Information"
      class="item system"
      exact
    />
  </nav>
</template>

<script>
import NavItem from './NavItem'

export default {
  components: {
    NavItem
  }
}
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--nav-size);
  display: flex;
  flex-direction: column;
  background: var(--color-dark);
  color: #fff;
  padding: var(--space-l) 0;
}

.item {
  margin: var(--space-s) 0;
}

.system {
  margin-top: auto;
}
</style>
