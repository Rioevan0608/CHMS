"use strict";
var dbConn = require("../db.config.js");

//employees object create
var employees = function (employees) {
  this.nik = employees.nik;
  this.name = employees.name;
  this.place_birth = employees.place_birth;
  this.date_birth = employees.date_birth;
  this.email = employees.email;
  this.gender = employees.gender;
  this.blood_type = employees.blood_type;
  this.address = employees.address;
  this.rt = employees.rt;
  this.rw = employees.rw;
  this.village = employees.village;
  this.districts = employees.districts;
  this.religion = employees.religion;
  this.marital = employees.marital;
  this.occupation = employees.occupation;
  this.citizen = employees.citizen;
  this.phone_number = employees.phone_number;
  this.status = employees.status;
  this.created_at = new Date();
  this.updated_at = new Date();
};

employees.create = function (newemployees, result) {
  dbConn.query("INSERT INTO employees set ?", newemployees, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

employees.findById = function (id, result) {
  dbConn.query("Select * from employees where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

employees.findAll = function (result) {
  dbConn.query("Select * from employees", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("employees : ", res);
      result(null, res);
    }
  });
};

employees.update = function (id, employees, result) {
  dbConn.query("UPDATE employees SET nik=?, name=?, place_birth=?, date_birth=?, email=?, gender=?, blood_type=?, address=?, rt=?, rw=?, village=?, districts=?, religion=?, marital=?, occupation=?, citizen=?, phone_number=?, status=? WHERE id = ?", 
  [employees.nik, employees.name, employees.place_birth, employees.date_birth, employees.email, employees.gender, employees.blood_type, employees.address, employees.rt, employees.rw, employees.village, employees.districts, employees.religion, employees.marital, employees.occupation, employees.citizen, employees.phone_number, employees.status, id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

employees.delete = function (id, result) {
  dbConn.query("DELETE FROM employees WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
module.exports = employees;
