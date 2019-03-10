<template>
  <div
    class="switch"
  >
    <input
      v-bind="$attrs"
      :checked="isChecked"
      :value="value"
      @input="updateInput"
    >
    <span class="switchIcon">{{ icon }}</span>
  </div>
</template>

<script>
const VALUE_TYPE = [String, Number, Boolean]

export default {
  inheritAttrs: false,

  props: {
    value: {
      type: VALUE_TYPE,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    trueValue: {
      type: VALUE_TYPE,
      default: true
    },
    falseValue: {
      type: VALUE_TYPE,
      default: false
    }
  },

  computed: {
    isChecked () {
      return this.value instanceof Array
        ? this.value.includes(this.trueValue)
        : this.value === this.trueValue
    }
  },

  methods: {
    updateInput (event) {
      let isChecked = event.target.checked

      if (this.value instanceof Array) {
        let newValue = [...this.value]

        if (isChecked) {
          newValue.push(this.trueValue)
        } else {
          newValue.splice(newValue.indexOf(this.trueValue), 1)
        }

        this.$emit('input', newValue)
      } else {
        this.$emit('input', isChecked ? this.trueValue : this.falseValue)
      }
    }
  }
}
</script>

<style scoped>
.switch {
  position: relative;
  width: var(--input-size);
  height: var(--input-size);
}

.switchIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-l);
  line-height: 2.125;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--animation-duration-fast);
}

input[type="radio"]:checked + .switchIcon,
input[type="checkbox"]:checked + .switchIcon {
  opacity: 1;
}
</style>
