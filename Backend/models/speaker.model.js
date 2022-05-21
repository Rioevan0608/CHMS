"use strict";
var dbConn = require("../db.config.js");

//speaker object create
var speaker = function (speaker) {
  this.nik = speaker.nik;
  this.name = speaker.name;
  this.place_birth = speaker.place_birth;
  this.date_birth = speaker.date_birth;
  this.email = speaker.email;
  this.gender = speaker.gender;
  this.blood_type = speaker.blood_type;
  this.address = speaker.address;
  this.rt = speaker.rt;
  this.rw = speaker.rw;
  this.village = speaker.village;
  this.districts = speaker.districts;
  this.religion = speaker.religion;
  this.marital = speaker.marital;
  this.occupation = speaker.occupation;
  this.citizen = speaker.citizen;
  this.phone_number = speaker.phone_number;
  this.status = speaker.status;
  this.created_at = new Date();
  this.updated_at = new Date();
};

speaker.create = function (newspeaker, result) {
  dbConn.query("INSERT INTO speaker set ?", newspeaker, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

speaker.findById = function (id, result) {
  dbConn.query("Select * from speaker where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

speaker.findAll = function (result) {
  dbConn.query("Select * from speaker", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("speaker : ", res);
      result(null, res);
    }
  });
};

speaker.update = function (id, speaker, result) {
  dbConn.query("UPDATE speaker SET nik=?, name=?, place_birth=?, date_birth=?, email=?, gender=?, blood_type=?, address=?, rt=?, rw=?, village=?, districts=?, religion=?, marital=?, occupation=?, citizen=?, phone_number=?, status=? WHERE id = ?", 
  [speaker.nik, speaker.name, speaker.place_birth, speaker.date_birth, speaker.email, speaker.gender, speaker.blood_type, speaker.address, speaker.rt, speaker.rw, speaker.village, speaker.districts, speaker.religion, speaker.marital, speaker.occupation, speaker.citizen, speaker.phone_number, speaker.status, id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

speaker.delete = function (id, result) {
  dbConn.query("DELETE FROM speaker WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
module.exports = speaker;
