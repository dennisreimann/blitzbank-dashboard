<template>
  <section>
    <h2>LND</h2>
    <AttributeList>
      <Attribute label="Sync Status">
        <p
          v-if="info.isSyncedToChain"
          class="sync"
        >
          <Dot status="synced" />
          Fully synced
        </p>
        <p
          v-else
          class="sync"
        >
          <Dot status="syncing" />
          Sync in progress
        </p>
      </Attribute>
      <Attribute label="Peers & Channels">
        {{ info.peersCount }} peers
        <br>
        {{ info.activeChannelsCount }} active channels
        <br>
        {{ info.pendingChannelsCount }} pending channels
      </Attribute>
      <Attribute
        v-if="balance"
        label="Balance"
      >
        {{ balance.chainBalanceSats }}
        <div v-if="balance.chainBalance > 100000000">
          = {{ balance.chainBalanceBtc }}
        </div>
      </Attribute>
      <Attribute
        v-if="balance && balance.pendingChainBalance"
        label="Pending"
      >
        {{ balance.pendingChainBalanceSats }}
        <div v-if="balance.chainBalance > 100000000">
          = {{ balance.pendingChainBalanceBtc }}
        </div>
      </Attribute>
    </AttributeList>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import AttributeList from '../components/AttributeList'
import Attribute from '../components/Attribute'
import Dot from '../components/Dot'

export default {
  components: {
    AttributeList,
    Attribute,
    Dot
  },

  computed: {
    ...mapState('lnd', ['info', 'balance'])
  }
}
</script>
