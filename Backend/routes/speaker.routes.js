const express = require('express');
const router = express.Router();

const speakerController =   require('../controllers/speaker.controller.js');

// Retrieve all speakers
router.get('/', speakerController.findAll);

// Create a new speaker
router.post('/', speakerController.create);

// Retrieve a single speaker with id
router.get('/:id', speakerController.findById);

// Update a speaker with id
router.put('/:id', speakerController.update);

// Delete a speaker with id
router.delete('/:id', speakerController.delete);

module.exports = router;