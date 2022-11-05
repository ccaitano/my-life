const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const taskSchema = new Schema({
  taskText: {
    type: String,
    required: 'You need to enter a task!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  priority: {
    type: String,
    required: true,
    trim: true,
  },
});

const Task = model('Task', taskSchema);

module.exports = Task;
