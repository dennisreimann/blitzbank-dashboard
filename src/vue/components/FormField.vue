<template>
  <div
    class="field"
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
label {
  display: block;
  padding-bottom: var(--space-s);
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
</style>

<style>
input[type="text"],
input[type="email"],
input[type="number"],
input[type="password"],
input[type="radio"],
input[type="checkbox"],
select,
textarea {
  font-size: var(--font-size-m);
  border: 2px solid var(--color-neutral-20);
  padding: .75rem;
  height: var(--input-size);
  transition: border-color var(--animation-duration-fast);
}

input[type="number"] {
  text-align: right;
}

input[type="radio"],
input[type="checkbox"] {
  appearance: none;
  width: var(--input-size);
}

input[type="radio"] {
  border-radius: 50%;
}

select {
  appearance: none;
}

input[type="text"]:hover,
input[type="email"]:hover,
input[type="number"]:hover,
input[type="password"]:hover,
input[type="radio"]:hover,
input[type="checkbox"]:hover,
select:hover,
textarea:hover {
  border-color: var(--color-neutral-40);
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="number"]:focus,
input[type="password"]:focus,
input[type="radio"]:focus,
input[type="checkbox"]:focus,
input[type="radio"]:active,
input[type="checkbox"]:active,
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
.invalid input[type="number"],
.invalid input[type="password"],
.invalid input[type="radio"],
.invalid input[type="checkbox"],
.invalid select,
.invalid textarea {
  border-color: var(--color-failure);
}
</style>
