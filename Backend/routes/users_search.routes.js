const express = require('express');
const router = express.Router();

const Users_searchController =  require('../controllers/Users_search.controller.js');

// Retrieve all Users_search
router.get('/', Users_searchController.findAll);

// Create a new Users_search
router.post('/', Users_searchController.create);

// Retrieve a single Users_search with id
router.get('/:id', Users_searchController.findById);

// Update a Users_search with id
router.put('/:id', Users_searchController.update);

// Delete a Users_search with id
router.delete('/:id', Users_searchController.delete);

module.exports = router;