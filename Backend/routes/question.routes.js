const express = require('express');
const router = express.Router();

const questionController =  require('../controllers/question.controller.js');

// Retrieve all question
router.get('/', questionController.findAll);

// Create a new question
router.post('/', questionController.create);

// Retrieve a single question with id
router.get('/:id', questionController.findById);

// Update a question with id
router.put('/:id', questionController.update);

// Delete a question with id
router.delete('/:id', questionController.delete);

module.exports = router;