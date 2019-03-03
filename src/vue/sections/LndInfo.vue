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
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters(['info'])
  }
}
</script>
