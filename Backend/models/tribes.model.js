"use strict";
var dbConn = require("../db.config.js");

//tribes object create
var tribes = function (tribes) {
    this.tribes = tribes.tribes;
    this.suku = tribes.suku;
    this.created_at = new Date();
    this.updated_at = new Date();
};

tribes.create = function (newtribes, result) {
    dbConn.query("INSERT INTO tribes set ?", newtribes, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

tribes.findById = function (id, result) {
    dbConn.query("Select * from tribes where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

tribes.findAll = function (result) {
    dbConn.query("Select * from tribes", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('tribes : ', res);
            result(null, res);
        }
    });
};

tribes.update = function (id, tribes, result) {
    dbConn.query("UPDATE tribes SET tribes=?, suku=? WHERE id = ?", [tribes.tribes, tribes.suku, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

tribes.delete = function (id, result) {
    dbConn.query("DELETE FROM tribes WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = tribes;


