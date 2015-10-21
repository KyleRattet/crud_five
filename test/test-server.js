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

  //2. Get one

   it('should list a SINGLE capital on /capital/<id> GET', function(done) {
    var newCapital = new Capitals({
      state: "California",
      capital: "Sacremento",
    });
    newCapital.save(function(err, data) {
      chai.request(server)
        .get('/api/v1/capital/'+data.id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          done();
        });
    });
  });

   //3. POST Test
  it('should add a SINGLE capital on /capitals POST', function(done) {
  chai.request(server)
    .post('/api/v1/capitals')
    .send({'state': 'Texas', 'capital': 'Austin'})
    .end(function(err, res){
      console.log(res.body);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('SUCCESS');
      res.body.SUCCESS[0].should.be.a('object');
      done();
    });
  });

//4. PUT Test
  it("should update a single capital on /capital PUT", function(done){
  chai.request(server)
    .get('/api/v1/capitals')
    .end(function(err, res){
      chai.request(server)
        .put('/api/v1/capital/'+res.body[0]._id)
        .send({
          'state': 'Florida',
          'capital': "Tallahasse",
          })
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('UPDATED');
          response.body.UPDATED.should.be.a('object');
          done();
      });
    });
  });


//5. DELETE TEST
  xit('should delete a SINGLE project on /project/<id> DELETE', function(done) {
  chai.request(server)
    .get('/api/v1/projects')
    .end(function(err, res){
      chai.request(server)
        .delete('/api/v1/project/'+res.body[0]._id)
        .end(function(error, response){
          console.log(response.body)
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('REMOVED');
          response.body.REMOVED.should.be.a('object');
          response.body.REMOVED.should.have.property('name');
          response.body.REMOVED.should.have.property('_id');
          response.body.REMOVED.name.should.equal('Paper, Rock, Scissors');
          response.body.REMOVED.description.should.equal('Angular and logic exercise');
          response.body.REMOVED.group_members[0].should.equal('Chip');
          done();
      });
    });
  });


});
