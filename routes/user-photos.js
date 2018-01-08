const { Router } = require('express')
const { upload, uploader, getShareLink } = require('../utils/object-storage.js')
const FaceAPI = require('../utils/face-api')
const { User } = require('../models')

const router = Router()

router
  /**
   * Get share link for file
   *
   * @param {string} req.params.key - Object storage key
   *
   * @return {string} - Share url, you only have 10 minutes to download the
   *    photo.
   */
  .get('/:key', async (req, res) => {
    if (!req.params.key) {
      res.status = 400
      res.json({
        params: req.params,
        message: 'No file key'
      })
      return
    }
    const key = req.params.key
    try {
      const url = await getShareLink(key)
      res.json({
        url
      })
    } catch (error) {
      res.status(500)
      console.error(error)
      res.json({
        error
      })
    }
  })
  /**
   * Test route. DISABLE in PRODUCTION
   */
  .post('/', uploader.single('file'), (req, res, next) => {
    res.json({
      file: req.file
    })
  })
  /**
   * Upload photo to user
   *
   * @param {string} req.params.id - User id
   * @return {object} - response.user, response.sharelink
   */
  .post('/:id', async (req, res, next) => {
    const id = req.params.id

    if (!id) {
      next(new Error('Param id not found'))
    }

    try {
      const user = await User.findById(id).populate('personGroup')
      if (!user) {
        res.json({
          error: 'User not found error',
        })
      }
      const { file } = await upload(req, 'file')
      if (!file) {
        console.error('There is not file in the request')
        res.status(400)
        res.json({
          error: 'There is no file in the request'
        })
        return
      }

      const sharelink = await getShareLink(file.key)

      user.photos.push({
        key: file.key
      })

      // save key id
      await user.save()

      const groupId = user.personGroup._id
      // face id request body
      const body = {
        url:  sharelink
      }
      // face id configuration params
      const params = {
        userData: { // custom informatin to save with the face
          fileKey: file.key
        }
      }

      const data = await FaceAPI.postPersonFace(groupId, user.faceApiId, params, body)

      const photo = user.photos.find(photo => photo.key === file.key)
      if (photo) {
        photo.persistedFaceId = data.persistedFaceId
      }
      await user.save()

      res.json({
        data: {
          user,
          sharelink,
        }
      })
    } catch (error) {
      res.status(400)
      console.error(error)
      res.json({
        error: error.toJSON()
      })
    }
  })
  /**
   * Delete photo from user
   *
   * @param {string} req.params.userId - User id
   * @param {string} req.params.photoId - Photo id. The photo should belongs to the user
   *
   * @return {object}
   * @return {string} .user
   * @return {stirng} .photo
   */
  .delete('/:userId/:photoId', async (req, res, next) => {
    try {
      const user = await User.findById(req.params.userId)
      const photoId = req.params.photoId

      const photoIndex = user.photos.findIndex((photo) => photo._id.toString() === photoId)
      let photo = null

      if (photoIndex >= 0) {
        photo = user.photos.splice(photoIndex, 1)
      }

      await user.save()
      res.json({
        user: user.toObject(),
        photo
      })
    } catch (err) {
      console.error(err)
      next(err)
    }
  })

module.exports = router

/*
 * Helpful info
 * - [How to upload multipart-form data to S3](https://stackoverflow.com/questions/17930204/simple-file-upload-to-s3-using-aws-sdk-and-node-express)
 */
