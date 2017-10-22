const multer = require('multer')
const multerS3 = require('multer-s3')
const shortid = require('shortid')
const path = require('path')

const s3 = require('./s3')

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'face-recognition',
    key (req, file, next) {
      console.log(JSON.stringify(file))
      const ext = path.extname(file.originalname)
      next(null, shortid() + ext)
    }
  })
})

module.exports = upload
