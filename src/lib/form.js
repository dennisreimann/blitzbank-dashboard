export function field (value = '', isValid = null, message = null) {
  return { value, isValid, message }
}

export function reset (...fields) {
  fields.forEach(field => {
    field.message = null
    field.isValid = null
  })
}
