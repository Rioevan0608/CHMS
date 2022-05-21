'use strict';
const question = require('../models/question.model.js');
exports.findAll = function(req, res) {
    question.findAll(function(err, question) {
      console.log('controller')
      if (err)
        res.send(err);
        
      console.log('res', question);
      res.send(question);
    });
};

exports.create = function(req, res) {
    const new_question = new question(req.body);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        question.create(new_question, function(err, question) {
          if (err)
          res.send(err);
          res.json({error:false,message:"question added successfully!",data:question});
        });
    }
};

exports.findById = function(req, res) {
    question.findById(req.params.id, function(err, question) {
      if (err)
      res.send(err);
      res.json(question);
    });
};

exports.update = function(req, res) {
    
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        question.update(req.params.id, new question(req.body), function(err, question) {
            if (err)
                res.send(err);
            res.json({ error:false, message: 'question successfully updated' });
       });
    }
};

exports.delete = function(req, res) {
    question.delete( req.params.id, function(err, question) {
      if (err)
      res.send(err);
      res.json({ error:false, message: 'question successfully deleted' });
    });
};