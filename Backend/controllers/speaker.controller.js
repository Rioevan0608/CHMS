"use strict";
const speaker = require("../models/speaker.model.js");
exports.findAll = function (req, res) {
  speaker.findAll(function (err, speaker) {
    console.log("controller");
    if (err) res.send(err);

    console.log("res", speaker);
    res.send(speaker);
  });
};

exports.create = function (req, res) {
  const new_speaker = new speaker(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: "Please provide all required field" });
  } else {
    speaker.create(new_speaker, function (err, speaker) {
      if (err) res.send(err);
      res.json({ error: false, message: "speaker added successfully!", data: speaker });
    });
  }
};

exports.findById = function (req, res) {
  speaker.findById(req.params.id, function (err, speaker) {
    if (err) res.send(err);
    res.json(speaker);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: "Please provide all required field" });
  } else {
    speaker.update(req.params.id, new speaker(req.body), function (err, speaker) {
      if (err) res.send(err);
      res.json({ error: false, message: "speaker successfully updated" });
    });
  }
};

exports.delete = function (req, res) {
  speaker.delete(req.params.id, function (err, speaker) {
    if (err) res.send(err);
    res.json({ error: false, message: "speaker successfully deleted" });
  });
};
