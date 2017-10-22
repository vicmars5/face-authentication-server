const aws = require('aws-sdk')

const s3 = new aws.S3({
  endpoint: 'nyc3.digitaloceanspaces.com',
  accessKeyId: 'R7P2OBCF5RQQVEPELNXU',
  secretAccessKey: 'LjdThJj1Xl7vCVomspWRjAl0tapiZ0bIX1YccUfqyXE'
})

module.exports = s3

