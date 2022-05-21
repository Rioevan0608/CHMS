"use strict";
var dbConn = require("../db.config.js");

//occupation object create
var occupation = function (occupation) {
    this.occupation = occupation.occupation;
    this.pekerjaan = occupation.pekerjaan;
    this.created_at = new Date();
    this.updated_at = new Date();
};

occupation.create = function (newoccupation, result) {
    dbConn.query("INSERT INTO occupation set ?", newoccupation, function (err, res) {
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

occupation.findById = function (id, result) {
    dbConn.query("Select * from occupation where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

occupation.findAll = function (result) {
    dbConn.query("Select * from occupation", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('occupation : ', res);
            result(null, res);
        }
    });
};

occupation.update = function (id, occupation, result) {
    dbConn.query("UPDATE occupation SET occupation=?, pekerjaan=? WHERE id = ?", [occupation.occupation, occupation.pekerjaan, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

occupation.delete = function (id, result) {
    dbConn.query("DELETE FROM occupation WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = occupation;


