const express = require("express");
const router = express.Router();

const purchase_transactionController = require("../controllers/purchase_transaction.controller.js");

// Retrieve all purchase_transaction
router.get("/", purchase_transactionController.findAll);

// Create a new purchase_transaction
router.post("/", purchase_transactionController.create);

// Retrieve a single purchase_transaction with id
router.get("/:id", purchase_transactionController.findById);

module.exports = router;