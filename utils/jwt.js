const jwt = require('jwt-simple')
const { secret } = require('../config').jwt

/**
 * Encode JSON Web Token
 */
const encode = (data) => {
  return jwt.encode(data, secret)
}

/**
 * Make authorization
 */
const authorize = (data) => {
  const token = encode(data)
  return `JWT ${token}`
}

/**
 * Decoe JSON Web Token
 */
const decode = (token) => {
  return jwt.decode(token, secret)
}

const validate = (req, res, next) => {
  const authentication = req.get('authentication')

  if (!authentication) {
    req.user = null
    return next()
  }

  const arr = authentication.split(' ')
  if (arr.length < 2 && arr[0].toUpperCase() !== 'JWT') {
    req.user = null
    return next()
  }

  const token = arr[1]
  const user = decode(token)
  req.user = user
  next()
}

module.exports = {
  encode,
  decode,
  authorize,
  validate
}
