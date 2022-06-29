'use strict';
var dbConn = require('../db.config.js');

//Users_search object create
var Users_search = function (Users_search) {
    this.firstname = Users_search.firstname;
    this.lastname = Users_search.lastname;
    this.email = Users_search.email;
    this.placeofbirth = Users_search.placeofbirth;
    this.birthdate = Users_search.birthdate;
    this.country = Users_search.country;
    this.current_location = Users_search.current_location;
    this.timezone = Users_search.timezone;
    this.phone = Users_search.phone;
    this.status = Users_search.status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
};

Users_search.create = function (newUsers_search, result) {
    dbConn.query("INSERT INTO Users_search set ?", newUsers_search, function (err, res) {
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

Users_search.findById = function (id, result) {
    dbConn.query("Select * from Users_search where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Users_search.findAll = function (result) {
    dbConn.query("Select * from Users_search", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('Users_search : ', res);
            result(null, res);
        }
    });
};

Users_search.update = function (id, Users_search, result) {
    dbConn.query("UPDATE Users_search SET name=? WHERE id = ?", [Users_search.name, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Users_search.delete = function (id, result) {
    dbConn.query("DELETE FROM Users_search WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = Users_search;