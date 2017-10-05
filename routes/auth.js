const express = require('express')
const bcrypt = require('../utils/bcrypt')
const jwt = require('../utils/jwt')

const { User } = require('../models')

const router = express.Router()

router
  .post('/', async (req, res, next) => {
    try {
      const email = req.body.email
      const password = req.body.password

      if (typeof email !== 'string') {
        res.status(400)
        res.json({
          msg: 'Invalid email'
        })
        return
      }
      console.log(typeof password)
      if (typeof password !== 'string') {
        res.status(400)
        res.json({
          msg: 'Invalid password'
        })
        return
      }

      const user = await User.findOne({ email }).select('password')
      if (!user) {
        res.status(401) // 401 "Unauthorized"
        res.json({
          message: 'Wrong user or password'
        })
        return
      }

      const valid = await bcrypt.compare(password, user.password)
      console.log(`${password} === ${user.password} > ${valid}`)
      if (valid) {
        const token = jwt.encode(user.toObject())
        res.json({
          token
        })
      } else {
        res.status(401) // 401 "Unauthorized"
        res.json({
          message: 'invalid password'
        })
      }
    }
    catch (err) {
     next(err)
    }
  })

module.exports = router
