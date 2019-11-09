const mongoose = require('mongoose')

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
  formInfo: { type: [String], required: true }
})

mongoose.model('Hunt', huntSchema)
