"use strict";
const church = require("../models/church.model.js");
exports.findAll = function (req, res) {
  church.findAll(function (err, church) {
    console.log("controller");
    if (err) res.send(err);

    console.log("res", church);
    res.send(church);
  });
};

exports.create = function (req, res) {
  const new_church = new church(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: "Please provide all required field" });
  } else {
    church.create(new_church, function (err, church) {
      if (err) res.send(err);
      res.json({ error: false, message: "church added successfully!", data: church });
    });
  }
};

exports.findById = function (req, res) {
  church.findById(req.params.id, function (err, church) {
    if (err) res.send(err);
    res.json(church);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: "Please provide all required field" });
  } else {
    church.update(req.params.id, new church(req.body), function (err, church) {
      if (err) res.send(err);
      res.json({ error: false, message: "church successfully updated" });
    });
  }
};

exports.delete = function (req, res) {
  church.delete(req.params.id, function (err, church) {
    if (err) res.send(err);
    res.json({ error: false, message: "church successfully deleted" });
  });
};
