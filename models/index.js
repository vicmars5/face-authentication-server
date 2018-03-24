const mongoose = require('mongoose')

const User = require('./user.js')
const PersonGroup = require('./person-group')
const PhotoAuth = require('./photo-auth')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/face-recognition', {
  useMongoClient: true
})

module.exports = {
  User,
  PersonGroup,
  PhotoAuth
}
