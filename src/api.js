const headers = {
  accept: 'application/json',
  'content-type': 'application/json'
}

const credentials = 'omit'

const get = async (path) => {
  const url = `/api/${path}`
  const init = { method: 'GET', headers, credentials }
  const req = new Request(url)
  const result = await fetch(req, init)

  return result.json()
}

const post = async (path, payload = {}) => {
  const url = `/api/${path}`
  const body = JSON.stringify(payload)
  const init = { method: 'POST', headers, credentials, body }
  const req = new Request(url)
  const result = await fetch(req, init)

  return result.json()
}

export default {
  get,
  post
}
