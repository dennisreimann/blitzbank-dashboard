const { Router } = require('express')
const router = Router()
const system = require('./service')

router.get('/', async (req, res) => {
  try {
    const [osInfo, info, memory, disk, network] = await Promise.all([
      system.retrieveOsInfo(),
      system.retrieveInfo(),
      system.retrieveMemory(),
      system.retrieveDisk(),
      system.retrieveNetwork()
    ])
    res.json({ os: osInfo, info, memory, disk, network })
  } catch (err) {
    const { message } = err
    res.status(500).send(message)
  }
})

module.exports = router
