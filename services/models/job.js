var mongoose = require('mongoose');


var Job = mongoose.Schema({
    department     : String    ,
    name           : Boolean   ,
    location       : String,
    description    : String,
    type :String,
    date : Date
})

module.exports = mongoose.model('Job', Job ,'jobs');