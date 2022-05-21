const express = require('express');
const router = express.Router();

const occupationController =  require('../controllers/occupation.controller.js');

// Retrieve all occupation
router.get('/', occupationController.findAll);

// Create a new occupation
router.post('/', occupationController.create);

// Retrieve a single occupation with id
router.get('/:id', occupationController.findById);

// Update a occupation with id
router.put('/:id', occupationController.update);

// Delete a occupation with id
router.delete('/:id', occupationController.delete);

module.exports = router;