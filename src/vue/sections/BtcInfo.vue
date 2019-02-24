<template>
  <section>
    <h2>Bitcoin</h2>

    <div v-if="blockchainInfo">
      <AttributeList>
        <Attribute
          label="Chain"
          :value="blockchainInfo.chain"
        />
        <Attribute
          label="Pruning"
        >
          {{ blockchainInfo.pruned ? 'active' : 'disabled' }}
          <span v-if="blockchainInfo.pruned">
            (lowest-height complete block: {{ blockchainInfo.pruneheight }})
          </span>
        </Attribute>
        <Attribute
          v-for="(status, softfork) in bip9Softforks"
          :key="softfork"
          :label="softfork"
          :value="status"
        />
      </AttributeList>
    </div>
    <Loading v-else />
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AttributeList from '../components/AttributeList'
import Attribute from '../components/Attribute'
import Loading from '../components/Loading'

export default {
  components: {
    AttributeList,
    Attribute,
    Loading
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
