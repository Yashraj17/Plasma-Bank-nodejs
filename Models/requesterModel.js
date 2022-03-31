const mongoose = require('mongoose')

var requesterschema = mongoose.Schema({
    name:{type:String,require:true},
    age:{type:Number,require:true},
    gender:{type:String,require:true},
    bloodgroup:{type:String,require:true},
    covid_positive_date:{type:String,require:true},
    covid_negative_date:{type:String,require:true},
    state_id:{type:mongoose.Schema.Types.ObjectId,ref:'state'},
    city_id:{type:mongoose.Schema.Types.ObjectId,ref:'city'},
    phone_no:{type:String,require:true}
})
var requesterModel = mongoose.model('requester',requesterschema);
 
module.exports = requesterModel