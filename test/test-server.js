process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../server/app');
var Capitals = require('../server/models/capitals');

var should = chai.should();
chai.use(chaiHttp);

describe('Capitals', function () {

  //setup hooks
  Capitals.collection.drop();

  beforeEach(function (done) {
    var newCapital = new Capitals ({
      state: "Colorado",
      capital: "Denver"
    });
    newCapital.save(function (err) {
      done();
    });
  });

  afterEach(function(done){
    Capitals.collection.drop();
    done();
  });

//1. GET All Capitals Test
  it('should list all capitals on /capitals GET request', function (done) {
    chai.request(server)
    .get('/api/v1/capitals')
    .end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('state');
      res.body[0].should.have.property('capital');
      res.body[0].state.should.equal('Colorado');
      res.body[0].capital.should.equal('Denver');
      done();
    });
  });



});
