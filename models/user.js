const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true, select: false },
  photos: [{
    key: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), required: true }
  }]
})

const User = mongoose.model('user', userSchema)

module.exports = User

