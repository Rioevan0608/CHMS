"use strict";
var dbConn = require("../db.config.js");

//church object create
var church = function (church) {
  this.id_church = church.id_church;
  this.churchname = church.churchname;
  this.address = church.address;
  this.status = church.status;
  this.created_at = new Date();
  this.updated_at = new Date();
};

church.create = function (newchurch, result) {
  dbConn.query("INSERT INTO church set ?", newchurch, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

church.findById = function (id, result) {
  dbConn.query("Select * from church where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

church.findAll = function (result) {
  dbConn.query("Select * from church", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("church : ", res);
      result(null, res);
    }
  });
};

church.update = function (id, church, result) {
  dbConn.query("UPDATE church SET id_church=?, churchname=?, address=?, status=? WHERE id = ?", 
  [church.id_church, church.churchname, church.address, church.status, id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

church.delete = function (id, result) {
  dbConn.query("DELETE FROM church WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
module.exports = church;
