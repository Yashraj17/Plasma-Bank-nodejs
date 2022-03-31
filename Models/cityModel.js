const mongoose = require('mongoose')

var cityschema = mongoose.Schema({
    state_id:{type:mongoose.Schema.Types.ObjectId,ref:'state'},
    name:{type:String,require:true}
})
var cityModel = mongoose.model('city',cityschema);
 
module.exports = cityModel