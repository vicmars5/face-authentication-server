const mongoose = require('mongoose')

const User = require('./user.js')
const PersonGroup = require('./person-group')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/face-recognition', {
  useMongoClient: true
})

module.exports = {
  User,
  PersonGroup
}
