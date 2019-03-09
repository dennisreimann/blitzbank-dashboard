<template>
  <section>
    <template v-if="isLoaded">
      <section v-if="activeChannels.length">
        <h3>Active</h3>
        <article
          v-for="channel in activeChannels"
          :key="channel.id"
        >
          <h4>
            <Dot :color="peerColorForPublicKey(channel.partnerPublicKey)" />
            {{ peerNameForPublicKey(channel.partnerPublicKey) }}:
            {{ channel.id }} {{ channel.isPrivate ? "🔒" : "" }}
            <template v-if="!channel.isActive">
              <Dot :status="status(channel)" />
              {{ status(channel) }}
            </template>
          </h4>
          <AttributeList>
            <Attribute
              label="Capacity"
              :value="channel.capacity"
            />
            <Attribute
              label="Local"
              :value="channel.localBalance"
            />
            <Attribute
              label="Remote"
              :value="channel.remoteBalance"
            />
            <Attribute label="Balance">
              <Progress
                class="balance"
                :percent="Math.round(channel.localBalance * 100 / channel.capacity)"
              />
            </Attribute>
          </AttributeList>
        </article>
      </section>

      <section v-if="pendingChannels.length">
        <h3>Pending</h3>
        <ul>
          <li
            v-for="channel in pendingChannels"
            :key="channel.transactionId"
          >
            {{ peerNameForPublicKey(channel.partnerPublicKey) }}
          </li>
        </ul>
      </section>
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
import Progress from '../components/Progress'

export default {
  components: {
    AttributeList,
    Attribute,
    Dot,
    Loading,
    Progress
  },

  mixins: [peers],

  computed: {
    ...mapState('channels', ['activeChannels', 'pendingChannels']),

    isLoaded () {
      return this.activeChannels !== undefined
    }
  },

  methods: {
    status ({ isActive, isClosing, isOpening }) {
      if (isActive) {
        return 'active'
      } else if (isClosing) {
        return 'closing'
      } else if (isOpening) {
        return 'opening'
      }
    }
  }
}
</script>
