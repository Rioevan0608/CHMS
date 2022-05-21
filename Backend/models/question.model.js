"use strict";
var dbConn = require("../db.config.js");

//question object create
var question = function (question) {
    this.question = question.question;
    this.answer = question.answer;
    this.created_at = new Date();
    this.updated_at = new Date();
};

question.create = function (newquestion, result) {
    dbConn.query("INSERT INTO question set ?", newquestion, function (err, res) {
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

question.findById = function (id, result) {
    dbConn.query("Select * from question where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

question.findAll = function (result) {
    dbConn.query("Select * from question", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('question : ', res);
            result(null, res);
        }
    });
};

question.update = function (id, question, result) {
    dbConn.query("UPDATE question SET question=?, answer=? WHERE id = ?", [question.question, question.answer, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

question.delete = function (id, result) {
    dbConn.query("DELETE FROM question WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = question;


