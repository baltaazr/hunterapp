const mongoose = require('mongoose')

const pointSchema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number
  }
})
const huntSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: new Date(),
    required: true
  },
  location: {
    type: pointSchema,
    required: true
  },
  formInfo: { type: [String], required: true }
})

mongoose.model('Hunt', huntSchema)
