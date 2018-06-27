const mongoose = require('mongoose')

const photoAuthSchema = mongoose.Schema({
  ket: { type: String },
  faceIds: [ String ],
  faces: [{
    faceId: { type: String },
    candidates: {
      personId: { type: String },
      confidence: { type: Number }
    }
  }]
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})

const PhotoAuth = mongoose.model('photoauth', photoAuthSchema)

module.exports = PhotoAuth
