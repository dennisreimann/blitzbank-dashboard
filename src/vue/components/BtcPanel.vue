<template>
  <section>
    <h2>Bitcoin <small v-if="blockchainInfo">{{ blockchainInfo.chain }}net</small></h2>

    <AttributeList v-if="blockchainInfo">
      <Attribute
        label="Sync Status"
      >
        <p
          v-if="isSynced"
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
          {{ blockchainInfo.initialblockdownload ? "Initial sync" : "Sync" }}
          in progress
          <Progress
            class="progress"
            :percent="verificationPercent"
          />
        </p>
      </Attribute>
    </AttributeList>
    <Loading v-else />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import AttributeList from '../components/AttributeList'
import Attribute from '../components/Attribute'
import Dot from '../components/Dot'
import Loading from '../components/Loading'
import Progress from '../components/Progress'

export default {
  components: {
    AttributeList,
    Attribute,
    Dot,
    Loading,
    Progress
  },

  computed: {
    ...mapState('btc', ['blockchainInfo']),

    isSynced () {
      return this.verificationPercent >= 99
    },

    verificationPercent () {
      return Math.round(this.blockchainInfo.verificationprogress * 100)
    }
  }
}
</script>

<style scoped>
.progress {
  top: var(--space-xs);
  margin: 0 var(--space-s);
}
</style>
