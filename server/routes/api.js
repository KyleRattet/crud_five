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
})

module.exports = router;
