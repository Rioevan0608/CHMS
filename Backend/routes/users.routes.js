const express = require('express');
const router = express.Router();

const usersController =  require('../controllers/users.controller.js');

// Retrieve all users
router.get('/', usersController.findAll);

// Create a new users
router.post('/', usersController.create);

// Retrieve a single users with id
router.get('/:id', usersController.findById);

// Update a users with id
router.put('/:id', usersController.update);

// Delete a users with id
router.delete('/:id', usersController.delete);

module.exports = router;