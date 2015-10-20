var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Capitals = new Schema ({
  state: String,
  capital: String
});


module.exports = mongoose.model('capitals', Capitals);


