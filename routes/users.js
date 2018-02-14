const express = require('express')
const bcrypt = require('../utils/bcrypt')
const { User } = require('../models')
const FaceAPI = require('../utils/face-api')
const ObjectStorage = require('../utils/object-storage')
const router = express.Router()

/* GET users listing. */
router
  .get('/', async (req, res, next) => {
    try {
      const users = await User.find({}).populate('personGroup').lean()
      res.json({ users })
    } catch (err) {
      next(err)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      if (!id) {
        next(new Error('No id provided'))
      }
      const user = await User.findById(id).lean()
      await Promise.all(user.photos.map(async (photo) => {
        const link = await ObjectStorage.getShareLink(photo.key, {
          Expires: 60 // 60 minutes link lifetime
        })
        photo.link = link
      }))

      res.json({
        data: user
      })
    } catch (err) {
      next(err)
    }
  })
  /**
  * Create and add user to group
  * @params {object} req.body
  * @params {string} req.body.firstname
  * @params {string} req.body.lastname
  * @params {string} req.body.email
  * @params {string} req.body.password
  * @params {string} req.body.personGroupId - PersonGroup reference
  */
  .post('/', async (req, res, next) => {
    try {

      const params = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password),
        photos: [],
        personGroup: req.body.personGroupId
      }

      if (typeof params.email !== 'string' && typeof params.password !== '') {
        next(new Error('Invalid params email or password'))
        return
      }

      const user = await User.create(params)
      const personId = await FaceAPI.createPerson(user.personGroup, {
        name: user.firstname + ' ' + user.lastname
      })
      user.faceApiId = personId
      await user.save()
      res.send({
        user: user.toObject()
      })
    } catch (err) {
      next(err)
    }
  })
  /**
  * Update user info
  * @params {string} req.params.id
  * @params {string} req.body.firstname
  * @params {string} req.body.lastname
  * @params {string} req.body.email
  */
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      const user = await User.findById(id)
      if (!user) {
        next(new Error('User not found error. ID: ' + id))
      }
      user.firstname = req.body.firstname
      user.lastname = req.body.lastname
      user.email = req.body.email
      await user.save()
      res.json({
        data: user.toJSON()
      })
    } catch (err) {
      next(err)
    }
  })
  .post('/:id/photo', async (req, res, next) => {
    try {
      const id = req.params.id
      if (!id) {
        next(new Error('No id provided'))
      }
      const user = await user.findByID(id)
      if (!user) {
        next(new Error('User not found'))
      }
      // upload user
      res.json({
        data: user
      })
    } catch (err) {
      next(err)
    }
  })

module.exports = router
