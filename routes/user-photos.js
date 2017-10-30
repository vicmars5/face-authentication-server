const { Router } = require('express')
const { upload, uploader, getShareLink } = require('../utils/object-storage.js')
const { User } = require('../models')

const router = Router()

router
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
  .post('/', uploader.single('file'), (req, res, next) => {
    console.log('archivo subido')
    console.log(req.file)
    res.json({
      file: req.file
    })
  })
  .post('/:id', async (req, res, next) => {
    const id = req.params.id
    if (!id) {
      next(new Error('Param id not found'))
    }
    try {
      const user = await User.findById(id)
      if (!user) {
        res.json({
          error: 'User not found error',
        })
      }
      console.log('user found')
      const { file } = await upload(req, 'file')
      if (!file) {
        console.log('There is not file in the request')
        res.status(400)
        res.json({
          error: 'There is no file in the request'
        })
        return
      }
      console.log('file uploaded')

      const sharelink = await getShareLink(file.key)

      user.photos.push({
        key: file.key,
      })

      console.log('file pushed')
      await user.save()
      res.json({
        data: {
          user,
          sharelink,
        }
      })
    } catch (error) {
      res.status(400)
      res.json({
        error
      })
      console.error(error)
    }
  })

module.exports = router

/*
 * Helpful info
 * - [How to upload multipart-form data to S3](https://stackoverflow.com/questions/17930204/simple-file-upload-to-s3-using-aws-sdk-and-node-express)
 */
