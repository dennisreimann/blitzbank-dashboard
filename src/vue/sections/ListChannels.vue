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
          <Info
            v-if="channelInfo[channel.id]"
            v-bind="channelInfo[channel.id]"
            class="channelInfo"
          />
          <FormButton
            title="👋 Close"
            class="close"
            @click.native="close(channel)"
          />
        </article>
      </section>

      <section v-if="pendingChannels.length">
        <h3>Pending</h3>
        <div
          v-for="channel in pendingChannels"
          :key="channel.transactionId"
        >
          <strong>
            <Dot
              :color="peerColorForPublicKey(channel.partnerPublicKey)"
              :status="status(channel)"
            />
            {{ peerNameForPublicKey(channel.partnerPublicKey) }}
            {{ status(channel) }}
          </strong>
          <span>- {{ channel.localBalance }} sats</span>
        </div>
      </section>
    </template>
    <Loading v-else />
  </section>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import peers from '../../mixins/peers'
import AttributeList from '../components/AttributeList'
import Attribute from '../components/Attribute'
import Dot from '../components/Dot'
import Info, { FAILURE } from '../components/Info'
import Loading from '../components/Loading'
import Progress from '../components/Progress'

export default {
  components: {
    AttributeList,
    Attribute,
    Dot,
    Info,
    Loading,
    Progress
  },

  mixins: [peers],

  data () {
    return {
      channelInfo: {}
    }
  },

  computed: {
    ...mapState('channels', ['activeChannels', 'pendingChannels', 'closedChannels']),

    isLoaded () {
      return this.activeChannels !== undefined
    }
  },

  methods: {
    ...mapActions('channels', ['closeChannel']),

    status ({ isActive, isClosing, isOpening }) {
      if (isActive) {
        return 'active'
      } else if (isClosing) {
        return 'closing'
      } else if (isOpening) {
        return 'opening'
      }
    },

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
    },

    async close (channel) {
      try {
        const peer = this.peerForPublicKey(channel.partnerPublicKey)
        await this.closeChannel({
          id: channel.id,
          socket: peer.socket,
          transactionId: channel.transactionId,
          transactionVout: channel.transactionVout,
          partnerPublicKey: channel.partnerPublicKey
        })
      } catch (error) {
        const { response } = error
        const message = response ? response.data : error.message
        Vue.set(this.channelInfo, channel.id, {
          type: FAILURE,
          message
        })
        console.error(message)
      }
    }
  }
}
</script>
