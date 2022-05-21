'use strict';
const users = require('../models/users.model.js');
exports.findAll = function(req, res) {
    users.findAll(function(err, users) {
      console.log('controller')
      if (err)
        res.send(err);
        
      console.log('res', users);
      res.send(users);
    });
};

exports.create = function(req, res) {
    const new_users = new users(req.body);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        users.create(new_users, function(err, users) {
          if (err)
          res.send(err);
          res.json({error:false,message:"users added successfully!",data:users});
        });
    }
};

exports.findById = function(req, res) {
    users.findById(req.params.id, function(err, users) {
      if (err)
      res.send(err);
      res.json(users);
    });
};

exports.update = function(req, res) {
    
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        users.update(req.params.id, new users(req.body), function(err, users) {
            if (err)
                res.send(err);
            res.json({ error:false, message: 'users successfully updated' });
       });
    }
};

exports.delete = function(req, res) {
    users.delete( req.params.id, function(err, users) {
      if (err)
      res.send(err);
      res.json({ error:false, message: 'users successfully deleted' });
    });
};