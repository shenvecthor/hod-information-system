const express = require('express');
const router = express.Router();
const ProgressUpdate = require('../models/ProgressUpdate');


// Get all progress updates
router.get('/', async (req, res) => {
  try {
    const updates = await ProgressUpdate.find().populate('course').populate('lecturer');
    res.json(updates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single progress update
router.get('/:id', async (req, res) => {
  try {
    const update = await ProgressUpdate.findById(req.params.id).populate('course').populate('lecturer');
    if (!update) return res.status(404).json({ message: 'Progress update not found' });
    res.json(update);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new progress update
router.post('/', async (req, res) => {
  const update = new ProgressUpdate({
    course: req.body.course,
    lecturer: req.body.lecturer,
    gradingStatus: req.body.gradingStatus,
    gradingCompletionDate: req.body.gradingCompletionDate,
    marksheetStatus: req.body.marksheetStatus,
    marksheetCompletionDate: req.body.marksheetCompletionDate,
    marksheetSubmitted: req.body.marksheetSubmitted,
    marksheetSubmissionDate: req.body.marksheetSubmissionDate
  });

  try {
    const newUpdate = await update.save();
    res.status(201).json(newUpdate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Update a progress update
router.patch('/:id', async (req, res) => {
  try {
    const updatedUpdate = await ProgressUpdate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUpdate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a progress update
router.delete('/:id', async (req, res) => {
  try {
    await ProgressUpdate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Progress update deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;