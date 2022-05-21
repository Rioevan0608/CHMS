'use strict';
const tribes = require('../models/tribes.model.js');
exports.findAll = function(req, res) {
    tribes.findAll(function(err, tribes) {
      console.log('controller')
      if (err)
        res.send(err);
        
      console.log('res', tribes);
      res.send(tribes);
    });
};

exports.create = function(req, res) {
    const new_tribes = new tribes(req.body);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        tribes.create(new_tribes, function(err, tribes) {
          if (err)
          res.send(err);
          res.json({error:false,message:"tribes added successfully!",data:tribes});
        });
    }
};

exports.findById = function(req, res) {
    tribes.findById(req.params.id, function(err, tribes) {
      if (err)
      res.send(err);
      res.json(tribes);
    });
};

exports.update = function(req, res) {
    
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        tribes.update(req.params.id, new tribes(req.body), function(err, tribes) {
            if (err)
                res.send(err);
            res.json({ error:false, message: 'tribes successfully updated' });
       });
    }
};

exports.delete = function(req, res) {
    tribes.delete( req.params.id, function(err, tribes) {
      if (err)
      res.send(err);
      res.json({ error:false, message: 'tribes successfully deleted' });
    });
};