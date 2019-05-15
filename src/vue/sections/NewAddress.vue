<template>
  <section>
    <h3>New address</h3>
    <Info
      v-if="addressInfo"
      v-bind="addressInfo"
      class="addressInfo"
    />
    <Info
      v-if="newAddress"
      type="success"
    >
      Your shiny new address:
      <strong :data-clipboard-text="newAddress">{{ newAddress }}</strong>
    </Info>
    <form
      novalidate
      @submit.prevent="makeAddress"
    >
      <FormGrid class="layout">
        <FormField
          id="addressFormat"
          label="Address format"
          :is-valid="addressFormat.isValid"
          :message="addressFormat.message"
        >
          <select
            id="addressFormat"
            ref="addressFormatInput"
            v-model="addressFormat.value"
            type="text"
          >
            <option
              disabled
              value=""
            >
              Select format
            </option>
            <option
              v-for="option in addressFormatOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.title }}
            </option>
          </select>
        </FormField>
        <FormButton
          type="submit"
          title="✨ Create address"
          class="createAddress"
          :disabled="buttonDisabled"
        />
      </FormGrid>
    </form>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { field } from '../../lib/form'
import Info, { FAILURE } from '../components/Info'

const FORMAT_OPTIONS = [
  {
    title: 'Bech32 (P2WPKH)',
    value: 'p2wpkh'
  },
  {
    title: 'Pay to Script Hash (P2SH)',
    value: 'np2wpkh'
  }
]

export default {
  components: {
    Info
  },

  data () {
    return {
      addressInfo: undefined,
      addressFormat: field(FORMAT_OPTIONS[0].value),
      addressFormatOptions: FORMAT_OPTIONS
    }
  },

  computed: {
    ...mapState('addresses', ['newAddress']),

    buttonDisabled () {
      return this.addressFormat.value.length === 0
    }
  },

  methods: {
    ...mapActions('addresses', ['createAddress']),

    async makeAddress () {
      try {
        this.addressInfo = undefined
        await this.createAddress({ format: this.addressFormat.value })
      } catch (error) {
        const { response } = error
        const message = response ? response.data : error.message
        this.addressInfo = {
          type: FAILURE,
          message
        }
      }
    }
  }
}
</script>

<style scoped>
.layout {
  grid-template-columns: repeat(2, max-content);
}

#addressFormat {
  width: 25ch;
}
</style>
