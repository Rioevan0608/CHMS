const express = require('express');
const router = express.Router();

const employeesController =   require('../controllers/employees.controller.js');

// Retrieve all employeess
router.get('/', employeesController.findAll);

// Create a new employees
router.post('/', employeesController.create);

// Retrieve a single employees with id
router.get('/:id', employeesController.findById);

// Update a employees with id
router.put('/:id', employeesController.update);

// Delete a employees with id
router.delete('/:id', employeesController.delete);

module.exports = router;