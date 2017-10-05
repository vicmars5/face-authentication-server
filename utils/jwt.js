const jwt = require('jwt-simple')
const { secret } = require('../config').jwt

module.exports = {
  encode (token) {
    return jwt.encode(token, secret)
  },
  decode (token) {
    return jwt.decode(token, secret)
  }
}
