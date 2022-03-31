const mongoose = require('mongoose')

var stateschema = mongoose.Schema({
    name:{type:String,require:true}
})
var stateModel = mongoose.model('state',stateschema);
 
module.exports = stateModel