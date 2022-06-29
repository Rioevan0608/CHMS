"use strict";
const purchase_transaction = require("../models/purchase_transaction.model.js");
exports.findAll = function (req, res) {
  purchase_transaction.findAll(function (err, purchase_transaction) {
    console.log("controller");
    if (err) res.send(err);

    console.log("res", purchase_transaction);
    res.send(purchase_transaction);
  });
};

exports.create = function (req, res) {
  const new_purchase_transaction = new purchase_transaction(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: "Please provide all required field" });
  } else {
    purchase_transaction.create(new_purchase_transaction, function (err, purchase_transaction) {
      if (err) res.send(err);
      res.json({ error: false, message: "purchase_transaction added successfully!", data: purchase_transaction });
    });
  }
};

exports.findById = function (req, res) {
  purchase_transaction.findById(req.params.id, function (err, purchase_transaction) {
    if (err) res.send(err);
    res.json(purchase_transaction);
  });
};