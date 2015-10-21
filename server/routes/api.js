var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});
var Capitals = require('../models/capitals.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//ROUTE 1. GET All Capitals
router.get('/capitals', function (req, res, next) {
  Capitals.findQ()
    .then(function (result) {res.json(result) })
    .catch(function (err) {res.send(err) })
    .done();
});

//ROUTE 2. GET One Capital
router.get('/capital/:id', function (req, res, next) {
  Capitals.findByIdQ(req.params.id)
  .then(function (result) {res.json(result) })
  .catch(function (err) {res.send(err) })
  .done();
});

//ROUTE 3. POST Capital
router.post('/capitals', function (req, res, next) {
  newCapitals = new Capitals ({
    state: req.body.state,
    capital: req.body.capital
  });
  newCapitals.saveQ()
  .then(function (result) {
    res.json({"SUCCESS": result});
    })
  .catch(function (err) {
    res.send(err);
  })
  .done();
});


module.exports = router;
