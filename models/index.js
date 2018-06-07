const mongoose = require('mongoose')
const config = require('../config').mongo

const User = require('./user.js')
const PersonGroup = require('./person-group')
const PhotoAuth = require('./photo-auth')

const {
  user,
  password,
  host,
  db
} = config

mongoose.Promise = global.Promise
// mongodb://<dbuser>:<dbpassword>@ds223509.mlab.com:23509/face-recognition
mongoose.connect(`mongodb://${user}:${password}@${host}/${db}`, {
  useMongoClient: true
})

module.exports = {
  User,
  PersonGroup,
  PhotoAuth
}
