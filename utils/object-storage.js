const multer = require('multer')
const multerS3 = require('multer-s3')
const shortid = require('shortid')
const path = require('path')
const configs = require('../config')
const s3 = require('./s3')

const bucket = configs.s3Bucket
const expires = configs.s3ExpiresLinkTime

const uploader = multer({
  storage: multerS3({
    s3,
    bucket,
    fieldSize: 5,
    key (req, file, next) {
      console.log(JSON.stringify(file))
      const ext = path.extname(file.originalname)
      const key = shortid() + ext
      next(null, key)
    }
  })
})

/**
 * @param {object} req - Request object
 * @param {string} fieldname - File fieldname
 */
const upload = (req, fieldname) => new Promise((resolve, reject) => {
  uploader.single(fieldname)(req, {}, (err) => {
    if (err) {
      console.error('error', err)
      reject(err)
    }
    resolve(req)
  })
})

/**
 * @param {string} key - Filename in the object storage
 * @param {object} params - Override default object
 * @param {string} params.Bucket - Bucket where is saved the file
 * @param {number} params.Expires - Link lifetime in minutes
 * @return {promise}
 */
const getShareLink = (key, params) => {
  return new Promise((resolve, reject) => {
    let defParams = {
      Bucket: bucket,
      Key: key,
      Expires: expires
    }

    if (params) {
      if (params.Bucket) {
        defParams.Bucket = params.Bucket
      }
      if (params.Expires) {
        defParams.Expires = params.Expires
      }
    }

    s3.getSignedUrl('getObject', defParams, (err, url) => {
      if (err) {
        reject(err)
      } else {
        resolve(url)
      }
    })
  })
}

module.exports = {
  upload,
  uploader,
  getShareLink
}
