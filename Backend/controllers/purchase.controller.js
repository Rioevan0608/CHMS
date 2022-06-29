'use strict';
const purchase = require('../models/purchase.model.js');
exports.findAll = function(req, res) {
    purchase.findAll(function(err, purchase) {
      console.log('controller')
      if (err)
        res.send(err);
        
      console.log('res', purchase);
      res.send(purchase);
    });
};

exports.create = function(req, res) {
    const new_purchase = new purchase(req.body);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        purchase.create(new_purchase, function(err, purchase) {
          if (err)
          res.send(err);
          res.json({error:false,message:"purchase added successfully!",data:purchase});
        });
    }
};

exports.findById = function(req, res) {
    purchase.findById(req.params.id, function(err, purchase) {
      if (err)
      res.send(err);
      res.json(purchase);
    });
};

exports.update = function(req, res) {
    
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        purchase.update(req.params.id, new purchase(req.body), function(err, purchase) {
            if (err)
                res.send(err);
            res.json({ error:false, message: 'purchase successfully updated' });
       });
    }
};

exports.delete = function(req, res) {
    purchase.delete( req.params.id, function(err, purchase) {
      if (err)
      res.send(err);
      res.json({ error:false, message: 'purchase successfully deleted' });
    });
};