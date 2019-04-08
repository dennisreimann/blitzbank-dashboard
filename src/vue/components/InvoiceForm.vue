<template>
  <form
    novalidate
    @submit.prevent="addInvoice"
  >
    <Info
      v-if="info"
      v-bind="info"
    />

    <FormGrid class="layout">
      <FormField
        id="description"
        label="Description"
        :is-valid="description.isValid"
        :message="description.message"
      >
        <input
          id="description"
          ref="descriptionInput"
          v-model="description.value"
          type="text"
        >
      </FormField>
      <FormField
        id="amount"
        label="Amount in sats"
        :is-valid="amount.isValid"
        :message="amount.message"
      >
        <input
          id="amount"
          ref="amountInput"
          v-model="amount.value"
          type="number"
          :step="10000"
        >
      </FormField>
      <FormButton
        type="submit"
        class="createInvoice"
        title="🤑 Create invoice"
        :disabled="buttonDisabled"
      />
    </FormGrid>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { field } from '../../lib/form'
import Info, { FAILURE, SUCCESS } from './Info'

export default {
  components: {
    Info
  },

  data () {
    return {
      amount: field(),
      description: field(),
      info: null
    }
  },

  computed: {
    buttonDisabled () {
      return false
    }
  },

  methods: {
    ...mapActions('invoices', ['createInvoice']),

    async addInvoice () {
      try {
        await this.createInvoice({
          amount: this.amount.value,
          description: this.description.value
        })

        this.info = {
          type: SUCCESS,
          message: 'Invoice created.'
        }
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
.layout {
  grid-template-columns: repeat(3, max-content);
}

#amount {
  width: 18ch;
}
</style>
