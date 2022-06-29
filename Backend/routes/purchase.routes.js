const express = require('express');
const router = express.Router();

const purchaseController =  require('../controllers/purchase.controller.js');

// Retrieve all purchase
router.get('/', purchaseController.findAll);

// Create a new purchase
router.post('/', purchaseController.create);

// Retrieve a single purchase with id
router.get('/:id', purchaseController.findById);

// Update a purchase with id
router.put('/:id', purchaseController.update);

// Delete a purchase with id
router.delete('/:id', purchaseController.delete);

module.exports = router;