const express = require('express');
const router = express.Router();

const temp_purchase_detailsController =   require('../controllers/temp_purchase_details.controller.js');

// Retrieve all temp_purchase_detailss
router.get('/', temp_purchase_detailsController.findAll);

// Create a new temp_purchase_details
router.post('/', temp_purchase_detailsController.create);

// Retrieve a single temp_purchase_details with id
router.get('/:id', temp_purchase_detailsController.findById);

// Update a temp_purchase_details with id
router.put('/:id', temp_purchase_detailsController.update);

// Delete a temp_purchase_details with id
router.delete('/:id', temp_purchase_detailsController.delete);

module.exports = router;