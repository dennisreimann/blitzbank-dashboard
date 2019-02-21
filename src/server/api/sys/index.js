const { Router } = require('express')
const si = require('systeminformation')

const router = Router()

router.get('/', async (req, res) => {
  const [time, mem, disk, network] = await Promise.all([
    si.time(),
    si.mem(),
    si.diskLayout(),
    si.networkStats()
  ])

  try {
    const result = { time, mem, disk, network }
    res.json(result)
  } catch (err) {
    const { message } = err
    res.status(500).send(message)
  }
})

module.exports = router
