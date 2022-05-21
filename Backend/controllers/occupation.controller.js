'use strict';
const occupation = require('../models/occupation.model.js');
exports.findAll = function(req, res) {
    occupation.findAll(function(err, occupation) {
      console.log('controller')
      if (err)
        res.send(err);
        
      console.log('res', occupation);
      res.send(occupation);
    });
};

exports.create = function(req, res) {
    const new_occupation = new occupation(req.body);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        occupation.create(new_occupation, function(err, occupation) {
          if (err)
          res.send(err);
          res.json({error:false,message:"occupation added successfully!",data:occupation});
        });
    }
};

exports.findById = function(req, res) {
    occupation.findById(req.params.id, function(err, occupation) {
      if (err)
      res.send(err);
      res.json(occupation);
    });
};

exports.update = function(req, res) {
    
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        occupation.update(req.params.id, new occupation(req.body), function(err, occupation) {
            if (err)
                res.send(err);
            res.json({ error:false, message: 'occupation successfully updated' });
       });
    }
};

exports.delete = function(req, res) {
    occupation.delete( req.params.id, function(err, occupation) {
      if (err)
      res.send(err);
      res.json({ error:false, message: 'occupation successfully deleted' });
    });
};