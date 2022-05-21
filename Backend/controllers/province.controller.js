'use strict';
const province = require('../models/province.model.js');
exports.findAll = function(req, res) {
    province.findAll(function(err, province) {
      console.log('controller')
      if (err)
        res.send(err);
        
      console.log('res', province);
      res.send(province);
    });
};

exports.create = function(req, res) {
    const new_province = new province(req.body);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        province.create(new_province, function(err, province) {
          if (err)
          res.send(err);
          res.json({error:false,message:"province added successfully!",data:province});
        });
    }
};

exports.findById = function(req, res) {
    province.findById(req.params.id, function(err, province) {
      if (err)
      res.send(err);
      res.json(province);
    });
};

exports.update = function(req, res) {
    
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        province.update(req.params.id, new province(req.body), function(err, province) {
            if (err)
                res.send(err);
            res.json({ error:false, message: 'province successfully updated' });
       });
    }
};

exports.delete = function(req, res) {
    province.delete( req.params.id, function(err, province) {
      if (err)
      res.send(err);
      res.json({ error:false, message: 'province successfully deleted' });
    });
};