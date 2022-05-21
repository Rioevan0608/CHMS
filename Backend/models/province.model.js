"use strict";
var dbConn = require("../db.config.js");

//province object create
var province = function (province) {
    this.province = province.province;
    this.created_at = new Date();
    this.updated_at = new Date();
};

province.create = function (newprovince, result) {
    dbConn.query("INSERT INTO province set ?", newprovince, function (err, res) {
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

province.findById = function (id, result) {
    dbConn.query("Select * from province where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

province.findAll = function (result) {
    dbConn.query("Select * from province", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('province : ', res);
            result(null, res);
        }
    });
};

province.update = function (id, province, result) {
    dbConn.query("UPDATE province SET province=? WHERE id = ?", [province.province, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

province.delete = function (id, result) {
    dbConn.query("DELETE FROM province WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = province;


