'use strict';
const Users_search = require('../models/Users_search.model.js');
exports.findAll = function(req, res) {
    Users_search.findAll(function(err, Users_search) {
      console.log('controller')
      if (err)
        res.send(err);
        
      console.log('res', Users_search);
      res.send(Users_search);
    });
};

exports.create = function(req, res) {
    const new_Users_search = new Users_search(req.body);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Users_search.create(new_Users_search, function(err, Users_search) {
          if (err)
          res.send(err);
          res.json({error:false,message:"Users_search added successfully!",data:Users_search});
        });
    }
};

exports.findById = function(req, res) {
    Users_search.findById(req.params.id, function(err, Users_search) {
      if (err)
      res.send(err);
      res.json(Users_search);
    });
};

exports.update = function(req, res) {
    
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Users_search.update(req.params.id, new Users_search(req.body), function(err, Users_search) {
            if (err)
                res.send(err);
            res.json({ error:false, message: 'Users_search successfully updated' });
       });
    }
};

exports.delete = function(req, res) {
    Users_search.delete( req.params.id, function(err, Users_search) {
      if (err)
      res.send(err);
      res.json({ error:false, message: 'Users_search successfully deleted' });
    });
};