const express = require('express');
const router = express.Router();

const churchController =   require('../controllers/church.controller.js');

// Retrieve all churchs
router.get('/', churchController.findAll);

// Create a new church
router.post('/', churchController.create);

// Retrieve a single church with id
router.get('/:id', churchController.findById);

// Update a church with id
router.put('/:id', churchController.update);

// Delete a church with id
router.delete('/:id', churchController.delete);

module.exports = router;