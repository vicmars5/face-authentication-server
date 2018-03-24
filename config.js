module.exports = {
  bcrypt: {
    saltRounds: 12,
  },
  jwt: {
    secret: 'mysecret',
  },
  s3: {
    endpoint: 'nyc3.digitaloceanspaces.com',
    accessKeyId: 'R7P2OBCF5RQQVEPELNXU',
    secretAccessKey: 'LjdThJj1Xl7vCVomspWRjAl0tapiZ0bIX1YccUfqyXE'
  },
  s3Bucket: 'face-recognition',
  s3ExpiresLinkTime: 600,
  face: {
    endpoint: 'https://westus.api.cognitive.microsoft.com/face/v1.0',
    // bucket name: face-api-udg
    // key 1: 315202b5e8ca4dddb3b3d4d367de903c
    // key 2: d4fb0e8c273740ba8479d527af17092f
    subscription: '315202b5e8ca4dddb3b3d4d367de903c',
  },
  mongodb: {
    host: 'mongodb://ds223509.mlab.com:23509/face-recognition', // 'mongodb://localhost/face-recognition'
    user: 'vic',
    pass: 'tacos'
  }
}
