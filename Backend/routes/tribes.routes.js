const express = require('express');
const router = express.Router();

const tribesController =  require('../controllers/tribes.controller.js');

// Retrieve all tribes
router.get('/', tribesController.findAll);

// Create a new tribes
router.post('/', tribesController.create);

// Retrieve a single tribes with id
router.get('/:id', tribesController.findById);

// Update a tribes with id
router.put('/:id', tribesController.update);

// Delete a tribes with id
router.delete('/:id', tribesController.delete);

module.exports = router;