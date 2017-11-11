const mongoose = require('mongoose')

const personGroupSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true }
})

const PersonGroup = mongoose.model('persongroup', personGroupSchema)

module.exports = PersonGroup

