const { promisify } = require('util')
const childProcess = require('child_process')
const execute = promisify(childProcess.exec)

const exec = async cmd => {
  try {
    const { stdout } = await execute(cmd)

    return stdout
  } catch (err) {
    console.error(err)

    return err.message
  }
}

module.exports = { exec }
