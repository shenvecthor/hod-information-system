const mongoose = require('mongoose');

const ProgressUpdateSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecturer', required: true },
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
  status: {
    type: String,
    enum: ['On Track', 'Behind Schedule', 'Ahead of Schedule'],
    required: true
  }
});

module.exports = mongoose.model('ProgressUpdate', ProgressUpdateSchema);