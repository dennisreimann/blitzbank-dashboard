export function field (value = '', isValid = null, message = null) {
  return { value, isValid, message }
}

export function reset (...fields) {
  fields.forEach(field => {
    field.value = null
    field.message = null
    field.isValid = null
  })
}
