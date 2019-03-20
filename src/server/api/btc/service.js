const camelizeKeys = require('camelize-keys')
const { bitcoin } = require('../../services/bitcoin')

const decorate = camelizeKeys

module.exports = (fnName, ...args) =>
  new Promise((resolve, reject) => {
    try {
      const fn = bitcoin[fnName]
      if (typeof fn === 'function') {
        const handle = (err, { result }) => {
          err ? reject(err) : resolve(decorate(result))
        }
        args[0] === undefined
          ? bitcoin[fnName](handle)
          : bitcoin[fnName](...args, handle)
      } else {
        reject(new Error(`${fnName} is not a Bitcoin service function.`))
      }
    } catch (err) {
      reject(err)
    }
  })
