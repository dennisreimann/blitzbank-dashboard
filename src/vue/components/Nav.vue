<template>
  <nav>
    <template v-if="isAuthenticated">
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
        to="/channels"
        icon="🧬"
        title="Channels"
        class="item channels"
      />
      <NavItem
        to="/invoices"
        icon="🧾"
        title="Invoices"
        class="item invoices"
      />
      <NavItem
        to="/payments"
        icon="💸"
        title="Payments"
        class="item payments"
      />
      <NavItem
        to="/tools"
        icon="🧰"
        title="Tools"
        class="item tools"
        exact
      />
      <NavItem
        to="/system"
        icon="⚙️"
        title="System Information"
        class="item system"
        exact
      />
    </template>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import NavItem from './NavItem'

export default {
  components: {
    NavItem
  },

  computed: {
    ...mapGetters(['isAuthenticated'])
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
  background: var(--color-vibe-90);
  color: #fff;
  padding: var(--space-l) 0;
}

.item {
  margin: var(--space-s) 0;
}

.tools {
  margin-top: auto;
}
</style>
