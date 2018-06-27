const bcrypt = require('bcrypt')
const config = require('../config').bcrypt

const { saltRounds } = config

// bcrypt wrapper
const hash = (text) => {
  return bcrypt.hash(text, saltRounds)
}

module.exports = {
  hash, // hash function
  compare: bcrypt.compare,
  bcrypt, // original bcrypt
  config // bcrypt config
}
