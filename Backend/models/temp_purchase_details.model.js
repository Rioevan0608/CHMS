"use strict";
var dbConn = require("../db.config.js");

//transaction object create
var temp_purchase_details = function (temp_purchase_details) {
  this.userid = temp_purchase_details.userid;
  this.no_transaction = temp_purchase_details.no_transaction;
  this.item_id = temp_purchase_details.item_id;
  this.item_name = temp_purchase_details.item_name;
  this.quantity = temp_purchase_details.quantity;
  this.price = temp_purchase_details.price;
  this.discount = temp_purchase_details.discount;
  this.created_at = new Date();
  this.updated_at = new Date();
};

temp_purchase_details.create = function (newtemp_purchase_details, result) {
  dbConn.query("INSERT INTO temp_purchase_details set ?", newtemp_purchase_details, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

temp_purchase_details.findById = function (id, result) {
  dbConn.query("Select * from temp_purchase_details where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

temp_purchase_details.findAll = function (result) {
  dbConn.query("Select * from temp_purchase_details", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("temp_purchase_details : ", res);
      result(null, res);
    }
  });
};

temp_purchase_details.update = function (id, temp_purchase_details, result) {
  dbConn.query("UPDATE temp_purchase_details SET userid=?, no_transaction=?, item_id=?, item_name=?,  quantity=?,  price=?,  discount=?, WHERE id = ?", 
  [temp_purchase_details.userid, temp_purchase_details.no_transaction, temp_purchase_details.item_id, temp_purchase_details.item_name,  temp_purchase_details.quantity,  temp_purchase_details.price,  temp_purchase_details.discount, id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

temp_purchase_details.delete = function (id, result) {
  dbConn.query("DELETE FROM temp_purchase_details WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
module.exports = temp_purchase_details;
