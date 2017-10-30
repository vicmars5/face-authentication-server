const mongoose = require('mongoose')

const personGroupSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }]
})

const PersonGroup = mongoose.model('persongroups', personGroupSchema)

module.exports = PersonGroup

