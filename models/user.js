const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true, select: false },
  photos: [{
    key: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), required: true }
  }],
  faceApiId: { type: String, required: false },
  personGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'persongroup',
    required: true
  }
})

const User = mongoose.model('user', userSchema)

module.exports = User

