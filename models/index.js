const mongoose = require('mongoose')

const User = require('./user.js')
const PersonGroup = require('./person-group')
const PhotoAuth = require('./photo-auth')
const { host, user, pass } = require('../config').mongodb

mongoose.Promise = global.Promise
mongoose.connect(host, {
  useMongoClient: true,
  user,
  pass
})

module.exports = {
  User,
  PersonGroup,
  PhotoAuth
}
