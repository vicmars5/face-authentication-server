module.exports = {
  bcrypt: {
    saltRounds: 12,
  },
  jwt: {
    secret: 'mysecret',
  },
  s3: {
    endpoint: 'nyc3.digitaloceanspaces.com',
    // 'R7P2OBCF5RQQVEPELNXU',
    accessKeyId: '3VB7C2I5N4GTWSFRDUXO',
    // 'LjdThJj1Xl7vCVomspWRjAl0tapiZ0bIX1YccUfqyXE'
    secretAccessKey: 'ZZdd1E49234I+U4Ng76z9PKEl6y7sMt5Fy+VPm64h7E',
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
  mongo: {
    user: 'server',
    password: 'Ns12NSd',
    host: 'ds223509.mlab.com:23509',
    db: 'face-recognition'
  }
}
