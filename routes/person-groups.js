const { Router } = require('express')
const { PersonGroup } = require('../models')
const FaceAPI = require('../utils/face-api')
const router = Router()

router
  /**
   * Get all person groups
   * @returns {object} - Person groups array
   */
  .get('/', async (req, res, next) => {
    const groups = await PersonGroup
      .find({})
      .populate('members')
      .lean()
    res.json({
      data: groups
    })
  })
  /**
   * Get person group
   * @param {string} req.params.id - Person group id
   * @returns {object} - Person group
   */
  .get('/:id', async (req, res, next) => {
    const id = req.params.id
    if (!id) {
      res.status(400)
      res.json({
        error: 'params.id is required'
      })
      return
    }
    const group = await PersonGroup
      .findById(id)
      .populate('members')
      .lean()
    res.json({
      data: group
    })
  })
  /**
   * Create person group
   * @param {string} req.body.name - Person group name
   * @returns {object} - Created person group
   */
  .post('/', async (req, res, next) => {
    try {
      const name = req.body.name
      if (!name) {
        res.status(400)
        res.json({ error: 'body.name is necessary' })
        return
      }
      const group = await PersonGroup.create({ name })
      res.json({
        data: group.toJSON()
      })
    } catch (error) {
      next(error)
    }
  })
  /**
   * Add new user to person group
   * @params {string} req.params.id - Person group id
   * @params {string} req.body.user_id - User id. Reference to user document
   * @returns {object} - Add user to person group
   */
  .post('/user/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      const userId = req.body.user_id
      if (!id || !user_id) {
        next(new Error('Bad request. body.user_id and params.id are required'))
      }

      const group = await PersonGroup.findById(id)
      if (!group) {
        next(new Error('Person group not found'))
        return
      }
      group.members.push(userId)
      await group.save()
      res.json({
        data: group.toJSON()
      })
    } catch (error) {
      next(error)
    }
  })
  /**
  * Edit person group fields
  *
  * @param {string} req.params.id - Person group id
  * @param {string} req.body.name - Person group name
  * @param {array<string>} req.body.members - Person group members. Reference
  *     to user.
  */
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      if (!id) {
        next(new Error('params.id is required'))
        return
      }
      const group = await PersonGroup.findById(id)
      group.name = req.body.name,
      group.members = req.body.members
      await group.save()
      res.json({
        data: group.toJSON()
      })
    } catch (error) {
      next(error)
    }
  })
  /**
   *    users.
   * Delete person group
   *
   * @todo - This function is not completed will be necessary to delete related
   *
   * @params {string} req.params.id - Person group id
   * @returns {object} - Deleted person group
   *
   */
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      if (!id) {
        next(new Error('Bad request: params.id is required'))
        return
      }

      const personGroup = await PersonGroup.findById(id)
      if (personGroup) {
        personGroup.remove()
        res.json({
          data: personGroup.toObject()
        })
      } else {
        next(new Error('PersonGroup not found in database'))
      }
    } catch (err) {
      next(err)
    }
  })

module.exports = router
