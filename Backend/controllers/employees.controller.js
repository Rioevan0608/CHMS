"use strict";
const employees = require("../models/employees.model.js");
exports.findAll = function (req, res) {
  employees.findAll(function (err, employees) {
    console.log("controller");
    if (err) res.send(err);

    console.log("res", employees);
    res.send(employees);
  });
};

exports.create = function (req, res) {
  const new_employees = new employees(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: "Please provide all required field" });
  } else {
    employees.create(new_employees, function (err, employees) {
      if (err) res.send(err);
      res.json({ error: false, message: "employees added successfully!", data: employees });
    });
  }
};

exports.findById = function (req, res) {
  employees.findById(req.params.id, function (err, employees) {
    if (err) res.send(err);
    res.json(employees);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: "Please provide all required field" });
  } else {
    employees.update(req.params.id, new employees(req.body), function (err, employees) {
      if (err) res.send(err);
      res.json({ error: false, message: "employees successfully updated" });
    });
  }
};

exports.delete = function (req, res) {
  employees.delete(req.params.id, function (err, employees) {
    if (err) res.send(err);
    res.json({ error: false, message: "employees successfully deleted" });
  });
};
