"use strict";
const temp_purchase_details = require("../models/temp_purchase_details.model.js");
exports.findAll = function (req, res) {
  temp_purchase_details.findAll(function (err, temp_purchase_details) {
    console.log("controller");
    if (err) res.send(err);

    console.log("res", temp_purchase_details);
    res.send(temp_purchase_details);
  });
};

exports.create = function (req, res) {
  const new_temp_purchase_details = new temp_purchase_details(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: "Please provide all required field" });
  } else {
    temp_purchase_details.create(newtemp_purchase_details, function (err, temp_purchase_details) {
      if (err) res.send(err);
      res.json({ error: false, message: "temp_purchase_details added successfully!", data: temp_purchase_details });
    });
  }
};

exports.findById = function (req, res) {
  temp_purchase_details.findById(req.params.id, function (err, temp_purchase_details) {
    if (err) res.send(err);
    res.json(temp_purchase_details);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: "Please provide all required field" });
  } else {
    temp_purchase_details.update(req.params.id, new temp_purchase_details(req.body), function (err, temp_purchase_details) {
      if (err) res.send(err);
      res.json({ error: false, message: "temp_purchase_details successfully updated" });
    });
  }
};

exports.delete = function (req, res) {
  temp_purchase_details.delete(req.params.id, function (err, temp_purchase_details) {
    if (err) res.send(err);
    res.json({ error: false, message: "temp_purchase_details successfully deleted" });
  });
};
