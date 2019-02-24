<template>
  <div
    class="row"
    :class="{
      valid: (typeof isValid === 'boolean' && isValid),
      invalid: (typeof isValid === 'boolean' && !isValid)
    }"
  >
    <label :for="id">
      {{ label }}
      <span
        v-if="hint"
        class="hint"
      >
        {{ hint }}
      </span>
      <span
        v-if="message"
        class="message"
      >
        {{ message }}
      </span>
    </label>

    <div class="inputs">
      <slot />
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
    hint: {
      type: String,
      default: null
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
  color: var(--color-neutral-60);
}

.inputs {
  display: flex;
}

.inputs > * + * {
  margin-left: var(--space-m);
}

.hint,
.message {
  display: block;
  margin-top: var(--space-s);
}

input[type="text"],
input[type="email"],
input[type="password"],
select,
textarea {
  font-size: var(--font-size-m);
  border: 2px solid #ccc;
  padding: .75rem;
  flex: 1;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
select:focus,
textarea:focus {
  border-color: var(--color-vibe-90);
}

.valid .message {
  color: var(--color-success);
}

.invalid .message {
  color: var(--color-failure);
}

.invalid input[type="text"],
.invalid input[type="email"],
.invalid input[type="password"],
.invalid select,
.invalid textarea {
  border-color: var(--color-failure);
}

</style>
