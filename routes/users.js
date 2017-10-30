const express = require('express')
const bcrypt = require('../utils/bcrypt')
const { User } = require('../models')

const router = express.Router()

/* GET users listing. */
router
  .get('/', async (req, res, next) => {
    try {
      const users = await User.find({}).lean()
      res.json(users)
    } catch (err) {
      next(err)
    }
  })
  .get('/:id', async (req, res, next) => {
    const user = await User.findOne({}).lean()
    res.json({
      data: user
    })
  })
  .post('/', async (req, res, next) => {
    try {

      const params = {
        email: req.body.email,
        password: await bcrypt.hash(req.body.password),
        photos: []
      }

      if (typeof params.email !== 'string' && typeof params.password !== '') {
        next(new Error('Invalid params email or password'))
        return
      }

      const user = await User.create(params)
      res.send(user.toObject())
    } catch (err) {
      next(err)
    }
  })

module.exports = router
