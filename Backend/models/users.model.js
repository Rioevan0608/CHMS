'use strict';
var dbConn = require('../db.config.js');

//users object create
var users = function (users) {
    this.firstname = users.firstname;
    this.lastname = users.lastname;
    this.email = users.email;
    this.placeofbirth = users.placeofbirth;
    this.birthdate = users.birthdate;
    this.country = users.country;
    this.current_location = users.current_location;
    this.timezone = users.timezone;
    this.phone = users.phone;
    this.status = users.status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
};

users.create = function (newusers, result) {
    dbConn.query("INSERT INTO users set ?", newusers, function (err, res) {
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

users.findById = function (id, result) {
    dbConn.query("Select * from users where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

users.findAll = function (result) {
    dbConn.query("Select * from users", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('users : ', res);
            result(null, res);
        }
    });
};

users.update = function (id, users, result) {
    dbConn.query("UPDATE users SET name=? WHERE id = ?", [users.name, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

users.delete = function (id, result) {
    dbConn.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = users;