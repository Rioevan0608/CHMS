const express = require('express');
const router = express.Router();

const provinceController =  require('../controllers/province.controller.js');

// Retrieve all province
router.get('/', provinceController.findAll);

// Create a new province
router.post('/', provinceController.create);

// Retrieve a single province with id
router.get('/:id', provinceController.findById);

// Update a province with id
router.put('/:id', provinceController.update);

// Delete a province with id
router.delete('/:id', provinceController.delete);

module.exports = router;