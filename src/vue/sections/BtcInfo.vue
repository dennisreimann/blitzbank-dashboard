<template>
  <section>
    <h2>Bitcoin <small v-if="blockchainInfo">{{ blockchainInfo.chain }}net</small></h2>

    <template v-if="blockchainInfo">
      <AttributeList>
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
        <Attribute
          label="Block Height"
          :value="blockchainInfo.blocks"
        />
        <Attribute
          label="Pruning"
        >
          {{ blockchainInfo.pruned ? 'active' : 'disabled' }}
          <span v-if="blockchainInfo.pruned">
            (lowest-height complete block: {{ blockchainInfo.pruneheight }})
          </span>
        </Attribute>
      </AttributeList>

      <template v-if="bip9Softforks">
        <h4>Softforks</h4>
        <AttributeList>
          <Attribute
            v-for="(status, softfork) in bip9Softforks"
            :key="softfork"
            :label="softfork"
            :value="status"
          />
        </AttributeList>
      </template>
    </template>
    <Loading v-else />
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AttributeList from '../components/AttributeList'
import Attribute from '../components/Attribute'
import Loading from '../components/Loading'
import Dot from '../components/Dot'

export default {
  components: {
    AttributeList,
    Attribute,
    Loading,
    Dot
  },

  computed: {
    ...mapGetters('btc', ['blockchainInfo']),

    isSynced () {
      return this.verificationPercent >= 100
    },

    verificationPercent () {
      return this.blockchainInfo.verificationprogress * 100
    },

    bip9Softforks () {
      return this.blockchainInfo ? Object.keys(this.blockchainInfo.bip9Softforks).reduce((result, key) => {
        return {
          ...result, [key]: this.blockchainInfo.bip9Softforks[key].status
        }
      }, {}) : {}
    }
  },

  async mounted () {
    this.loadInfo()
  },

  methods: mapActions('btc', {
    loadInfo: 'blockchainInfo'
  })
}
</script>

<style scoped>
h2 small {
  font-weight: normal;
}
</style>
