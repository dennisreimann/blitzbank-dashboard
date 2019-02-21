<template>
  <div
    class="row"
    :class="{invalid: (typeof isValid === 'boolean' && !isValid)}"
  >
    <label :for="id">
      {{ label }}
    </label>
    <div class="inputs">
      <slot />
    </div>
    <div
      v-if="message"
      class="message"
    >
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    message: {
      type: String,
      default: null
    },
    isValid: {
      type: Boolean
    }
  }
}
</script>

<style scoped>
.row + .row {
  margin-top: var(--space-l);
}

label {
  display: block;
  margin-bottom: var(--space-s);
}

.inputs {
  display: flex;
}

.inputs > * + * {
  margin-left: var(--space-m);
}

.message {
  margin-top: var(--space-s);
}

input[type="text"],
input[type="password"],
select,
textarea {
  font-size: var(--font-size-m);
  border: 2px solid #ccc;
  padding: .75rem;
  flex: 1;
}

input[type="text"]:focus,
input[type="password"]:focus,
select:focus,
textarea:focus {
  border-color: var(--color-dark);
}

.invalid {
  color: var(--color-invalid);
}

.invalid input[type="text"],
.invalid input[type="password"],
.invalid select,
.invalid textarea {
  border-color: var(--color-invalid);
}

</style>
