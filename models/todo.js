const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  isDone: {
    type: Boolean,
    default: false,
    require: true
  },
  createdDate: {
    type: Number,
    required: true
  },
  endDate: {
    type: Number,
    trim: true
  },
  duration: {
    type: Number,
    default: 0
  },
  isDelete: {
    type: Boolean,
    default: false,
    require: true
  }
})

module.exports = mongoose.model('Todo', todoSchema)
