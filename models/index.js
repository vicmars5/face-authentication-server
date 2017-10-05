const mongoose = require('mongoose')

const User = require('./user.js')

mongoose.connect('mongodb://localhost/face-recognition', {
  useMongoClient: true
})

module.exports = {
  User
}
