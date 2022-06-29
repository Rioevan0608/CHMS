"use strict";
var dbConn = require("../db.config.js");


var purchase_transaction = function (purchase) {  
  this.userid = purchase.userid;
  this.no_transaction = purchase.no_transaction;
  this.PIC = purchase.PIC;
  this.transaction_date = purchase.transaction_date;
  this.created_at = new Date();
  this.updated_at = new Date();
}; 
  
purchase_transaction.create = function (newpurchase, result) {
  dbConn.query("INSERT INTO purchase set ?", newpurchase, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });

  dbConn.query("INSERT into purchase_details(userid, no_transaction, item_id, item_name, quantity, price, discount) " +  
  "SELECT userid, no_transaction, item_id, item_name, quantity, price, discount FROM temp_purchase_details WHERE userid=" +newpurchase.userid);

  dbConn.query("DELETE FROM temp_purchase_details WHERE userid=" +newpurchase.userid);
  
  console.log("Transaksi berhasil dibuat!");
};

purchase_transaction.findById = function (id, result) {
  dbConn.query("Select * from purchase where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

purchase_transaction.findAll = function (result) {
  dbConn.query("Select * from purchase", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("purchase : ", res);
      result(null, res);
    }
  });
};
module.exports = purchase_transaction;