const jwt = require('jwt-simple')
const { secret } = require('../config').jwt

const encode = (data) => {
  return jwt.encode(data, secret)
}

const decode = (token) => {
  return jwt.decode(token, secret)
}

const validate = (req, res, next) => {
  const authentication = req.get('authentication')
  const arr = token.split(' ')
  const token = arr[1]
  const user = decode(token)
  req.user = user
  next()
}

module.exports = {
  encode,
  decode,
  validate
}
