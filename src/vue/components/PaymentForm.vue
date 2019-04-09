<template>
  <div>
    <form
      novalidate
      class="decodeForm"
      @submit.prevent="decode"
    >
      <FormGrid class="layout">
        <FormField
          id="paymentRequest"
          label="Payment Request"
          :is-valid="paymentRequest.isValid"
          :message="paymentRequest.message"
        >
          <textarea
            id="paymentRequest"
            ref="paymentRequestInput"
            v-model="paymentRequest.value"
          />
        </FormField>
      </FormGrid>

      <FormButton
        v-if="!request"
        type="submit"
        class="decodeRequest"
        title="🤓 Inspect Payment Request"
        :disabled="buttonDisabled"
      />
    </form>

    <Info
      v-if="info"
      v-bind="info"
      class="info"
    />

    <form
      v-if="request"
      novalidate
      class="payForm"
      @submit.prevent="pay"
    >
      <AttributeList>
        <Attribute
          label="Payee"
          class="payee"
        >
          <Dot :color="peerColorForPublicKey(request.destination)" />{{ ' ' }}
          {{ peerNameForPublicKey(request.destination) }}
        </Attribute>
        <Attribute
          label="Description"
          :value="request.description || '–'"
        />
        <Attribute
          label="Amount in sats"
          :value="request.tokens"
        />
        <Attribute
          label="Created at"
          :value="request.createdAt"
        />
        <Attribute label="Expires at">
          {{ request.expiresAt }}
          <Dot
            v-if="request.isExpired"
            status="expired"
          />
        </Attribute>
      </AttributeList>

      <FormButton
        type="submit"
        class="payRequest"
        :title="payButtonTitle"
        :disabled="buttonDisabled"
      />
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { field, reset } from '../../lib/form'
import peers from '../../mixins/peers'
import AttributeList from '../components/AttributeList'
import Attribute from '../components/Attribute'
import Dot from '../components/Dot'
import Info, { FAILURE, SUCCESS } from './Info'

export default {
  components: {
    AttributeList,
    Attribute,
    Dot,
    Info
  },

  mixins: [peers],

  data () {
    return {
      paymentRequest: field(),
      info: null
    }
  },

  computed: {
    ...mapState('payments', ['paymentRequests']),

    buttonDisabled () {
      return this.paymentRequest.value.length < 50
    },

    request () {
      return this.paymentRequests[this.paymentRequest.value]
    },

    payButtonTitle () {
      const { tokens, destination } = this.request
      return `💸 Pay ${tokens} sats to ${this.peerNameForPublicKey(destination)}`
    }
  },

  methods: {
    ...mapActions('payments', ['decodePaymentRequest', 'payPaymentRequest']),

    async decode () {
      try {
        await this.decodePaymentRequest({
          request: this.paymentRequest.value
        })

        this.info = {
          type: SUCCESS,
          message: 'Payment request decoded.'
        }
      } catch (error) {
        const { response } = error
        this.info = {
          type: FAILURE,
          message: response ? response.data : error.message
        }
      }
    },

    async pay () {
      try {
        await this.payPaymentRequest({
          request: this.paymentRequest.value
        })

        this.info = {
          type: SUCCESS,
          message: 'Payment succeeded.'
        }

        reset([this.paymentRequest])
      } catch (error) {
        const { response } = error
        this.info = {
          type: FAILURE,
          message: response ? response.data : error.message
        }
      }
    }
  }
}
</script>

<style scoped>
.info {
  margin-top: var(--space-l);
}

.payee {
  grid-column-start: col-start;
  grid-column-end: col-end;
}
</style>
