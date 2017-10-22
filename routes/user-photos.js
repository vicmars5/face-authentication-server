const { Router } = require('express')
const upload = require('../utils/upload-service.js')

const router = Router()

router.post('/', upload.single('file'), (req, res) => {

  res.send(`${JSON.stringify(req.file)} file uploaded.`)
})

module.exports = router

/*
 * Helpful info
 * - [How to upload multipart-form data to S3](https://stackoverflow.com/questions/17930204/simple-file-upload-to-s3-using-aws-sdk-and-node-express)
 */
