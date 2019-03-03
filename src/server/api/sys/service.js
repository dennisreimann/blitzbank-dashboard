const { promisify } = require('util')
const childProcess = require('child_process')
const si = require('systeminformation')
const axios = require('axios')
const { format: formatDate, distanceInWordsToNow } = require('date-fns')
const fileSize = require('filesize')
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

const retrieveOsInfo = async () => {
  try {
    const { hostname, platform, distro, release, arch: architecture } = await si.osInfo()

    return {
      hostname,
      platform,
      architecture,
      version: `${distro} ${release}`
    }
  } catch (err) {
    console.warn('Failed to retrieve OS information:', err)
  }
}

const retrieveInfo = async () => {
  try {
    const externalIP = await retrieveExternalIP()
    const { current: time, uptime } = await si.time()
    const upSince = new Date() - uptime * 1000

    return {
      externalIP,
      time: formatDate(time, 'YYYY-MM-DD HH:mm'),
      uptime: distanceInWordsToNow(upSince)
    }
  } catch (err) {
    console.warn('Failed to retrieve info:', err)
  }
}

const retrieveDisk = async () => {
  try {
    const info = await si.fsSize()
    const { type, used, size: total } = info[0]

    return {
      type,
      total: fileSize(total),
      free: fileSize(total - used),
      used: fileSize(used),
      usedPercent: Math.round(100 / (total / used))
    }
  } catch (err) {
    console.warn('Failed to retrieve disk information:', err)
  }
}

const retrieveMemory = async () => {
  try {
    const info = await si.mem()
    const { total, active: used, available: free } = info

    return {
      total: fileSize(total),
      free: fileSize(free),
      used: fileSize(used),
      usedPercent: Math.round(100 / (total / used))
    }
  } catch (err) {
    console.warn('Failed to retrieve memory information:', err)
  }
}

const retrieveNetwork = async () => {
  try {
    const info = await si.networkStats()
    const netw = info[0]

    return {
      rxTotal: fileSize(netw.rx_bytes),
      txTotal: fileSize(netw.tx_bytes),
      rxSec: netw.rx_sec && `${fileSize(netw.rx_sec)}/s`,
      txSec: netw.tx_sec && `${fileSize(netw.tx_sec)}/s`
    }
  } catch (err) {
    console.warn('Failed to retrieve network information:', err)
  }
}

const retrieveExternalIP = async () => {
  try {
    const ipInfo = await axios.get('https://api.ipify.org?format=json')

    return ipInfo.data.ip
  } catch (err) {
    console.warn('Failed to retrieve external IP address.')
  }
}

module.exports = {
  exec,
  retrieveOsInfo,
  retrieveInfo,
  retrieveDisk,
  retrieveMemory,
  retrieveNetwork,
  retrieveExternalIP
}
