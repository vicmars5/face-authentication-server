const { Router } = require('express')
const router = Router()

router
  .get('/', async (req, res, next) => {
    res.send('photo auth')
  })

module.exports = router
