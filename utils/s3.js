const aws = require('aws-sdk')
const config = require('../config').s3

const s3 = new aws.S3(config)

module.exports = s3

