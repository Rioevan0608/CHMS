"use strict";
var dbConn = require("../db.config.js");

//purchase object create
var purchase = function (purchase) {
    this.userid = purchase.userid;
    this.no_transaction = purchase.no_transaction;
    this.PIC = purchase.PIC;
    this.transaction_date = purchase.transaction_date;
    this.created_at = new Date();
    this.updated_at = new Date();
};

purchase.create = function (newpurchase, result) {
    dbConn.query("INSERT INTO purchase set ?", newpurchase, function (err, res) {
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

purchase.findById = function (id, result) {
    dbConn.query("Select * from purchase where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

purchase.findAll = function (result) {
    dbConn.query("Select * from purchase", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('purchase : ', res);
            result(null, res);
        }
    });
};

purchase.update = function (id, purchase, result) {
    dbConn.query("UPDATE purchase SET userid=?, no_transaction=?  PIC=?  transaction_date=? WHERE id = ?",
     [purchase.userid, purchase.no_transaction, purchase.PIC, purchase.transaction_date, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

purchase.delete = function (id, result) {
    dbConn.query("DELETE FROM purchase WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = purchase;


