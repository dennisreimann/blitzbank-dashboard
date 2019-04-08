<template>
  <section>
    <template v-if="isLoaded">
      <section v-if="closedChannels.length">
        <h3>Closed channels</h3>
        <article
          v-for="channel in closedChannels"
          :key="channel.transactionId"
        >
          <h4>
            <Dot
              :color="peerColorForPublicKey(channel.partnerPublicKey)"
            />
            {{ peerNameForPublicKey(channel.partnerPublicKey) }}:
            {{ channel.id }}
          </h4>
          <AttributeList>
            <Attribute
              label="Capacity"
              :value="channel.capacity"
            />
            <Attribute
              label="Local"
              :value="channel.finalLocalBalance"
            />
            <Attribute
              label="Close type"
              :value="closeType(channel)"
            />
          </AttributeList>
        </article>
      </section>
      <div v-else>
        No closed channels, yet.
      </div>
    </template>
    <Loading v-else />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import peers from '../../mixins/peers'
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

  mixins: [peers],

  computed: {
    ...mapState('channels', ['closedChannels']),

    isLoaded () {
      return this.closedChannels !== undefined
    }
  },

  methods: {
    closeType ({ isBreachClose, isCooperativeClose, isFundingCancel, isLocalForceClose, isRemoteForceClose }) {
      if (isBreachClose) {
        return 'breached'
      } else if (isCooperativeClose) {
        return 'cooperatively'
      } else if (isFundingCancel) {
        return 'cancelled funding'
      } else if (isLocalForceClose) {
        return 'forced locally'
      } else if (isRemoteForceClose) {
        return 'forced remotely'
      }
    }
  }
}
</script>
