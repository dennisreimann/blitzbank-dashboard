<template>
  <section>
    <h2>LND</h2>

    <template v-if="info">
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
        <Attribute
          label="Block Height"
          :value="info.currentBlockHeight"
        />
        <Attribute
          label="Latest Block"
          :value="`${info.latestBlockRelative} ago`"
        />
      </AttributeList>
      <AttributeList :cols="2">
        <Attribute label="Public Key">
          <code>{{ info.publicKey }}</code>
        </Attribute>
        <Attribute
          label="Version"
          :value="info.version"
        />
      </AttributeList>
    </template>
    <Loading v-else />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import AttributeList from '../components/AttributeList'
import Attribute from '../components/Attribute'
import Dot from '../components/Dot'
import Loading from '../components/Loading'

export default {
  components: {
    AttributeList,
    Attribute,
    Dot,
    Loading
  },

  computed: {
    ...mapState('lnd', ['info'])
  }
}
</script>
