<template>
  <section>
    <form
      action="/login"
      method="post"
      novalidate
      @submit.prevent="authenticate"
    >
      <Info
        v-if="info"
        v-bind="info"
      />
      <FormGrid class="layout">
        <FormField
          id="username"
          label="Username"
          :is-valid="username.isValid"
          :message="username.message"
        >
          <input
            id="username"
            ref="usernameInput"
            v-model="username.value"
            type="text"
          >
        </FormField>
        <FormField
          id="password"
          label="Password"
          :is-valid="password.isValid"
          :message="password.message"
        >
          <input
            id="password"
            ref="passwordInput"
            v-model="password.value"
            type="password"
          >
        </FormField>

        <FormButton
          type="submit"
          title="⚡️ Log In"
          :disabled="buttonDisabled"
        />
      </Formgrid>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import { field } from '../lib/form'
import Info, { FAILURE } from '../components/Info'

export default {
  components: {
    Info
  },

  data () {
    return {
      username: field(),
      password: field(),
      info: null
    }
  },

  computed: {
    buttonDisabled () {
      return this.username.value.length === 0 ||
        this.password.value.length === 0
    }
  },

  methods: {
    ...mapActions(['login']),

    async authenticate () {
      try {
        const isAuthenticated = await this.login({
          username: this.username.value,
          password: this.password.value
        })

        if (isAuthenticated) {
          this.$router.push('/')
        } else {
          this.info = {
            type: FAILURE,
            message: 'Invalid credentials'
          }
        }
      } catch (error) {
        const { response } = error
        const msg = response ? response.data : error.message
        this.info = {
          type: FAILURE,
          message: msg
        }
        console.error(msg) // eslint-disable-line no-console
      }
    }
  }
}
</script>

<style scoped>
.layout {
  grid-template-columns: repeat(3, max-content);
}
</style>
